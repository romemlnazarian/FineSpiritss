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
  const [filterData, setFilterData] = useState<any[]>([]);
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
              category.cat_slug || category.slug,
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
        category.cat_slug || category.slug,
        requestedPage,
        onSuccess,
        retry,
      );
    },
    [token, refreshToken, setToken, setRefreshToken, category, dedupeById],
  );

  // ====================================================================
  // 🔥 Fetch Filter Data
  // ====================================================================
  const getFilterData = useCallback(() => {
    getFilterDataModel(
      token,
      category.cat_slug,
      data =>{
        if (typeof data?.min_price === 'number') {
          setPriceMinBound(data.min_price);
          if (!didUserSetPriceRef.current) {
            setSelectedMinPrice(data.min_price);
          }
        }
        if (typeof data?.max_price === 'number') {
          setPriceMaxBound(data.max_price);
          if (!didUserSetPriceRef.current) {
            setSelectedMaxPrice(data.max_price);
          }
        }
        setFilterData(data);
      },
      () =>
        refreshTokenModel(
          refreshToken,
          tokens => {
            setToken(tokens.access);
            setRefreshToken(tokens.refresh);
            getFilterData();
          },
          () => {},
        ),
    );
  }, [token, refreshToken, category, setToken, setRefreshToken]);

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
        category.cat_slug,
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
                category.cat_slug,
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
      category,
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
