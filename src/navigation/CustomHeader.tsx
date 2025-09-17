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
};

export default function CustomHeader({ title, showBack = false, subTitle, icon, onHandler }: CustomHeaderProps) {
  const navigation = useNavigation();
  const {Styles} = StyleComponent()
  return (
    <View style={styles.header}>
      <View style={styles.backButton}>
      {showBack && (
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Arrow width={30} height={30}/>
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>
        <Text style={[styles.title,Styles.h5_Regular]}>{title || ''}</Text>
      </View>
      </View>
       <Text style={[Styles.h5_Regular,Styles.textAlign]}>{subTitle}</Text>
       <TouchableOpacity onPress={onHandler}>
       {icon}
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
  },
  backButton: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  titleContainer: {
    justifyContent: 'center',
  },
  title: {
    color: Color.black,
  },
});
