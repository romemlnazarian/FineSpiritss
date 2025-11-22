import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {NavigatorScreenParams} from '@react-navigation/native';

export type AuthStackParamList = {
  Signup:undefined
  Signin:undefined
  Splash: undefined
  VerificationCode:{
    email: string,
  }
  PasswordVerification:{
    email: string,
  },
  NumberVerification:{
    number: string
  },
  ForgetPassword:undefined,
  Wellcome:undefined
};

export type ButtonParamList = {
  AppTabs: undefined;
  Catalog: {
    item: any;
  };
  ChoosenCatalog: undefined;
  CatalogSearch: undefined;
  CatalogDetail: {
    product: any;
    quantity?: number;
  } | undefined;
  CatalogCategory: {
    item?: any;
  } | undefined;
  CatalogScreen:
    | {
        screen?: string;
        params?: Record<string, any>;
      }
    | undefined;
};

export type CatalogStackParamList = {
  Catalog: undefined;
  ChoosenCatalog: {
    item: any;
  } | undefined;
  CatalogSearch: undefined;
  CatalogDetail: {
    product: any;
    quantity?: number;
  } | undefined;
  CatalogCategory: {
    item?: any;
  } | undefined;
};

export type TabParamList = {
  Home: undefined;
  CatalogScreen: NavigatorScreenParams<CatalogStackParamList> | undefined;
  CardScreen: undefined;
  FavoriteScreen: undefined;
  ProfileScreen: undefined;
  SettingScreen: undefined;
};

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
export type CatalogStackNavigationProp = NativeStackNavigationProp<CatalogStackParamList, keyof CatalogStackParamList>;
