import {useCallback, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {getFavoriteProductsModel} from '../../model/Favorite/Favorite';
import useAuthStore from '../../zustland/AuthStore';
import {refreshTokenModel} from '../../model/Auth/RefreshTokenModel';


export default function FavoriteLogic() {
  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(false);

const getFavoriteProducts = useCallback(() => {
  setLoading(true);
  getFavoriteProductsModel(
    token,
    (data: any) => {
      const items = Array.isArray(data) ? data : data?.results ?? [];
      setFavoriteProducts(items);
      setLoading(false);
    },
    (err: string) => {
      setLoading(false);
      console.log('error', err);
    },
    () => {
      refreshTokenModel(
        refreshToken,
        newTokens => {
          setToken(newTokens.access);
          setRefreshToken(newTokens.refresh);
          getFavoriteProductsModel(
            newTokens.access,
            (data: any) => {
              const items = Array.isArray(data) ? data : data?.results ?? [];
              setFavoriteProducts(items);
            },
            (err2: string) => {
              setLoading(false);
              console.log('error', err2);
            },
          );
        },
        (errRefresh: string) => {
          setLoading(false);
          console.log('error', errRefresh);
        },
      );
    },
  );
}, [token, refreshToken, setToken, setRefreshToken]);

useEffect(() => {
  getFavoriteProducts();
}, [getFavoriteProducts]);

useFocusEffect(
  useCallback(() => {
    getFavoriteProducts();
    return () => {};
  }, [getFavoriteProducts]),
);

  return {
    favoriteProducts,
    loading,
    getFavoriteProducts,
  };
}
