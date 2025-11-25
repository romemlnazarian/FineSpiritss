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
import {StyleComponent} from '../../utiles/styles';
import TimerAndroid from '../../Helper/TimerAndroid';
import { ResendOtpModel } from '../../model/Auth/ResendOtpModel';
import { useToast } from '../../utiles/Toast/ToastProvider';
import { VerifyEmailModel } from '../../model/Setting/SettingModel';
import useProfileStore from '../../zustland/ProfileStore';
import { refreshTokenModel } from '../../model/Auth/RefreshTokenModel';
import useAuthStore from '../../zustland/AuthStore';
import { Color } from '../../utiles/color';
export default function CheckEmailSetting({email,callBack}:{email:string,callBack:()=>void}) {
  const {show} = useToast();
  const {Styles} = StyleComponent();
  const {profile,setProfile} = useProfileStore();
  const {token,refreshToken, setToken, setRefreshToken} = useAuthStore();
  const [DisableTimer, setDisableTimer] = useState<boolean>(true);
  const [codeValid, setCodeValid] = useState<boolean>(true);
  const [restartKey, setRestartKey] = useState<boolean>(true);
 const[error, setError] = useState<string>('');
    const onCodeHandle = (value: string) => {
        if (value.length === 5) {
          VerifyEmailModel(
            token,
            value,
            (data) => {
              show(data, {type: 'success'});
              setProfile({...profile, email: email});
              callBack();
            },
            error => {
               refreshTokenModel(refreshToken, data => {
                setToken(data.access);
                setRefreshToken(data.refresh);
                VerifyEmailModel(
                  email,
                  value,
                  (data) => {
                    show(data, {type: 'success'});
                    setProfile({...profile, email: email});
                    callBack();
                  },
                  error => {
                    setError(error);
                  },
                );
              }, error => {
                setError(error);
              });
            },
          );
        } else {
         setCodeValid(true);
        }
  };

  const onHandlerTimer = () => {
    if (DisableTimer) return;
    setDisableTimer(true);
    setRestartKey(true);
    ResendOtpModel(
      email,
      () => {
        show('Code sent again', {type: 'success'});
      },
      error => {
        show(String(error || 'Resend failed'), {type: 'error'});
      },
    );

  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      style={styles.wrapper}>
      <Text style={[Styles.h5_Medium, Styles.textAlign]}>
        Please check your Email
      </Text>
      <Text style={[Styles.title_Regular, Styles.alignSelf, styles.subtitle]} numberOfLines={1}>
        We’ve sent a code to {email}
      </Text>
      {error && <Text style={[Styles.title_Regular, Styles.textAlign, {color: Color.red,marginTop:'2%'}]}>{error}</Text>}
          <CodeInput isCodeValid={codeValid} onCodePress={e => onCodeHandle(e)} />
      <View style={[Styles.justifyCenter, styles.actions]}>
        <TouchableOpacity 
         onPress={onHandlerTimer}
        activeOpacity={0.5} disabled={DisableTimer}>
          <Text style={Styles.title_Medium}>Send Code Again</Text>
        </TouchableOpacity>
        <TimerAndroid
            restartKey={restartKey}
            onCountdownComplete={() => {
              setDisableTimer(false);
              setRestartKey(false);
            }}
          />
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
    width: '80%',
  },
  actions: {
    gap: 10,
  },
});
