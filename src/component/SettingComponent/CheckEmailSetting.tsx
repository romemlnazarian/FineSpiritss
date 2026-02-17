import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useRef, useState} from 'react';
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
import { Language } from '../../utiles/Language/i18n';
export default function CheckEmailSetting({email,callBack}:{email:string,callBack:()=>void}) {
  const {show} = useToast();
  const {Styles} = StyleComponent();
  const {updateProfile} = useProfileStore();
  const {token,refreshToken, setToken, setRefreshToken} = useAuthStore();
  const [DisableTimer, setDisableTimer] = useState<boolean>(true);
  const [codeValid, setCodeValid] = useState<boolean>(true);
  const [restartKey, setRestartKey] = useState<boolean>(true);
  const[error, setError] = useState<string>('');
  const [_isOtpExpired, setIsOtpExpired] = useState<boolean>(false);
  const isOtpExpiredRef = useRef<boolean>(false);

  const markOtpExpired = () => {
    isOtpExpiredRef.current = true;
    setIsOtpExpired(true);
    setCodeValid(false);
  };

  const resetOtpExpired = () => {
    isOtpExpiredRef.current = false;
    setIsOtpExpired(false);
  };

  const onCodeHandle = (value: string) => {
    if (isOtpExpiredRef.current) {
      setCodeValid(false);
      show(Language.setting_code_expired, {type: 'error'});
      return;
    }

    if (value.length === 5) {
      VerifyEmailModel(
        token,
        value,
        (data) => {
          if (isOtpExpiredRef.current) {
            setCodeValid(false);
            show(Language.setting_code_expired, {type: 'error'});
            return;
          }
          // show(data, {type: 'success'});
          console.log('email=========>', data);
          updateProfile({email});
          callBack();
        },
        () => {
          refreshTokenModel(
            refreshToken,
            refreshedTokens => {
              setToken(refreshedTokens.access);
              setRefreshToken(refreshedTokens.refresh);
              VerifyEmailModel(
                refreshedTokens.access,
                value,
                (data) => {
                  show(data, {type: 'success'});
                  updateProfile({email});
                  callBack();
                },
                err => {
                  setError(String(err || Language.setting_verification_failed));
                  setCodeValid(false);
                },
              );
            },
            err => {
              setError(String(err || Language.setting_verification_failed));
              setCodeValid(false);
            },
          );
        },
      );
    } else {
      setCodeValid(true);
      if (error) {
        setError('');
      }
    }
  };

  const onHandlerTimer = () => {
    if (DisableTimer) {
      return;
    }
    setDisableTimer(true);
    setRestartKey(true);
    resetOtpExpired();
    setCodeValid(true);
    if (error) {
      setError('');
    }
    ResendOtpModel(
      email,
      () => {
        show(Language.setting_code_sent_again, {type: 'success'});
      },
      err => {
        show(String(err || Language.setting_resend_failed), {type: 'error'});
      },
    );

  };
  return (
    <KeyboardAvoidingView
      behavior={ 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      style={styles.wrapper}>
      <Text style={[Styles.h5_Medium, Styles.textAlign,{marignbottom:20}]}>
        {Language.Check_your_email_title}
      </Text>
      <Text style={[Styles.title_Regular, Styles.alignSelf, styles.subtitle]} numberOfLines={1}>
        {Language.We_sent_code_to} {email}
      </Text>
      {error && (
        <Text style={[Styles.title_Regular, Styles.textAlign, styles.errorText]}>
          {error}
        </Text>
      )}
          <CodeInput isCodeValid={codeValid} onCodePress={e => onCodeHandle(e)} />
      <View style={[Styles.justifyCenter, styles.actions]}>
        <TouchableOpacity
         onPress={onHandlerTimer}
        activeOpacity={0.5} disabled={DisableTimer}>
          <Text style={Styles.title_Medium}>{Language.Send_code_again}</Text>
        </TouchableOpacity>
        <TimerAndroid
            restartKey={restartKey}
            onCountdownComplete={() => {
              setDisableTimer(false);
              setRestartKey(false);
              markOtpExpired();
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
  errorText: {
    color: Color.red,
    marginTop: '2%',
  },
  actions: {
    gap: 10,
  },
});
