import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {AuthScreenNavigationProp} from '../navigation/types';
import { ForgetPasswordModel } from '../model/Auth/ForgetPasswordModel';
import { useState } from 'react';
import { useToast } from '../utiles/Toast/ToastProvider';

export const ForgetPasswordLogic = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const [loading, setLoading] = useState<boolean>(false);
  const {show} = useToast();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required('Email is required')
  });
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      email: '',

    },
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = () => {
    const values = getValues();
    setLoading(true);
    ForgetPasswordModel(values.email.toLocaleLowerCase().trim(), (data) => {
      setLoading(false);
         navigation.navigate('ForgetPasswordVerify', {
          email: data.email,
         })
    }, (error) => {
      setLoading(false);
      show(String(error))
    })
  };


  
  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    loading,
  };
};
