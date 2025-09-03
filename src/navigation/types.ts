import type { NativeStackNavigationProp } from '@react-navigation/native-stack';


export type AuthStackParamList = {
  login: undefined;
  Signup:undefined
  Splash: undefined; 
  Wellcome:undefined;
};


export type AuthScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;