import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Color } from '../utiles/color';
import { StyleComponent } from '../utiles/styles';
import Mines from '../assets/svg/mines.svg';
import Plus from '../assets/svg/plus.svg';
interface CounterProps {
  initialValue?: number;
  stylesContainer?:ViewStyle
  textStyle?:ViewStyle
  onValueChange?: (value: number,type:string) => void;
}

const Counter = ({ initialValue = 0, onValueChange,stylesContainer,textStyle }: CounterProps) => {
  const { Styles } = StyleComponent();
  const [count,setCount] = useState(initialValue);

   useEffect(()=>{
    setCount(initialValue);
   },[initialValue]);

  const increment = () => {
    onValueChange?.(count + 1,'inc');
  };

  const decrement = () => {
    onValueChange?.(count - 1,'dec');
  };

  return (
    <View style={[styles.counterContainer, stylesContainer]}>
      <TouchableOpacity onPress={decrement} style={styles.button}>
       <Mines/>
      </TouchableOpacity>
      <Text style={[Styles.title_Bold, styles.countText,textStyle]}>{count}</Text>
      <TouchableOpacity onPress={increment} style={styles.button}>
      <Plus/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  button: {
    paddingHorizontal: 12,
  },
  buttonText: {
    color: Color.black,
    fontSize: 40,
  },
  countText: {
    color: Color.black,
    fontSize: 18,
    marginHorizontal: 10,
  },
});

export default Counter;
