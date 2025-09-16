import {  FlatList, StyleSheet } from 'react-native'
import React, { memo, useCallback } from 'react'
import ProductCard from './HomeCamponent/ProductCard';

interface ProductItem {
    id: string;
    title: string;
    description: string;
    price: string;
    originalPrice?: string;
  }
  
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



export default function HorizontalFlatList() {

    // Memoized product item renderer
    const ProductItemRenderer = memo(({item}: {item: ProductItem}) => (
      <ProductCard item={item} cardStyle={styles.productCardContainer} />
    ));

    const renderProductItem = useCallback(
      ({item}: {item: ProductItem}) => <ProductItemRenderer item={item} />,
      [ProductItemRenderer]
    );
    


    
      const keyExtractor = useCallback((item: ProductItem) => item.id, []);


  return (
    <FlatList
    data={productData}
    renderItem={renderProductItem}
    keyExtractor={keyExtractor}
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
  )
}

const styles = StyleSheet.create({

    productCardContainer: {
        marginRight: 8, 
        width: 240,
      },
    productFlatListContainer: {
        marginTop: '5%',
      },
  });
   