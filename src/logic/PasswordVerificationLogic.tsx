import {useFocusEffect, useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {AuthScreenNavigationProp} from '../navigation/types';
import {useState} from 'react';
import React from 'react';
import {PasswordVerifyModel} from '../model/Auth/PasswordVerifyModel';
import {useToast} from '../utiles/Toast/ToastProvider';
import {BackHandler} from 'react-native';
import useAuthStore from '../zustland/AuthStore';
import {Language} from '../utiles/Language/i18n';

export const PasswordVerificationLogic = (route: any) => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const {setToken, setRefreshToken, setIsLoggedIn} = useAuthStore();
  const {setAgeConfirmed} = useAuthStore();
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const {email} = route?.route?.params;
  const {show} = useToast();
  const [showVideo, setShowVideo] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);
  const [state, setState] = useState({access: '', refresh: ''});
  const videoFinishedRef = React.useRef(false);
  const videoFallbackTimerRef = React.useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

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

  React.useEffect(() => {
    return () => {
      if (videoFallbackTimerRef.current) {
        clearTimeout(videoFallbackTimerRef.current);
      }
    };
  }, []);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required(Language.password_required)
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be at most 20 characters')
      .matches(/[0-9]/, 'Password must include at least 1 number')
      .matches(/[A-Z]/, 'Password must include at least 1 upper case letter')
      .matches(
        /[^A-Za-z0-9]/,
        'Password must include at least 1 special character',
      )
      .trim(),
    repeatpassword: Yup.string()
      .trim()
      .required(Language.repeat_password_required)
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      password: '',
      repeatpassword: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const passwordValue = watch('password');
  React.useEffect(() => {
    validatePassword(passwordValue);
  }, [passwordValue]);

  const validatePassword = (password: string) => {
    setIsLengthValid(password.length >= 8 && password.length <= 20);
    setHasNumber(/[0-9]/.test(password));
    setHasUpperCase(/[A-Z]/.test(password));
    setHasSpecialChar(/[^A-Za-z0-9]/.test(password));
  };

  const clearVideoFallback = React.useCallback(() => {
    if (videoFallbackTimerRef.current) {
      clearTimeout(videoFallbackTimerRef.current);
      videoFallbackTimerRef.current = null;
    }
  }, []);

  const finishVideo = React.useCallback(() => {
    if (videoFinishedRef.current) {
      return;
    }
    videoFinishedRef.current = true;
    clearVideoFallback();
    setShowVideo(false);
    setShowSuccess(true);
  }, [clearVideoFallback]);

  const onSubmit = async () => {
    const values = getValues();
    setLoading(true);
    PasswordVerifyModel(
      email,
      values.password.trim(),
      values.repeatpassword.trim(),
      data => {
        console.log('aloooooo', data);
        reset({password: '', repeatpassword: ''});
        setState({access: data?.access, refresh: data?.refresh});
        setLoading(false);
        videoFinishedRef.current = false;
        clearVideoFallback();
        setShowVideo(true);
        videoFallbackTimerRef.current = setTimeout(() => {
          finishVideo();
        }, 20000);
      },
      (error: any) => {
        const msg = String(error || 'Password does not meet requirements');
        show(msg, {type: 'error'});
        setLoading(false);
      },
    );
  };

  const onHandleShowPass = (key: string) => {
    key === 'pass'
      ? setShowPass(prev => !prev)
      : setShowRepeatPass(prev => !prev);
  };

  const onHandler = () => {
    setIsLoggedIn(true);
    setAgeConfirmed(true);
    setToken(state.access);
    setRefreshToken(state.refresh);
    setTimeout(() => {
      navigation.navigate('AppTabs');
    }, 300);
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    isLengthValid,
    hasNumber,
    hasUpperCase,
    hasSpecialChar,
    validatePassword,
    getValues,
    onHandleShowPass,
    showPass,
    showRepeatPass,
    loading,
    showVideo,
    ShowSuccess,
    onHandler,
    finishVideo,
  };
};
