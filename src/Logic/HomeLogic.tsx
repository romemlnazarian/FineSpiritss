import {useCallback, useEffect, useState} from 'react';
import useAuthStore from '../zustland/AuthStore';
import {getCategoriesModel, getTopBrandsModel} from '../model/Home/Category';
import {refreshTokenModel} from '../model/Auth/RefreshTokenModel';
import {useNavigation} from '@react-navigation/native';
import {ButtonScreenNavigationProp} from '../navigation/types';
export default function HomeLogic() {
  const navigation = useNavigation<ButtonScreenNavigationProp>();
  const [visible, setVisible] = useState(true);
  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
  const [categories, setCategories] = useState<[]>([]);
  const [topBrands, setTopBrands] = useState<[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

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
    getTopBrandsModel(
      token,
      data => {
        setTopBrands(data);
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
  }, [getCategories, getTopBrands]);

  const onSubmitCategory = (item: any)=>{
    navigation.navigate("CatalogScreen", {
      screen: "CatalogCategory",
      params: {
        item,
        fromHome: true
      }
    });
  }

  return {
    visible,
    onSubmitClose,
    categories,
    topBrands,
    isCategoriesLoading,
    onSubmitCategory,
  };
}
