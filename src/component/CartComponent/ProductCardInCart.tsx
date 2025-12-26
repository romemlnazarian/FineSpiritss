import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Color} from '../../utiles/color';
import {StyleComponent} from '../../utiles/styles';
import Trash from '../../assets/svg/Trash.svg';
import AddBottom from '../AddBottom';
interface ProductItem {
  id: number;
  title: string;
  country: string;
  alcoholContent: string;
  price: string;
  image_url: string;
  sale_price?: string;
  regular_price?: string;
  quantity: number;
}

interface ProductCardInCartProps {
  item: ProductItem;
  onQuantityChange: (id: number, newQuantity: number, type: string) => void;
  onRemove: (id: number) => void;
}

const ProductCardInCart: React.FC<ProductCardInCartProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  const {Styles} = StyleComponent();

  const handleQuantityChange = (newQuantity: number,type:string) => {
    onQuantityChange(item.id, newQuantity, type);
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <View style={[Styles.justifyBetween, styles.mainContainer]}>
      <View style={[Styles.justifyCenter, styles.leftSection]}>
        <Image source={{uri: item?.image_url}} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text
            style={[Styles.h6_SemiBold, styles.productTitle]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.title}
          </Text>
          <View style={styles.detailsContainer}>
            <Text style={[Styles.subtitle_Regular, styles.blackText]}>
              {item.country}
            </Text>
            <View style={styles.separator} />
            <Text style={[Styles.subtitle_Regular, styles.blackText]}>
              {item.alcoholContent}
            </Text>
          </View>
          {item?.sale_price === null ? (
            <Text style={[Styles.title_Bold, styles.productPrice]}>
              {item.price} zł
            </Text>
          ) : (
            <>
              {item.regular_price && (
                <Text
                  style={[Styles.subtitle_Regular, styles.originalPriceText]}>
                  {item.regular_price} zł
                </Text>
              )}
              <Text style={[Styles.title_Bold, styles.productPrice]}>
                {item.price} zł
              </Text>
            </>
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.heartContainer} onPress={handleRemove}>
        <Trash />
      </TouchableOpacity>
      <AddBottom
        style={styles.addBottom}
        onQuantityChange={(value, type) => handleQuantityChange(value, type)}
        count={item.quantity}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addBottom: {
    width: 119,
    height: 42,
    position: 'absolute',
    right: 0,
    bottom: 10,
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
    flex: 1,
    minWidth: 0,
  },
  productInfo: {
    height: 100,
    justifyContent: 'space-around',
    marginLeft: '5%',
    flex: 1,
    minWidth: 0,
    // reserve space for absolute controls on the right (trash + counter)
    paddingRight: 140,
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
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Color.lightGray,
  },

  blackText: {
    color: Color.black,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  originalPriceText: {
    textDecorationLine: 'line-through',
    color: Color.gray,
  },
  productTitle: {
    flexShrink: 1,
  },
  productTitleLong: {width: '70%'},
  productTitleShort: {width: '100%'},
});

export default ProductCardInCart;
