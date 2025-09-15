import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Color } from '../utiles/color';
import { StyleComponent } from '../utiles/styles';
import Mines from '../assets/svg/mines.svg';
import Plus from '../assets/svg/plus.svg';
interface CounterProps {
  initialValue?: number;
  onValueChange?: (value: number) => void;
}

const Counter = ({ initialValue = 1, onValueChange }: CounterProps) => {
  const { Styles } = StyleComponent();
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount(prevCount => {
      const newCount = prevCount + 1;
      onValueChange?.(newCount);
      return newCount;
    });
  };

  const decrement = () => {
    setCount(prevCount => {
      const newCount = prevCount > 1 ? prevCount - 1 : 1;
      onValueChange?.(newCount);
      return newCount;
    });
  };

  return (
    <View style={styles.counterContainer}>
      <TouchableOpacity onPress={decrement} style={styles.button}>
       <Mines/>
      </TouchableOpacity>
      <Text style={[Styles.title_Bold, styles.countText]}>{count}</Text>
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
    paddingHorizontal: 15,
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