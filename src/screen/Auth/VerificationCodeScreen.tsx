import {Text, View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import CodeInput from '../../component/CodeInput';
import VerificationCodeLogic from '../../logic/VerificationCodeLogic';
import CustomHeader from '../../navigation/CustomHeader';
import LogoComponent from '../../component/LogoComponent';
import TextView from '../../component/TextView';
import {Language} from '../../utiles/Language/i18n';
import Timer from '../../Helper/Timer';
import TimerAndroid from '../../Helper/TimerAndroid';

export default function VerificationCodeScreen(route: any) {
  const {
    onCodeHandle,
    codeValid,
    restartKey,
    setRestartKey,
    setDisableTimer,
    DisableTimer,
    email,
    ResendCode,
  } = VerificationCodeLogic(route);
  const {Styles} = StyleComponent();
  return (
    <View style={Styles.container}>
      <CustomHeader showBack={true} />
      <LogoComponent />
      <TextView
        title={Language.Check_your_email_title}
        style={[Styles.h3_Bold, styles.titleStyle]}
      />
      <TextView
        title={`${Language.We_sent_code_to} ${email}`}
        style={[Styles.title_Regular, styles.subtitleStyle]}
      />
      <CodeInput isCodeValid={codeValid} onCodePress={e => onCodeHandle(e)} />
      <View style={styles.counterContainer}>
        <TouchableOpacity onPress={ResendCode} disabled={DisableTimer}>
          <Text style={[Styles.title_Medium, styles.sendCodeAgainText]}>
            {Language.Send_code_again}
          </Text>
        </TouchableOpacity>
        {Platform.OS === 'ios' ? (
          <Timer
            restartKey={restartKey}
            onCountdownComplete={() => {
              setDisableTimer(false);
              setRestartKey(false);
            }}
          />
        ) : (
          <TimerAndroid
            restartKey={restartKey}
            onCountdownComplete={() => {
              setDisableTimer(false);
              setRestartKey(false);
            }}
          />
        )}
      </View>
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
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center',
  },
  sendCodeAgainText: {
    marginRight: 10,
  },
});
