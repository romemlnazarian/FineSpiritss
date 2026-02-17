import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Heart from '../../assets/svg/Heart.svg';
import Heart_primary from '../../assets/svg/Heart_Primary.svg';
import BottomCardComponent from '../BottomCard';
import Card from '../../assets/svg/Cart.svg';
import AddBottom from '../AddBottom';
import { AddFavoriteProductModel, DeleteFavoriteProductModel } from '../../model/Favorite/Favorite';
import { refreshTokenModel } from '../../model/Auth/RefreshTokenModel';
import useAuthStore from '../../zustland/AuthStore';
import { useToast } from '../../utiles/Toast/ToastProvider';
import LoadingModal from '../LoadingModal';
import { addCardModel, deleteCardModel, updateCardModel } from '../../model/Card/CardModel';
import {Language} from '../../utiles/Language/i18n';
interface ProductItem {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  discountPrice?: string;
  image?: string;
  is_favorite?: boolean;
  cart_quantity?:number
}
interface VerticalScrollProps {
  item: ProductItem[];
  onAddSelected?: (product: ProductItem, quantity: number) => void;
  onHandlerItem?: (product: ProductItem) => void;
  orderBottom?: boolean; // show 'View product' CTA instead of Add/Counter
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  isInitialLoading?: boolean;
}
// Individual Product Card Component
const ProductCard: React.FC<{
  item: ProductItem;
  onAddSelected?: (product: ProductItem, quantity: number) => void;
  onHandlerItem?: (product: ProductItem) => void;
  orderBottom?: boolean;
}> = ({item, onAddSelected, onHandlerItem, orderBottom}) => {
  const {Styles} = StyleComponent();
  const [isFavorite, setIsFavorite] = useState(item?.is_favorite);
  const [showCounter, setShowCounter] = useState(false);
  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
  const [count, setCount] = useState<number>(item?.cart_quantity);
  const [visible, setVisible] = useState<boolean>(false);
  const {show} = useToast();



  const toggleFavorite = useCallback(() => {
 if(isFavorite){
  setIsFavorite(false);
  DeleteFavoriteProductModel(token, item.id, () => {
  }, () => {
  }, () => {
    refreshTokenModel(refreshToken, (data) => {
      setToken(data.access);
      setRefreshToken(data.refresh);
      DeleteFavoriteProductModel(token, item.id, () => {
      }, () => {
      });
    });
  });
 }else{
  setIsFavorite(true);
     AddFavoriteProductModel(token, item.id, () => {
     }, () => {
     }, () => {
      refreshTokenModel(refreshToken, () => {
      });
     });  
    }  
  }, []);


  const onClick = (value: number, type: string) => {

    if (type === 'inc') {
      setVisible(true);
      updateCardModel(
        token,
        item.id,
        value,
        () => {
          setCount(value);
          setVisible(false);
        },
        (error: string) => {
          setVisible(false);
          show(error, {type: 'error'});
        },
        () => {
          refreshTokenModel(
            refreshToken,
            refreshedTokens => {
              setToken(refreshedTokens.access);
              setRefreshToken(refreshedTokens.refresh);
              updateCardModel(
                refreshedTokens.access,
                item.id,
                value,
                () => {
                  setCount(value);
                  setVisible(false);
                },
                (error: string) => {
                  setVisible(false);
                  show(error, {type: 'error'});
                },
                () => {
                  setVisible(false);
                },
              );
            },
            () => {
              setVisible(false);
            },
          );
        },
      );
    } else {
      setVisible(true);
      if(value < 1) {
        deleteCardModel(
          token,
          item.id,
          () => {
            setCount(value);
            setVisible(false);
          },
          (error: string) => {
            setVisible(false);
            show(error, {type: 'error'});
          },
          () => {
            refreshTokenModel(
              refreshToken,
              refreshedTokens => {
                setToken(refreshedTokens.access);
                setRefreshToken(refreshedTokens.refresh);
                deleteCardModel(
                  refreshedTokens.access,
                  item.id,
                  () => {
                    setCount(value);
                    setVisible(false);
                  },
                  (error: string) => {
                    setVisible(false);
                    show(error, {type: 'error'});
                  },
                  () => {
                    setVisible(false);
                  },
                );
              },
              () => {
                setVisible(false);
              },
            );
          },
        );
      }else{
      updateCardModel(
        token,
        item.id,
        value,
        () => {
          setCount(value);
          setVisible(false);
        },
        (error: string) => {
          setVisible(false);
          show(error, {type: 'error'});
        },
        () => {
          refreshTokenModel(
            refreshToken,
            refreshedTokens => {
              setToken(refreshedTokens.access);
              setRefreshToken(refreshedTokens.refresh);
              updateCardModel(
                refreshedTokens.access,
                item.id,
                value,
                () => {
                  setCount(value);
                  setVisible(false);
                },
                (error: string) => {
                  setVisible(false);
                  show(error, {type: 'error'});
                },
                () => {
                  setVisible(false);
                },
              );
            },
            () => {
              setVisible(false);
            },
          );
        },
      );
    }
    }
  };

  const onSubmit = () => {
    setVisible(true);
    addCardModel(
      token,
      item.id,
      () => {
        setCount(1);
        setVisible(false);
      },
      (error: string) => {
        setVisible(false);
        show(error, {type: 'error'});
      },
      () => {
        refreshTokenModel(
          refreshToken,
          refreshedTokens => {
            setToken(refreshedTokens.access);
            setRefreshToken(refreshedTokens.refresh);
            addCardModel(
              refreshedTokens.access,
              item.id,
              () => {
                setCount(1);
                setVisible(false);
              },
              (error: string) => {
                setVisible(false);
                show(error, {type: 'error'});
              },
              () => {
                setVisible(false);
              },
            );
          },
          () => {
            setVisible(false);
          },
        );
      },
    );
  };



  const handleAddToCartPress = useCallback(() => {
    setShowCounter(true);
    onAddSelected?.(item, 1);
  }, [item, onAddSelected]);

  return (
    <TouchableOpacity 
    activeOpacity={0.5}
      onPress={() => onHandlerItem?.(item)}
    style={[styles.productCardContainer, Styles.alignCenter,]}>
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        {isFavorite ? (
          <Heart width={24} height={24} fill={Color.red} />
        ) : (
          <Heart width={24} height={24} fill={Color.white} />
        )}
      </TouchableOpacity>
      <View style={Styles.justifyCenter}>
        {item?.image_url ? (
          <Image source={{uri: item?.image_url}} style={styles.productImage} />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </View>
      {/* <View style={styles.swiperContainer}>

        <Swiper
          style={styles.swiper}
          showsPagination={false}
          loop={false}
          removeClippedSubviews={true}
          autoplay={false}
          scrollEnabled={true}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          loadMinimal={true}
          loadMinimalSize={1}>
          <Image
            source={{uri: item.image_url}}
            style={styles.slide}
            resizeMode="contain"
          />
        </Swiper>
      </View> */}
      <View style={styles.productTitleContainer}>
      <Text style={[Styles.subtitle_SemiBold, styles.productTitle]} numberOfLines={1} ellipsizeMode="tail">
        {item.title}
      </Text>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:'2%'}}>
      <Text style={[Styles.subtitle_Regular, styles.productDescription,{width:'50%'}]} numberOfLines={1} ellipsizeMode="tail">
        {item?.country}
      </Text>
      <Text style={[Styles.subtitle_Regular, styles.productDescription]}>
        {Language.abv} {item?.abv}
      </Text>
      </View>
      {item?.sale_price === null ? (
        <Text
          style={[
            Styles.title_Bold,
            styles.productPrice,
            styles.priceContainer,
            // {marginTop: '17%'},
          ]}>
          {item.price} zł
        </Text>
      ) : (
       
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop: '2%'}}>
                 <Text
            style={[
              Styles.title_Bold,
              styles.productPrice,
              styles.priceContainer,
            ]}>
            {item.price} zł
          </Text>
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

 
        </View>
      )}
      </View>
      {count === 0 ? (
        <BottomCardComponent
          title={'Add to Cart'}
          onHandler={onSubmit}
          style={styles.bottomCardButton}
          textStyle={[Styles.subtitle_Regular, styles.bottomCardButtonText]}
          icon={<Card />}
        />
      ) : (
        <AddBottom
          style={styles.bottomCardButton}
          onQuantityChange={onClick}
          count={count}
        />
      )}
      <LoadingModal isVisible={visible} />
    </TouchableOpacity>
  );
};

