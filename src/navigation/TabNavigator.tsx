// src/navigation/AppTabs.js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Color} from '../utiles/color';
import HomeScreen from '../screen/Home/HomeScreen';
import Catalog from '../screen/Catalog/CatalogScreen';
import ChoosenCatalog from '../screen/Catalog/ChoosenCatalogScreen';
import Home from '../assets/svg/Home.svg';
import Heart from '../assets/svg/Heart.svg';
import Heart_Primary from '../assets/svg/Heart_Primary.svg';
import Glass_Primary from '../assets/svg/Glass_Primary.svg';
import Glass from '../assets/svg/Glass.svg';
import Profile from '../assets/svg/profile.svg';
import Profile_primary from '../assets/svg/Profile_primary.svg';
import Card_Icon from '../assets/svg/Card.svg';
import Card_Primary from '../assets/svg/Card_Primary.svg';
import HomePrimary from '../assets/svg/HomePrimary.svg';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import type {TabParamList} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CatalogSearch from '../screen/Catalog/CatalogSearchScreen';
import Card from '../screen/Card/CardScreen';
import Favorite from '../screen/Favorite/FavoriteScreen';
import CatalogDetail from '../screen/Catalog/CatalogDetailScreen';
import CatalogCategory from '../screen/Catalog/CatalogCategory';
import ProfileScreen from '../screen/Profile/ProfileScreen';
import MyOrderScreen from '../screen/Profile/MyOrderScreen';
import SettingScreen from '../screen/Setting/SettingScreen';
import PaymentScreen from '../screen/Setting/PaymentScreen';
import BillingAddressScreen from '../screen/Setting/BillingAddressScreen';
import ShippingAddress from '../screen/Setting/ShippingAddress';
import OrderHistoryScreent from '../screen/Setting/OrderHistoryScreent';
import SupportServiceScreen from '../screen/Setting/SupportServiceScreen';
import SettingItemScreen from '../screen/Setting/SettingItemScreen';
import DeleteAccountScreen from '../screen/Setting/DeleteAccountScreen';
import DeleteAccountVerifyScreen from '../screen/Setting/DeleteAccountVerifyScreen';
const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator();
const TabIcon: React.FC<{routeName: string; isFocused: boolean}> = ({
  routeName,
  isFocused,
}) => {
  switch (routeName) {
    case 'Home':
      return isFocused ? (
        <HomePrimary width={25} height={25} />
      ) : (
        <Home width={25} height={25} />
      );
    case 'CatalogScreen':
      return isFocused ? (
        <Glass_Primary width={25} height={25} />
      ) : (
        <Glass width={25} height={25} />
      );
    case 'CardScreen':
      return isFocused ? (
        <Card_Primary width={25} height={25} />
      ) : (
        <Card_Icon width={25} height={25} fill={Color.black}/>
      );
    case 'FavoriteScreen':
      return isFocused ? (
        <Heart_Primary width={25} height={25} />
      ) : (
        <Heart width={25} height={25} />
      );
    case 'SettingScreen':
      return isFocused ? (
        <Profile_primary width={25} height={25} />
      ) : (
        <Profile width={25} height={25} />
      );
    default:
      return null;
  }
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          // Always route Catalog tab to its root screen
          if (route.name === 'CatalogScreen') {
            navigation.navigate('CatalogScreen', { screen: 'Catalog' } as any);
            return;
          }

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name as keyof TabParamList, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}>
            {isFocused && <View style={styles.focusIndicatorLine} />}
            <TabIcon routeName={route.name} isFocused={isFocused} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const renderCustomTabBar = (props: BottomTabBarProps) => (
  <CustomTabBar {...props} />
);

// Dedicated stack components to avoid inline functions in Tab.Screen component prop
const CatalogStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Catalog">
    <Stack.Screen name="Catalog" component={Catalog} />
    <Stack.Screen name="ChoosenCatalog" component={ChoosenCatalog} />
    <Stack.Screen name="CatalogSearch" component={CatalogSearch} />
    <Stack.Screen name="CatalogDetail" component={CatalogDetail} />
    <Stack.Screen name="CatalogCategory" component={CatalogCategory} />
  </Stack.Navigator>
);

const CardStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Card" component={Card} />
  </Stack.Navigator>
);

const FavoriteStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Favorite" component={Favorite} />
  </Stack.Navigator>
);

const SettingStack = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Setting" component={SettingScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="MyOrder" component={MyOrderScreen} />
    <Stack.Screen name="Payment" component={PaymentScreen} />
    <Stack.Screen name="BillingAddress" component={BillingAddressScreen} />
    <Stack.Screen name="ShippingAddress" component={ShippingAddress} />
    <Stack.Screen name="OrderHistory" component={OrderHistoryScreent} />
    <Stack.Screen name="SupportService" component={SupportServiceScreen} />
    <Stack.Screen name="SettingItem" component={SettingItemScreen} />
    <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
    <Stack.Screen name="DeleteAccountVerify" component={DeleteAccountVerifyScreen} />
  </Stack.Navigator>
);


const HomeStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

export default function AppTabs({
  initialRouteName = 'Home',
}: {
  initialRouteName?: keyof TabParamList;
}) {
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{headerShown: false}}
      tabBar={renderCustomTabBar}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="CatalogScreen" component={CatalogStack} />
      <Tab.Screen name="CardScreen" component={CardStack} />
      <Tab.Screen name="FavoriteScreen" component={FavoriteStack} />
      <Tab.Screen name="SettingScreen" component={SettingStack} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: Color.white,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'transparent',
    height: 70,
  },
  focusIndicatorLine: {
    position: 'absolute',
    top: -1,
    height: 3,
    width: 44,
    backgroundColor: Color.primary,
    alignSelf: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
