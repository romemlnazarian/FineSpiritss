import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {AuthScreenNavigationProp} from '../navigation/types';
import { useState} from 'react';
import { useToast } from '../utiles/Toast/ToastProvider';
import {Register} from '../model/Auth/SignupModel';
export const SignupLogic = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const { show } = useToast();
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [open, setOpen] = useState(false);
  const validationSchema = Yup.object().shape({
    username: Yup.string().trim().required('Required'),
    email: Yup.string()
      .trim()
      .required('Email is required')
      .email('Please enter a valid email address')
      .matches(/@gmail\.com$/, 'Only gmail.com emails are allowed'),
  });
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });



  const onSubmit = async () => {
    const values = getValues();
    setLoading(true);
    Register(
      values.username,
      values.email,
      date.toString(),
      data => {
        navigation.navigate('VerificationCode', {
          otp_id: data.otp_id,
          user_id: data.user_id,
          email: data.email,
          otp_type: data.otp_type,
        });
        setLoading(false);
      },
      error => {
        setLoading(false);
        show(String(error || 'Something went wrong'), { type: 'error' });
      },
    );
  };

  const onSubmitSignIn = async () => {
    navigation.navigate('Signin');
  };

  const formatDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const result = `${year}.${month}.${day}`;
    setSelectedDate(result);
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    onSubmitSignIn,
    date,
    setDate,
    open,
    setOpen,
    loading,
    selectedDate,
    setSelectedDate,
    formatDate,
  };
};
