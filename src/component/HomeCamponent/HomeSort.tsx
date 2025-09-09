import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
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

export default function HomeSort() {
  const sortData = [
    {id: '1', title: 'Popular'},
    {id: '2', title: 'Newest'},
    {id: '3', title: 'Price Low to High'},
    {id: '4', title: 'Price High to Low'},
    {id: '5', title: 'Top Rated'},
  ];

  const productData: ProductItem[] = [
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
  ];

  const {Styles} = StyleComponent();
  const [selectedItemId, setSelectedItemId] = useState(sortData[0].id);

  const renderItem = ({item}: {item: {id: string; title: string}}) => {
    const isSelected = item.id === selectedItemId;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.flatListItem]}
        onPress={() => setSelectedItemId(item.id)}>
        <Text
          style={[
            Styles.title_Regular,
            isSelected ? styles.selectedItemText : styles.unselectedItemText,
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderProductItem = ({item}: {item: ProductItem}) => (
    <ProductCard item={item} cardStyle={styles.productCardContainer} />
  );

  const renderProductItemTwo = ({item}: {item: ProductItem}) => (
    <ProductCard item={item} cardStyle={styles.productCardContainer} />
  );

  return (
    <View style={styles.categoryContainer}>
      <View style={styles.headerContainer}>
        <Text style={[Styles.h6_SemiBold, styles.categoryTitle]}>Sort By</Text>
        <View style={styles.separatorLine} />
      </View>
      <FlatList
        data={sortData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.flatListContainer}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={5}
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
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.productFlatListContainer}
        onStartShouldSetResponderCapture={() => false}
        onMoveShouldSetResponderCapture={() => true}
      />
          <FlatList
        data={productData}
        renderItem={renderProductItemTwo}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.productFlatListContainer}
        onStartShouldSetResponderCapture={() => false}
        onMoveShouldSetResponderCapture={() => true}
      />
    </View>
  );
}

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
