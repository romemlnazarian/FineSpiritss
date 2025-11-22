import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
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
import { useNavigation } from '@react-navigation/native';

interface ProductItem {
  id: string;
  title: string;
  country: string;
  alcoholContent: string;
  price: string;
  slug?: string;
}

// Memoized Product Card Component
const ProductCard = React.memo(({item}: {item: ProductItem}) => {
  console.log('item =>', item);
  const {Styles} = StyleComponent();
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('CatalogDetail', {
          product: item,
        });
      }}
      style={[Styles.justifyBetween, styles.mainContainer]}>
      <View style={[Styles.justifyCenter, styles.leftSection]}>
        <Viski width={50} height={100} />
        <View style={styles.productInfo}>
          <Text style={[Styles.h6_SemiBold]} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
          <View style={styles.detailsContainer}>
            <Text style={[Styles.subtitle_Regular,{color:Color.gray}]}>{item.country}</Text>
            <View style={styles.separator} />
            <Text style={[Styles.subtitle_Regular,{color:Color.gray}]}>{item.alcoholContent}</Text>
          </View>
          <Text style={[Styles.body_SemiBold]}>{item.price}</Text>
        </View>
      </View>
      <View style={styles.heartContainer}>
        <Heart fill={Color.white} />
      </View>
    </TouchableOpacity>
  );
});



export default function CatalogSearch() {
  const navigation: any = useNavigation();
  const {Styles} = StyleComponent();
  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] =
    useState<ProductItem[]>([]);
  const productData = useMemo(
    () => [
      {
        id: '1',
        title: 'Domaines ott etoile',
        country: 'Argentina',
        alcoholContent: '18.5% Alc By Vol',
        price: '$37.70',
        slug: 'domaines-ott-etoile',
      },
      {
        id: '2',
        title: 'Château Margaux',
        country: 'France',
        alcoholContent: '13.5% Alc By Vol',
        price: '$89.99',
        slug: 'chateau-margaux',
      },
      {
        id: '3',
        title: 'Opus One',
        country: 'USA',
        alcoholContent: '14.2% Alc By Vol',
        price: '$125.50',
        slug: 'opus-one',
      },
      {
        id: '4',
        title: 'Penfolds Grange',
        country: 'Australia',
        alcoholContent: '14.8% Alc By Vol',
        price: '$199.99',
        slug: 'penfolds-grange',
      },
    ],
    [],
  );
  const [displayedProductData, setDisplayedProductData] =
    useState<ProductItem[]>(productData);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const normalizeProducts = useCallback((data: any[]): ProductItem[] => {
    return (data ?? []).map((item: any, index: number) => ({
      id: String(item?.id ?? item?.slug ?? item?.sku ?? `${item?.title ?? 'item'}-${index}`),
      title: item?.title ?? item?.name ?? 'Untitled product',
      country: item?.country ?? item?.key_details?.country ?? '',
      alcoholContent: item?.abv ? `${item.abv}% Alc By Vol` : '',
      price:
        item?.regular_price ??
        item?.price ??
        item?.sale_price ??
        item?.display_price ??
        '',
      slug: item?.slug ?? item?.id ?? '',
    }));
  }, []);

  const normalizeHistoryItems = useCallback((data: any[]): ProductItem[] => {
    return (data ?? []).map((item: any, index: number) => ({
      id: String(item?.id ?? item?.slug ?? `${item?.title ?? 'history'}-${index}`),
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
        console.log('getSearchProductsModel payload =>', payload);
        setIsSearching(false);
        const raw = Array.isArray(payload?.results)
          ? payload.results
          : Array.isArray(payload)
          ? payload
          : [];
        const mapped = normalizeProducts(raw);
        setFilteredSuggestions(mapped);
        setDisplayedProductData(mapped);
      };

      const handleError = () => {
        setIsSearching(false);
      };

      getSearchProductsModel(
        token,
        query,
        handleSuccess,
        () =>
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
          // setDisplayedProductData(
          //   normalized.length > 0 ? normalized : productData,
          // );
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
                  // setDisplayedProductData(
                  //   normalized.length > 0 ? normalized : productData,
                  // );
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
      productData,
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
            setDisplayedProductData(productData);
          } else {
            fetchSearchHistory(text);
          }
        }
      }, 500);
    },
    [fetchSearchResults, fetchSearchHistory, productData],
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

  const getTextInputWidthStyle = useCallback((hasSuggestions: boolean): ViewStyle => {
    return { width : '80%' };
  }, []);

  return (
    <View style={[Styles.container]}>
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.arrowContainer} onPress={() => {
          navigation.goBack();
        }}>
        <Arrow width={30} height={30}/>
        </TouchableOpacity>
      <TextInput
        placeholder={'Search'}
        placeholderTextColor={Color.gray}
        style={[
          styles.textInputContainer,
          Styles.body_Regular,
          getTextInputWidthStyle(filteredSuggestions.length > 0 || isSearching),
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
            setDisplayedProductData(productData);
            DeleteSearchProductsHistoryModel(token, () => {
              console.log('DeleteSearchProductsHistoryModel success');
            }, (_error) => {
                refreshTokenModel(refreshToken, (newTokens) => {
                  setToken(newTokens.access);
                  setRefreshToken(newTokens.refresh);
                  DeleteSearchProductsHistoryModel(newTokens.access, () => {
                    console.log('DeleteSearchProductsHistoryModel success');
                  }, (_error) => {
                    console.log('DeleteSearchProductsHistoryModel error =>', _error);
                  });
                }, (_error) => {
                  console.log('DeleteSearchProductsHistoryModel error =>', _error);
                });
              });
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
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {
                setSearchTerm(item.title);
                setFilteredSuggestions([]);
                setDisplayedProductData(productData);
                fetchSearchResults(item.title);
              }}>
                <Text style={[styles.suggestionItem, Styles.body_Regular]}>{item.title}</Text>
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
        contentContainerStyle={styles.flatListContainer}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        windowSize={5}
        initialNumToRender={4}
        updateCellsBatchingPeriod={100}
        getItemLayout={(data, index) => ({
          length: 120, // Approximate height of each item
          offset: 120 * index,
          index,
        })}
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
    maxHeight: 320,
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
});
