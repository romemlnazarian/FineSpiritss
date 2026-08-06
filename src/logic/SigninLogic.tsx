import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {AuthScreenNavigationProp} from '../navigation/types';
import {useState} from 'react';
import {SingInModel} from '../model/Auth/SingInModel';
import {useToast} from '../utiles/Toast/ToastProvider';
import useAuthStore from '../zustland/AuthStore';
import {signInWithApple} from '../service/appleSignInService';

export const SigninLogic = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const [loading, setLoading] = useState(false);
  const {show} = useToast();
  const {
    setToken,
    setRefreshToken,
    setIsLoggedIn,
    setUserData,
    isLoggedIn,
  } = useAuthStore();
  const [showPass, setShowPass] = useState(false);

  const validationSchema = Yup.object().shape({
    password: Yup.string().trim().required('Required'),
    email: Yup.string().trim().required('Email is required'),
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
    SingInModel(
      values.email.trim().toLocaleLowerCase(),
      values.password.trim(),
      data => {
        console.log('data login', data);
        setToken(data.access);
        setRefreshToken(data.refresh);
        setUserData({
          email: values.email.trim(),
          password: values.password.trim(),
        });

        if (isLoggedIn === false) {
          setIsLoggedIn(true);
        }
        setLoading(false);
        navigation.navigate('AppTabs');
        reset({email: '', password: ''});
      },
      error => {
        show(String(error));
        setLoading(false);
      },
    );
  };

  const onSubmitForgetPass = async () => {
    navigation.navigate('ForgetPassword');
  };
  const onSubmitSignUp = async () => {
    navigation.navigate('Signup');
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

      console.log('[SigninLogic] Apple sign-in success:', {
        user: result.user.user,
        email: result.user.email,
        hasIdentityToken: Boolean(result.identityToken),
        hasAuthorizationCode: Boolean(result.authorizationCode),
      });

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
          `Apple login failed (${res.status})`;
        show(String(message), {type: 'error'});
        return;
      }

      if (!data?.access || !data?.refresh) {
        show('Unexpected response from Apple login', {type: 'error'});
        return;
      }

      setToken(data.access);
      setRefreshToken(data.refresh);

      const email = data?.email || result.user.email;
      if (email) {
        setUserData({email});
      }

      setIsLoggedIn(true);
      navigation.reset({
        index: 0,
        routes: [{name: 'AppTabs'}],
      });
    } catch (error: any) {
      const message =
        typeof error?.message === 'string'
          ? error.message
          : 'Apple sign-in failed';
      console.log('[SigninLogic] Apple sign-in error:', error);
      if (!message.toLowerCase().includes('cancel')) {
        show(message, {type: 'error'});
      }
    } finally {
      setLoading(false);
    }
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
    onSubmitGoogle,
    onSubmitApple,
  };
};
