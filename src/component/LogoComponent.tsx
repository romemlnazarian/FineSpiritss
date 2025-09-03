import { View, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import Logo from '../assets/svg/Logo_Fine_Spirits.svg';
import { StyleComponent } from '../utiles/styles';

interface LogoComponentProps {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

export default function LogoComponent({ width, height, style }: LogoComponentProps) {
  const {Styles} = StyleComponent();
  return (
    <View style={[style,Styles.alignSelf]}>
      <Logo width={width || 250} height={height || 100} />
    </View>
  );
}