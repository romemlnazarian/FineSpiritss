import {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {CatalogStackNavigationProp} from '../../navigation/types';
import useAuthStore from '../../zustland/AuthStore';
import {refreshTokenModel} from '../../model/Auth/RefreshTokenModel';
import {
  getFilterDataModel,
  getFilterProductsModel,
} from '../../model/Catalog/Catalog';
import {getProductsModel} from '../../model/Product/ProductModel';

function parseNumericPrice(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }
  return undefined;
}

function normalizeFilterPayload(payload: any) {
  const source =
    payload?.data && typeof payload.data === 'object'
      ? payload.data
      : payload?.filters && typeof payload.filters === 'object'
        ? payload.filters
        : payload;

  if (!source || typeof source !== 'object' || Array.isArray(source)) {
    return null;
  }

  return {
    country: source.country ?? source.countries ?? [],
    brand: source.brand ?? source.brands ?? [],
    volume: source.volume ?? source.volumes ?? source.capacity ?? [],
    min_price: parseNumericPrice(
      source.min_price ?? source.price_from ?? source.price_min,
    ),
    max_price: parseNumericPrice(
      source.max_price ?? source.price_to ?? source.price_max,
    ),
  };
}

function getCategorySlug(category?: {cat_slug?: string; slug?: string}) {
  return category?.cat_slug || category?.slug || '';
}

// ---------- Types ----------
export interface SelectedProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  discountPrice?: string;
}

