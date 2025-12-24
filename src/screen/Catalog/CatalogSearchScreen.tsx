import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Viski from '../../assets/svg/viski.svg';
import Heart from '../../assets/svg/Heart.svg';
import Arrow from '../../assets/svg/Arrows.svg';
import useAuthStore from '../../zustland/AuthStore';
import {
  DeleteSearchProductsHistoryModel,
  getSearchProductsHistoryModel,
  getSearchProductsModel,
} from '../../model/Catalog/Catalog';
import {refreshTokenModel} from '../../model/Auth/RefreshTokenModel';
import {useNavigation} from '@react-navigation/native';
import Heart_primary from '../../assets/svg/Heart_Primary.svg';
import {
  AddFavoriteProductModel,
  DeleteFavoriteProductModel,
} from '../../model/Favorite/Favorite';
import useRecommendedStore from '../../zustland/recommendedStore';
import FastImage from 'react-native-fast-image';
interface ProductItem {
  id: string;
  title: string;
  country: string;
  alcoholContent: string;
  price: string;
  slug?: string;
  image_url?: string;
  regular_price?: string;
  sale_price?: string;
  abv?: string;
  volume?: string;
  is_favorite?: boolean;
}

// Memoized Product Card Component
const ProductCard = React.memo(({item}: {item: ProductItem}) => {
  const {Styles} = StyleComponent();
  const navigation: any = useNavigation();
  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
  const [isFavorite, setIsFavorite] = useState(item?.is_favorite);
  const toggleFavorite = (id: string) => {
    if (isFavorite) {
      setIsFavorite(false);
      DeleteFavoriteProductModel(
        token,
        id,
        () => {},
        _error => {},
        () => {
          refreshTokenModel(refreshToken, newTokens => {
            setToken(newTokens.access);
            setRefreshToken(newTokens.refresh);
            DeleteFavoriteProductModel(
              newTokens.access,
              id,
              () => {
                console.log('DeleteFavoriteProductModel success');
              },
              _error => {
                console.log('DeleteFavoriteProductModel error =>', _error);
              },
            );
          });
        },
      );
    } else {
      setIsFavorite(true);
      AddFavoriteProductModel(
        token,
        id,
        () => {},
        _error => {},
        () => {
          refreshTokenModel(refreshToken, newTokens => {
            setToken(newTokens.access);
            setRefreshToken(newTokens.refresh);
            AddFavoriteProductModel(
              newTokens.access,
              id,
              () => {},
              _error => {},
            );
          });
        },
      );
    }
  };
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('CatalogDetail', {
          product: item,
        });
      }}
      style={[Styles.justifyBetween, styles.mainContainer]}>
      <View style={[Styles.justifyCenter, styles.leftSection]}>
        <FastImage
          source={{uri: item?.image_url}}
          style={{width: 100, height: 100}}
          resizeMode="contain"
        />
        <View style={styles.productInfo}>
          <Text
            style={[Styles.h6_SemiBold, {width: '80%'}]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.title}
          </Text>
          <View style={styles.detailsContainer}>
            <Text style={[Styles.subtitle_Regular, {color: Color.gray}]}>
              {item.country}
            </Text>
            <View style={styles.separator} />
            <Text style={[Styles.subtitle_Regular, {color: Color.gray}]}>
              {item.alcoholContent}
            </Text>
          </View>
        {item?.sale_price === null ? (
        <Text
          style={[
            Styles.title_Bold,
            styles.productPrice,
            styles.priceContainer,
          ]}>
          {item.price} zł
        </Text>
      ) : (
        <>
          {item.regular_price && (
            <Text
              style={[
                Styles.subtitle_Regular,
                styles.originalPriceText,
                styles.priceContainer,
              ]}>
              {item.regular_price} zł
            </Text>
          )}

          <Text
            style={[
              Styles.title_Bold,
              styles.productPrice,
              styles.priceContainer,
            ]}>
            {item.price} zł
          </Text>
        </>
      )}

        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          toggleFavorite(item.id);
        }}
        style={styles.heartContainer}>
        {isFavorite ? (
          <Heart_primary width={24} height={24} />
        ) : (
          <Heart width={24} height={24} fill={Color.white} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
});

