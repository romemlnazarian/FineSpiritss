import {View, Text, StyleSheet} from 'react-native';
import React, { memo, useMemo } from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Viski from '../../assets/svg/viski.svg';
// Memoized category item component to prevent unnecessary re-renders
const CategoryItem = memo(({item}: {item: {id: number; title: string}}) => {
  const {Styles} = StyleComponent();

  return (
    <View style={styles.categoryItemWrapper}>
      <View style={styles.categoryImageContainer}>
        <View style={styles.categoryImagePosition}>
            <Viski width={60} height={100}/>
        </View>
      </View>
      <Text style={[Styles.title_Regular, styles.categoryItemTitle]}>
        {item.title}
      </Text>
    </View>
  );
});

// Memoized header component
const CategoryHeader = memo(() => {
  const {Styles} = StyleComponent();

  return (
    <View style={styles.headerContainer}>
      <Text style={[Styles.h6_SemiBold, styles.categoryTitle]}>
        Category
      </Text>
      <View style={styles.separatorLine} />
    </View>
  );
});

const HomeCategory = memo(() => {
  const {Styles} = StyleComponent();

  // Memoize the data array to prevent recreation on every render
  const categoryData = useMemo(() => [
    {id: 1, title: 'Wine'},
    {id: 2, title: 'Wine'},
    {id: 3, title: 'Wine'},
    {id: 4, title: 'Wine'},
  ], []);

  return (
    <View style={styles.categoryContainer}>
      <CategoryHeader />
      <View style={[Styles.justifyBetween, styles.categoryItemsContainer]}>
        {categoryData.map(item => (
          <CategoryItem key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
});

export default HomeCategory;

const styles = StyleSheet.create({
  categoryContainer: {
    width: '93%',
    alignSelf:'center',
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
  categoryItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: '8%',
  },
  categoryItemWrapper: {
    width: '30%',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImageContainer: {
    width: 100,
    height: 80,
    backgroundColor: Color.cardgray,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImagePosition: {
    position: 'absolute',
    bottom: 0,
  },
  categoryItemTitle: {
    marginTop: '5%',
  },
});
