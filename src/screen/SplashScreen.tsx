import { View } from 'react-native';
import React from 'react';
import LogoComponent from '../component/LogoComponent';
import { StyleComponent } from '../utiles/styles';
import Union_1 from '../assets/svg/Union1.svg'
import SplashScreenLogic from '../Logic/SplashScreenLogic';
export default function SplashScreen() {
  SplashScreenLogic();
  const {Styles} = StyleComponent();
  return (
    <View style={[Styles.container,Styles.justifyCenter]}>
      <LogoComponent style={{marginBottom:'20%'}}/>
      <View style={{position:'absolute',bottom:'0%'}}>
      <Union_1/>
      </View>
    </View>
  )
}