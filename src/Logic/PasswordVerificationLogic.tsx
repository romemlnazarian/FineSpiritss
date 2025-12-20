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
export const PasswordVerificationLogic = (route: any) => {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const [isLengthValid, setIsLengthValid] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const {email} = route?.route?.params;
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
      .min(8,'')
      .max(20,'')
      .matches(/[0-9]/,'')
      .matches(/[A-Z]/,'')
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
  };

  const onSubmit = async () => {
    const values = getValues();
    setLoading(true);
    PasswordVerifyModel(email, values.password.trim(), values.repeatpassword.trim(), () => {
        reset({ password: '', repeatpassword: '' });
        // show('Password set successfully. Your account is now active. You can login.', {type: 'success'});
        setShowVideo(true)
        setTimeout(() => {
          setShowVideo(false)
          setShowSuccess(true) 
        }, 10000);
      setLoading(false);
    }, (error: any) => {
       show(String(error))
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
