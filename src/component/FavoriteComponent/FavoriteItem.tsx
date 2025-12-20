import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Color } from '../../utiles/color'
import { StyleComponent } from '../../utiles/styles'
import Viski from '../../assets/svg/viski.svg';
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

interface ProductItem {
  id?: string;
  title?: string;
  name?: string;
  country?: string;
  abv?: string | number;
  price?: string;
  regular_price?: string;
  sale_price?: string;
  cart_quantity: number;
}


export default function FavoriteItem({favoriteProducts, onReload}: {favoriteProducts: ProductItem[]; onReload?: () => void}) {
// Memoized Product Card Component
const ProductCard = React.memo(({item}: {item: ProductItem}) => {
  const {token, refreshToken,setToken,setRefreshToken} = useAuthStore();
  const navigation: any = useNavigation();
  const [count, setCount] = useState<number>(item?.cart_quantity);
  const [visible, setVisible] = useState<boolean>(false);
  const {show} = useToast();

  
    const {Styles} = StyleComponent();
    const [isFavorite, setIsFavorite] = useState(item?.is_favorite);
  
     const onHandlerItem = (item: ProductItem) => {
      if (isFavorite) {
        setIsFavorite(false);
        DeleteFavoriteProductModel(
          token,
          item.id,
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
                  item.id,
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
          item.id,
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
                  item.id,
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
        <View style={[ styles.leftSection,{flexDirection:'row',alignItems:'center',gap:10}]}>
          <Image source={{uri: item.image_url}} style={{width:80,height:100,borderRadius:10}} />
          <View style={styles.productInfo}>
            <Text style={[Styles.body_Bold,{width:item.title?.length > 25 ? '50%' : '100%'}]} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
            <View style={styles.detailsContainer}>
              <Text style={[Styles.subtitle_Regular,{color:Color.gray}]}>{item.country ?? ''}</Text>
              <View style={styles.separator} />
              <Text style={[Styles.subtitle_Regular,{color:Color.gray}]}>{item.abv ? `ABV ${item.abv}` : ''}</Text>
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
          <Heart_primary width={24} height={24} />
        ) : (
          <Heart width={24} height={24} fill={Color.white} />
        )}
        </TouchableOpacity>

              {count === 0 ? (
        <BottomCardComponent
          title={'Add to Card'}
          onHandler={onSubmit}
          style={styles.addBottom}
          textStyle={Styles.subtitle_Regular}
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
    },
    productInfo: {
      height: 100,
      justifyContent: 'space-around',
      marginLeft: '5%',
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
  });
   