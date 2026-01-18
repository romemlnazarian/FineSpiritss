import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {UpdatePasswordModel} from '../../model/Setting/SettingModel';
import useAuthStore from '../../zustland/AuthStore';
import {refreshTokenModel} from '../../model/Auth/RefreshTokenModel';
import {useToast} from '../../utiles/Toast/ToastProvider';

export const ChangePasswordSettingLogic = (onCallBack: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLengthValid] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);

  const validationSchema = Yup.object().shape({
    oldpassword: Yup.string().required('Password is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, '')
      .max(20, '')
      .matches(/[0-9]/, '')
      .matches(/[A-Z]/, ''),
    repeatpassword: Yup.string()
      .required('Repeat password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      oldpassword: '',
      password: '',
      repeatpassword: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
  const {show} = useToast();

  const onSubmit = () => {
    const {oldpassword, password, repeatpassword} = getValues();
    setIsLoading(true);
    UpdatePasswordModel(token, oldpassword, password, repeatpassword, (data) => {
      onCallBack();
      setIsLoading(false);
      // show(data.detail,{type: 'success'});
    }, (error) => {
       refreshTokenModel(refreshToken, (data) => {
        setToken(data.access);
        setRefreshToken(data.refresh);
        UpdatePasswordModel(data.access, oldpassword, password, repeatpassword, (data) => {
          setIsLoading(false);
          show(data.detail);
          onCallBack();
        }, (error) => {
          onCallBack();
          setIsLoading(false);
          show(error,{type: 'error'});
        });
      }, (error) => {
        onCallBack();
        setIsLoading(false);
        show(error,{type: 'error'});
      });
    });
  };

  const onHandleShowPass = (key: string) => {
    key === 'oldPass'
      ? setShowOldPass(prev => !prev)
      : key === 'pass'
      ? setShowPass(prev => !prev)
      : setShowRepeatPass(prev => !prev);
  };

  const oldVal = watch('oldpassword');
  const passVal = watch('password');
  const repeatVal = watch('repeatpassword');
  const isAllFilled = Boolean(oldVal && passVal && repeatVal);

  return {
    control,
    errors,
    handleSubmit,
    isValid,
    onHandleShowPass,
    showPass,
    showOldPass,
    showRepeatPass,
    onSubmit,
    isLengthValid,
    isAllFilled,
    isLoading,
  };
};
