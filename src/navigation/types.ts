import type { NativeStackNavigationProp } from '@react-navigation/native-stack';


export type AuthStackParamList = {
  login: undefined;
  Signup:undefined
  Signin:undefined
  Splash: undefined 
  VerificationCode:undefined
  PasswordVerification:undefined,
  NumberVerification:undefined,
  ForgetPassword:undefined
};


export type AuthScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;