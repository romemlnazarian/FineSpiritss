import {useCallback, useEffect, useState} from 'react';
import {getCardModel} from '../../model/Card/CardModel';
import useAuthStore from '../../zustland/AuthStore';
import {refreshTokenModel} from '../../model/Auth/RefreshTokenModel';
import useAddressStore from '../../zustland/GetAddressStore';
import {useNavigation} from '@react-navigation/native';
import type {Address} from '../../zustland/GetAddressStore';
import { getHomeRecommendedModel } from '../../model/Home/HomeAdvertising';
import { AddFavoriteProductModel, DeleteFavoriteProductModel } from '../../model/Favorite/Favorite';
import useCartBadgeStore, {getCartItemsCount} from '../../zustland/cartBadgeStore';
import {
  checkoutModel,
  createP24PaymentModel,
} from '../../model/Payment/PaymentModel';
import {openP24Checkout} from '../../model/Payment/p24';

type CartLogixReturn = {
  loading: boolean;
  data: any;
  address: Address | null;
  refreshCart: () => void;
  onSubmitAddress: () => void;
  onSubmit: (id: number) => void;
  onPay: () => void;
  paying: boolean;
  orderSheetVisible: boolean;
  setOrderSheetVisible: (visible: boolean) => void;
  error: boolean;
  recommended: any[];
  toggleFavorite: (id: number) => void;
};
export default function CartLogix(): CartLogixReturn {
  const navigation = useNavigation<any>();
  const {token, setToken, refreshToken, setRefreshToken} = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const {address} = useAddressStore();
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState<boolean>(false);
  const [orderSheetVisible, setOrderSheetVisible] = useState(false);
  const [paying, setPaying] = useState<boolean>(false);
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
        useCartBadgeStore.getState().setCount(getCartItemsCount(fetchedData));
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
                useCartBadgeStore
                  .getState()
                  .setCount(getCartItemsCount(fetchedData));
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

  const onSubmit = (_id?: number) => {
    if (!address?.street) {
      setError(true);
    } else {
      setError(false);
      setOrderSheetVisible(true);
    }
  };

  // Freeze the cart into an order, register a Przelewy24 payment, open the
  // hosted checkout, then hand off to the PaymentResult screen which polls the
  // backend for the authoritative status. We never treat the browser closing
  // as proof of payment.
  const startPayment = useCallback(
    (accessToken: string, onFail: () => void, onUnauthorized?: () => void) => {
      checkoutModel(
        accessToken,
        (order: any) => {
          createP24PaymentModel(
            accessToken,
            order.id,
            async (payment: any) => {
              try {
                await openP24Checkout(payment.payment_url);
              } catch (e) {
                console.log('open checkout failed', e);
              }
              setPaying(false);
              setOrderSheetVisible(false);
              navigation.navigate('PaymentResult', {
                paymentId: payment.payment_id,
                orderId: payment.order_id,
              });
            },
            () => onFail(),
            onUnauthorized,
          );
        },
        () => onFail(),
        onUnauthorized,
      );
    },
    [navigation],
  );

  const onPay = useCallback(() => {
    if (paying) {
      return;
    }
    setPaying(true);

    const fail = () => {
      setPaying(false);
    };

    startPayment(token, fail, () => {
      // Access token expired: refresh and retry once.
      refreshTokenModel(
        refreshToken,
        newTokens => {
          setToken(newTokens.access);
          setRefreshToken(newTokens.refresh);
          startPayment(newTokens.access, fail);
        },
        fail,
      );
    });
  }, [paying, token, refreshToken, setToken, setRefreshToken, startPayment]);

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
    onPay,
    paying,
    orderSheetVisible,
    setOrderSheetVisible,
    error,
    recommended,
    toggleFavorite,
  };
}
