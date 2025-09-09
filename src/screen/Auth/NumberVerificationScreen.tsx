import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import NumberVerificationLogic from '../../Logic/NumberVerificationLogic';
import CustomHeader from '../../navigation/CustomHeader';
import LogoComponent from '../../component/LogoComponent';
import TextView from '../../component/TextView';
import {BottomSheet} from '../../component/BottomSheet';
import Search from '../../assets/svg/Search.svg';
import Check from '../../assets/svg/Check.svg';
import ArrowsDown from '../../assets/svg/ArrowsDown.svg';
import {Language} from '../../utiles/Language/i18n';
import TextInputComponent from '../../component/TextInputComponent';
import {Color} from '../../utiles/color';
export default function NumberVerificationScreen() {
  const {check, onSubmit, visible, onHandler, setVisible} =
    NumberVerificationLogic();
  const {Styles} = StyleComponent();
  return (
    <View style={Styles.container}>
      <CustomHeader showBack={true} />
      <LogoComponent />
      <TextView
        title={'Phone Verification'}
        style={[Styles.h3_Bold, styles.titleStyle]}
      />
      <TextView
        title={'We need to register your phone number before getting started '}
        style={[Styles.title_Regular, styles.subtitleStyle]}
      />
      <TouchableOpacity
        onPress={onSubmit}
        style={[Styles.card, styles.phoneNumberInputContainer]}>
        <View
          style={styles.redCircleStyle}
        />
        <View style={styles.arrowDownMargin}>
          <ArrowsDown />
        </View>
        <Text style={[Styles.title_Regular, styles.phoneNumberText]}>
          + xx xxx xx xx
        </Text>
      </TouchableOpacity>
      <BottomSheet modalVisible={visible} height={400} onClose={()=>setVisible(false)}>
        <View>
          <TextInputComponent
            containerStyle={styles.textInputContainer}
            placeholder={Language.Search}
            onChangeText={() => console.log()}
            value={''}
            leftIcon={<Search width={25} height={25} />}
          />
          <ScrollView>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onHandler}
              style={styles.countryItemContainer}>
              <View style={styles.countryItemLeft}>
                <View
                  style={styles.redCircleStyle}
                />
                <Text style={[Styles.title_Regular, styles.countryNameText]}>
                  Germany
                </Text>
              </View>
              <View
                style={[Styles.justifyCenter, styles.checkmarkCircleStyle]}>
                {!check && <Check />}
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    textAlign: 'left',
    marginLeft: '5%',
    marginTop: '10%',
  },
  subtitleStyle: {
    textAlign: 'left',
    marginLeft: '5%',
    marginTop: '2%',
  },
  textInputContainer: {
    marginTop: 15,
    height: 54,
    borderRadius: 16,
  },
  phoneNumberInputContainer: {
    height: 54,
    alignItems: 'center',
  },
  redCircleStyle: {
    width: 24,
    height: 24,
    backgroundColor: 'red',
    borderRadius: 24,
  },
  arrowDownMargin: {
    marginLeft: 5,
  },
  phoneNumberText: {
    marginLeft: 10,
  },
  countryItemContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: '5%',
    justifyContent: 'space-between',
  },
  countryItemLeft: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  countryNameText: {
    marginLeft: 10,
  },
  checkmarkCircleStyle: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: Color.primary,
  },
});
