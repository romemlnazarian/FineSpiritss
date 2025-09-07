import { View } from 'react-native'
import React from 'react'
import { StyleComponent } from '../utiles/styles'
import ModalCard from '../component/ModalCard'
import HomeLogic from '../Logic/HomeLogic'
import HomeHeader from '../component/HomeHeader'
export default function HomeScreen() {
  const {Styles} = StyleComponent()
  const {onSubmitClose,visible} = HomeLogic()
  return (
    <View style={Styles.container}>
      <HomeHeader/>
      <ModalCard isVisible={visible} onClose={onSubmitClose}/>
    </View>
  )
}