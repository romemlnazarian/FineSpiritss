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
}

interface ProductCardProps {
  item: ProductItem;
  cardStyle?: StyleProp<ViewStyle>;
  onPress?: (item: ProductItem) => void;
  onFavoriteToggled?: (id:string, isFavorite:boolean) => void;
}

const RecomendedComponent: React.FC<ProductCardProps> = ({
  item,
  cardStyle,
  onPress,
  onFavoriteToggled,
}) => {
  const {token, refreshToken} = useAuthStore();
  const {Styles} = StyleComponent();
  const [isFavorite, setIsFavorite] = useState(item?.is_favorite);
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
      <Text style={[Styles.body_Medium, {marginTop: '2%'}]} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={[Styles.subtitle_Regular, styles.productDescription]}>
        {item?.country} ABV {item?.abv}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={[Styles.body_SemiBold, styles.productPrice]}>
          {item.sale_price ?? item.price} zł
        </Text>
        {item.regular_price && (
          <Text style={[Styles.subtitle_Regular, styles.originalPriceText]}>
            {item.regular_price} zł
          </Text>
        )}
      </View>
      <BottomCardComponent
        title={'Add to Card'}
        onHandler={() => console.log()}
        style={styles.bottomCardButton}
        textStyle={Styles.subtitle_Regular}
        icon={<Card />}
      />
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
});