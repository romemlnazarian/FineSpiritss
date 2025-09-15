import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useCallback, useState} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Viski from '../../assets/svg/viski.svg'; // Assuming Viski is the SVG for product image
import Heart from '../../assets/svg/Heart.svg';
import Heart_primary from '../../assets/svg/Heart_Primary.svg';
import BottomCardComponent from '../BottomCard';
// import {Language} from '../../utiles/Language/i18n'; // Removed as no longer used
import Card from '../../assets/svg/Cart.svg';
import Swiper from 'react-native-swiper';
import AddBottom from '../AddBottom';

interface ProductItem {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  discountPrice?: string;
  image?: string;
}
interface VerticalScrollProps {
  item: ProductItem[];
  onAddSelected?: (product: ProductItem, quantity: number) => void;
  onHandlerItem?: (product: ProductItem) => void;
}
// Individual Product Card Component
const ProductCard: React.FC<{
  item: ProductItem;
  onAddSelected?: (product: ProductItem, quantity: number) => void;
  onHandlerItem?: (product: ProductItem) => void;
}> = ({item, onAddSelected,onHandlerItem}) => {
  const {Styles} = StyleComponent();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showCounter, setShowCounter] = useState(false);

  const toggleFavorite = useCallback(() => {
    setIsFavorite(prev => !prev);
  }, []);

  const handleAddToCartPress = useCallback(() => {
    setShowCounter(true);
    onAddSelected?.(item, 1);
  }, [item, onAddSelected]);

  return (
    <View style={[styles.productCardContainer, Styles.alignCenter]}>
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        {isFavorite ? (
          <Heart_primary width={24} height={24} />
        ) : (
          <Heart width={24} height={24} fill={Color.white} />
        )}
      </TouchableOpacity>

      <View style={styles.swiperContainer}>
        <Swiper
          style={styles.swiper}
          showsPagination={false}
          loop={false}
          removeClippedSubviews={true}
          autoplay={false}
          scrollEnabled={true}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          loadMinimal={true}
          loadMinimalSize={1}>
          <TouchableOpacity style={styles.slide} activeOpacity={0.7} onPress={() => onHandlerItem?.(item)}>
            <Viski width={120} height={120} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.slide} activeOpacity={0.7} onPress={() => onHandlerItem?.(item)}>
            <Viski width={120} height={120} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.slide} activeOpacity={0.7} onPress={() => onHandlerItem?.(item)}>
            <Viski width={120} height={120} />
          </TouchableOpacity>
        </Swiper>
      </View>
      <View style={styles.productTitleContainer}>
        <Text style={[Styles.body_Medium]}>
          {item.title}
        </Text>
        <Text style={[Styles.title_Regular, styles.productDescription]}>
          {item.description}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={[Styles.title_Bold, styles.productPrice]}>
            {item.price}
          </Text>
          {item.originalPrice && (
            <Text style={[Styles.body_Regular, styles.originalPriceText]}>
              {item.originalPrice}
            </Text>
          )}
        </View>
      </View>
      {!showCounter ? (
        <BottomCardComponent
          title={'Add to Card'}
          onHandler={handleAddToCartPress}
          style={styles.bottomCardButton}
          icon={<Card />}
          textStyle={Styles.subtitle_Regular}
        />
      ) : (
        <AddBottom
          style={styles.bottomCardButton}
          onQuantityChange={val => {
            console.log('Quantity changed for item', item.id, '=>', val);
            onAddSelected?.(item, val);
          }}
        />
      )}
    </View>
  );
};

// Main VerticalScroll Component
const CatalogList: React.FC<VerticalScrollProps> = ({item, onAddSelected, onHandlerItem}) => {
  const renderProductItem = ({item: product}: {item: ProductItem}) => (
    <ProductCard item={product} onAddSelected={onAddSelected} onHandlerItem={onHandlerItem} />
  );

  const keyExtractor = (product: ProductItem) => product.id;

  return (
    <View style={styles.categoryContainer}>
      <FlatList
        data={item}
        renderItem={renderProductItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        columnWrapperStyle={styles.rowWrapper}
        removeClippedSubviews={true}
        maxToRenderPerBatch={2}
        windowSize={5}
        initialNumToRender={4}
        updateCellsBatchingPeriod={100}
        getItemLayout={(data, index) => ({
          length: 300, // Updated height for swiper
          offset: 300 * Math.floor(index / 2),
          index,
        })}
        scrollEventThrottle={16}
        decelerationRate="fast"
      />
    </View>
  );
};

export default CatalogList;
const styles = StyleSheet.create({
  productTitleContainer: {
    width: '80%',
  },
  categoryContainer: {
    alignSelf: 'center',
    marginTop: '5%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTitle: {
    color: Color.primary,
  },
  flatListContainer: {
    paddingBottom: 150,
  },
  rowWrapper: {
    justifyContent: 'space-between',
  },
  productCardContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: Color.cardgray,
    backgroundColor: Color.white,
    width: '50%',
    marginBottom: 0,
  },
  favoriteButton: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  swiperContainer: {
    height: 120,
    marginBottom: 10,
  },
  swiper: {
    height: 120,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 50,
  },
});
