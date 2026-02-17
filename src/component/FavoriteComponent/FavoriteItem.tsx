import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Color } from '../../utiles/color'
import { StyleComponent } from '../../utiles/styles'
import AddBottom from '../AddBottom';
import BottomCardComponent from '../BottomCard';
import Heart from '../../assets/svg/Heart.svg';
import Heart_primary from '../../assets/svg/Heart_Primary.svg';
import { DeleteFavoriteProductModel, AddFavoriteProductModel } from '../../model/Favorite/Favorite';
import { refreshTokenModel } from '../../model/Auth/RefreshTokenModel';
import useAuthStore from '../../zustland/AuthStore';
import { useNavigation } from '@react-navigation/native';
import { useToast } from '../../utiles/Toast/ToastProvider';
import { addCardModel, deleteCardModel, updateCardModel } from '../../model/Card/CardModel';
import Card from '../../assets/svg/Cart.svg';
import LoadingModal from '../LoadingModal';
import {Language} from '../../utiles/Language/i18n';
interface ProductItem {
  id: number;
  title?: string;
  name?: string;
  country?: string;
  abv?: string | number;
  price?: string;
  regular_price?: string;
  sale_price?: string | null;
  cart_quantity?: number;
  is_favorite?: boolean;
  image_url?: string;
}


export default function FavoriteItem({favoriteProducts, onReload}: {favoriteProducts: ProductItem[]; onReload?: () => void}) {
// Memoized Product Card Component
const ProductCard = React.memo(({item}: {item: ProductItem}) => {
  const {token, refreshToken,setToken,setRefreshToken} = useAuthStore();
  const navigation: any = useNavigation();
  const [count, setCount] = useState<number>(item?.cart_quantity ?? 0);
  const [visible, setVisible] = useState<boolean>(false);
  const {show} = useToast();

  
    const {Styles} = StyleComponent();
    const [isFavorite, setIsFavorite] = useState<boolean>(Boolean(item?.is_favorite));
  
     const onHandlerItem = (item: ProductItem) => {
      if (isFavorite) {
        setIsFavorite(false);
        DeleteFavoriteProductModel(
          token,
          String(item.id),
           () => {
             onReload?.();
           },
          error => {
            console.log('error', error);
          },
          () => {
            refreshTokenModel(
              refreshToken,
              data => {
                DeleteFavoriteProductModel(
                  data.access,
                  String(item.id),
                   () => onReload?.(),
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
          String(item.id),
           () => {
            setIsFavorite(true);
             onReload?.();
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
                  String(item.id),
                   () => onReload?.(),
                   () => {},
                   () => {},
                );
              },
              () => {},
            );
          },
        );
      }


    }

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
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  




    return (
      <TouchableOpacity 
      onPress={() => navigation.navigate('CatalogScreen',{screen: 'CatalogDetail' ,params: {product: item, fromFavorite: true}})}
      style={[styles.mainContainer]}>
        <View style={styles.leftSection}>
          <Image source={{uri: item.image_url}} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text
              style={[Styles.subtitle_SemiBold, styles.productTitle]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.title ?? item.name ?? ''}
            </Text>

            <View style={styles.detailsContainer}>
              <Text style={[Styles.subtitle_Regular,{color:Color.black}]}>{item.country ?? ''}</Text>
              <View style={styles.separator} />
              <Text style={[Styles.subtitle_Regular,{color:Color.black}]}>{item.abv ? `${Language.abv} ${item.abv}` : ''}</Text>
            </View>
            <View style={styles.priceContainer}>
         
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

      
        </>
      )}

            
            </View>
          </View>
        </View>
         <TouchableOpacity 
         onPress={() => onHandlerItem?.(item)}
        style={styles.heartContainer}>
        {isFavorite ? (
          <Heart width={24} height={24} fill={Color.red} />
        ) : (
          <Heart width={24} height={24} fill={Color.white} />
        )}
        </TouchableOpacity>

              {count === 0 ? (
        <BottomCardComponent
          title={Language.product_detail_add_to_cart}
          onHandler={onSubmit}
          style={styles.addBottom}
          textStyle={[Styles.subtitle_Regular, {color:Color.white}]}
          icon={<Card />}
        />
      ) : (
        <AddBottom
          style={[styles.addBottom,{backgroundColor:Color.white}]}
          onQuantityChange={onClick}
          count={count}
        />
      )}
      <LoadingModal isVisible={visible} />
      </TouchableOpacity>
    );
  });
  return (  
  <View style={{width:'100%',backgroundColor:Color.white,padding:10}}>
 
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flatListContainer}
    >
      {(Array.isArray(favoriteProducts) ? favoriteProducts : []).map((raw, idx) => {
        const key = (raw?.id ?? (raw as any)?.slug ?? idx).toString();
        return <ProductCard key={key} item={raw} />;
      })}
    </ScrollView>
  
  </View>
)
}

const styles = StyleSheet.create({
    addBottom: {
    width: '90%',
    height:48,
    marginTop:'5%',
    backgroundColor:Color.primary,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    mainContainer: {
      width: '100%',
      alignSelf: 'center',
      marginTop: '5%',
      borderWidth: 1,
      borderColor: Color.lightGray,
      padding: 10,
      borderRadius: 10,
    },
    leftSection: {
      height: 100,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      flex: 1,
      minWidth: 0, // allow Text ellipsize before the absolute heart
    },
    productInfo: {
      height: 100,
      justifyContent: 'space-around',
      flex: 1,
      minWidth: 0,
      paddingRight: 48, // reserve space so title doesn't go under the heart icon
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
      right: 10,
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
      maxHeight: 150,
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
    originalPriceText: {
      textDecorationLine: 'line-through',
      color: Color.gray,
    },
    productTitle: {marginTop: '2%'},
    productImage: {width: 80, height: 100, borderRadius: 10},
  });
   