import {useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {getAllCategoriesModel} from '../../model/Catalog/Catalog';
import useAuthStore from '../../zustland/AuthStore';
import {refreshTokenModel} from '../../model/Auth/RefreshTokenModel';
import {ButtonScreenNavigationProp} from '../../navigation/types';

export default function CatalogLogic() {
  const navigation = useNavigation<ButtonScreenNavigationProp>();
  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
  const [catalog, setCatalog] = useState<[]>([]);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const isLoadingMoreRef = useRef(isLoadingMore);
  const hasNextPageRef = useRef(hasNextPage);

  useEffect(() => {
    isLoadingMoreRef.current = isLoadingMore;
  }, [isLoadingMore]);

  useEffect(() => {
    hasNextPageRef.current = hasNextPage;
  }, [hasNextPage]);

  const getCategories = useCallback(
    async (requestedPage: number = 1) => {
      if (requestedPage === 1) {
        setIsInitialLoading(true);
      } else {
        if (isLoadingMoreRef.current || !hasNextPageRef.current) {
          return;
        }
        setIsLoadingMore(true);
      }

      const stopLoading = () => {
        if (requestedPage === 1) {
          setIsInitialLoading(false);
        } else {
          setIsLoadingMore(false);
        }
      };

      const onSuccess = (data: any) => {
        // console.log('catalog data =>', data);
        const results = Array.isArray(data) ? data : data?.results ?? data?.data ?? [];
        setCatalog(prev =>
          requestedPage === 1
            ? results
            : [
                ...prev,
                ...results.filter(r => !prev.some(p => p.id === r.id)),
              ]
        );        const nextExists = !!(data && typeof data === 'object' && 'next' in data && data.next);
        setHasNextPage(nextExists);
        setPage(requestedPage);
        stopLoading();
      };

      const handleRefreshFlow = () => {
        refreshTokenModel(
          refreshToken,
          newTokens => {
            setToken(newTokens.access);
            setRefreshToken(newTokens.refresh);
            getAllCategoriesModel(newTokens.access, requestedPage, onSuccess, () => {
              stopLoading();
            });
          },
          () => {
            stopLoading();
          },
        );
      };

      getAllCategoriesModel(token, requestedPage, onSuccess, () => {
        handleRefreshFlow();
      });
    },
    [token, refreshToken, setToken, setRefreshToken],
  );

  useEffect(() => {
    getCategories(1);
  }, [getCategories]);

  const loadMore = useCallback(() => {
    getCategories(page + 1);
  }, [getCategories, page]);

  const unSubmit = useCallback((item: any) => {
    navigation.navigate('CatalogCategory' , {item:item});
  }, [navigation]);

  return {
    unSubmit,
    catalog,
    loadMore,
    isLoadingMore,
    isInitialLoading,
  };
}
