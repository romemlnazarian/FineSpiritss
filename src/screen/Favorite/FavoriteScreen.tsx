import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import ShoppingCard from '../../assets/svg/ShoppingCart.svg';
import HorizontalFlatList from '../../component/HorizontalFlatList';
import CustomHeader from '../../navigation/CustomHeader';
import FavoriteLogic from '../../logic/Favorite/FavoriteLogic';
import CartItem from '../../component/CartComponent/CartItem';
import FavoriteItem from '../../component/FavoriteComponent/FavoriteItem';
export default function FavoriteScreen() {
  const {Styles} = StyleComponent();
  const {} = FavoriteLogic();
  return (
    <View style={Styles.container}>
      <CustomHeader showBack={true} subTitle="Cart" />
      <ScrollView showsVerticalScrollIndicator={false}>
      <FavoriteItem />

        {/* <View style={[Styles.alignCenter,Styles.alignSelf,{width:'93%',marginTop:'8%'}]}>
      <ShoppingCard fill={Color.black}/>
      <Text style={[Styles.h3_Bold,{textAlign:'center'}]}>There is no drinks in wishlist</Text>
      <Text style={[Styles.h6_Regular,Styles.textAlign,{width:'80%'}]}>Once you add items from a store,
      your cart will appear here</Text>
      </View>
      <View style={[Styles.alignSelf,{width:'93%',marginTop:'8%'}]}>
      <Text style={[Styles.h3_Bold,{marginLeft:'2%'}]}>Recommendations</Text>
      <HorizontalFlatList />
      </View> */}
       </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Color.white,
    marginTop: '5%',
  },
  ml5: { marginLeft: '5%' },
  mt5: { marginTop: '5%' },
  promoInput: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: Color.lightGray,
    borderRadius: 14,
    marginTop: '2%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  textLightGray: { color: Color.lightGray },
  rowBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: '5%',
  },
  divider: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Color.lightGray,
    height: 1,
    marginTop: '5%',
  },
  orderButton: {
    width: '90%',
    alignSelf: 'center',
    marginTop: '5%',
    backgroundColor: Color.primary,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 10,
  },
  spacer: { width: '90%', alignSelf: 'center', marginTop: '5%', padding: 10, borderRadius: 10 },
});
