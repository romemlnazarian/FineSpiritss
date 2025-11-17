// src/components/CustomHeader.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
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
};

export default function CustomHeader({ title, showBack = false, icon, onHandler, subTitle, description, onSubmitBack }: CustomHeaderProps) {
  const navigation = useNavigation();
  const {Styles} = StyleComponent()
  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
      {showBack && (
        <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
          <TouchableOpacity onPress={ onSubmitBack ? onSubmitBack : () => navigation.goBack()} >
          <Arrow width={30} height={30}/>
        </TouchableOpacity>
        <View>
        <Text style={[styles.title,Styles.h5_Regular]}>{subTitle || ''}</Text>
        <Text style={[styles.title,Styles.subtitle_Regular,{color:Color.gray}]}>{description || ''}</Text>
        </View>
        </View>
      
      )}
      </View>
      <View style={styles.centerTitleContainer} pointerEvents="none">
        <Text style={[styles.title,Styles.h5_Regular]}>{title || ''}</Text>
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
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
    justifyContent:'space-between',
    position:'relative',
  },
  leftContainer: {
    width: '40%',
    alignItems:'flex-start',
    justifyContent:'center',
  },
  rightContainer: {
    width: 40,
    alignItems:'flex-end',
    justifyContent:'center',
  },
  centerTitleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Color.black,
  },
});
