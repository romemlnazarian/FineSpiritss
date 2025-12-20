import {useCallback, useEffect, useState} from 'react';
import {getCardModel} from '../../model/Card/CardModel';
import useAuthStore from '../../zustland/AuthStore';
import {refreshTokenModel} from '../../model/Auth/RefreshTokenModel';
import useAddressStore from '../../zustland/GetAddressStore';
import {useNavigation} from '@react-navigation/native';

import type {Address} from '../../zustland/GetAddressStore';

type CartLogixReturn = {
  loading: boolean;
  data: any;
  address: Address | null;
  refreshCart: () => void;
  onSubmitAddress: () => void;
  onSubmit: () => void;
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
  useEffect(() => {
    getData();
    setError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  const refreshCart = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

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

  const onSubmit = () => {

    if (address === null || address?.street === '') {
      setError(true);
    } else {
      setError(false);
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
  };
}
