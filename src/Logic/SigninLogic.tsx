import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {AuthScreenNavigationProp} from '../navigation/types';
import { useState } from 'react';
import { SingInModel } from '../model/Auth/SingInModel';
import { useToast } from '../utiles/Toast/ToastProvider';
import useAuthStore from '../zustland/AuthStore';

export const SigninLogic = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const [loading, setLoading] = useState(false);
  const {show} = useToast();
  const {setToken,setRefreshToken,setIsLoggedIn,setUserData} = useAuthStore();
  const [showPass, setShowPass] = useState(false);

  const validationSchema = Yup.object().shape({
    password: Yup.string().trim().required('Required'),
    email: Yup.string()
      .trim()
      .required('Email is required')
  });
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',

    },
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async () => {
    const values = getValues();
    setLoading(true);
    SingInModel(values.email.trim(), values.password.trim(), (data) => {  
      setToken(data.access);
      setRefreshToken(data.refresh);
      setUserData({ email: values.email.trim(), password: values.password.trim() });
      setIsLoggedIn(true);
      setLoading(false);
      navigation.navigate('AppTabs');
      reset({ email: '', password: '' });
    }, (error) => {
      show(String(error));
      setLoading(false);
    });
  };

  const onSubmitForgetPass = async () => {
    navigation.navigate('ForgetPassword');
  };
  const onSubmitSignUp = async () => {
    navigation.navigate('Signup');
  };
  
  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    onSubmitForgetPass,
    onSubmitSignUp,
    loading,
    showPass,
    setShowPass,
  };
};
