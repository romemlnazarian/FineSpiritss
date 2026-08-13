import { View, Text } from 'react-native'
import React from 'react'
import { StyleComponent } from '../utiles/styles';
import LogoComponent from './LogoComponent';
import BottomCardComponent from './BottomCard';
import { Color } from '../utiles/color';
import {Language} from '../utiles/Language/i18n';


export default function RegisterSuccess({onClick}:{onClick:()=>void}) {
    const {Styles,Height} = StyleComponent();

  return (
    <View style={{alignItems:'center',flex:1,backgroundColor:Color.white}}>
        <LogoComponent style={{marginTop:'10%'}}/>
      <Text style={[Styles.h2_Medium,{marginTop:Height/5, color:Color.primary}]}>{Language.cheers}</Text>
      <Text style={[Styles.h5_Regular,Styles.textAlign,{width:'80%',marginTop:'2%'}]}>{Language.successfully_registered}</Text>
      <BottomCardComponent title={Language.start_shopping} onHandler={onClick} style={{position:'absolute',bottom:50}}/>
    </View>
  )
}