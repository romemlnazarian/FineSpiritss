import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {AuthScreenNavigationProp} from '../navigation/types';
import { useState} from 'react';
import { useToast } from '../utiles/Toast/ToastProvider';
import {Register} from '../model/Auth/SignupModel';
import {signInWithApple} from '../service/appleSignInService';
import useAuthStore from '../zustland/AuthStore';
import { Language } from '../utiles/Language/i18n';

export const SignupLogic = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const { show } = useToast();
  const {
    setUserData,
    setToken,
    setRefreshToken,
    setIsLoggedIn,
    setAgeConfirmed,
  } = useAuthStore();
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [open, setOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const validationSchema = Yup.object().shape({
    username: Yup.string().trim().required(Language.required_field).min(5, Language.username_min_length),
    email: Yup.string()
      .trim()
      .required(Language.email_required)
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
    if (!privacyAgreed) {
      show(Language.signup_privacy_required, {type: 'error'});
      return;
    }
    // Require birthdate selection
    if (!selectedDate) {
      show(Language.select_birthdate, { type: 'error' });
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
        show(Language.must_be_18_register, { type: 'error' });
        return;
      }
    } catch {
      show(Language.invalid_birthdate, { type: 'error' });
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

  const onSubmitGoogle = async () => {
    navigation.navigate('GoogleAuth');
  };

  const onSubmitApple = async () => {
    setLoading(true);
    try {
      const result = await signInWithApple();

      if (!result.identityToken) {
        throw new Error('Apple sign-in did not return identity token');
      }

      const res = await fetch(
        'https://api.finespirits.pl/api/auth/apple/callback/',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
          body: JSON.stringify({
            identity_token: result.identityToken,
            first_name: result.user.fullName?.givenName ?? null,
            last_name: result.user.fullName?.familyName ?? null,
          }),
        },
      );

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.status !== 200) {
        const message =
          data?.error ||
          data?.detail ||
          data?.message ||
          `Apple signup failed (${res.status})`;
        show(String(message), {type: 'error'});
        return;
      }

      if (!data?.access || !data?.refresh) {
        show('Unexpected response from Apple signup', {type: 'error'});
        return;
      }

      setToken(data.access);
      setRefreshToken(data.refresh);
      setIsLoggedIn(true);
      setAgeConfirmed(true);

      const email = data?.email || result.user.email;
      if (email) {
        setUserData({email});
      }

      navigation.reset({
        index: 0,
        routes: [{name: 'AppTabs'}],
      });
    } catch (error: any) {
      const message =
        typeof error?.message === 'string'
          ? error.message
          : 'Apple sign-in failed';
      console.log('[SignupLogic] Apple sign-in error:', error);
      show(message, {type: 'error'});
    } finally {
      setLoading(false);
    }
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
    setShowPass,
    privacyAgreed,
    setPrivacyAgreed,
  };
};
