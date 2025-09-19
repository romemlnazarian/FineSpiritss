import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {Color} from '../../utiles/color';
import {StyleComponent} from '../../utiles/styles';
import Viski from '../../assets/svg/viski.svg';
import Trash from '../../assets/svg/Trash.svg';
import Star from 'react-native-vector-icons/AntDesign'

interface ProductItem {
  id: string;
  title: string;
  country: string;
  alcoholContent: string;
  price: string;
}
const displayedProductData: ProductItem[] = [
  {
    id: 'p1',
    title: 'Cognac Hennessy1',
    country: 'France',
    alcoholContent: 'ABV 40%',
    price: '$199.99',
  },
  {
    id: 'p2',
    title: 'Whiskey Jameson2',
    country: 'Ireland',
    alcoholContent: 'ABV 40%',
    price: '$49.99',
  },
  {
    id: 'p3',
    title: 'Vodka Absolut',
    country: 'Sweden',
    alcoholContent: 'ABV 40%',
    price: '$29.99',
  },
  {
    id: 'p4',
    title: 'Vodka Absolut',
    country: 'Sweden',
    alcoholContent: 'ABV 40%',
    price: '$29.99',
  },
  {
    id: 'p5',
    title: 'Vodka Absolut',
    country: 'Sweden',
    alcoholContent: 'ABV 40%',
    price: '$29.99',
  },
];

export default function HistoryItemProfile() {
  const {Styles} = StyleComponent();
  // Memoized Product Card Component
  const ProductCard = React.memo(({item}: {item: ProductItem}) => {
    const {Styles} = StyleComponent(); 

    return (
      <View style={[Styles.justifyBetween, styles.mainContainer]}>
        <View style={[Styles.justifyCenter, styles.leftSection]}>
          <Viski width={50} height={100} />
          <View style={styles.productInfo}>
            <Text style={[Styles.h5_SemiBold]}>{item.title}</Text>
            <View style={styles.detailsContainer}>
              <Text style={[Styles.subtitle_Regular]}>{item.country}</Text>
              <View style={styles.separator} />
              <Text style={[Styles.subtitle_Regular]}>
                {item.alcoholContent}
              </Text>
            </View>
       
          </View>
        </View>
        <View style={styles.heartContainer}>
        <Star name="star" size={30} color={Color.gold} />
        </View>
        <Text style={[Styles.title_Regular,{marginTop:'12%'}]}>+21 Points</Text>
      </View>
    );
  });
  return (
    <View style={{width: '100%', backgroundColor: Color.white, padding: 10}}>
 
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}>
        {displayedProductData.map(item => (
          <ProductCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  addBottom: {
    width: 119,
    height: 42,
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  mainContainer: {
    width: '100%',
    alignSelf: 'center',
    marginTop: '5%',
    borderBottomWidth: 1,
    borderBottomColor: Color.lightGray,
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  leftSection: {
    height: 100,
  },
  productInfo: {
    height: 80,
    justifyContent: 'space-around',
    marginLeft: '5%',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: Color.black,
  },
  heartContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  flatListContainer: {
    paddingBottom: 120,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  suggestionsList: {
    backgroundColor: Color.background,
    borderRadius: 10,
    marginTop: 5,
    marginHorizontal: 10,
    maxHeight: 150,
    shadowColor: Color.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  separatorLine: {
    height: 1,
    backgroundColor: Color.lightGray,
    marginVertical: 10,
  },
});
