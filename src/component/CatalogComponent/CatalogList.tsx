import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Heart from '../../assets/svg/Heart.svg';
import Heart_primary from '../../assets/svg/Heart_Primary.svg';
import BottomCardComponent from '../BottomCard';
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
  orderBottom?: boolean; // show 'View product' CTA instead of Add/Counter
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  isInitialLoading?: boolean;
}
// Individual Product Card Component
const ProductCard: React.FC<{
  item: ProductItem;
  onAddSelected?: (product: ProductItem, quantity: number) => void;
  onHandlerItem?: (product: ProductItem) => void;
  orderBottom?: boolean;
}> = ({item, onAddSelected, onHandlerItem, orderBottom}) => {
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
    <TouchableOpacity 
    activeOpacity={0.5}
      onPress={() => onHandlerItem?.(item)}
    style={[styles.productCardContainer, Styles.alignCenter]}>
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
          <Image
            source={{uri: item.image_url}}
            style={styles.slide}
            resizeMode="contain"
          />
        </Swiper>
      </View>
      <View style={styles.productTitleContainer}>
        <Text style={[Styles.body_Medium]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[Styles.title_Regular, styles.productDescription]}>
          {item.country} {item.price && `ABV ${item.abv}`}
        </Text>
        <Text style={[Styles.title_Bold, styles.productPrice]}>
          {item.price} zł
        </Text>
      </View>
      {orderBottom ? (
        <BottomCardComponent
          title={'View product'}
          onHandler={handleAddToCartPress}
          style={styles.bottomCardButton}
          textStyle={Styles.subtitle_Regular}
        />
      ) : !showCounter ? (
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
    </TouchableOpacity>
  );
};

// Main VerticalScroll Component
const CatalogList: React.FC<VerticalScrollProps> = ({
  item,
  onAddSelected,
  onHandlerItem,
  orderBottom,
  onLoadMore,
  isLoadingMore,
  isInitialLoading,
}) => {
  const showInitialLoader = isInitialLoading && (!item || item.length === 0);

  if (showInitialLoader) {
    return (
      <View style={[styles.categoryContainer, styles.initialLoader]}>
        <ActivityIndicator size="large" color={Color.primary} />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  const renderProductItem = ({item: product}: {item: ProductItem}) => (
    <ProductCard
      item={product}
      onAddSelected={onAddSelected}
      onHandlerItem={onHandlerItem}
      orderBottom={orderBottom}
    />
  );

  const keyExtractor = (product: ProductItem) => product.id;

  const listFooter = useMemo(() => {
    if (!isLoadingMore) {
      return null;
    }
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="small" color={Color.primary} />
      </View>
    );
  }, [isLoadingMore]);

  const emptyComponent = useMemo(() => {
    if (isInitialLoading) {
      return null;
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.loadingText}>No products found.</Text>
      </View>
    );
  }, [isInitialLoading]);

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
        windowSize={10}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={listFooter}
        ListEmptyComponent={emptyComponent}
      />
    </View>
  );
};

export default CatalogList;
const styles = StyleSheet.create({
  productTitleContainer: {
    width: '85%',
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
  footerContainer: {
    paddingTop: 16,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: Color.white,
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialLoader: {
    paddingVertical: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: Color.gray,
  },
});
