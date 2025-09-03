import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {AuthScreenNavigationProp} from '../navigation/types';

export const SignupLogic = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();

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
    console.log('==>', values);
  };



  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
  };
};
