import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {Color} from '../../utiles/color';
import {StyleComponent} from '../../utiles/styles';
import Brand03 from '../../assets/svg/Brand03.svg';

interface BrandItem {
  id: string;
}

const brandData: BrandItem[] = [
  {id: '1',},
  {id: '2',},
  {id: '3',},
  {id: '4'},
  {id: '5'},
  {id: '6'},
];

export default function ScrollCard() {
  const {Styles} = StyleComponent();

  const renderBrandItem = ({item: _item}: {item: BrandItem}) => (
    <View style={styles.brandItemContainer}>
      <Brand03 />
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
            data={brandData}
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
    color: Color.primary,
  },
  separatorLine: {
    width: '68%',
    height: 1,
    backgroundColor: Color.lightGray,
    marginLeft: 10,
    marginTop: '2%',
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
});
