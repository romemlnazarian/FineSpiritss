import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React, {useState, useCallback, memo, useEffect} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import FilterIcon from '../../assets/svg/Filter.svg';

export type CatalogFilterItem = {
  id: string;
  title?: string;
  key?: string;
  type?: 'filter-icon' | 'default';
};

const FilterIconButton = memo(
  ({
    onPress,
    containerStyle,
  }: {
    onPress: () => void;
    containerStyle?: StyleProp<ViewStyle>;
  }) => (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.flatListItem, styles.filterIconItem, containerStyle]}
      onPress={onPress}>
      <FilterIcon width={16} height={16} />
    </TouchableOpacity>
  ),
);

const SortItem = memo(
  ({
    item,
    onPress,
    containerStyle,
    textStyle,
    arrow,
  }: {
    item: CatalogFilterItem;
    onPress: (item: CatalogFilterItem) => void;
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    arrow?: boolean;
  }) => {
    const {Styles} = StyleComponent();

    if (item.type === 'filter-icon') {
      return (
        <FilterIconButton
          containerStyle={containerStyle}
          onPress={() => onPress(item)}
        />
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.flatListItem, containerStyle]}
        onPress={() => onPress(item)}>
        <View style={styles.itemContent}>
          {item.title ? (
            <Text style={[Styles.title_Regular, styles.itemText, textStyle]}>
              {item.title}
            </Text>
          ) : null}
        </View>
        {arrow ? (
          <Arrow name="keyboard-arrow-down" size={20} color={Color.gray} />
        ) : null}
      </TouchableOpacity>
    );
  },
);

interface CatalogFilterProps {
  onHandler?: (key: string) => void;
  sortData: CatalogFilterItem[];
  sortItemContainerStyle?: StyleProp<ViewStyle>;
  sortItemTextStyle?: StyleProp<TextStyle>;
  arrow?: boolean;
}

const CatalogFilter = memo(
  ({
    onHandler,
    sortData,
    sortItemContainerStyle,
    sortItemTextStyle,
    arrow,
  }: CatalogFilterProps) => {
    const [selectedItemId, setSelectedItemId] = useState(
      sortData.find(item => item.type !== 'filter-icon')?.id ?? '',
    );

    useEffect(() => {
      if (!sortData.find(i => i.id === selectedItemId)) {
        setSelectedItemId(
          sortData.find(item => item.type !== 'filter-icon')?.id ?? '',
        );
      }
    }, [sortData, selectedItemId]);

    const handleSortSelection = useCallback(
      (item: CatalogFilterItem) => {
        if (item.type === 'filter-icon') {
          onHandler?.(item.key ?? 'filter');
          return;
        }
        setSelectedItemId(item.id);
        onHandler?.(item.key ?? item.title ?? item.id);
      },
      [onHandler],
    );

    const renderSortItem = useCallback(
      ({item}: {item: CatalogFilterItem}) => (
        <SortItem
          item={item}
          onPress={handleSortSelection}
          containerStyle={sortItemContainerStyle}
          textStyle={sortItemTextStyle}
          arrow={arrow}
        />
      ),
      [handleSortSelection, sortItemContainerStyle, sortItemTextStyle, arrow],
    );

    const sortKeyExtractor = (item: CatalogFilterItem) => item.id;

    return (
      <View style={styles.categoryContainer}>
        <FlatList
          data={sortData}
          renderItem={renderSortItem}
          keyExtractor={sortKeyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={5}
          windowSize={5}
          initialNumToRender={4}
          updateCellsBatchingPeriod={50}
        />
      </View>
    );
  },
);

export default CatalogFilter;

const styles = StyleSheet.create({
  categoryContainer: {
    width: '93%',
    alignSelf: 'center',
  },

  flatListItem: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    flexDirection: 'row',
  },
  filterIconItem: {
    paddingHorizontal: 14,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    color: Color.gray,
  },
});
