import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {StyleComponent} from '../utiles/styles';
import BottomCardComponent from './BottomCard';
import Check from 'react-native-vector-icons/FontAwesome6';
import {Color} from '../utiles/color';
export default function SuccessComponent({
  title,
  discription,
  buttomVisible,
  onHandler,
}: {
  title: string;
  discription: string;
  buttomVisible: boolean;
  onHandler: () => void;
}) {
  const {Styles} = StyleComponent();
  return (
    <View style={[Styles.alignCenter, styles.container]}>
      <View style={styles.iconCircle}>
        <Check name="check" size={50} color={Color.white} />
      </View>
      <Text style={[Styles.h3_Medium,{marginTop:'2%'}]}>{title}</Text>
      <Text
        style={[
          Styles.body_Regular,
          Styles.textAlign,
          styles.description,
        ]}>
        {discription}
      </Text>
      {buttomVisible && (
        <BottomCardComponent
          title="My orders"
          onHandler={onHandler}
          style={styles.buttonSpacing}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '2%',
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: Color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
  },
  description: {
    marginTop: '5%',
    width: '70%',
  },
  buttonSpacing: {
    marginTop: '5%',
  },
});
