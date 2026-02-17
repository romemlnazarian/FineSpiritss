import React from 'react'
import LogoComponent from './LogoComponent'
import { Platform, View } from 'react-native'
export default function HomeHeader() {
  return (
    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center',marginTop: Platform.OS === 'ios' ? '10%' : '5%'}}>
      <LogoComponent width={120} height={80} style={{marginLeft: '5%'}}/>
    </View>
  )
}