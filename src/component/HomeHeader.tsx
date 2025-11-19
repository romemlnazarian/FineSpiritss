import React from 'react'
import LogoComponent from './LogoComponent'
import { View } from 'react-native'
export default function HomeHeader() {
  return (
    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
      <LogoComponent width={150} height={100} style={{marginRight:'5%'}}/>
    </View>
  )
}