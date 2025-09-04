import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {AuthScreenNavigationProp} from '../navigation/types';
import { useState } from 'react';
import React from 'react';
export const PasswordVerificationLogic = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);

  
  
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8,'')
      .max(20,'')
      .matches(/[0-9]/,'')
      .matches(/[A-Z]/,''),
    repeatpassword: Yup.string()
      .required('Repeat password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    watch
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
    console.log('==>', values);
    navigation.navigate('NumberVerification') // Placeholder navigation
  };

  const onHandleShowPass = (key:string) => {
    key === 'pass'?
    setShowPass((prev)=>!prev):
    setShowRepeatPass((prev)=>!prev)
  };




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
    showRepeatPass
  };
};