// Main VerticalScroll Component
const CatalogList: React.FC<VerticalScrollProps> = ({
  item,
  onAddSelected,
  onHandlerItem,
  orderBottom,
  onLoadMore,
  isLoadingMore,
  isInitialLoading,
}) => {
  const showInitialLoader = isInitialLoading && (!item || item.length === 0);

  if (showInitialLoader) {
    return (
      <View style={[styles.categoryContainer, styles.initialLoader]}>
        <ActivityIndicator size="large" color={Color.primary} />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  const renderProductItem = ({item: product}: {item: ProductItem}) => (
    <ProductCard
      item={product}
      onAddSelected={onAddSelected}
      onHandlerItem={onHandlerItem}
      orderBottom={orderBottom}
    />
  );

  const keyExtractor = (product: ProductItem) => product.id;

  const listFooter = useMemo(() => {
    if (!isLoadingMore) {
      return null;
    }
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="large" color={Color.primary} style={{marginTop:'50%'}}/>
      </View>
    );
  }, [isLoadingMore]);

  const emptyComponent = useMemo(() => {
    if (isInitialLoading) {
      return null;
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.loadingText}>No products found.</Text>
      </View>
    );
  }, [isInitialLoading]);

  return (
    <View style={styles.categoryContainer}>
      <FlatList
        data={item}
        renderItem={renderProductItem}
          keyExtractor={keyExtractor}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        columnWrapperStyle={styles.rowWrapper}
        removeClippedSubviews={true}
        windowSize={10}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={listFooter}
        ListEmptyComponent={emptyComponent}
      />
    </View>
  );
};

