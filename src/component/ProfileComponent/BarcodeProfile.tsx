import { View, Text } from 'react-native'
import React from 'react'
import {Color} from '../../utiles/color'
import {StyleComponent} from '../../utiles/styles'
import BarCode from '../../assets/svg/barcode.svg'
export default function BarcodeProfile() {
  const {Styles} = StyleComponent()
  return (
    <View
    style={{
      width: '90%',
      backgroundColor: Color.white,
      alignSelf: 'center',
      borderRadius: 12,
      padding: 10,
      justifyContent:'center',
      alignItems:'center',
      gap:10,
      marginTop:'5%',
    }}>
    <Text style={[Styles.body_Medium]}>
      Scan at checkout to get a discount
    </Text>
    <BarCode />
    <Text style={[Styles.body_Regular]}>
      Or use the code 562636856714524
    </Text>
  </View>
  )
}