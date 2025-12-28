import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {StyleComponent} from '../utiles/styles';
import {Color} from '../utiles/color';
import Heart from '../assets/svg/Heart.svg';
import Heart_primary from '../assets/svg/Heart_Primary.svg';
import BottomCardComponent from './BottomCard';
// import {Language} from '../../utiles/Language/i18n'; // Removed as no longer used
import Card from '../assets/svg/Cart.svg';
import {
  AddFavoriteProductModel,
  DeleteFavoriteProductModel,
} from '../model/Favorite/Favorite';
import useAuthStore from '../zustland/AuthStore';
import {refreshTokenModel} from '../model/Auth/RefreshTokenModel';
import AddBottom from './AddBottom';
import LoadingModal from './LoadingModal';
import { useToast } from '../utiles/Toast/ToastProvider';
import { addCardModel, deleteCardModel, updateCardModel } from '../model/Card/CardModel';
interface ProductItem {
  id: string;
  title: string;
  description: string;
  price?: string;
  originalPrice?: string;
  image_url?: string;
  country?: string;
  regular_price?: string;
  sale_price?: string;
  abv?: string;
  is_favorite?: boolean;
  cart_quantity: number;
}

interface ProductCardProps {
  item: ProductItem;
  cardStyle?: StyleProp<ViewStyle>;
  onPress?: (item: ProductItem) => void;
  onFavoriteToggled?: (id:string, isFavorite:boolean) => void;
  onToggleClick?: (id:number) => void;
}

const RecomendedComponent: React.FC<ProductCardProps> = ({
  item,
  cardStyle,
  onPress,
  onFavoriteToggled,
  onToggleClick,
}) => {
  const {token, refreshToken,setToken,setRefreshToken} = useAuthStore();
  const {Styles} = StyleComponent();
  const [isFavorite, setIsFavorite] = useState(item?.is_favorite);
  const [count, setCount] = useState<number>(item?.cart_quantity);
  const [visible, setVisible] = useState<boolean>(false);
  const {show} = useToast();
  const toggleFavorite = (id:string) => {
    if (isFavorite) {
      setIsFavorite(false);
      DeleteFavoriteProductModel(
        token,
        id,
        () => {
          onFavoriteToggled?.(id,false);
        },
        error => {
          console.log('errorrrrrrrdelete', error);
        },
        () => {
          refreshTokenModel(
            refreshToken,
            data => {
              DeleteFavoriteProductModel(
                data.access,
                id,
                data => {     
                   onFavoriteToggled?.(id,false);

                  console.log('data', data);
                },
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
        id,
         () => {
          onFavoriteToggled?.(id,true);
        },
        error => {
          console.log('errorrrrrrradd', error);
        },
        () => {
          refreshTokenModel(
            refreshToken,
            data => {
              AddFavoriteProductModel(
                data.access,
                id,
                () => {
                  onFavoriteToggled?.(id,true);
                },
                () => {},
                () => {},
              );
            },
            () => {},
          );
        },
      );
    }
  };


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
          onToggleClick?.(item.id);
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
                  onToggleClick?.(item.id);
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
        onToggleClick?.(item.id);
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
                onToggleClick?.(item.id);
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
      style={[styles.productCardContainer, cardStyle]}
      activeOpacity={0.5}
      onPress={() => onPress?.(item)}>
      <TouchableOpacity 
      style={styles.favoriteButton} onPress={() => toggleFavorite(item.id)}>
        {isFavorite ? (
          <Heart_primary width={24} height={24} />
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
      <Text style={[Styles.subtitle_Regular, styles.productTitle]} numberOfLines={1} ellipsizeMode="tail">
        {item.title}
      </Text>
      <Text style={[Styles.subtitle_Regular, styles.productDescription,{marginTop:'2%'}]}>
        {item?.country} ABV {item?.abv}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={[Styles.title_Bold, styles.productPrice]}>
          {item.sale_price ?? item.price} zł
        </Text>
        {item.regular_price && (
          <Text style={[Styles.subtitle_Regular, styles.originalPriceText]}>
            {item.regular_price} zł
          </Text>
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

export default RecomendedComponent;

const styles = StyleSheet.create({
  productCardContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: Color.cardgray,
    backgroundColor: Color.white,
    borderRadius: 10,
    marginRight: 15,
    width: 240,
  },
  favoriteButton: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
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
  },
  productImage: {
    width: 100,
    height: 150,
    borderRadius: 12,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 12,
    backgroundColor: Color.lightGray,
  },
  productTitle: {marginTop: '2%'},
  bottomCardButtonText: {
    color: Color.white,
  },
});