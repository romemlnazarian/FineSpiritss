import React from 'react'
import LogoComponent from './LogoComponent'
import { Platform, TouchableOpacity, View } from 'react-native'
import Notif from 'react-native-vector-icons/Ionicons'
import { Color } from '../utiles/color'
import { useNavigation } from '@react-navigation/native'
export default function HomeHeader() {
  const navigation:any = useNavigation()
  return (
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',marginTop: Platform.OS === 'ios' ? '10%' : '5%'}}>
      <LogoComponent width={120} height={80} style={{marginLeft: '5%'}}/>
      <TouchableOpacity onPress={() =>navigation.navigate('Notification')} style={{marginRight: '5%'}}>
        <Notif name='notifications-outline' size={30} color={Color.black} />
      </TouchableOpacity>

    </View>
  )
}