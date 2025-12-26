import {useCallback, useEffect, useState} from 'react';
import {getCardModel} from '../../model/Card/CardModel';
import useAuthStore from '../../zustland/AuthStore';
import {refreshTokenModel} from '../../model/Auth/RefreshTokenModel';
import useAddressStore from '../../zustland/GetAddressStore';
import {useNavigation} from '@react-navigation/native';
import type {Address} from '../../zustland/GetAddressStore';
import { Linking } from 'react-native';
import { getHomeRecommendedModel } from '../../model/Home/HomeAdvertising';
import { AddFavoriteProductModel, DeleteFavoriteProductModel } from '../../model/Favorite/Favorite';

type CartLogixReturn = {
  loading: boolean;
  data: any;
  address: Address | null;
  refreshCart: () => void;
  onSubmitAddress: () => void;
  onSubmit: (id:number) => void;
  error: boolean;
};
export default function CartLogix(): CartLogixReturn {
  const navigation = useNavigation<any>();
  const {token, setToken, refreshToken, setRefreshToken} = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const {address} = useAddressStore();
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState<boolean>(false);
  const [recommended, setRecommended] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    getData();
    setError(false);
    fetchRecommended()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  const refreshCart = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  const fetchRecommended = useCallback((onDone?: () => void) => {
    getHomeRecommendedModel(
      token,
      (data: any) => {
        const items = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
        setRecommended(items);
        if (onDone) onDone();
      },
      () => {
        refreshTokenModel(
          refreshToken,
          newTokens => {
            setToken(newTokens.access);
            setRefreshToken(newTokens.refresh);
            getHomeRecommendedModel(newTokens.access,
              (data: any) => {
                const items = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
                setRecommended(items);
                if (onDone) onDone();
              },
              () => { if (onDone) onDone(); }
            );
          },
          () => { if (onDone) onDone(); }
        );
      }
    );
  }, [token, refreshToken, setToken, setRefreshToken]);


  const getData = () => {
    setLoading(true);
    getCardModel(
      token,
      fetchedData => {
        console.log('data', fetchedData);
        setData(fetchedData);
        setLoading(false);
      },
      () => {
        setLoading(false);
      },
      () => {
        refreshTokenModel(
          refreshToken,
          refreshedTokens => {
            setToken(refreshedTokens.access);
            setRefreshToken(refreshedTokens.refresh);
            getCardModel(
              refreshedTokens.access,
              fetchedData => {
                setData(fetchedData);
                setLoading(false);
              },
              () => {
                setLoading(false);
              },
              () => {
                setLoading(false);
              },
            );
          },
          () => {
            setLoading(false);
          },
        );
      },
    );
  };

  const onSubmitAddress = () => {
    navigation.navigate('SettingScreen', {
      screen: 'ShippingAddress',
      from: 'CardScreen',
    });
  };

  const onSubmit = (id:number) => {

    if (address?.street === '') {
      setError(true);
    } else {
      setError(false);
      Linking.openURL(`https://finespirits.pl/checkout/?user_id=${id}`);
    }
  };

  const toggleFavorite = (id:number) => {
    if (isFavorite) {
      setIsFavorite(false);
      DeleteFavoriteProductModel(
        token,
        id,
        () => {},
        () => {
        },
        () => {
          refreshTokenModel(
            refreshToken,
            data => {
              DeleteFavoriteProductModel(
                data.access,
                id,
                () => {},
                (error: string) => {
                },
              );
            },
            () => {},
          );
        },
      );
    } else {
      setIsFavorite(true);
      AddFavoriteProductModel(
        token,
        id,
        () => {
          setIsFavorite(true);
        },
        (error: string) => {
        },
        () => {
          refreshTokenModel(
            refreshToken,
            data => {
              AddFavoriteProductModel(
                data.access,
                id,
                () => {},
                () => {},
                () => {},
              );
            },
            () => {},
          );
        },
      );
    }
  };




  return {
    loading,
    data,
    address,
    refreshCart,
    onSubmitAddress,
    onSubmit,
    error,
    recommended,
    toggleFavorite
  };
}
