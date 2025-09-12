import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { StyleComponent } from '../../utiles/styles';
import { Color } from '../../utiles/color';

interface CatalogKosherProps {
  onHandler: () => void;
}

export default function CatalogKosher({onHandler}: CatalogKosherProps) {
  const {Styles} = StyleComponent();
  
  return (
    <View style={styles.container}>
      <Text style={[Styles.h5_Medium, Styles.textAlign]}>Kosher</Text>
      
      <View style={styles.optionContainer}>
        <Text style={[Styles.body_Regular]}>Yes</Text>
        <TouchableOpacity 
          style={styles.radioButton}
          onPress={onHandler}
        />
      </View>
      
      <View style={styles.optionContainer}>
        <Text style={[Styles.body_Regular]}>No</Text>
        <TouchableOpacity 
          style={styles.radioButton}
          onPress={onHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '98%',
    alignSelf: 'center',
    marginTop: '2%',
  },
  optionContainer: {
    width: '93%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '5%',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: Color.gray,
    borderRadius: 24,
  },
});