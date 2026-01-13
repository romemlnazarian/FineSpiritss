import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useMemo, useCallback, memo, useEffect} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import ProductCard from './ProductCard';

interface ProductItem {
  id: number;
  title: string;
  description: string;
  price?: string;
  originalPrice?: string;
  image_url?: string;
  country?: string;
  regular_price?: string;
  sale_price?: string;
  abv?: string;
  is_favorite?: boolean;
  cart_quantity: number;

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
          Styles.title_Medium,
          isSelected ? styles.selectedItemText : styles.unselectedItemText,
        ]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
});

// Memoized product item renderer
const ProductItemRenderer = memo(
  ({
    item,
    onSubmitProduct,
  }: {
    item: ProductItem;
    onSubmitProduct?: (item: ProductItem) => void;
  }) => (
    <ProductCard
      item={item}
      cardStyle={styles.productCardContainer}
      onPress={() => onSubmitProduct?.(item)}
    />
  ),
);

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

const HomeSort = memo(
  ({
    onClick,
    data = [],
    loading = false,
    onSubmitProduct,
  }: {
    onClick?: (id: string) => void;
    data?: ProductItem[];
    loading?: boolean;
    onSubmitProduct?: (item: ProductItem) => void;
  }) => {
    const sortData = useMemo(
      () => [
        {id: '1', title: 'Best Sales'},
        {id: '2', title: 'New'},
        {id: '3', title: 'For Gift'},
      ],
      [],
    );


    const [selectedItemId, setSelectedItemId] = useState(sortData[0].id);

    const displayData = useMemo(() => {
      const source = data ;
      return source
    }, [data]);

    useEffect(() => {
      if (!data?.length) {
        onClick?.(selectedItemId);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  // Memoized callback for sort item selection
  const handleSortSelection = useCallback((id: string) => {
    setSelectedItemId(id);
    onClick?.(id);
  }, [onClick]);

  // Memoized render functions
  const renderSortItem = useCallback(({item}: {item: {id: string; title: string}}) => (
    <SortItem
      item={item}
      isSelected={item.id === selectedItemId}
      onPress={handleSortSelection}
    />
  ), [selectedItemId, handleSortSelection]);

  // Memoized key extractors
  const sortKeyExtractor = useCallback(
    (item: {id: string; title: string}) => item.id,
    [],
  );
  return (
    <View style={styles.categoryContainer}>
      <SortHeader />
      <FlatList
        data={sortData}
        renderItem={renderSortItem}
        keyExtractor={sortKeyExtractor}
        horizontal
        extraData={selectedItemId}
        showsHorizontalScrollIndicator={false}
        style={styles.flatListContainer}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={5}
        initialNumToRender={3}
        updateCellsBatchingPeriod={50}
        getItemLayout={(_data, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
      />
      {loading ? (
        <View style={styles.loaderContainer}>
          <Text style={{color:Color.black}}>Loading...</Text>
        </View>
      ) : (
        <View style={styles.productGridContainer}>
          {displayData?.map(item => (
            <ProductItemRenderer
              key={item.id}
              item={item}
              onSubmitProduct={onSubmitProduct}
            />
          ))}
        </View>
      )}
      {/* <FlatList
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
      /> */}
    </View>
  );
  },
);

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
    color: Color.black,
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
  productGridContainer: {
    width: '100%',
    marginTop: '5%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCardContainer: {
    marginRight: 0,
    width: '48%',
    marginTop: 15,
  },
  productColumnWrapper: {
    justifyContent: 'space-between',
  },
  loaderContainer: {
    marginTop: '5%',
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
