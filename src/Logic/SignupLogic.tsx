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
   const[showPass, setShowPass] = useState(false);
  const validationSchema = Yup.object().shape({
    username: Yup.string().trim().required('Required'),
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
      username: '',
      email: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });



  const onSubmit = async () => {
    const values = getValues();
    // Require birthdate selection
    if (!selectedDate) {
      show('Please select your birthdate', { type: 'error' });
      return;
    }
    // Enforce 18+ age
    try {
      const [y, m, d] = selectedDate.split('-').map(Number);
      const birth = new Date(y, (m || 1) - 1, d || 1);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const hasNotHadBirthdayThisYear =
        today.getMonth() < birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate());
      if (hasNotHadBirthdayThisYear) age -= 1;
      if (age < 18) {
        show('You must be at least 18 years old to register', { type: 'error' });
        return;
      }
    } catch {
      show('Invalid birthdate', { type: 'error' });
      return;
    }
    setLoading(true);

    Register(
      values.email.trim().toLowerCase(),
      values.username.trim(),
      selectedDate,
      data => {
        navigation.navigate('VerificationCode', {
          email: data.email,
        });
        reset({ username: '', email: '' });
        setLoading(false);
      },
      error => {
        setLoading(false);
        show(String(error), { type: 'error' });
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
    const result = `${year}-${month}-${day}`;
    setSelectedDate(result);
  };

  const onSubmitGoogle =  () => {
    navigation.navigate('GoogleAuth' as never);
  };
  const onSubmitApple =  () => {
    navigation.navigate('AppleAuth' as never);
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
    onSubmitGoogle,
    onSubmitApple,
    showPass,
    setShowPass
  };
};
