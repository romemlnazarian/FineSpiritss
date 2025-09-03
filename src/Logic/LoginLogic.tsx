import { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationProp } from '../navigation/types';


export default function LoginLogic() {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const [rule, setRule] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().trim().required('Required'),
    // lastname: Yup.string().trim().required('Required'), // Assuming lastname is not for login
    email: Yup.string()
      .trim()
      .required('Email is required')
      .email('Please enter a valid email address'),
      // .matches(/@gmail\.com$/, 'Only gmail.com emails are allowed'), // Specific for gmail
    password: Yup.string()
      .trim()
      .required('Required')
      .min(8, 'PasswordsMustContainCharacters')
      .matches(/[A-Z]+/, 'Passwords Must Contain Capital')
      .matches(/\W|_/, 'Passwords Must Contain Symbol')
      .matches(/\d+/, 'Passwords Must Contain Digit'),
    // confirmPassword: Yup.string() // Assuming confirmPassword is not for login
    //   .oneOf([Yup.ref('password')], 'Password Must Match')
    //   .required('Required'),
  });

  const { // Uncommenting used variables from useForm
    control,
    handleSubmit,
    formState: { errors },
    // getValues,
    // trigger,
  } = useForm({
    defaultValues: {
      username: '',
      // lastname: '',
      email: '',
      password: '',
      // confirmPassword: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: any) => {
    console.log('Login form submitted:', data);
    // Handle your login logic here, e.g., API call
    // navigation.navigate('SomeAuthenticatedScreen'); // Example navigation
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    showPass,
    setShowPass,
    showConfirmPass,
    setShowConfirmPass,
    rule,
    setRule,
  }; 
}
