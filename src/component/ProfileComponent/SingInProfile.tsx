import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Icon from 'react-native-vector-icons/FontAwesome6';
import BottomCardComponent from '../BottomCard';
export default function SingInProfile() {
  const {Styles} = StyleComponent();
  return (
    <View style={[Styles.container, Styles.justifyCenter]}>
      <View style={styles.fullWidth}>
        <View style={styles.avatarBox}>
          <Icon name="user-large" size={50} color={Color.white} />
          <Icon
            name="play"
            size={40}
            color={Color.primary}
            style={styles.playIcon}
          />
        </View>
        <Text style={[Styles.h4_Medium, Styles.textAlign, styles.mt8]}>
          Sign in to your profile
        </Text>
        <Text
          style={[
            Styles.h6_Regular,
            Styles.textAlign,
            Styles.alignSelf,
            styles.subText,
          ]}>
          to see your discount and personal offer for your order
        </Text>
        <BottomCardComponent title={'Sign in'} 
        style={styles.mt5}
        onHandler={function (): void {
                  throw new Error('Function not implemented.');
              } }/>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  fullWidth: { width: '100%' },
  avatarBox: {
    width: 131,
    height: 80,
    backgroundColor: Color.primary,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    transform: [{ rotate: '90deg' }],
    position: 'absolute',
    top: 60,
  },
  mt8: { marginTop: '8%' },
  subText: { marginTop: '2%', width: '70%' },
  mt5: { marginTop: '5%' },
});
