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
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Heart from '../../assets/svg/Heart.svg';
import Heart_primary from '../../assets/svg/Heart_Primary.svg';
import BottomCardComponent from '../BottomCard';
import Card from '../../assets/svg/Cart.svg';
import {
  AddFavoriteProductModel,
  DeleteFavoriteProductModel,
} from '../../model/Favorite/Favorite';
import useAuthStore from '../../zustland/AuthStore';
import {refreshTokenModel} from '../../model/Auth/RefreshTokenModel';
import AddBottom from '../AddBottom';
import LoadingModal from '../LoadingModal';
import {addCardModel, deleteCardModel, updateCardModel} from '../../model/Card/CardModel';
import {useToast} from '../../utiles/Toast/ToastProvider';

interface ProductItem {
  id: number;
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
}

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  cardStyle,
  onPress,
}) => {
  const {token, setToken, refreshToken, setRefreshToken} = useAuthStore();
  const {Styles} = StyleComponent();
  const [isFavorite, setIsFavorite] = useState(item?.is_favorite);
  const [count, setCount] = useState<number>(item?.cart_quantity);
  const [visible, setVisible] = useState<boolean>(false);
  const {show} = useToast();

  // console.log('=====>',item)

  const toggleFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
      DeleteFavoriteProductModel(
        token,
        item.id,
        () => {},
        () => {
        },
        () => {
          refreshTokenModel(
            refreshToken,
            data => {
              DeleteFavoriteProductModel(
                data.access,
                item.id,
                () => {},
                (error: string) => {
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
        },
        (error: string) => {
        },
        () => {
          refreshTokenModel(
            refreshToken,
            data => {
              AddFavoriteProductModel(
                data.access,
                item.id,
                () => {},
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

  return (
    <TouchableOpacity
      style={[styles.productCardContainer, cardStyle]}
      activeOpacity={0.5}
      onPress={() => onPress?.(item)}>
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
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
      <Text style={[Styles.body_Medium, styles.productTitle]} numberOfLines={1}>
        {item.title}
      </Text>
      <View style={styles.productInfoContainer}>
        <Text
          style={[
            Styles.subtitle_Regular,
            styles.productDescription,
            styles.productCountryWidth,
          ]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item?.country}
        </Text>
        <Text style={[Styles.subtitle_Regular, styles.productDescription]}>
          ABV {item?.abv}
        </Text>
      </View>
      {item.sale_price === null ? (
        <Text
          style={[
            Styles.title_Bold,
            styles.productPrice,
            styles.priceContainer,
            styles.singlePriceTopMargin,
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
      {count === 0 ? (
        <BottomCardComponent
          title={'Add to Cart'}
          onHandler={onSubmit}
          style={styles.bottomCardButton}
          textStyle={Styles.subtitle_Regular}
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

export default ProductCard;

const styles = StyleSheet.create({
  productTitle: {marginTop: '2%'},
  productInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '2%',
  },
  productCountryWidth: {width: '50%'},
  singlePriceTopMargin: {marginTop: '17%'},
  productCardContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
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
    marginTop: '2%',
  },
  productPrice: {
    color: Color.black,
  },
  originalPriceText: {
    color: Color.gray,
    textDecorationLine: 'line-through',
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
});
