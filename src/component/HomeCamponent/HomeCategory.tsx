import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {memo, useMemo} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import {resolveMediaUrl} from '../../utiles/mediaUrl';
import {Language} from '../../utiles/Language/i18n';
import useLocalizationStore from '../../zustland/localizationStore';

const CategoryItem = memo(
  ({item, onSubmit}: {item: any; onSubmit: (item: any) => void}) => {
    const {Styles} = StyleComponent();

    const imageUri = resolveMediaUrl(
      item?.cat_image || item?.parent?.cat_image,
    );

    return (
      <TouchableOpacity
        onPress={() => onSubmit(item)}
        activeOpacity={0.85}
        style={styles.categoryItemWrapper}>
        <View style={styles.cardSlot}>
          <View style={styles.grayCard} />
          {imageUri ? (
            <Image
              source={{uri: imageUri}}
              style={styles.categoryImage}
              resizeMode="contain"
              resizeMethod="resize"
            />
          ) : (
            <View style={styles.categoryImagePlaceholder} />
          )}
        </View>
        <Text
          style={[Styles.title_Medium, styles.categoryItemTitle]}
          numberOfLines={2}
          ellipsizeMode="tail">
          {item.cat_name}
        </Text>
      </TouchableOpacity>
    );
  },
);

const CategoryHeader = memo(() => {
  const {Styles} = StyleComponent();
  useLocalizationStore(state => state.language);

  return (
    <View style={styles.headerContainer}>
      <Text style={[Styles.h6_SemiBold, styles.categoryTitle]}>
        {Language.home_category}
      </Text>
      <View style={styles.separatorLine} />
    </View>
  );
});

const HomeCategory = memo(
  ({
    data = [],
    onSubmitCategory,
  }: {
    data: any[];
    onSubmitCategory: (item: any) => void;
  }) => {
    const categoryData = useMemo(
      () => (Array.isArray(data) ? data : []),
      [data],
    );

    return (
      <View style={styles.categoryContainer}>
        <CategoryHeader />
        <View style={styles.categoryItemsContainer}>
          {categoryData.map((item, idx) => (
            <CategoryItem
              key={item?.id ?? item?.slug ?? idx}
              item={item}
              onSubmit={onSubmitCategory}
            />
          ))}
        </View>
      </View>
    );
  },
);

export default HomeCategory;

const styles = StyleSheet.create({
  categoryContainer: {
    width: '93%',
    alignSelf: 'center',
    marginTop: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTitle: {
    color: Color.black,
    flexShrink: 0,
  },
  separatorLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Color.lightGray,
    marginLeft: 12,
  },
  categoryItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 22,
  },
  categoryItemWrapper: {
    width: '31%',
    alignItems: 'center',
    marginTop: 18,
  },
  cardSlot: {
    width: '100%',
    height: 96,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'visible',
  },
  grayCard: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 86,
    backgroundColor: Color.cardgray,
    borderRadius: 14,
  },
  categoryImage: {
    width: '78%',
    height: 112,
    zIndex: 1,
  },
  categoryImagePlaceholder: {
    width: '50%',
    height: 72,
    borderRadius: 8,
    backgroundColor: Color.lightGray,
    zIndex: 1,
  },
  categoryItemTitle: {
    marginTop: 0,
    textAlign: 'center',
    minHeight: 32,
    width: '100%',
    color: Color.black,
  },
});
