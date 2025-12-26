import {useCallback, useEffect, useState} from 'react';
import useAuthStore from '../zustland/AuthStore';
import {getCategoriesModel, getTopBrandsModel} from '../model/Home/Category';
import {refreshTokenModel} from '../model/Auth/RefreshTokenModel';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {ButtonScreenNavigationProp} from '../navigation/types';
import {
  getHomeAdvertisingModel,
  getHomeBestSalesModel,
  getHomeNewModel,
  getHomeForGiftModel,
  getHomeRecommendedModel,
} from '../model/Home/HomeAdvertising';
import {getProfileModel} from '../model/Profile/ProfileModel';
import useProfileStore from '../zustland/ProfileStore';
import useRecommendedStore from '../zustland/recommendedStore';
import { getAddressModel } from '../model/Setting/SettingModel';
import useAddressStore from '../zustland/GetAddressStore';

export default function HomeLogic() {
  const navigation = useNavigation<ButtonScreenNavigationProp>();
  const isFocused = useIsFocused();
  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
  const {ageConfirmed, setAgeConfirmed} = useAuthStore();
  const {setProfile} = useProfileStore();
  const {setRecommended} = useRecommendedStore();
  const {address,setAddress} = useAddressStore();
  const [categories, setCategories] = useState<[]>([]);
  const [topBrands, setTopBrands] = useState<[]>([]);
  const [isTopBrandsLoading, setIsTopBrandsLoading] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [homeAdvertising, setHomeAdvertising] = useState<[]>([]);
  const [isHomeAdvertisingLoading, setIsHomeAdvertisingLoading] = useState(false);
  const [dataSort, setDataSort] = useState<any[]>([]);
  const [dataSortLoading, setDataSortLoading] = useState(false);
  const [homeRecommended, setHomeRecommended] = useState<[]>([]);

  const onSubmitClose = () => {
    setAgeConfirmed(false);
  };

  const getCategories = useCallback(async () => {
    setIsCategoriesLoading(true);
    getCategoriesModel(
      token,
      fetchedData => {
        setCategories(fetchedData);
        setIsCategoriesLoading(false);
      },
      () => {
        refreshTokenModel(
          refreshToken,
          refreshedTokens => {
            setToken(refreshedTokens.access);
            setRefreshToken(refreshedTokens.refresh);
            getCategoriesModel(
              refreshedTokens.access,
              categoriesData => {
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
          setDataSort(data?.results);
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
                  setDataSort( data?.results);
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



  const getProfile = useCallback(() => {
    getProfileModel(
      token,
      data => {
        setProfile({...data});
      },
      () => {
        refreshTokenModel(
          refreshToken,
          data => {
            setToken(data.access);
            setRefreshToken(data.refresh);
            getProfileModel(
              data.access,
              data => {
                setProfile({...data});
              },
              () => {},
            );
          },
          () => {},
        );
      },
    );
  }, [token, refreshToken, setToken, setRefreshToken, setProfile]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    getAddress()
    getCategories();
    getTopBrands();
    getHomeAdvertising();
    getHomeRecommended();
    getProfile();
    loadSortSection(getHomeBestSalesModel);
  }, [isFocused, getCategories, getTopBrands, getHomeAdvertising, getHomeRecommended, getProfile, loadSortSection]);


  const getHomeRecommended = () => {
    getHomeRecommendedModel(
      token,
      data => {
        const items = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
        setHomeRecommended(items);
        setRecommended(items);
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
                const items = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
                setHomeRecommended(items);
                setRecommended(items);
              },
              () => {},
            );
          },
          () => {},
        );
      },
    );
  };


  const onSubmitCategory = (item: any) => {
    navigation.navigate('CatalogScreen', {
      screen: 'CatalogCategory',
      params: {
        item,
        fromHome: true,
      },
    });
  };

  const onSubmitAdvertising = (item: any) => {
    if (item.redirect_to === 'category') {
      navigation.navigate('CatalogScreen', {
        screen: 'CatalogCategory',
        params: {
          item,
          fromHome: true,
        },
      });
    } else {
      navigation.navigate('CatalogScreen', {
        screen: 'CatalogDetail',
        params: {
          product: item,
        },
      });
    }
  };

  const onSubmitProduct = (product: any) => {
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


  const getAddress = () =>{
    address === null &&
    getAddressModel(
      token,
      (data) => {
        setAddress(data)
      },
      (err: string) => {
      },
      () => {
        refreshTokenModel(
          refreshToken,
          refreshedTokens => {
            setToken(refreshedTokens.access);
            setRefreshToken(refreshedTokens.refresh);
            getAddressModel(
              refreshedTokens.access,
              (data) => {
                setAddress(data)
              },
              (err: string) => {
              },
              () => {
              },
            );
          },
          () => {
          },
        );
      }
    );
  }

  return {
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
    ageConfirmed,
  };
}

