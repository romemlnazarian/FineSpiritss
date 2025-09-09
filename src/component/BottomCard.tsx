import React, {ReactNode} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import {Color} from '../utiles/color';
import {StyleComponent} from '../utiles/styles';

type Props = {
  dark?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  title: string;
  onHandler: () => void;
  icon?: ReactNode; // Added icon prop
};

const BottomCardComponent = (props: Props) => {
  const {Styles} = StyleComponent();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => props.onHandler()}
      style={[styles.container, props.style]}>
      <View style={styles.contentContainer}>
        <Text style={[styles.text, Styles.title_Regular, props.textStyle]}>
          {props.title}
        </Text>
        {props.icon && <View style={styles.iconContainer}>{props.icon}</View>}
      </View>
    </TouchableOpacity>
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
    padding: 12,
    backgroundColor: Color.primary,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginLeft: 5, // Adjust spacing between icon and text
  },
  text: {
    fontFamily: 'Satoshi-Regular',
    color: Color.white,
  },
});

export default BottomCardComponent;
