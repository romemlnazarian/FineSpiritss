import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import ShoppingCard from '../../assets/svg/ShoppingCart.svg';
import HorizontalFlatList from '../../component/HorizontalFlatList';
import CustomHeader from '../../navigation/CustomHeader';
import CartItem from '../../component/CartComponent/CartItem';
import CartLogix from '../../Logic/Cart/CartLogix';
import {BottomSheet} from '../../component/BottomSheet';
import CartOrder from '../../Logic/Cart/CartOrder';
export default function CardScreen() {
  const {Styles} = StyleComponent();
  const {} = CartLogix();
  return (
    <View style={Styles.container}>
      <CustomHeader showBack={true} subTitle="Cart" />

      <ScrollView>
        <CartItem />
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            backgroundColor: Color.white,
            marginTop: '5%',
          }}>
          <Text style={[Styles.title_Regular, {marginLeft: '5%'}]}>
            Promo code
          </Text>

          <View
            style={{
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
            }}>
            <Text style={[Styles.title_Regular, {color: Color.lightGray}]}>
              Enter promo code here
            </Text>
            <TouchableOpacity>
              <Text style={[Styles.title_Regular, {color: Color.lightGray}]}>
                Apply
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={[Styles.h6_SemiBold, {marginLeft: '5%', marginTop: '5%'}]}>
            Order Summary
          </Text>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              width: '90%',
              alignSelf: 'center',
              marginTop: '5%',
            }}>
            <Text style={[Styles.title_Regular, {color: Color.black}]}>
              My order
            </Text>
            <Text style={[Styles.title_Bold, {color: Color.black}]}>
              2 items
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              width: '90%',
              alignSelf: 'center',
              marginTop: '5%',
            }}>
            <Text style={[Styles.title_Regular, {color: Color.black}]}>
              Order amount
            </Text>
            <Text style={[Styles.title_Bold, {color: Color.black}]}>
              $212.98
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              width: '90%',
              alignSelf: 'center',
              marginTop: '5%',
            }}>
            <Text style={[Styles.title_Regular, {color: Color.black}]}>
              Sale by promo code
            </Text>
            <Text style={[Styles.title_Bold, {color: Color.black}]}>-$15</Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              width: '90%',
              alignSelf: 'center',
              marginTop: '5%',
            }}>
            <Text style={[Styles.title_Regular, {color: Color.black}]}>
              Constant discount
            </Text>
            <Text style={[Styles.title_Bold, {color: Color.black}]}>-3% </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              width: '90%',
              alignSelf: 'center',
              marginTop: '5%',
            }}>
            <Text style={[Styles.title_Regular, {color: Color.black}]}>
              Delivery
            </Text>
            <Text style={[Styles.title_Bold, {color: Color.black}]}>Free </Text>
          </View>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              backgroundColor: Color.lightGray,
              height: 1,
              marginTop: '5%',
            }}
          />
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              width: '90%',
              alignSelf: 'center',
              marginTop: '5%',
            }}>
            <Text style={[Styles.h5_Bold, {color: Color.primary}]}>Total</Text>
            <Text style={[Styles.h5_Bold, {color: Color.black}]}>$192.04</Text>
          </View>
          <View
            style={{
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
            }}>
            <Text style={[Styles.title_Regular, {color: Color.white}]}>
              Order
            </Text>
            <Text style={[Styles.title_Regular, {color: Color.white}]}>
              $192.04
            </Text>
          </View>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: '5%',
              padding: 10,
              borderRadius: 10,
            }}
          />
        </View>
        {/* <View style={[Styles.alignCenter,Styles.alignSelf,{width:'93%',marginTop:'12%'}]}>
      <ShoppingCard fill={Color.black}/>
      <Text style={Styles.h3_Bold}>Your Cart is Empty</Text>
      <Text style={[Styles.h6_Regular,Styles.textAlign,{width:'80%'}]}>Once you add items from a store,
      your cart will appear here</Text>
      </View>
      <View style={[Styles.alignSelf,{width:'93%',marginTop:'8%'}]}>
      <Text style={[Styles.h3_Bold,{marginLeft:'2%'}]}>You might also like</Text>
      <HorizontalFlatList />
      </View> */}
      </ScrollView>
      <BottomSheet modalVisible={true} height={500}>
        <CartOrder />
      </BottomSheet>
    </View>
  );
}
