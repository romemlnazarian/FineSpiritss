import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import CodeInput from '../CodeInput';
import Timer from '../../Helper/Timer';
import {StyleComponent} from '../../utiles/styles';
export default function CheckEmailSetting() {
  const {Styles} = StyleComponent();
  const [DisableTimer, setDisableTimer] = useState<boolean>(true);
  const [codeValid, setCodeValid] = useState<boolean>(true);
  const [restartKey, setRestartKey] = useState<number>(0);

    const onCodeHandle = (value: string) => {
        if (value.length === 6) {
      setCodeValid(true);
        } else {
      setCodeValid(true);
        }
  };

  const onHandlerTimer = () => {
    setDisableTimer(true);
    setRestartKey(prev => prev + 1);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      style={styles.wrapper}>
      <Text style={[Styles.h5_Medium, Styles.textAlign]}>
        Please check your Email
      </Text>
      <Text style={[Styles.title_Regular, Styles.textAlign, styles.subtitle]}>
        We’ve sent a code to Newemail@gmail.com
      </Text>
          <CodeInput isCodeValid={codeValid} onCodePress={e => onCodeHandle(e)} />
      <View style={[Styles.justifyCenter, styles.actions]}>
        <TouchableOpacity 
         onPress={onHandlerTimer}
        activeOpacity={0.5} disabled={DisableTimer}>
          <Text style={Styles.title_Medium}>Send Code Again</Text>
        </TouchableOpacity>
        <Timer restartKey={restartKey} startSeconds={60} onCountdownComplete={() => setDisableTimer(false)} />
    </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: '5%',
  },
  subtitle: {
    marginTop: '2%',
  },
  actions: {
    gap: 10,
  },
});
