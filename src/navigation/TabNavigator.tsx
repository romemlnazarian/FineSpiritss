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
import Card_Icon from '../assets/svg/Cart.svg';
import Card_Primary from '../assets/svg/Card_Primary.svg';
import HomePrimary from '../assets/svg/HomePrimary.svg';
import {
  BottomTabDescriptorMap,
  BottomTabNavigationHelpers,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {NavigationState, ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CatalogSearch from '../screen/Catalog/CatalogSearchScreen';
import Card from '../screen/Card/CardScreen';
import Favorite from '../screen/Favorite/FavoriteScreen';
import CatalogDetail from '../screen/Catalog/CatalogDetailScreen';
type TabParamList = {
  Home: undefined;
  Catalog: undefined;
  Search: undefined;
  Profile: undefined;
  CatalogScreen: undefined;
  CardScreen: undefined;
  FavoriteScreen: undefined;
  CatalogDetail: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

interface CustomTabBarProps {
  state: NavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: BottomTabNavigationHelpers;
}
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
        <Card_Icon width={25} height={25} />
      );
    case 'FavoriteScreen':
      return isFocused ? (
        <Heart_Primary width={25} height={25} />
      ) : (
        <Heart width={25} height={25} />
      );
    case 'Profile':
      return (
        <Profile
          width={25}
          height={25}
          fill={isFocused ? Color.primary : Color.gray}
        />
      );
    default:
      return null;
  }
};

const CustomTabBar: React.FC<CustomTabBarProps> = ({
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
            testID={options.tabBarTestID}
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

export default function AppTabs({
  initialRouteName = 'Home',
}: {
  initialRouteName?: keyof TabParamList;
}) {
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="CatalogScreen"
        component={() => (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Catalog" component={Catalog} />
            <Stack.Screen name="ChoosenCatalog" component={ChoosenCatalog} />
            <Stack.Screen name="CatalogSearch" component={CatalogSearch} />
            <Stack.Screen name="CatalogDetail" component={CatalogDetail} />
          </Stack.Navigator>
        )}
      />
           <Tab.Screen
        name="CardScreen"
        component={() => (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Card" component={Card} />
          </Stack.Navigator>
        )}
      />
      <Tab.Screen
        name="FavoriteScreen"
        component={() => (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Favorite" component={Favorite} />
          </Stack.Navigator>
        )}
      />
      <Tab.Screen name="Profile" component={HomeScreen} />
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
