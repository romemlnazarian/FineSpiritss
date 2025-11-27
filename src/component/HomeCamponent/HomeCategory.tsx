import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {memo, useMemo} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Viski from '../../assets/svg/viski.svg';
import {Route} from '../../api/Route';
// Memoized category item component to prevent unnecessary re-renders
const CategoryItem = memo(({item, onSubmit}: {item: any, onSubmit: (item: any) => void}) => {
  const {Styles} = StyleComponent();

  // Build absolute image URL
  const rawImage: string | undefined =
    item?.cat_image || item?.parent?.cat_image;
  const base = Route.root.replace(/\/api\/?$/, '/');
  const imageUri = rawImage
    ? rawImage.startsWith('http')
      ? rawImage
      : `${base}${rawImage.replace(/^\//, '')}`
    : undefined;

  return (
    <TouchableOpacity onPress={() => onSubmit(item)} style={styles.categoryItemWrapper}>
      <View style={styles.categoryImageContainer}>
        <View style={styles.categoryImagePosition}>
           {imageUri ? (
             <Image source={{uri: imageUri}} style={styles.categoryImage} />
           ) : (
            <Viski width={60} height={100} />
          )}
        </View>
      </View>
      <Text
        style={[Styles.title_Regular, styles.categoryItemTitle]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.cat_name}
      </Text>
    </TouchableOpacity>
  );
});

// Memoized header component
const CategoryHeader = memo(() => {
  const {Styles} = StyleComponent();

  return (
    <View style={styles.headerContainer}>
      <Text style={[Styles.h6_SemiBold, styles.categoryTitle]}>Category</Text>
      <View style={styles.separatorLine} />
    </View>
  );
});


const HomeCategory = memo(({data = [], onSubmitCategory}: {data: any[], onSubmitCategory: (item: any) => void}) => {
  const {Styles} = StyleComponent();

  // Memoize the data array to prevent recreation on every render
  const categoryData = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  return (
    <View style={styles.categoryContainer}>
      <CategoryHeader />
      <View style={[Styles.justifyBetween, styles.categoryItemsContainer]}>
        {categoryData.map((item, idx) => (
          <CategoryItem key={item?.id ?? item?.slug ?? idx} item={item} onSubmit={onSubmitCategory} />
        ))}
      </View>
    </View>
  );
});

export default HomeCategory;

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
  categoryItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: '8%',
  },
  categoryItemWrapper: {
    width: '30%',
    marginBottom: 35,
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
  categoryImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  categoryItemTitle: {
    marginTop: '5%',
    textAlign: 'center',
    minHeight: 40,
  },
});
