import {View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, Image} from 'react-native';
import React, {useState} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Heart from '../../assets/svg/Heart.svg';
import Heart_primary from '../../assets/svg/Heart_Primary.svg';
import BottomCardComponent from '../BottomCard';
// import {Language} from '../../utiles/Language/i18n'; // Removed as no longer used
import Card from '../../assets/svg/Cart.svg';

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
}

interface ProductCardProps {
  item: ProductItem;
  cardStyle?: StyleProp<ViewStyle>;
  onPress?: (item: ProductItem) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({item, cardStyle, onPress}) => {
  const {Styles} = StyleComponent();
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };


  return (
    <TouchableOpacity
      style={[styles.productCardContainer, cardStyle]}
      activeOpacity={0.5}
      onPress={() => onPress?.(item)}>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={toggleFavorite}>
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
      <Text style={[Styles.body_Medium,{marginTop:'2%'}]} numberOfLines={1}>{item.title}</Text>
      <Text style={[Styles.subtitle_Regular, styles.productDescription]}>
        {item?.country} ABV {item?.abv}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={[Styles.body_SemiBold, styles.productPrice]}>
          {item.price ?? item.regular_price ?? ''} zł
        </Text>
        {item.sale_price && (
          <Text style={[Styles.subtitle_Regular, styles.originalPriceText]}>
            {item.sale_price} zł
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

export default ProductCard;

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
