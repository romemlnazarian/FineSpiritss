import {FlatList, StyleSheet} from 'react-native';
import React, {memo, useCallback} from 'react';
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
  const keyExtractor = useCallback((item: any) => item.id, []);

  return (
    <FlatList
      data={products}
      renderItem={({item}: {item: any}) => (
        <RecomendedComponent
          item={item}
          cardStyle={styles.productCardContainer}
          onPress={(item: any) => callback?.(item)}
          onFavoriteToggled={onFavoriteToggled}
          onToggleClick={onToggleClick}
        />
      )}
      keyExtractor={keyExtractor}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.productFlatListContainer}
      windowSize={5}
      initialNumToRender={2}
      updateCellsBatchingPeriod={50}
      getItemLayout={(data, index) => ({
        length: 255,
        offset: 255 * index,
        index,
      })}
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
  },
});
