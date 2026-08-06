import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../../utiles/color';
import {StyleComponent} from '../../utiles/styles';
import {Language} from '../../utiles/Language/i18n';
import AddBottom from '../AddBottom';
import Trash from '../../assets/svg/Trash.svg';
import {resolveProductImageUrl} from '../../utiles/mediaUrl';
import {useDebouncedCartActions} from '../../hooks/useDebouncedCartActions';

interface ProductItem {
  id: number;
  title: string;
  country: string;
  abv?: string;
  alcoholContent: string;
  price: string;
  image_url: string;
  sale_price?: string | null;
  regular_price?: string;
  quantity: number;
  slug?: string;
  stock_status?: string;
}

interface ProductCardInCartProps {
  item: ProductItem;
  onSynced?: () => void;
}

const ProductCardInCart: React.FC<ProductCardInCartProps> = ({
  item,
  onSynced,
}) => {
  const navigation: any = useNavigation();
  const {Styles} = StyleComponent();
  const {count, onQuantityChange, removeImmediately} = useDebouncedCartActions({
    productId: item.id,
    initialCount: item.quantity ?? 0,
    onSynced: () => onSynced?.(),
  });
  const hasSalePrice =
    item.sale_price !== null && item.sale_price !== undefined;
  const isOutOfStock =
    (item.stock_status ?? '').toLowerCase().replace(/\s/g, '') === 'outofstock';

  const openDetail = () => {
    navigation.navigate('CatalogScreen', {
      screen: 'CatalogDetail',
      params: {
        product: item,
        quantity: item.quantity,
        fromCart: true,
      },
    });
  };

  return (
    <>
      <View style={[Styles.justifyBetween, styles.mainContainer]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={openDetail}
          style={[Styles.justifyCenter, styles.leftSection]}>
          <Image
            source={{uri: resolveProductImageUrl(item)}}
            style={styles.productImage}
          />
          <View style={styles.productInfo}>
            <Text
              style={[
                Styles.title_SemiBold,
                styles.productTitle,
                styles.productTitleWidth,
                {fontSize: 22},
              ]}
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
                {item.abv ? `${Language.abv} ${item.abv}` : ''}
              </Text>
            </View>
            <View style={styles.priceSection}>
              <Text
                style={[
                  Styles.subtitle_Regular,
                  styles.originalPriceText,
                  !hasSalePrice && styles.hiddenPriceLine,
                  {fontSize: 16},
                ]}
                numberOfLines={1}>
                {hasSalePrice ? `${item.price} zł` : ' '}
              </Text>
              <Text
                style={[Styles.title_Bold, styles.productPrice, {fontSize: 20}]}
                numberOfLines={1}>
                {hasSalePrice ? `${item.sale_price} zł` : `${item.price} zł`}
              </Text>
              {isOutOfStock ? (
                <Text
                  style={[Styles.subtitle_Regular, styles.outOfStockText]}
                  numberOfLines={1}>
                  {Language.cart_out_of_stock}
                </Text>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
        <AddBottom
          compact
          style={styles.addBottom}
          onQuantityChange={onQuantityChange}
          count={count}
        />
        <TouchableOpacity
          style={styles.heartContainer}
          onPress={removeImmediately}>
          <Trash width={24} height={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />
    </>
  );
};

const styles = StyleSheet.create({
  addBottom: {
    width: 112,
    height: 36,
    alignSelf: 'center',
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
  mainContainer: {
    width: '100%',
    alignSelf: 'center',
    marginTop: '5%',
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  leftSection: {
    minHeight: 110,
    flex: 1,
    minWidth: 0,
    paddingRight: 40,
  },
  productInfo: {
    minHeight: 110,
    justifyContent: 'space-between',
    marginLeft: '5%',
    flex: 1,
    minWidth: 0,
    paddingVertical: 2,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 6,
    marginBottom: 20,
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
  },
  blackText: {
    color: Color.black,
  },
  priceSection: {
    flex: 1,
    justifyContent: 'center',
  },
  hiddenPriceLine: {
    opacity: 0,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  originalPriceText: {
    textDecorationLine: 'line-through',
    color: Color.gray,
  },
  outOfStockText: {
    color: Color.red,
    fontSize: 13,
    marginTop: 2,
  },
  productTitle: {
    flexShrink: 1,
    maxWidth: '100%',
  },
  productTitleWidth: {
    width: '100%',
    paddingRight: 8,
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: Color.lightGray,
    alignSelf: 'center',
    marginTop: '5%',
  },
});

export default ProductCardInCart;
