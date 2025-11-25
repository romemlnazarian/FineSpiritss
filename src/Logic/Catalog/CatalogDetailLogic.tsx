import { useCallback, useEffect, useState } from 'react'
import { getProductDetailModel } from '../../model/Catalog/Catalog';
import useAuthStore from '../../zustland/AuthStore';
import { refreshTokenModel } from '../../model/Auth/RefreshTokenModel';
import { AddFavoriteProductModel, DeleteFavoriteProductModel } from '../../model/Favorite/Favorite';

export default function CatalogDetailLogic(route: any) {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        getProductDetail()
        setIsFavorite(route?.route?.params?.product?.is_favorite);
        
    }, [route?.route?.params?.product]);


   const getProductDetail = useCallback(async () => {
    setIsLoading(true);
      getProductDetailModel(token, route?.route?.params?.product?.slug, (data) => {
        setIsLoading(false);
        setProduct(data);
        setIsFavorite(data?.is_favorite);
    }, (error) => {
        setIsLoading(false);
        refreshTokenModel(refreshToken, (data) => {
            setToken(data.access);
            setRefreshToken(data.refresh);
            getProductDetailModel(data.access, route?.route?.params?.product?.slug, (data) => {
                setProduct(data);
                setIsFavorite(data?.is_favorite);
            }, (error) => {
                console.log('error =>', error);
            });
        }, (error) => {
            console.log('error =>', error);
        });
    });
   }, [route?.route?.params?.product?.id]);



   const toggleFavorite = useCallback(async (item:any) => {
    if (isFavorite) {
        setIsFavorite(false);
        DeleteFavoriteProductModel(
          token,
          item.id,
          () => {},
          error => {
            console.log('error', error);
          },
          () => {
            refreshTokenModel(
              refreshToken,
              data => {
                DeleteFavoriteProductModel(
                  data.access,
                  item.id,
                  data => {
                    console.log('data', data);
                  },
                  error => {
                    console.log('error', error);
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
          item.id,
           () => {
            setIsFavorite(true);
          },
          error => {
            console.log('error', error);
          },
          () => {
            refreshTokenModel(
              refreshToken,
              data => {
                AddFavoriteProductModel(
                  data.access,
                  item.id,
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
   }, [isFavorite, token, refreshToken, route?.route?.params?.product?.id]);


    return {
        product,
        isLoading,
        isFavorite,
        toggleFavorite
    }
}