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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  dark?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  title: string;
  onHandler: () => void;
  icon?: ReactNode; // Added icon prop
  disabled?: boolean;
  showArrow?: boolean;
  arrowColor?: string;
};

const BottomCardComponent = (props: Props) => {
  const {Styles} = StyleComponent();
  const isDisabled = props.disabled === true;
  return (
    <TouchableOpacity
      activeOpacity={isDisabled ? 1 : 0.5}
      disabled={isDisabled}
      onPress={() => {
        if (!isDisabled) {
          props.onHandler();
        }
      }}
      style={[
        styles.container,
        isDisabled ? styles.containerDisabled : styles.containerEnabled,
        props.style,
      ]}>
      <View style={styles.contentContainer}>
        <Text
          style={[
            styles.text,
            Styles.title_Regular,
            isDisabled ? styles.textDisabled : styles.textEnabled,
            props.textStyle,
          ]}>
          {props.title}
        </Text>
        {props.icon ? (
          <View style={styles.iconContainer}>{props.icon}</View>
        ) : props.showArrow ? (
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="arrow-forward-ios"
              size={18}
              color={props.arrowColor || (isDisabled ? '#FFFFFF' : '#FFFFFF')}
            />
          </View>
        ) : null}
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
    padding: 12,
  },
  containerEnabled: {
    backgroundColor: Color.primary,
    borderColor: Color.primary,
  },
  containerDisabled: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderColor: 'rgba(0,0,0,0.25)',
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
  },
  textEnabled: { color: Color.white },
  textDisabled: { color: Color.white },
});

export default BottomCardComponent;
