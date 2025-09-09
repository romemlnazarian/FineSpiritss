import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useMemo, useCallback, memo} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import ProductCard from './ProductCard';

interface ProductItem {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
}

// Memoized sort item component
const SortItem = memo(({item, isSelected, onPress}: {
  item: {id: string; title: string};
  isSelected: boolean;
  onPress: (id: string) => void;
}) => {
  const {Styles} = StyleComponent();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.flatListItem]}
      onPress={() => onPress(item.id)}>
      <Text
        style={[
          Styles.title_Regular,
          isSelected ? styles.selectedItemText : styles.unselectedItemText,
        ]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
});

// Memoized product item renderer
const ProductItemRenderer = memo(({item}: {item: ProductItem}) => (
  <ProductCard item={item} cardStyle={styles.productCardContainer} />
));

// Memoized header component
const SortHeader = memo(() => {
  const {Styles} = StyleComponent();

  return (
    <View style={styles.headerContainer}>
      <Text style={[Styles.h6_SemiBold, styles.categoryTitle]}>Sort By</Text>
      <View style={styles.separatorLine} />
    </View>
  );
});

const HomeSort = memo(() => {
  // Memoize data arrays to prevent recreation on every render
  const sortData = useMemo(() => [
    {id: '1', title: 'Popular'},
    {id: '2', title: 'Newest'},
    {id: '3', title: 'Price Low to High'},
    {id: '4', title: 'Price High to Low'},
    {id: '5', title: 'Top Rated'},
  ], []);

  const productData = useMemo((): ProductItem[] => [
    {
      id: 'p1',
      title: 'Cognac Hennessy1',
      description: 'France ABV 40%',
      price: '$199.99',
      originalPrice: '$250.00',
    },
    {
      id: 'p2',
      title: 'Whiskey Jameson2',
      description: 'Ireland ABV 40%',
      price: '$49.99',
      originalPrice: '$60.00',
    },
    {
      id: 'p3',
      title: 'Vodka Absolut',
      description: 'Sweden ABV 40%',
      price: '$29.99',
      originalPrice: '$35.00',
    },
    {
      id: 'p4',
      title: 'Vodka Absolut',
      description: 'Sweden ABV 40%',
      price: '$29.99',
      originalPrice: '$35.00',
    },
    {
      id: 'p5',
      title: 'Vodka Absolut',
      description: 'Sweden ABV 40%',
      price: '$29.99',
      originalPrice: '$35.00',
    },
  ], []);

  const [selectedItemId, setSelectedItemId] = useState(sortData[0].id);

  // Memoized callback for sort item selection
  const handleSortSelection = useCallback((id: string) => {
    setSelectedItemId(id);
  }, []);

  // Memoized render functions
  const renderSortItem = useCallback(({item}: {item: {id: string; title: string}}) => (
    <SortItem
      item={item}
      isSelected={item.id === selectedItemId}
      onPress={handleSortSelection}
    />
  ), [selectedItemId, handleSortSelection]);

  const renderProductItem = useCallback(({item}: {item: ProductItem}) => (
    <ProductItemRenderer item={item} />
  ), []);

  // Memoized key extractors
  const sortKeyExtractor = useCallback((item: {id: string; title: string}) => item.id, []);
  const productKeyExtractor = useCallback((item: ProductItem) => item.id, []);

  return (
    <View style={styles.categoryContainer}>
      <SortHeader />
      <FlatList
        data={sortData}
        renderItem={renderSortItem}
        keyExtractor={sortKeyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.flatListContainer}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={5}
        initialNumToRender={3}
        updateCellsBatchingPeriod={50}
        getItemLayout={(data, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
      />
      <FlatList
        data={productData}
        renderItem={renderProductItem}
        keyExtractor={productKeyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.productFlatListContainer}
        onStartShouldSetResponderCapture={() => false}
        onMoveShouldSetResponderCapture={() => true}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        windowSize={5}
        initialNumToRender={2}
        updateCellsBatchingPeriod={50}
        getItemLayout={(data, index) => ({
          length: 255,
          offset: 255 * index,
          index,
        })}
      />
      <FlatList
        data={productData}
        renderItem={renderProductItem}
        keyExtractor={productKeyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.productFlatListContainer}
        onStartShouldSetResponderCapture={() => false}
        onMoveShouldSetResponderCapture={() => true}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        windowSize={5}
        initialNumToRender={2}
        updateCellsBatchingPeriod={50}
        getItemLayout={(data, index) => ({
          length: 255,
          offset: 255 * index,
          index,
        })}
      />
    </View>
  );
});

export default HomeSort;

const styles = StyleSheet.create({
  categoryContainer: {
    width: '93%',
    alignSelf: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTitle: {
    color: Color.primary,
  },
  separatorLine: {
    width: '72%',
    height: 1,
    backgroundColor: Color.lightGray,
    marginLeft: 10,
    marginTop: '2%',
  },
  flatListContainer: {
    marginTop: '5%',
  },
  flatListItem: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
  },

  selectedItemText: {
    color: Color.black,
  },
  unselectedItemText: {
    color: Color.gray,
  },
  productFlatListContainer: {
    marginTop: '5%',
  },
  productCardContainer: {
    // Styles moved to ProductCard.tsx
    // These are kept here for passing as cardStyle prop if needed for external overrides
    marginRight: 15, // Spacing between cards
    width: 240, // Example fixed width for product cards
  },
});
