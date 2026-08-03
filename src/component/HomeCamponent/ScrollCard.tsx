import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React from 'react';
import {Color} from '../../utiles/color';
import {StyleComponent} from '../../utiles/styles';
import {resolveMediaUrl} from '../../utiles/mediaUrl';
import {Language} from '../../utiles/Language/i18n';
import useLocalizationStore from '../../zustland/localizationStore';

interface BrandItem {
  id: string;
  brand_image: string;
}

export default function ScrollCard({data}: {data: any[]}) {
  const {Styles} = StyleComponent();
  useLocalizationStore(state => state.language);

  const renderBrandItem = ({item}: {item: BrandItem}) => (
    <View style={styles.brandItemContainer}>
      <Image
        source={{uri: resolveMediaUrl(item.brand_image)}}
        style={styles.categoryImage}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={[Styles.h6_SemiBold, styles.categoryTitle]}>
          {Language.home_our_brands}
        </Text>
        <View style={styles.separatorLine} />
      </View>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderBrandItem}
          keyExtractor={(item, index) => String(item?.id ?? index)}
          horizontal
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={styles.flatListContentContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '93%',
    alignSelf: 'center',
    marginTop: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTitle: {
    marginTop: 8,
    color: Color.black,
    flexShrink: 0,
  },
  separatorLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Color.lightGray,
    marginLeft: 10,
    marginTop: 8,
  },
  container: {
    height: 72,
    justifyContent: 'center',
    marginTop: 12,
  },
  flatListContentContainer: {
    alignItems: 'center',
  },
  brandItemContainer: {
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
    width: 88,
  },
  categoryImage: {
    width: 88,
    height: 64,
  },
});
