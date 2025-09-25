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
  };};
 export type ProfileStackParamList = {
  MyOrder: undefined;
  Setting: undefined;
  Payment: undefined;
  BillingAddress: undefined;
  ShippingAddress: undefined;
 };

export type RootStackParamList = AuthStackParamList & ButtonParamList & CatalogParamList;
export type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, keyof AuthStackParamList>;
export type ButtonScreenNavigationProp = NativeStackNavigationProp<ButtonParamList, keyof ButtonParamList>;
export type CatalogScreenNavigationProp = NativeStackNavigationProp<CatalogParamList, keyof CatalogParamList>;
export type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, keyof ProfileStackParamList>;