import {View, Text, StyleSheet, FlatList, TouchableOpacity, StyleProp, ViewStyle, TextStyle} from 'react-native';
import React, {useState, useCallback, memo, useEffect} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Arrow from 'react-native-vector-icons/MaterialIcons';
// Memoized sort item component
const SortItem = memo(({item, isSelected, onPress, containerStyle, textStyle, arrow}: {
  item: {id: string; title: string | React.ReactElement};
  isSelected: boolean;
  onPress: (id: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  arrow?: boolean;
}) => {
  const {Styles} = StyleComponent();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.flatListItem, containerStyle]}
      onPress={() => onPress(item.id)}>
      <Text
        style={[
          Styles.title_Regular,
          isSelected ? styles.selectedItemText : styles.unselectedItemText,
          textStyle,
        ]}>
        {item.title}
      </Text>
      {item.id !== "1" && arrow &&  <Arrow name="keyboard-arrow-down" size={20} color={Color.gray} />}
    </TouchableOpacity>
  );
});

interface CatalogFilterProps {
  onHandler?: (selectedId: string) => void;
  sortData: {id: string; title: string | React.ReactElement}[];
  sortItemContainerStyle?: StyleProp<ViewStyle>;
  sortItemTextStyle?: StyleProp<TextStyle>;
  arrow?: boolean;
}

const CatalogFilter = memo(({onHandler, sortData, sortItemContainerStyle, sortItemTextStyle, arrow}: CatalogFilterProps) => {
  const [selectedItemId, setSelectedItemId] = useState(sortData[0]?.id ?? '');

  // Keep selection valid when data changes
  useEffect(() => {
    if (!sortData.find(i => i.id === selectedItemId)) {
      setSelectedItemId(sortData[0]?.id ?? '');
    }
  }, [sortData, selectedItemId]);

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
      containerStyle={sortItemContainerStyle}
      textStyle={sortItemTextStyle}
      arrow={arrow}
    />
  ), [selectedItemId, handleSortSelection, sortItemContainerStyle, sortItemTextStyle, arrow]);

  // Memoized key extractors
  const sortKeyExtractor = (item: {id: string; title: string | React.ReactElement}) => item.id;

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
    flexDirection: 'row',
  },

  selectedItemText: {
    color: Color.black,
  },
  unselectedItemText: {
    color: Color.gray,
  },
});
