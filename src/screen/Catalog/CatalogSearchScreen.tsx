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
  useWindowDimensions,
  Platform,
} from 'react-native';
import React, {useState, useCallback, useRef, useEffect, useMemo} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Heart from '../../assets/svg/Heart.svg';
import Arrow from '../../assets/svg/Arrows.svg';
import useAuthStore from '../../zustland/AuthStore';
import {
  DeleteSearchProductsHistoryModel,
  getSearchProductsHistoryModel,
  getSearchProductsModel,
  getSearchProductsSuggestionsModel,
} from '../../model/Catalog/Catalog';
import {refreshTokenModel} from '../../model/Auth/RefreshTokenModel';
import {useNavigation} from '@react-navigation/native';
import {
  AddFavoriteProductModel,
  DeleteFavoriteProductModel,
} from '../../model/Favorite/Favorite';
import useRecommendedStore from '../../zustland/recommendedStore';
import {Language} from '../../utiles/Language/i18n';
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
        <Image
          source={{uri: item?.image_url}}
          style={styles.productImage}
          resizeMode="contain"
        />
        <View style={styles.productInfo}>
          <Text
            style={[Styles.subtitle_SemiBold, styles.productTitle]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.title}
          </Text>
          <View style={[styles.detailsContainer, styles.detailsContainerSpacing]}>
            <Text style={[Styles.subtitle_Regular, {color: Color.black}]}>
              {item.country}
            </Text>
            <View style={styles.separator} />
            <Text style={[Styles.subtitle_Regular, {color: Color.black}]}>
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
          <Heart width={24} height={24} fill={Color.red} />
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
  const {height: windowHeight} = useWindowDimensions();
  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
  const {recommended} = useRecommendedStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistoryItems, setSearchHistoryItems] = useState<ProductItem[]>(
    [],
  );
  const [searchSuggestionsItems, setSearchSuggestionsItems] = useState<
    ProductItem[]
  >([]);

  const [displayedProductData, setDisplayedProductData] = useState<
    ProductItem[]
  >([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trimmedSearchTerm = searchTerm.trim();
  const isTyping = trimmedSearchTerm.length > 0;
  const isQueryLongEnough = trimmedSearchTerm.length >= 3;

  const normalizeProducts = useCallback((data: any[]): ProductItem[] => {
    return (data ?? []).map((item: any, index: number) => ({
      id: String(
        item?.id ??
          item?.slug ??
          item?.sku ??
          `${item?.title ?? 'item'}-${index}`,
      ),
      title: item?.title ?? item?.name ?? Language.catalog_search_untitled_product,
      country: item?.country ?? item?.key_details?.country ?? '',
      alcoholContent: item?.abv ? `${item.abv}% ${Language.abv_alc_by_vol}` : '',
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

  const normalizeSuggestionItems = useCallback((data: any[]): ProductItem[] => {
    return (data ?? []).map((item: any, index: number) => ({
      id: String(item?.id ?? item?.slug ?? `${item?.title ?? 'suggest'}-${index}`),
      title:
        item?.title ??
        item?.query ??
        item?.name ??
        item?.text ??
        item?.label ??
        'Untitled',
      country: item?.country ?? '',
      alcoholContent: '',
      price: '',
      slug: item?.slug ?? item?.id ?? '',
    }));
  }, []);

  const fetchSearchSuggestions = useCallback(
    (query: string) => {
      const q = (query ?? '').trim();
      if (!q) {
        setSearchSuggestionsItems([]);
        return;
      }
      console.log('fetchSearchSuggestions q =>', q);
      const handleSuccess = (payload: any) => {
        console.log('fetchSearchSuggestions payload =>', payload.suggestions);
        const raw = Array.isArray(payload?.suggestions)
          ? payload.suggestions
          : Array.isArray(payload?.results)
          ? payload.results
          : Array.isArray(payload?.data?.suggestions)
          ? payload.data.suggestions
          : Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload)
          ? payload
          : [];
        setSearchSuggestionsItems(normalizeSuggestionItems(raw));
      };

      const handleError = () => {
        // keep UI stable; just clear suggestions
        setSearchSuggestionsItems([]);
      };

      getSearchProductsSuggestionsModel(token, q, handleSuccess, () =>
        refreshTokenModel(
          refreshToken,
          newTokens => {
            setToken(newTokens.access);
            setRefreshToken(newTokens.refresh);
            console.log('getSearchProductsSuggestionsModel newTokens =>', newTokens);
            getSearchProductsSuggestionsModel(
              newTokens.access,
              q,
              handleSuccess,
              handleError,
            );
          },
          handleError,
        ),
      );
    },
    [
      token,
      refreshToken,
      setToken,
      setRefreshToken,
      normalizeSuggestionItems,
    ],
  );

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
        // console.log('getSearchProductsModel payload =>', mapped);
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
          setSearchHistoryItems(normalized);
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
                  setSearchHistoryItems(normalized);
                },
                err => console.log('history error =>', err),
              );
            },
            err => console.log('history refresh error =>', err),
          ),
      );
    },
    [token, refreshToken, setToken, setRefreshToken, normalizeHistoryItems],
  );

  const handleSearch = useCallback(
    (text: string) => {
      setSearchTerm(text);
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        const q = text.trim();
        if (q.length >= 3) {
          fetchSearchResults(q);
          fetchSearchSuggestions(q);
        } else {
          if (q.length === 0) {
            // show popular again + refresh search history immediately (even without blur/focus)
            fetchSearchHistory('');
            setSearchSuggestionsItems([]);
            setDisplayedProductData(normalizeProducts(recommended as any[]));
          } else {
            // while typing but query is too short, show suggestions (not history/popular)
            fetchSearchSuggestions(q);
            setDisplayedProductData([]);
          }
        }
      }, 500);
    },
    [
      fetchSearchResults,
      fetchSearchHistory,
      fetchSearchSuggestions,
      recommended,
      normalizeProducts,
    ],
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

  const getTextInputWidthStyle = useCallback((): ViewStyle => {
    return {width: '80%'};
  }, []);

  const historyListMaxHeightStyle = useMemo(() => {
    // Only Search History should scroll (Popular stays in place).
    // Clamp height to keep popular visible on smaller screens.
    const maxHeight = Math.min(300, Math.max(170, Math.round(windowHeight * 0.18)));
    return {maxHeight};
  }, [windowHeight]);

  const popularContentContainerStyle = useMemo(() => {
    return [
      styles.flatListContainer,
      {paddingBottom: (insets?.bottom ?? 0) + 60},
    ];
  }, [insets?.bottom]);

  const searchResultsContentContainerStyle = useMemo(() => {
    return [
      styles.flatListContainer,
      {paddingBottom: (insets?.bottom ?? 0) + 60},
    ];
  }, [insets?.bottom]);

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
          placeholder={Language.Search}
          placeholderTextColor={Color.gray}
          style={[
            styles.textInputContainer,
            Styles.body_Regular,
            getTextInputWidthStyle(),
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
      <View style={styles.body}>
        {!isTyping && (
          <View style={styles.idleContainer}>
            {searchHistoryItems.length > 0 && (
              <View style={styles.searchHistoryContainer}>
                <View style={styles.searchHistoryHeaderRow}>
                  <Text style={[Styles.h6_Bold, styles.searchHistoryTitle]}>
                    {Language.catalog_search_history}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      setSearchTerm('');
                      setSearchHistoryItems([]);
                      setSearchSuggestionsItems([]);
                      setDisplayedProductData(
                        normalizeProducts(recommended as any[]),
                      );
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
                                  console.log(
                                    'DeleteSearchProductsHistoryModel success',
                                  );
                                },
                                err2 => {
                                  console.log(
                                    'DeleteSearchProductsHistoryModel error =>',
                                    err2,
                                  );
                                },
                              );
                            },
                            err => {
                              console.log(
                                'DeleteSearchProductsHistoryModel error =>',
                                err,
                              );
                            },
                          );
                        },
                      );
                    }}>
                    <Text style={[Styles.h6_Regular, styles.cleanButtonText]}>
                      {Language.catalog_search_clean}
                    </Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={searchHistoryItems}
                  scrollEnabled={true}
                  nestedScrollEnabled={true}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={true}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => {
                        setSearchTerm(item.title);
                        setSearchSuggestionsItems([]);
                        setDisplayedProductData([]);
                        fetchSearchResults(item.title);
                        fetchSearchSuggestions(item.title);
                      }}>
                      <Text
                        style={[
                          styles.suggestionItem,
                          Styles.body_Regular,
                          styles.suggestionText,
                        ]}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.id}
                  style={[
                    styles.suggestionsList,
                    styles.historyListContainer,
                    historyListMaxHeightStyle,
                  ]}
                />
              </View>
            )}

            <Text style={[Styles.h6_Bold, styles.popularTitle]}>
              {Language.catalog_search_popular_products}
            </Text>

            <FlatList
              data={displayedProductData}
              renderItem={renderProductItem}
              keyExtractor={keyExtractor}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={popularContentContainerStyle}
              style={styles.popularList}
              initialNumToRender={8}
              windowSize={10}
              maxToRenderPerBatch={8}
              updateCellsBatchingPeriod={50}
              scrollEventThrottle={16}
              decelerationRate="fast"
            />
          </View>
        )}

        {isTyping && (
          <View style={styles.suggestionsContainer}>
            {searchSuggestionsItems.length > 0 && (
              <>
                {/* <Text style={[Styles.h6_Bold, styles.searchHistoryTitle,{marginLeft: '5%'}]}>
                  Suggestions
                </Text> */}
                <FlatList
                  data={searchSuggestionsItems}
                  scrollEnabled={true}
                  nestedScrollEnabled={true}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={true}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => {
                        setSearchTerm(item.title);
                        setDisplayedProductData([]);
                        fetchSearchResults(item.title);
                        fetchSearchSuggestions(item.title);
                      }}>
                      <Text
                        style={[
                          styles.suggestionItem,
                          Styles.body_Regular,
                          styles.suggestionText,
                        ]}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.id}
                  style={[
                    styles.suggestionsList,
                    styles.historyListContainer,
                    historyListMaxHeightStyle,
                  ]}
                />
              </>
            )}
          </View>
        )}

        {isQueryLongEnough && (
          <FlatList
            data={displayedProductData}
            renderItem={renderProductItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={searchResultsContentContainerStyle}
            initialNumToRender={8}
            windowSize={10}
            maxToRenderPerBatch={8}
            updateCellsBatchingPeriod={50}
            scrollEventThrottle={16}
            decelerationRate="fast"
          />
        )}
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
    marginTop: Platform.OS === 'ios' ? '10%' : '5%',
  },
  cleanButton: {
    position: 'absolute',
    right: 10,
    top: 70,
    zIndex: 100,
  },
  cleanButtonText: {
    color: Color.primary,
    // marginTop: 30,
  },
  searchLoader: {
    marginTop: 10,
    // marginRight: '5%',
    position: 'absolute',
    right: 20,
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
  detailsContainerSpacing: {
    marginTop: 6,
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
  suggestionText: {
    width: '80%',
  },
  footerSpacer: {
    height: 20,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productTitle: {
    width: '80%',
  },
  suggestionsList: {
    backgroundColor: Color.background,
    borderRadius: 10,
    marginTop: 5,
    marginHorizontal: 10,
    shadowColor: Color.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchHistoryHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  searchHistoryTitle: {
    marginTop: 10,
  },
  popularTitle: {
    marginLeft: '5%',
    marginTop: 10,
    marginBottom: 10,
  },
  separatorLine: {
    height: 1,
    backgroundColor: Color.lightGray,
    marginVertical: 10,
  },
  body: {
    flex: 1,
  },
  idleContainer: {
    flex: 1,
  },
  searchHistoryContainer: {
    flexShrink: 0,
  },
  suggestionsContainer: {
    flexShrink: 0,
  },
  historyListContainer: {
    flexGrow: 0,
  },
  popularList: {
    flex: 1,
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
