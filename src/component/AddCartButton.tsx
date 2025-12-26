import React from 'react';
import {
  StyleSheet,
  ViewStyle,
  View,
} from 'react-native';
import {Color} from '../utiles/color';
import Counter from './Counter'; // Import the new Counter component

type Props = {
  dark?: boolean;
  style?: ViewStyle;
  onQuantityChange?: (value: number) => void;
};

const AddCardButton = (props: Props) => {
  return (
    <View
      style={[styles.container, props.style]}>
      <View style={styles.contentContainer}>
        <Counter initialValue={1} onValueChange={props.onQuantityChange} />
      </View>
    </View>
  );
};
//
const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 54,
    borderRadius: 16,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Color.primary,
    backgroundColor: Color.white,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddCardButton;
