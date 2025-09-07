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

export type ButtonParamList = {
  AppTabs:undefined
};

export type RootStackParamList = AuthStackParamList & ButtonParamList;

export type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, keyof AuthStackParamList>;
export type ButtonScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, keyof ButtonParamList>;

