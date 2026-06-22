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
import BottomCardComponent from './BottomCard';
import {Language} from '../utiles/Language/i18n';
import Card from '../assets/svg/Cart.svg';
import {
  AddFavoriteProductModel,
  DeleteFavoriteProductModel,
} from '../model/Favorite/Favorite';
import useAuthStore from '../zustland/AuthStore';
import {refreshTokenModel} from '../model/Auth/RefreshTokenModel';
import AddBottom from './AddBottom';
import { resolveProductImageUrl } from '../utiles/mediaUrl';
import {useDebouncedCartActions} from '../hooks/useDebouncedCartActions';
interface ProductItem {
  id: string;
  title: string;
  description: string;
  price?: string;
  originalPrice?: string;
  image_url?: string;
  country?: string;
  regular_price?: string;
  sale_price?: string | null;
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
  const {count, syncedCount, onSubmit, onQuantityChange} =
    useDebouncedCartActions({
      productId: item.id,
      initialCount: item?.cart_quantity ?? 0,
      onSynced: quantity => {
        if (quantity > 0) {
          onToggleClick?.(item.id);
        }
      },
    });
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


  const hasSalePrice =
    item.sale_price !== null && item.sale_price !== undefined;
  const productImageUri = resolveProductImageUrl(item);

  return (
    <TouchableOpacity
      style={[styles.productCardContainer, cardStyle]}
      activeOpacity={0.5}
      onPress={() => onPress?.(item)}>
      <TouchableOpacity 
      style={styles.favoriteButton} onPress={() => toggleFavorite(item.id)}>
        {isFavorite ? (
          <Heart width={24} height={24} fill={Color.red} />
        ) : (
          <Heart width={24} height={24} fill={Color.white} />
        )}
      </TouchableOpacity>
      <View style={Styles.justifyCenter}>
        {productImageUri ? (
          <Image source={{uri: productImageUri}} style={styles.productImage} />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </View>
      <Text style={[Styles.subtitle_SemiBold, styles.productTitle]} numberOfLines={1} ellipsizeMode="tail">
        {item.title}
      </Text>
      <Text style={[Styles.subtitle_Regular, styles.productDescription,{marginTop:'2%'}]}>
        {item?.country} {Language.abv} {item?.abv}
      </Text>
      <View style={styles.priceSection}>
        <Text
          style={[
            Styles.subtitle_Regular,
            styles.originalPriceText,
            !hasSalePrice && styles.hiddenPriceLine,
          ]}
          numberOfLines={1}>
          {hasSalePrice ? `${item.price} zł` : ' '}
        </Text>
        <Text
          style={[Styles.title_Bold, styles.productPrice]}
          numberOfLines={1}>
          {hasSalePrice ? `${item.sale_price} zł` : `${item.price} zł`}
        </Text>
      </View>
      {syncedCount === 0 ? (
        <BottomCardComponent
          title={
            count > 0
              ? `${Language.product_detail_add_to_cart} (${count})`
              : Language.product_detail_add_to_cart
          }
          onHandler={onSubmit}
          style={styles.bottomCardButton}
          textStyle={[Styles.subtitle_Regular, styles.bottomCardButtonText]}
          icon={<Card />}
        />
      ) : (
        <AddBottom
          style={styles.bottomCardButton}
          onQuantityChange={onQuantityChange}
          count={count}
        />
      )}
    </TouchableOpacity>
  );
};

export default RecomendedComponent;

const styles = StyleSheet.create({
  productCardContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: Color.cardgray,
    backgroundColor: Color.background,
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
  priceSection: {
    minHeight: 44,
    marginTop: '2%',
    justifyContent: 'flex-end',
  },
  hiddenPriceLine: {
    opacity: 0,
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
  productTitle: {marginTop: '2%'},
  bottomCardButtonText: {
    color: Color.white,
  },
});