// ========== LOGIC HOOK ==========
export default function ChoosenCatalogLogic(route: any) {
  const navigation = useNavigation<CatalogStackNavigationProp>();
  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
  const category = route.route.params.item;
  const titleHeader = route.route.params.title;
  const categorySlug = getCategorySlug(category);
  console.log('category =======>', category);

  // ---------- UI States ----------
  const [filterVisible, setFilterVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedProduct, setSelectedProduct] =
    useState<SelectedProduct | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  // ---------- Data States ----------
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [countProduct, setCountProduct] = useState(0);
  // ---------- Filter States ----------
  const [filterData, setFilterData] = useState<any>({});
  const [countries, setCountries] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [volumes, setVolumes] = useState<string[]>([]);
  // Price bounds from API (not a "selected filter")
  const [priceMinBound, setPriceMinBound] = useState<number>(1);
  const [priceMaxBound, setPriceMaxBound] = useState<number>(1000);
  // Selected (applied) price filter
  const [selectedMinPrice, setSelectedMinPrice] = useState<number>(1);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(1000);
  const didUserSetPriceRef = useRef(false);
  // ---------- Refs to avoid stale closures ----------
  const isLoadingMoreRef = useRef(false);
  const hasNextPageRef = useRef(true);

  useEffect(() => {
    isLoadingMoreRef.current = isLoadingMore;
  }, [isLoadingMore]);

  useEffect(() => {
    hasNextPageRef.current = hasNextPage;
  }, [hasNextPage]);

  // ====================================================================
  // 🔥 Fetch Products with Pagination + Token Refresh
  // ====================================================================
  const dedupeById = useCallback((items: any[]) => {
    const seen = new Set<string>();
    const out: any[] = [];
    for (const it of items) {
      const rawId = it?.id ?? it?.product_id ?? it?.product?.id;
      if (rawId === undefined || rawId === null) {
        out.push(it);
        continue;
      }
      const key = String(rawId);
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      out.push(it);
    }
    return out;
  }, []);

  const getProducts = useCallback(
    (requestedPage: number = 1) => {
      if (requestedPage === 1) {
        setIsInitialLoading(true);
      } else {
        if (isLoadingMoreRef.current || !hasNextPageRef.current) {
          return;
        }
        setIsLoadingMore(true);
      }

      const stopLoading = () => {
        requestedPage === 1
          ? setIsInitialLoading(false)
          : setIsLoadingMore(false);
      };

      const onSuccess = (data: any) => {
        setCountProduct(data?.count);
        const results = Array.isArray(data)
          ? data
          : data?.results ?? data?.data ?? [];

        setProducts(prev =>
          requestedPage === 1 ? dedupeById(results) : dedupeById([...prev, ...results]),
        );

        setHasNextPage(Boolean(data?.next));
        setPage(requestedPage);
        stopLoading();
      };

      const retry = () => {
        refreshTokenModel(
          refreshToken,
          tokens => {
            setToken(tokens.access);
            setRefreshToken(tokens.refresh);

            getProductsModel(
              tokens.access,
              categorySlug,
              requestedPage,
              onSuccess,
              stopLoading,
            );
          },
          stopLoading,
        );
      };

      getProductsModel(
        token,
        categorySlug,
        requestedPage,
        onSuccess,
        retry,
      );
    },
    [token, refreshToken, setToken, setRefreshToken, categorySlug, dedupeById],
  );

  const applyFilterData = useCallback((payload: any) => {
    const normalized = normalizeFilterPayload(payload);
    if (!normalized) {
      console.log('filter data could not be normalized =>', payload);
      return;
    }

    if (normalized.min_price !== undefined) {
      setPriceMinBound(normalized.min_price);
      if (!didUserSetPriceRef.current) {
        setSelectedMinPrice(normalized.min_price);
      }
    }
    if (normalized.max_price !== undefined) {
      setPriceMaxBound(normalized.max_price);
      if (!didUserSetPriceRef.current) {
        setSelectedMaxPrice(normalized.max_price);
      }
    }

    setFilterData({
      country: normalized.country,
      brand: normalized.brand,
      volume: normalized.volume,
    });
  }, []);

  // ====================================================================
  // 🔥 Fetch Filter Data
  // ====================================================================
  const getFilterData = useCallback(() => {
    if (!categorySlug) {
      console.log('filter data skipped: missing category slug =>', category);
      return;
    }

    const handleSuccess = (data: any) => {
      console.log('filter data =>', data);
      applyFilterData(data);
    };

    const handleError = () => {
      refreshTokenModel(
        refreshToken,
        tokens => {
          setToken(tokens.access);
          setRefreshToken(tokens.refresh);
          getFilterDataModel(
            tokens.access,
            categorySlug,
            handleSuccess,
            () => {},
          );
        },
        () => {},
      );
    };

    getFilterDataModel(token, categorySlug, handleSuccess, handleError);
  }, [
    token,
    refreshToken,
    categorySlug,
    category,
    setToken,
    setRefreshToken,
    applyFilterData,
  ]);

  // ====================================================================
  // ⏳ Initial Load
  // ====================================================================
  useEffect(() => {
    getProducts(1);
    getFilterData();
  }, [getProducts, getFilterData]);

  // ====================================================================
  // 📌 Load more for FlatList
  // ====================================================================
  const loadMore = useCallback(() => {
    getProducts(page + 1);
  }, [getProducts, page]);

  // ====================================================================
  // 🔍 Search Navigation
  // ====================================================================
  const onSearchHandler = () => navigation.navigate('CatalogSearch');

  // ====================================================================
  // 🧪 Select Filter Title
  // ====================================================================
  const onSubnmitFilter = (filterTitle: string) => {
    setTitle(filterTitle);
    setFilterVisible(true);
  };

  // ====================================================================
  // 🛒 Add selected product with quantity
  // ====================================================================
  const onAddSelected = (product: SelectedProduct, quantity: number) => {
    setSelectedProduct(product);
    setSelectedQuantity(quantity);
  };

  // ====================================================================
  // 📄 Navigate to Product Detail
  // ====================================================================
  const onHandlerDetail = (product: any) => {
    console.log('product =>', product);
    navigation.navigate('CatalogDetail', {
      product,
    });
  };

  // ====================================================================
  // 🧠 Toggle Utility (country, brand, volume)
  // ====================================================================
  const toggleValue = useCallback((prev: string[], value?: string) => {
    const normalized = value ? value.toString() : '';
    if (!normalized) {
      return prev;
    }

    return prev.includes(normalized)
      ? prev.filter(x => x !== normalized)
      : [...prev, normalized];
  }, []);

  const fetchFilteredProducts = useCallback(
    (
      nextCountries: string[],
      nextBrands: string[],
      nextVolumes: string[],
      nextSelectedMinPrice: number,
      nextSelectedMaxPrice: number,
    ) => {
      const countriesQuery = nextCountries.join(',');
      const brandsQuery = nextBrands.join(',');
      const volumesQuery = nextVolumes.join(',');

      const handleSuccess = (payload: any) => {
        const normalizedData = Array.isArray(payload)
          ? payload
          : payload?.results ?? payload?.data ?? [];
        setProducts(dedupeById(normalizedData));
        setIsLoadingMore(false);
        setIsInitialLoading(false);
      };

      const handleError = (err?: any) => {
        console.log('filter error =>', err);
        setIsLoadingMore(false);
        setIsInitialLoading(false);
      };

      getFilterProductsModel(
        token,
        categorySlug,
        countriesQuery,
        brandsQuery,
        volumesQuery,
        nextSelectedMinPrice,
        nextSelectedMaxPrice,
        handleSuccess,
        () =>
          refreshTokenModel(
            refreshToken,
            tokens => {
              setToken(tokens.access);
              setRefreshToken(tokens.refresh);

              getFilterProductsModel(
                tokens.access,
                categorySlug,
                countriesQuery,
                brandsQuery,
                volumesQuery,
                nextSelectedMinPrice,
                nextSelectedMaxPrice,
                handleSuccess,
                handleError,
              );
            },
            handleError,
          ),
      );
    },
    [
      categorySlug,
      refreshToken,
      setRefreshToken,
      setToken,
      token,
      dedupeById,
    ],
  );

  // ====================================================================
  // 🔥 Apply Filter
  // ====================================================================
  const onHandlerFilter = useCallback(
    (type: string, option: any) => {
      setIsLoadingMore(true);
      setFilterVisible(false);
      setIsInitialLoading(true);
      setProducts([]);

      let nextCountries = countries;
      let nextBrands = brands;
      let nextVolumes = volumes;

      if (type === 'country') {
        const value = option?.value ?? option?.name ?? option;
        nextCountries = toggleValue(countries, value);
        setCountries(nextCountries);
      } else if (type === 'brand') {
        const value = option?.slug ?? option?.id ?? option;
        nextBrands = toggleValue(brands, value);
        setBrands(nextBrands);
      } else if (type === 'Capacity') {
        const value = option?.slug ?? option?.value ?? option?.label ?? option;
        nextVolumes = toggleValue(volumes, value);
        setVolumes(nextVolumes);
      }
      fetchFilteredProducts(
        nextCountries,
        nextBrands,
        nextVolumes,
        selectedMinPrice,
        selectedMaxPrice,
      );
    },
    [
      countries,
      brands,
      volumes,
      selectedMinPrice,
      selectedMaxPrice,
      toggleValue,
      fetchFilteredProducts,
    ],
  );

  const onRemoveActiveFilter = useCallback(
    (type: 'Country' | 'Brand' | 'Capacity' | 'Price', value: string) => {
      setIsLoadingMore(true);
      setIsInitialLoading(true);
      setProducts([]);

      const nextCountries =
        type === 'Country' ? countries.filter(x => x !== value) : countries;
      const nextBrands =
        type === 'Brand' ? brands.filter(x => x !== value) : brands;
      const nextVolumes =
        type === 'Capacity' ? volumes.filter(x => x !== value) : volumes;

      if (type === 'Country') {
        setCountries(nextCountries);
      }
      if (type === 'Brand') {
        setBrands(nextBrands);
      }
      if (type === 'Capacity') {
        setVolumes(nextVolumes);
      }
      if (type === 'Price') {
        didUserSetPriceRef.current = false;
        setSelectedMinPrice(priceMinBound);
        setSelectedMaxPrice(priceMaxBound);
      }

      fetchFilteredProducts(
        nextCountries,
        nextBrands,
        nextVolumes,
        type === 'Price' ? priceMinBound : selectedMinPrice,
        type === 'Price' ? priceMaxBound : selectedMaxPrice,
      );
    },
    [
      brands,
      countries,
      fetchFilteredProducts,
      priceMaxBound,
      priceMinBound,
      selectedMaxPrice,
      selectedMinPrice,
      volumes,
    ],
  );

  const onPriceChange = useCallback(
    (nextMin: number, nextMax: number) => {
      didUserSetPriceRef.current = true;
      const clampedMin = Math.max(priceMinBound, Math.min(nextMin, priceMaxBound));
      const clampedMax = Math.max(priceMinBound, Math.min(nextMax, priceMaxBound));
      const finalMin = Math.min(clampedMin, clampedMax);
      const finalMax = Math.max(clampedMin, clampedMax);
      setSelectedMinPrice(finalMin);
      setSelectedMaxPrice(finalMax);

      setIsLoadingMore(true);
      setIsInitialLoading(true);
      setProducts([]);
      setFilterVisible(false);

      // re-fetch with current country/brand/volume + new price range
      fetchFilteredProducts(countries, brands, volumes, finalMin, finalMax);
    },
    [brands, countries, fetchFilteredProducts, priceMaxBound, priceMinBound, volumes],
  );

  // ====================================================================
  // ✔ Return
  // ====================================================================
  return {
    products,
    isInitialLoading,
    isLoadingMore,
    loadMore,

    filterData,
    filterVisible,
    setFilterVisible,
    title,

    onSearchHandler,
    onSubnmitFilter,
    onHandlerFilter,

    selectedProduct,
    selectedQuantity,
    onAddSelected,
    onHandlerDetail,

    countries,
    brands,
    volumes,
    onRemoveActiveFilter,
    titleHeader,
    priceMinBound,
    priceMaxBound,
    selectedMinPrice,
    selectedMaxPrice,
    onPriceChange,
    countProduct
  };
}
