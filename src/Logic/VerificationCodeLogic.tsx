import {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationProp} from '../navigation/types';
import {VerifyCodeModel} from '../model/Auth/VerifyCodeModel';
import {ResendOtpModel} from '../model/Auth/ResendOtpModel';
import {useToast} from '../utiles/Toast/ToastProvider';

export default function VerificationCodeLogic(route: any) {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const {email} = route?.route?.params;
  const {show} = useToast();

  const [restartKey, setRestartKey] = useState<boolean>(true);
  const [DisableTimer, setDisableTimer] = useState<boolean>(true);
  const [codeValid, setCodeValid] = useState<boolean>(true);
  const [disable, setDisable] = useState<boolean>(false);
  const [isOtpExpired, setIsOtpExpired] = useState<boolean>(false);
  const isOtpExpiredRef = useRef<boolean>(false);

  const markOtpExpired = () => {
    isOtpExpiredRef.current = true;
    setIsOtpExpired(true);
  };

  const resetOtpExpired = () => {
    isOtpExpiredRef.current = false;
    setIsOtpExpired(false);
  };

  const onCodeHandle = (value: string) => {
    if (!restartKey || isOtpExpiredRef.current) {
      setCodeValid(false);
      show('Code expired', {type: 'error'});
      return;
    }
    if (value.length === 5) {
      VerifyCodeModel(
        email,
        value,
        (_data) => {
          if (isOtpExpiredRef.current) {
            setCodeValid(false);
            show('Code expired', {type: 'error'});
            return;
          }
          navigation.navigate('PasswordVerification', {email: email});
          show('Code verified', {type: 'success'});
        },
        error => {
          setCodeValid(false);
          show(String(error || 'Something went wrong'), {type: 'error'});
        },
      );
    }
  };

  const ResendCode = () => {
    if (DisableTimer) {
      return;
    }
    setDisable(true);
    setDisableTimer(true);
    setRestartKey(true);
    resetOtpExpired();
    setCodeValid(true);
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
  return {
    onCodeHandle,
    codeValid,
    restartKey,
    setRestartKey,
    DisableTimer,
    setDisableTimer,
    setDisable,
    disable,
    email,
    ResendCode,
    isOtpExpired,
    markOtpExpired,
    resetOtpExpired,
  };
}
