import {useCallback, useEffect, useState} from 'react';
import useAuthStore from '../zustland/AuthStore';
import {getCategoriesModel, getTopBrandsModel} from '../model/Home/Category';
import {refreshTokenModel} from '../model/Auth/RefreshTokenModel';
import {useNavigation} from '@react-navigation/native';
import {ButtonScreenNavigationProp} from '../navigation/types';
import {
  getHomeAdvertisingModel,
  getHomeBestSalesModel,
  getHomeNewModel,
  getHomeForGiftModel,
  getHomeRecommendedModel,
} from '../model/Home/HomeAdvertising';
export default function HomeLogic() {
  const navigation = useNavigation<ButtonScreenNavigationProp>();
  const [visible, setVisible] = useState(true);
  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
  const [categories, setCategories] = useState<[]>([]);
  const [topBrands, setTopBrands] = useState<[]>([]);
  const [isTopBrandsLoading, setIsTopBrandsLoading] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [homeAdvertising, setHomeAdvertising] = useState<[]>([]);
  const [isHomeAdvertisingLoading, setIsHomeAdvertisingLoading] =
    useState(false);
  const [dataSort, setDataSort] = useState<any[]>([]);
  const [dataSortLoading, setDataSortLoading] = useState(false);
  const [homeRecommended, setHomeRecommended] = useState<[]>([]);



  const onSubmitClose = () => {
    setVisible(prev => !prev);
  };
  const getCategories = useCallback(async () => {
    setIsCategoriesLoading(true);
    getCategoriesModel(
      token,
      fetchedData => {
        console.log('data =>', fetchedData);
        setCategories(fetchedData);
        setIsCategoriesLoading(false);
      },
      () => {
        refreshTokenModel(
          refreshToken,
          refreshedTokens => {
            console.log('data =>', refreshedTokens);
            setToken(refreshedTokens.access);
            setRefreshToken(refreshedTokens.refresh);
            getCategoriesModel(
              refreshedTokens.access,
              categoriesData => {
                console.log('categories =>', categoriesData);
                setCategories(categoriesData);
                setIsCategoriesLoading(false);
              },
              () => {
                setIsCategoriesLoading(false);
              },
            );
          },
          () => {
            setIsCategoriesLoading(false);
          },
        );
      },
    );
  }, [token, refreshToken, setToken, setRefreshToken]);

  const getTopBrands = useCallback(async () => {
    setIsTopBrandsLoading(true);
    getTopBrandsModel(
      token,
      data => {
        setTopBrands(data);
        setIsTopBrandsLoading(false);
      },
      () => {
        refreshTokenModel(
          refreshToken,
          refreshedTokens => {
            setToken(refreshedTokens.access);
            setRefreshToken(refreshedTokens.refresh);
            getTopBrandsModel(
              refreshedTokens.access,
              brands => {
                setTopBrands(brands);
                setIsTopBrandsLoading(false);
              },
              () => setIsTopBrandsLoading(false),
            );
          },
          () => setIsTopBrandsLoading(false),
        );
      },
    );
  }, [token, refreshToken, setToken, setRefreshToken]);

  const getHomeAdvertising = useCallback(async () => {
    setIsHomeAdvertisingLoading(true);
    getHomeAdvertisingModel(
      token,
      data => {
        setHomeAdvertising(data);
        setIsHomeAdvertisingLoading(false);
      },
      () => {
        refreshTokenModel(
          refreshToken,
          refreshedTokens => {
            setToken(refreshedTokens.access);
            setRefreshToken(refreshedTokens.refresh);
            getHomeAdvertisingModel(
              refreshedTokens.access,
              advertising => {
                setHomeAdvertising(advertising);
                setIsHomeAdvertisingLoading(false);
              },
              () => setIsHomeAdvertisingLoading(false),
            );
          },
          () => setIsHomeAdvertisingLoading(false),
        );
      },
    );
  }, [token, refreshToken, setToken, setRefreshToken]);

  const loadSortSection = useCallback(
    (fetcher: (token: string, cb: (data: any) => void, err: (msg: string) => void) => void) => {
      setDataSortLoading(true);
      fetcher(
        token,
        data => {
          setDataSort(Array.isArray(data) ? data : data?.results ?? []);
          setDataSortLoading(false);
        },
        () => {
          refreshTokenModel(
            refreshToken,
            refreshedTokens => {
              setToken(refreshedTokens.access);
              setRefreshToken(refreshedTokens.refresh);
              fetcher(
                refreshedTokens.access,
                data => {
                  setDataSort(Array.isArray(data) ? data : data?.results ?? []);
                  setDataSortLoading(false);
                },
                () => setDataSortLoading(false),
              );
            },
            () => setDataSortLoading(false),
          );
        },
      );
    },
    [token, refreshToken, setToken, setRefreshToken],
  );

  const getHomeRecommended = useCallback(async () => {
    getHomeRecommendedModel(
      token,
      data => {
        setHomeRecommended(data.results);
      },
      () => {
        refreshTokenModel(
          refreshToken,
          refreshedTokens => {
            setToken(refreshedTokens.access);
            setRefreshToken(refreshedTokens.refresh);
            getHomeRecommendedModel(
              refreshedTokens.access,
              data => {
                setHomeRecommended(data.results);
              },
              () => {},
            );
          },
          () => {},
        );
      },
    );
  }, [token, refreshToken, setToken, setRefreshToken]);


  useEffect(() => {
    getCategories();
    getTopBrands();
    getHomeAdvertising();
    getHomeRecommended();
  }, [getCategories, getTopBrands, getHomeAdvertising, getHomeRecommended]);

  useEffect(() => {
    onSubmitSort('1');
  }, [onSubmitSort]);

  const onSubmitCategory = (item: any)=>{
    navigation.navigate("CatalogScreen", {
      screen: "CatalogCategory",
      params: {
        item,
        fromHome: true
      }
    });
  }

  const onSubmitAdvertising = (item: any)=>{
    // navigation.navigate("AdvertisingDetail", {item: item});
  }

  const onSubmitProduct = (product: any) => {
    console.log('product =>', product);
    navigation.navigate('CatalogScreen', {
      screen: 'CatalogDetail',
      params: {
        product,
      },
    });
  };

  const onSubmitSort = useCallback(
    (id: string = '1') => {
      if (id === '1') {
        loadSortSection(getHomeBestSalesModel);
      } else if (id === '2') {
        loadSortSection(getHomeNewModel);
      } else {
        loadSortSection(getHomeForGiftModel);
      }
    },
    [loadSortSection],
  );




  
  return {
    visible,
    onSubmitClose,
    categories,
    topBrands,
    isCategoriesLoading,
    onSubmitCategory,
    homeAdvertising,
    isHomeAdvertisingLoading,
    onSubmitAdvertising,
    onSubmitSort,
    onSubmitProduct,
    dataSort,
    dataSortLoading,
    homeRecommended,
    isTopBrandsLoading,
  };
}
