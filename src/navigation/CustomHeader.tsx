// src/components/CustomHeader.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../utiles/color';
import Arrow from '../assets/svg/Arrows.svg';

type CustomHeaderProps = {
  title?: string;
  showMenu?: boolean;
  showBack?: boolean;
};

export default function CustomHeader({ title, showBack = false }: CustomHeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {showBack && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Arrow width={30} height={30}/>
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title || ''}</Text>
      </View>
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
  },
  backButton: {
    marginRight: 10,
    padding: 8,
  },
  titleContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.black,
  },
});
