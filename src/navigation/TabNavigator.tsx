// src/navigation/AppTabs.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Color } from '../utiles/color';
import { StyleComponent } from '../utiles/styles';
import HomeScreen from "../screen/HomeScreen";
import Home from '../assets/svg/Home.svg';
import Heart from '../assets/svg/Heart.svg';
import Glass from '../assets/svg/Glass.svg';
import Profile from '../assets/svg/profile.svg';
import HomePrimary from '../assets/svg/HomePrimary.svg';
import { BottomTabDescriptorMap, BottomTabNavigationHelpers } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { NavigationState, ParamListBase } from "@react-navigation/native";
type TabParamList = {
  Home: undefined;
  Favorites: undefined;
  Search: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

interface CustomTabBarProps {
  state: NavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: BottomTabNavigationHelpers;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { Styles } = StyleComponent();
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
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

        const IconComponent = () => {
          switch (route.name) {
            case 'Home':
              return isFocused?<HomePrimary width={25} height={25}/>:<Home width={25} height={25}/> ;
            case 'Favorites':
              return <Heart width={25} height={25} fill={isFocused ? Color.primary : Color.gray} />;
            case 'Search':
              return <Glass width={25} height={25} fill={isFocused ? Color.primary : Color.gray} />;
            case 'Profile':
              return <Profile width={25} height={25} fill={isFocused ? Color.primary : Color.gray} />;
            default:
              return null;
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            {isFocused && <View style={styles.focusIndicatorLine} />}
            <IconComponent />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default function AppTabs({ initialRouteName = "Home" }: {initialRouteName?: keyof TabParamList}) {
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={HomeScreen} />
      <Tab.Screen name="Search" component={HomeScreen} />
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
    height:70
  },
  focusIndicatorLine: {
    position: 'absolute',
    top: -1,
    height: 3,
    width: 44,
    backgroundColor: Color.primary,
    alignSelf: 'center',
    borderBottomRightRadius:10,
    borderBottomLeftRadius:10
  },
});
