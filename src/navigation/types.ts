import type { NativeStackNavigationProp } from '@react-navigation/native-stack';


export type AuthStackParamList = {
  login: undefined;
  Signup:undefined
  Signin:undefined
  Splash: undefined
  VerificationCode:{
    otp_id: number,
    user_id: number,
    email: string,
    otp_type: string
  }
  PasswordVerification:undefined,
  NumberVerification:{
    number: string
  },
  ForgetPassword:undefined,
  Wellcome:undefined
};

export type ButtonParamList = {
  AppTabs:undefined,
  Catalog:undefined,
  ChoosenCatalog:undefined,
  CatalogSearch:undefined,
  CatalogDetail: {
    product: {
      id: string;
      title: string;
      description: string;
      price: string;
      originalPrice?: string;
      discountPrice?: string;
      image?: string;
    };
    quantity: number;
  }};
 export type ProfileStackParamList = {
  MyOrder: undefined,
  Setting: undefined,
  Payment: undefined,
  BillingAddress: undefined,
  ShippingAddress: undefined,
  OrderHistory: undefined,
  SupportService: undefined,
  SettingItem: undefined,
  DeleteAccount: undefined,
  DeleteAccountVerify: undefined,
 };

export type RootStackParamList = AuthStackParamList & ButtonParamList & ProfileStackParamList;
export type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, keyof AuthStackParamList>;
export type ButtonScreenNavigationProp = NativeStackNavigationProp<ButtonParamList, keyof ButtonParamList>;
export type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, keyof ProfileStackParamList>;