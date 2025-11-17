import { useCallback, useEffect, useState } from 'react'
import { getProductDetailModel } from '../../model/Catalog/Catalog';
import useAuthStore from '../../zustland/AuthStore';
import { refreshTokenModel } from '../../model/Auth/RefreshTokenModel';

export default function CatalogDetailLogic(route: any) {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getProductDetail()
    }, [route?.route?.params?.product, route?.route?.params?.quantity]);


   const getProductDetail = useCallback(async () => {
    setIsLoading(true);
      getProductDetailModel(token, route?.route?.params?.product?.slug, (data) => {
        setIsLoading(false);
        setProduct(data);
    }, (error) => {
        setIsLoading(false);
        refreshTokenModel(refreshToken, (data) => {
            setToken(data.access);
            setRefreshToken(data.refresh);
            getProductDetail(data);
        }, (error) => {
            console.log('error =>', error);
        });
    });
   }, [route?.route?.params?.product?.id]);

   return {
    product,
    isLoading,
   }
}