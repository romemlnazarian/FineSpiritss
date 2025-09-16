import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { StyleComponent } from '../../utiles/styles'
import { Color } from '../../utiles/color'
import ShoppingCard from '../../assets/svg/ShoppingCart.svg'
import HorizontalFlatList from '../../component/HorizontalFlatList'
export default function CardScreen() {
  const {Styles} = StyleComponent();
  return (
    <View style={Styles.container}>
      <ScrollView>
      <View style={[Styles.alignCenter,Styles.alignSelf,{width:'93%',marginTop:'12%'}]}>
      <ShoppingCard fill={Color.black}/>
      <Text style={Styles.h3_Bold}>Your Cart is Empty</Text>
      <Text style={[Styles.h6_Regular,Styles.textAlign,{width:'80%'}]}>Once you add items from a store,
      your cart will appear here</Text>
      </View>
      <View style={[Styles.alignSelf,{width:'93%',marginTop:'8%'}]}>
      <Text style={[Styles.h3_Bold,{marginLeft:'2%'}]}>You might also like</Text>
      <HorizontalFlatList />
      </View>
      </ScrollView>
    </View>
  )
}