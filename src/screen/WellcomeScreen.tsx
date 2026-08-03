import {View, Text, StyleSheet, BackHandler, TouchableOpacity} from 'react-native';
import React from 'react';
import LogoComponent from '../component/LogoComponent';
import {StyleComponent} from '../utiles/styles';
import BottomCardComponent from '../component/BottomCard';
import {Color} from '../utiles/color';
import {Language} from '../utiles/Language/i18n';
import {WellcomeLogic} from '../logic/WellcomeLogic';
import {Image} from 'react-native';
import Layer from '../assets/svg/Layer.svg';
import {BottomSheet} from '../component/BottomSheet';
import {useFocusEffect} from '@react-navigation/native';
import type {AppLanguage} from '../zustland/localizationStore';

export default function WellcomeScreen() {
  const {Styles} = StyleComponent();
  const {
    onSubmit,
    deleteAccountDone,
    onHandlerClose,
    currentLanguage,
    selectLanguage,
  } = WellcomeLogic();

  const languageOptions: {id: AppLanguage; label: string}[] = [
    {id: 'en', label: 'EN'},
    {id: 'pl', label: 'PL'},
  ];

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => {
        subscription.remove();
      };
    }, []),
  );

  return (
    <View style={Styles.container}>
      <View style={[StyleSheet.absoluteFill]}>
        <Image
          source={require('../assets/images/background.png')}
          style={{width: '100%', height: '100%', opacity: 0.5}}
        />
      </View>

      <LogoComponent width={300} style={styles.margintop} />
      <Text
        style={[
          styles.width,
          Styles.h3_Bold,
          Styles.textAlign,
          Styles.alignSelf,
          styles.margintopTitle,
        ]}>
        {Language.wellcomTitle}
      </Text>
      <Text
        style={[
          Styles.body_Regular,
          Styles.fontFamily,
          Styles.textAlign,
          Styles.alignSelf,
          styles.margintopTwo,
          styles.width,
        ]}>
        {Language.wellcomeText}
      </Text>

      <View style={styles.bottomStyles}>
        <View style={styles.languageSwitch}>
          {languageOptions.map(option => {
            const isActive = currentLanguage === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                activeOpacity={0.8}
                onPress={() => selectLanguage(option.id)}
                style={[
                  styles.languageOption,
                  isActive && styles.languageOptionActive,
                ]}>
                <Text
                  style={[
                    Styles.title_Medium,
                    styles.languageOptionText,
                    isActive && styles.languageOptionTextActive,
                  ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <BottomCardComponent
          title={Language.singUp}
          onHandler={() => onSubmit('signup')}
          style={styles.marginBottom}
        />
        <BottomCardComponent
          title={Language.singIn}
          onHandler={() => onSubmit('signin')}
          style={{backgroundColor: 'transparent'}}
          textStyle={{color: Color.primary}}
        />
      </View>
      {deleteAccountDone && (
        <BottomSheet
          modalVisible={deleteAccountDone}
          height={350}
          onClose={() => onHandlerClose()}>
          <View style={styles.bottomSheetContainer}>
            <Layer />
            <Text
              style={[Styles.h6_Medium, Styles.textAlign, {marginTop: '5%'}]}>
              {Language.delete_deleted_title}
            </Text>
            <Text
              style={[
                Styles.title_Regular,
                Styles.textAlign,
                {marginTop: '2%'},
              ]}>
              {Language.delete_deleted_subtitle}
            </Text>
            <BottomCardComponent
              title={Language.Done}
              onHandler={() => onHandlerClose()}
              style={{marginTop: '5%'}}
            />
          </View>
        </BottomSheet>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  margintop: {
    marginTop: '30%',
  },
  width: {
    width: '80%',
  },
  margintopTitle: {
    marginTop: '20%',
  },
  margintopTwo: {
    marginTop: '5%',
  },
  bottomStyles: {
    position: 'absolute',
    width: '100%',
    bottom: 30,
  },
  marginBottom: {
    marginBottom: 10,
  },
  bottomSheetContainer: {
    width: '93%',
    alignSelf: 'center',
    marginTop: '2%',
    alignItems: 'center',
  },
  languageSwitch: {
    alignSelf: 'center',
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: Color.primary,
  },
  languageOption: {
    minWidth: 44,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageOptionActive: {
    backgroundColor: Color.primary,
  },
  languageOptionText: {
    color: Color.primary,
  },
  languageOptionTextActive: {
    color: Color.white,
  },
});
