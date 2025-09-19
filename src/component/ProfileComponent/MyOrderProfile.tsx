import { View, Text } from 'react-native'
import React from 'react'
import Arrow from 'react-native-vector-icons/MaterialIcons';
import {Color} from '../../utiles/color';
import {StyleComponent} from '../../utiles/styles';
export default function MyOrderProfile() {
  const {Styles} = StyleComponent();
  return (
    <View
    style={{
      width: '90%',
      backgroundColor: Color.white,
      alignSelf: 'center',
      borderRadius: 12,
      padding: 10,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
      marginTop:"5%",
    }}>
    <View style={{marginLeft:'2%'}}>
      <Text style={[Styles.title_Medium]}>My Orders</Text>
      <Text style={[Styles.title_Medium]}>You have no orders yet</Text>
    </View>
    <Arrow name="keyboard-arrow-right" size={25} color={Color.black} />
  </View>
  )
}