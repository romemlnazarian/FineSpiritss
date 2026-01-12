// src/components/CustomHeader.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ViewStyle, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../utiles/color';
import Arrow from '../assets/svg/Arrows.svg';
import { StyleComponent } from '../utiles/styles';
type CustomHeaderProps = {
  title?: string;
  showBack?: boolean;
  subTitle?: string;
  icon?: React.ReactNode;
  onHandler?: () => void;
  description?: string;
  onSubmitBack?: () => void;
  style?: ViewStyle;
};

export default function CustomHeader({ title, showBack = false, icon, onHandler, subTitle, description, onSubmitBack,style }: CustomHeaderProps) {
  const navigation = useNavigation();
  const {Styles} = StyleComponent()
  return (
    <View style={[styles.header,style]}>
      <View style={styles.leftContainer}>
      {showBack && (
          <TouchableOpacity onPress={ onSubmitBack ? onSubmitBack : () => navigation.goBack()} >
          <Arrow width={30} height={30}/>
        </TouchableOpacity>
      
      )}
      </View>
      <View style={styles.centerTitleContainer} pointerEvents="none">
        <Text style={[styles.title,Styles.h5_Regular]} numberOfLines={1} ellipsizeMode="tail">{title || ''}</Text>
      </View>
      <TouchableOpacity onPress={onHandler} style={styles.rightContainer}>
        <View>
        {icon}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.background,
    flexDirection: 'row',
    alignItems: 'flex-end',
    height:Platform.OS === 'ios' ? 70 : 60,
    paddingHorizontal: 16,
    paddingVertical: 5,
    justifyContent:'space-between',
    position:'relative',
    marginTop: 10,
  },
  leftContainer: {
    width: '40%',
  },
  rightContainer: {
    width: 40,

  },
  centerTitleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 5,
  },
  title: {
    color: Color.black,
    width: '70%',
  },
});
