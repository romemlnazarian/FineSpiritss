import {useCallback, useEffect, useState} from 'react';
import {getCatalogDetailModel} from '../../model/Catalog/Catalog';
import {refreshTokenModel} from '../../model/Auth/RefreshTokenModel';
import useAuthStore from '../../zustland/AuthStore';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CatalogStackNavigationProp, TabParamList} from '../../navigation/types';
export default function CatalogCategoryLogic(route: any) {
  const navigation = useNavigation<CatalogStackNavigationProp>();
  const item = route.route.params.item;
  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
  const [catalogDetail, setCatalogDetail] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const getCatalogDetail = useCallback(async () => {
    if (!item?.cat_slug) {
      return;
    }
    setIsLoading(true);

    const handleSuccess = (data: any) => {
      setCatalogDetail(data);
      setIsLoading(false);
    };

    const retryWithRefresh = () => {
      refreshTokenModel(
        refreshToken,
        refreshedTokens => {
          setToken(refreshedTokens.access);
          setRefreshToken(refreshedTokens.refresh);
          getCatalogDetailModel(
            refreshedTokens.access,
            item.cat_slug,
            detailData => {
              setCatalogDetail(detailData);
              setIsLoading(false);
            },
            () => {
              setIsLoading(false);
            },
          );
        },
        () => {
          setIsLoading(false);
        },
      );
    };

    getCatalogDetailModel(token, item.cat_slug, handleSuccess, retryWithRefresh);
  }, [item, token, refreshToken, setToken, setRefreshToken]);

  useEffect(() => {
    if (!item) {
      return;
    }
    setName(item.cat_name);
    getCatalogDetail();
  }, [item, getCatalogDetail]);
  const onSubmitBack = () => {
    navigation.navigate("Catalog");
  };

  const onSubmit = (item: any) => {
    navigation.navigate('ChoosenCatalog', {item: item});
  };

  return {
    catalogDetail,
    isLoading,
    name,
    onSubmitBack,
    onSubmit,
  };
}
