import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useMemo, memo, useCallback} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import CustomHeader from '../../navigation/CustomHeader';
import Category_image from '../../assets/svg/category_image.svg';
import CatalogLogic from '../../logic/Catalog/CatalogLogic';
interface CategoryItem {
  id: string;
  title: string;
  description: string;
  productCount: number;
}


const CategoryScreen = memo(() => {
  const {Styles} = StyleComponent();
  const {unSubmit} = CatalogLogic()

  // Memoized category data
  const categoryData = useMemo(
    (): CategoryItem[] => [
      {
        id: '1',
        title: 'Whiskey',
        description: 'Premium whiskey collection from around the world',
        productCount: 45,
      },
      {
        id: '2',
        title: 'Vodka',
        description: 'Smooth and refined vodka selections',
        productCount: 32,
      },
      {
        id: '3',
        title: 'Rum',
        description: 'Caribbean and premium rum varieties',
        productCount: 28,
      },
      {
        id: '4',
        title: 'Gin',
        description: 'Craft gin with unique botanical blends',
        productCount: 24,
      },
      {
        id: '5',
        title: 'Tequila',
        description: 'Authentic Mexican tequila collection',
        productCount: 18,
      },
      {
        id: '6',
        title: 'Cognac',
        description: 'French cognac and brandy selection',
        productCount: 22,
      },
      {
        id: '7',
        title: 'Wine',
        description: 'Red, white, and sparkling wine collection',
        productCount: 67,
      },
      {
        id: '8',
        title: 'Champagne',
        description: 'Premium champagne and sparkling wines',
        productCount: 15,
      },
    ],
    [],
  );



  const renderCategoryItem = () => {
    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => unSubmit()}
        activeOpacity={0.7}>
          <Category_image />
      </TouchableOpacity>
    )
  }

  // Memoized key extractor
  const keyExtractor = useCallback((item: CategoryItem) => item.id, []);

  return (
    <View style={[Styles.container]}>
      <CustomHeader showBack={true} title='Catalog'/>
      <FlatList
        data={categoryData}
        renderItem={renderCategoryItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.rowStyle}
        removeClippedSubviews={true}
        maxToRenderPerBatch={4}
        windowSize={10}
        initialNumToRender={6}
        updateCellsBatchingPeriod={50}
      />
    </View>
  );
});

export default CategoryScreen;

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: Color.primary,
    marginBottom: 8,
  },
  headerSubtitle: {
    color: Color.gray,
  },
  listContainer: {
    paddingBottom: 20,
  },
  rowStyle: {
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  categoryItem: {
    width: '45%',
    height: 130,
    backgroundColor: Color.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: Color.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  categoryTitle: {
    color: Color.black,
    marginBottom: 4,
  },
  categoryDescription: {
    color: Color.gray,
    marginBottom: 8,
    lineHeight: 18,
  },
  productCount: {
    color: Color.primary,
  },
});
