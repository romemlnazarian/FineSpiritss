import { View, StyleSheet } from 'react-native';
import React from 'react';
import LogoComponent from '../component/LogoComponent';
import { StyleComponent } from '../utiles/styles';
import Union_1 from '../assets/svg/Union1.svg';
import SplashScreenLogic from '../logic/SplashScreenLogic';
export default function SplashScreen() {
  SplashScreenLogic();
  const {Styles} = StyleComponent();
  return (
    <View style={[Styles.container,Styles.justifyCenter]}>
      <LogoComponent style={splashStyles.logo}/>
      <View style={splashStyles.bottom}>
      <Union_1/>
      </View>
    </View>
  );
}
const splashStyles = StyleSheet.create({
  logo: { marginBottom: '20%' },
  bottom: { position: 'absolute', bottom: '0%' },
});