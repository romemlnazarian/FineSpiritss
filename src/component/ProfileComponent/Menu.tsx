import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather';
import {Color} from '../../utiles/color';
import {StyleComponent} from '../../utiles/styles';
export default function Menu({onHandler}:{onHandler:()=>void}) {
  const {Styles} = StyleComponent();
  return (
    <View
    style={{
      width: '90%',
      height: 40,
      flexDirection: 'row',
      backgroundColor: Color.white,
      alignSelf: 'center',
      borderRadius: 12,
      padding: 10,
      alignItems: 'center',
    }}>
        <TouchableOpacity onPress={onHandler}>
        <Icon name="menu" size={20} color={Color.black} />
        </TouchableOpacity>
    <Text style={[Styles.body_Medium, Styles.textAlign, {flex: 1}]}>
      Stanisław Piotrowski
    </Text>
  </View>
  )
}