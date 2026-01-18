import {useFocusEffect, useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {AuthScreenNavigationProp} from '../navigation/types';
import { useState } from 'react';
import React from 'react';
import { PasswordVerifyModel } from '../model/Auth/PasswordVerifyModel';
import { useToast } from '../utiles/Toast/ToastProvider';
import { BackHandler } from 'react-native';
import useAuthStore from '../zustland/AuthStore';
import { ResetPasswordModel } from '../model/Auth/ForgetPasswordModel';
export const ResetPasswordLogic = (route: any) => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const {email} = route?.route?.params;
  const {setToken,setRefreshToken,setIsLoggedIn,setUserData,ageConfirmed,setAgeConfirmed,isLoggedIn} = useAuthStore();
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const {show} = useToast();
  const [showVideo,setShowVideo] = useState(false)
  const [ShowSuccess,setShowSuccess] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        subscription.remove();
      };
    }, []),
  );
  
  
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be at most 20 characters')
      .matches(/[0-9]/, 'Password must include at least 1 number')
      .matches(/[A-Z]/, 'Password must include at least 1 upper case letter')
      .matches(/[^A-Za-z0-9]/, 'Password must include at least 1 special character')
      .trim(),
    repeatpassword: Yup.string()
    .trim()
      .required('Repeat password is required')
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

  // Watch for password changes to update validation states dynamically
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

  const onSubmit = async () => {
    const values = getValues();
    setLoading(true);
    ResetPasswordModel(email, values.password.trim(), values.repeatpassword.trim(), (data) => {
        reset({ password: '', repeatpassword: '' });
        setToken(data.access);
        setRefreshToken(data.refresh);
        setUserData({ email: email.trim(), password: values.password.trim() });
        if(ageConfirmed === false){
          setAgeConfirmed(true);
        }
        if(isLoggedIn === false){
          setIsLoggedIn(true);
        }
        setLoading(false);
        navigation.navigate('AppTabs');
      setLoading(false);
    }, (error: any) => {
       const msg = String(error || 'Password does not meet requirements');
       show(msg, {type: 'error'})
       setLoading(false);
    })
  };

  const onHandleShowPass = (key:string) => {
    key === 'pass'?
    setShowPass((prev)=>!prev):
    setShowRepeatPass((prev)=>!prev)
  };

const onHandler = () =>{
navigation.navigate('Signin');
}


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
    onHandler
  };
};