export default function CatalogSearch() {
  const navigation: any = useNavigation();
  const {Styles} = StyleComponent();
  const insets = useSafeAreaInsets();
  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
  const {recommended} = useRecommendedStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<ProductItem[]>(
    [],
  );

  const [displayedProductData, setDisplayedProductData] =
    useState<ProductItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const normalizeProducts = useCallback((data: any[]): ProductItem[] => {
    return (data ?? []).map((item: any, index: number) => ({
      id: String(
        item?.id ??
          item?.slug ??
          item?.sku ??
          `${item?.title ?? 'item'}-${index}`,
      ),
      title: item?.title ?? item?.name ?? 'Untitled product',
      country: item?.country ?? item?.key_details?.country ?? '',
      alcoholContent: item?.abv ? `${item.abv}% Alc By Vol` : '',
      price: item?.price ?? '',
      slug: item?.slug ?? item?.id ?? '',
      image_url:
      item?.image_url ?? item?.image?.url ?? item?.images?.[0]?.src ?? '',
      regular_price: item?.regular_price ?? '',
      sale_price: item?.sale_price ?? null,
      abv: typeof item?.abv === 'number' ? `${item.abv}%` : item?.abv ?? '',
      volume: item?.volume ?? item?.key_details?.volume ?? '',
      is_favorite: !!item?.is_favorite,
    }));
  }, []);

  useEffect(() => {
    setDisplayedProductData(normalizeProducts(recommended as any[]));
  }, [recommended, normalizeProducts]);

  const normalizeHistoryItems = useCallback((data: any[]): ProductItem[] => {
    return (data ?? []).map((item: any, index: number) => ({
      id: String(
        item?.id ?? item?.slug ?? `${item?.title ?? 'history'}-${index}`,
      ),
      title: item?.title ?? item?.query ?? 'Untitled',
      country: item?.country ?? '',
      alcoholContent: '',
      price: '',
      slug: item?.slug ?? item?.id ?? '',
    }));
  }, []);

  const fetchSearchResults = useCallback(
    (query: string) => {
      if (!query || query.length < 3) {
        return;
      }

      setIsSearching(true);

      const handleSuccess = (payload: any) => {
        setIsSearching(false);
        const raw = Array.isArray(payload?.results)
          ? payload.results
          : Array.isArray(payload)
          ? payload
          : [];
        const mapped = normalizeProducts(raw);
        console.log('getSearchProductsModel payload =>', mapped);
        setFilteredSuggestions(mapped);
        setDisplayedProductData(mapped);
      };

      const handleError = () => {
        setIsSearching(false);
      };

      getSearchProductsModel(token, query, handleSuccess, () =>
        refreshTokenModel(
          refreshToken,
          newTokens => {
            setToken(newTokens.access);
            setRefreshToken(newTokens.refresh);
            getSearchProductsModel(
              newTokens.access,
              query,
              handleSuccess,
              handleError,
            );
          },
          handleError,
        ),
      );
    },
    [token, refreshToken, setToken, setRefreshToken, normalizeProducts],
  );

  const fetchSearchHistory = useCallback(
    (query: string) => {
      getSearchProductsHistoryModel(
        token,
        query,
        (payload: any) => {
          const raw = Array.isArray(payload?.results)
            ? payload.results
            : Array.isArray(payload)
            ? payload
            : payload?.data ?? [];
          const normalized = normalizeHistoryItems(raw);
          setFilteredSuggestions(normalized);
        },
        () =>
          refreshTokenModel(
            refreshToken,
            newTokens => {
              setToken(newTokens.access);
              setRefreshToken(newTokens.refresh);
              getSearchProductsHistoryModel(
                newTokens.access,
                query,
                (payload: any) => {
                  const raw = Array.isArray(payload?.results)
                    ? payload.results
                    : Array.isArray(payload)
                    ? payload
                    : payload?.data ?? [];
                  const normalized = normalizeHistoryItems(raw);
                  setFilteredSuggestions(normalized);
                },
                err => console.log('history error =>', err),
              );
            },
            err => console.log('history refresh error =>', err),
          ),
      );
    },
    [
      token,
      refreshToken,
      setToken,
      setRefreshToken,
      normalizeHistoryItems,
    ],
  );

  const handleSearch = useCallback(
    (text: string) => {
      setSearchTerm(text);
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        if (text.length >= 3) {
          fetchSearchResults(text);
        } else {
          if (text.length === 0) {
            setFilteredSuggestions([]);
            setDisplayedProductData(normalizeProducts(recommended as any[]));
          } else {
            fetchSearchHistory(text);
          }
        }
      }, 500);
    },
    [fetchSearchResults, fetchSearchHistory, recommended, normalizeProducts],
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const renderProductItem = useCallback(
    ({item}: {item: ProductItem}) => <ProductCard item={item} />,
    [],
  );

  const keyExtractor = useCallback((item: ProductItem) => item.id, []);

  const getTextInputWidthStyle = useCallback(
    (hasSuggestions: boolean): ViewStyle => {
      return {width: '80%'};
    },
    [],
  );

  return (
    <View style={[Styles.container]}>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.arrowContainer}
          onPress={() => {
            navigation.goBack();
          }}>
          <Arrow width={30} height={30} />
        </TouchableOpacity>
        <TextInput
          placeholder={'Search'}
          placeholderTextColor={Color.gray}
          style={[
            styles.textInputContainer,
            Styles.body_Regular,
            getTextInputWidthStyle(
              filteredSuggestions.length > 0 || isSearching,
            ),
          ]}
          value={searchTerm}
          onChangeText={handleSearch}
          onFocus={() => {
            if (searchTerm === '') {
              fetchSearchHistory('');
            }
          }}
        />
        {isSearching && (
          <ActivityIndicator
            size="small"
            color={Color.primary}
            style={styles.searchLoader}
          />
        )}
      </View>
      <View style={styles.separatorLine} />
      {filteredSuggestions.length > 0 && (
        <TouchableOpacity
          style={styles.cleanButton}
          onPress={() => {
            setSearchTerm('');
            setFilteredSuggestions([]);
            setDisplayedProductData(normalizeProducts(recommended as any[]));
            DeleteSearchProductsHistoryModel(
              token,
              () => {
                console.log('DeleteSearchProductsHistoryModel success');
              },
              _error => {
                refreshTokenModel(
                  refreshToken,
                  newTokens => {
                    setToken(newTokens.access);
                    setRefreshToken(newTokens.refresh);
                    DeleteSearchProductsHistoryModel(
                      newTokens.access,
                      () => {
                        console.log('DeleteSearchProductsHistoryModel success');
                      },
                      _error => {
                        console.log(
                          'DeleteSearchProductsHistoryModel error =>',
                          _error,
                        );
                      },
                    );
                  },
                  _error => {
                    console.log(
                      'DeleteSearchProductsHistoryModel error =>',
                      _error,
                    );
                  },
                );
              },
            );
          }}>
          <Text style={[Styles.h6_Regular, styles.cleanButtonText]}>Clean</Text>
        </TouchableOpacity>
      )}

      <View>
        {filteredSuggestions.length > 0 && (
          <View>
            {/* <Text style={[Styles.h6_Medium,{marginLeft:'5%',marginTop:10}]}>Search History</Text> */}
            <FlatList
              data={filteredSuggestions}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setSearchTerm(item.title);
                    setFilteredSuggestions([]);
                    setDisplayedProductData(normalizeProducts(recommended as any[]));
                    fetchSearchResults(item.title);
                  }}>
                  <Text
                    style={[
                      styles.suggestionItem,
                      Styles.body_Regular,
                      {width: '80%'},
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              style={styles.suggestionsList}
            />
          </View>
        )}

        <FlatList
          data={displayedProductData}
          renderItem={renderProductItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.flatListContainer, {paddingBottom: (insets?.bottom ?? 0) + 140}]}
          initialNumToRender={8}
          windowSize={10}
          maxToRenderPerBatch={8}
          updateCellsBatchingPeriod={50}
          ListFooterComponent={<View style={{height: (insets?.bottom ?? 0) + 60}} />}
          scrollEventThrottle={16}
          decelerationRate="fast"
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cancelContainer: {
    marginTop: 10,
    marginRight: 10,
  },
  arrowContainer: {
    marginTop: 10,
  },
  searchContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cleanButton: {
    position: 'absolute',
    right: 10,
    top: 70,
    zIndex: 100,
  },
  cleanButtonText: {
    color: Color.gray,
    marginTop: 20,
  },
  searchLoader: {
    marginTop: 10,
    marginLeft: 8,
  },
  textInputContainer: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: Color.background,
    height: 50,
    color: Color.black,
    marginLeft: 10,
  },
  mainContainer: {
    width: '100%',
    alignSelf: 'center',
    marginTop: '5%',
    borderBottomWidth: 1,
    borderBottomColor: Color.lightGray,
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  leftSection: {
    height: 100,
  },
  productInfo: {
    height: 100,
    justifyContent: 'space-around',
    marginLeft: '5%',
    width: '70%',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: Color.black,
  },
  heartContainer: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  suggestionsList: {
    backgroundColor: Color.background,
    borderRadius: 10,
    marginTop: 5,
    marginHorizontal: 10,
    maxHeight: 220,
    shadowColor: Color.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  separatorLine: {
    height: 1,
    backgroundColor: Color.lightGray,
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceContainer: {
    marginTop: 5,
  },
  originalPriceText: {
    textDecorationLine: 'line-through',
    color: Color.gray,
  },
});
