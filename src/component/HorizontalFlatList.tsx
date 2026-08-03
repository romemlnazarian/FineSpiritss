import {FlatList, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import RecomendedComponent from './RecomendedComponent';

export default function HorizontalFlatList({
  products,
  onFavoriteToggled,
  callback,
  onToggleClick,
}: {
  callback: (item: any) => void;
  products: any;
  onFavoriteToggled?: (id: string, isFavorite: boolean) => void;
  onToggleClick?: (id: number) => void;
}) {
  const keyExtractor = useCallback(
    (item: any, index: number) =>
      String(item?.id ?? item?.product_id ?? item?.slug ?? index),
    [],
  );

  return (
    <FlatList
      data={Array.isArray(products) ? products : []}
      renderItem={({item}: {item: any}) => (
        <RecomendedComponent
          item={item}
          cardStyle={styles.productCardContainer}
          onPress={(pressedItem: any) => callback?.(pressedItem)}
          onFavoriteToggled={onFavoriteToggled}
          onToggleClick={onToggleClick}
        />
      )}
      keyExtractor={keyExtractor}
      horizontal
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      style={styles.productFlatListContainer}
      contentContainerStyle={styles.contentContainer}
      windowSize={5}
      initialNumToRender={2}
      updateCellsBatchingPeriod={50}
    />
  );
}

const styles = StyleSheet.create({
  productCardContainer: {
    marginRight: 8,
    width: 240,
  },
  productFlatListContainer: {
    marginTop: '5%',
    minHeight: 340,
  },
  contentContainer: {
    paddingRight: 8,
  },
});