export default CatalogList;
const styles = StyleSheet.create({
  productTitleContainer: {
    width: '100%',
    marginTop: '5%',
  },
  categoryContainer: {
    width: '93%',
    alignSelf: 'center',
    marginTop: '5%',
    paddingBottom: '15%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTitle: {
    color: Color.primary,
  },
  flatListContainer: {
    paddingBottom: 150,
  },
  footerContainer: {
    paddingTop: 16,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowWrapper: {
    justifyContent: 'space-between',
  },
  productCardContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: Color.cardgray,
    backgroundColor: Color.background,
    width: '48%',
    marginBottom: 0,
    borderRadius: 10,
    marginTop: 15,
  },
  favoriteButton: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  swiperContainer: {
    height: 120,
    marginBottom: 10,
  },
  swiper: {
    height: 120,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productDescription: {
    color: Color.gray,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
  },
  productPrice: {
    color: Color.black,
  },
  originalPriceText: {
    color: Color.gray,
    textDecorationLine: 'line-through',
    marginLeft: 10,
  },
  bottomCardButton: {
    marginTop: '10%',
    width: '100%',
    height: 50,
    color: Color.white,
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialLoader: {
    paddingVertical: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50%',
  },
  loadingText: {
    marginTop: 10,
    color: Color.gray,
  },
  productImage: {
    width: 100,
    height: 150,
    borderRadius: 12,
  },
  imagePlaceholder: {
    width: 100,
    height: 150,
    borderRadius: 12,
    backgroundColor: Color.lightGray,
  },
  productTitle: {marginTop: '2%'},
  bottomCardButtonText: {
    color: Color.white,
  },
});
