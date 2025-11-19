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

  // ---------- Filter States ----------
  const [filterData, setFilterData] = useState<any[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [volumes, setVolumes] = useState<string[]>([]);

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
        const results = Array.isArray(data)
          ? data
          : data?.results ?? data?.data ?? [];

        setProducts(prev =>
          requestedPage === 1 ? results : [...prev, ...results],
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
              category.cat_slug,
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
        category.cat_slug,
        requestedPage,
        onSuccess,
        retry,
      );
    },
    [token, refreshToken, setToken, setRefreshToken, category],
  );

  // ====================================================================
  // 🔥 Fetch Filter Data
  // ====================================================================
  const getFilterData = useCallback(() => {
    getFilterDataModel(
      token,
      category.cat_slug,
      data => setFilterData(data),
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

      const countriesQuery = nextCountries.join(',');
      const brandsQuery = nextBrands.join(',');
      const volumesQuery = nextVolumes.join(',');


      const handleSuccess = (payload: any) => {
        const normalizedData = Array.isArray(payload)
          ? payload
          : payload?.results ?? payload?.data ?? [];
        setProducts(normalizedData);
        console.log('filter normalizedData =>', normalizedData);
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
                handleSuccess,
                handleError,
              );
            },
            handleError,
          ),
      );
    },
    [
      token,
      category,
      countries,
      brands,
      volumes,
      toggleValue,
      refreshToken,
      setToken,
      setRefreshToken,
    ],
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
    
  };
}
