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
  Wellcome:undefined
};

export type ButtonParamList = {
  AppTabs:undefined
};

export type CatalogParamList = {
  Catalog:undefined,
  ChoosenCatalog:undefined
  CatalogSearch:undefined
};


export type RootStackParamList = AuthStackParamList & ButtonParamList & CatalogParamList;

export type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, keyof AuthStackParamList>;
export type ButtonScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, keyof ButtonParamList>;
export type CatalogScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, keyof CatalogParamList>;
