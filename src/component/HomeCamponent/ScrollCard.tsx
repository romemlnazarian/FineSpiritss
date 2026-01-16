import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React from 'react';
import {Color} from '../../utiles/color';
import {StyleComponent} from '../../utiles/styles';
interface BrandItem {
  id: string;
  brand_image: string;
}


export default function ScrollCard({data}: {data: any[]}) {
  const {Styles} = StyleComponent();
  const renderBrandItem = ({item}: {item: BrandItem}) => (
    <View style={styles.brandItemContainer}>
      <Image source={{uri: item.brand_image}} style={styles.categoryImage} resizeMode="contain"  />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={[Styles.h6_SemiBold, styles.categoryTitle]}>
          Our brands
        </Text>
        <View style={styles.separatorLine} />
      </View>
      <View style={styles.container} >
      <FlatList
            data={data}
            renderItem={renderBrandItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContentContainer}
          />

      </View>
  
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '93%',
    alignSelf:'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTitle: {
    marginTop: '5%',
    color: Color.black,
  },
  separatorLine: {
    width: '68%',
    height: 0.5,
    backgroundColor: Color.lightGray,
    marginLeft: 10,
    marginTop: '8%',
  },
  container: {
    height: 80,
    justifyContent: 'center',
    marginTop: 20,
  },
  flatListContentContainer: {
    alignItems: 'center',
  },
  brandItemContainer: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    width: 100,
    height: 100,
  },
});
