import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useMemo, useCallback, memo} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Filter from '../../assets/svg/Filter.svg';
// Memoized sort item component
const SortItem = memo(({item, isSelected, onPress}: {
  item: {id: string; title: string | React.ReactElement};
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



interface CatalogFilterProps {
  onHandler?: (selectedId: string) => void;
}

const CatalogFilter = memo(({onHandler}: CatalogFilterProps) => {
  // Memoize data arrays to prevent recreation on every render
  const sortData = useMemo(() => [
    {id: '1', title: <Filter />},
    {id: '2', title: 'Country'},
    {id: '3', title: 'Brand'},
    {id: '4', title: 'Capacity'},
    {id: '5', title: 'Kosher'},
  ], []);


  const [selectedItemId, setSelectedItemId] = useState(sortData[0].id);

  // Memoized callback for sort item selection
  const handleSortSelection = useCallback((id: string) => {
    setSelectedItemId(id);
    if (id === '1') {
      onHandler?.('filter');
    } else {
      const selectedItem = sortData.find(item => item.id === id);
      if (selectedItem && typeof selectedItem.title === 'string') {
        onHandler?.(selectedItem.title);
      }
    }
  }, [onHandler, sortData]);

  // Memoized render functions
  const renderSortItem = useCallback(({item}: {item: {id: string; title: string | React.ReactElement}}) => (
    <SortItem
      item={item}
      isSelected={item.id === selectedItemId}
      onPress={handleSortSelection}
    />
  ), [selectedItemId, handleSortSelection]);

 

  // Memoized key extractors
  const sortKeyExtractor = useCallback((item: {id: string; title: string | React.ReactElement}) => item.id, []);

  return (
    <View style={styles.categoryContainer}>
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
    </View>
  );
});

export default CatalogFilter;

const styles = StyleSheet.create({
  categoryContainer: {
    width: '93%',
    alignSelf: 'center',
  },

  categoryTitle: {
    color: Color.primary,
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
});
