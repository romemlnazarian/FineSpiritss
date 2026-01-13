import { View, Text, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import {Color} from '../../utiles/color';
import {StyleComponent} from '../../utiles/styles';
export default function Menu({onHandler,icon,title,style}:{onHandler:()=>void,icon:React.ReactNode,title:string,style?:ViewStyle}) {
  const {Styles} = StyleComponent();
  return (
    <View
    style={[{
      width: '93%',
      height: 40,
      flexDirection: 'row',
      backgroundColor: Color.white,
      alignSelf: 'center',
      borderRadius: 12,
      padding: 10,
      alignItems: 'center',
    },style]}>
        <TouchableOpacity onPress={onHandler} style={{marginLeft:'2%'}}>
          {icon}
        </TouchableOpacity>
    <Text style={[Styles.body_Medium, Styles.textAlign, {flex: 1}]}>
      {title}
    </Text>
  </View>
  )
}