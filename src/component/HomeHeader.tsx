import { View, Text } from 'react-native'
import React from 'react'
import { StyleComponent } from '../utiles/styles'
import ArrowDown from '../assets/svg/ArrowsDown.svg'
import { Color } from '../utiles/color'
export default function HomeHeader() {
    const {Styles} = StyleComponent()
  return (
    <View style={[Styles.card,Styles.alignCenter,{borderColor:Color.background}]}>
      <Text style={[Styles.title_Medium,{marginLeft:'2%'}]}>Warsaw</Text>
       <ArrowDown />
    </View>
  )
}