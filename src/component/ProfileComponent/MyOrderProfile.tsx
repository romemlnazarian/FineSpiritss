import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react'
import Arrow from 'react-native-vector-icons/MaterialIcons';
import {Color} from '../../utiles/color';
import {StyleComponent} from '../../utiles/styles';
import {Language} from '../../utiles/Language/i18n';
export default function MyOrderProfile({onHandler}:{onHandler:()=>void}) {
  const {Styles} = StyleComponent();
  return (
    <TouchableOpacity
    onPress={onHandler}
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
      <Text style={[Styles.title_Medium]}>{Language.profile_my_orders}</Text>
      <Text style={[Styles.title_Medium]}>{Language.profile_no_orders_yet}</Text>
    </View>
    <Arrow name="keyboard-arrow-right" size={25} color={Color.black} />
  </TouchableOpacity>
  )
}