import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Wine from '../../assets/svg/Image.svg';
export default function HomeCategory() {
  const data = [
    {id: 1, image: <Wine />, title: 'Wine'},
    {id: 2, image: <Wine />, title: 'Wine'},
    {id: 3, image: <Wine />, title: 'Wine'},
    {id: 4, image: <Wine />, title: 'Wine'},
  ];

  const {Styles} = StyleComponent();
  return (
    <View style={styles.categoryContainer}>
      <View style={styles.headerContainer}>
        <Text style={[Styles.h6_SemiBold, styles.categoryTitle]}>
          Category
        </Text>
        <View
          style={styles.separatorLine}
        />
      </View>
      <View
        style={[Styles.justifyBetween, styles.categoryItemsContainer]}>
        {data.map(e => (
          <View key={e.id} style={styles.categoryItemWrapper}>
            <View
              style={styles.categoryImageContainer}>
              <View style={styles.categoryImagePosition}>{e.image}</View>
            </View>
            <Text style={[Styles.title_Regular,styles.categoryItemTitle]}>{e.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

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
    flexWrap: 'wrap',
    marginTop: '8%',
  },
  categoryItemWrapper: {
    marginTop: '14%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImageContainer: {
    width: 121,
    height: 83,
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
    marginTop:'5%',
  }
});
