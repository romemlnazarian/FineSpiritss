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
import {Language} from '../../utiles/Language/i18n';
import {resolveProductImageUrl} from '../../utiles/mediaUrl';
import {useDebouncedCartActions} from '../../hooks/useDebouncedCartActions';

interface ProductItem {
  id: number;
  title: string;
  description: string;
  price?: string;
  originalPrice?: string;
  image_url?: string;
  cat_image?: string;
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
}

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  cardStyle,
  onPress,
}) => {
  const {token, setToken, refreshToken, setRefreshToken} = useAuthStore();
  const {Styles} = StyleComponent();
  const [isFavorite, setIsFavorite] = useState(item?.is_favorite);
  const {count, syncedCount, onSubmit, onQuantityChange} =
    useDebouncedCartActions({
      productId: item.id,
      initialCount: item?.cart_quantity ?? 0,
    });

  const toggleFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
      DeleteFavoriteProductModel(
        token,
        item.id,
        () => {},
        () => {},
        () => {
          refreshTokenModel(
            refreshToken,
            data => {
              DeleteFavoriteProductModel(
                data.access,
                item.id,
                () => {},
                (error: string) => {},
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
        (error: string) => {},
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

  const hasSalePrice = item.sale_price !== null && item.sale_price !== undefined;
  const productImageUri = resolveProductImageUrl(item);

  return (
    <TouchableOpacity
      style={[styles.productCardContainer, cardStyle]}
      activeOpacity={0.5}
      onPress={() => onPress?.(item)}>
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        {isFavorite ? (
          <Heart width={24} height={24} fill={Color.red} />
        ) : (
          <Heart width={24} height={24} fill={Color.white} />
        )}
      </TouchableOpacity>
      <View style={Styles.justifyCenter}>
        {productImageUri ? (
          <Image
            source={{uri: productImageUri}}
            style={styles.productImage}
            resizeMethod="resize"
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </View>
      <Text
        style={[Styles.subtitle_SemiBold, styles.productTitle]}
        numberOfLines={1}
        ellipsizeMode="tail">
        {item.title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '2%',
        }}>
        <Text
          style={[
            Styles.subtitle_Regular,
            styles.productDescription,
            {width: '50%'},
          ]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item?.country}
        </Text>
        <Text style={[Styles.subtitle_Regular, styles.productDescription]}>
          {Language.abv} {item?.abv}
        </Text>
      </View>
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

      <View style={styles.footerSection}>
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
      </View>
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
    backgroundColor: Color.background,
    borderRadius: 10,
    marginRight: 15,
    width: 240,
    height: 340,
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
  footerSection: {
    marginTop: 'auto',
    width: '100%',
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
    width: 100,
    height: 150,
    borderRadius: 12,
    backgroundColor: Color.lightGray,
  },
  bottomCardButtonText: {
    color: Color.white,
  },
});
