// src/navigation/Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from "../screen/SplashScreen";
import WellcomeScreen from '../screen/WellcomeScreen';
import SignupScreen from '../screen/SignupScreen';
// import LoginScreen from '../screen/LoginScreen';
// import AppTabs from "./TabNavigator";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Wellcome" component={WellcomeScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        {/* <Stack.Screen name="AppTabs" component={AppTabs} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
