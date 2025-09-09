// src/navigation/Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screen/SplashScreen';
import WellcomeScreen from '../screen/WellcomeScreen';
import SignupScreen from '../screen/Auth/SignupScreen';
import SigninScreen from '../screen/Auth/SigninScreen';
import VerificationCodeScreen from '../screen/Auth/VerificationCodeScreen';
import PasswordVerificationScreen from '../screen/Auth/PasswordVerificationScreen';
import NumberVerificationScreen from '../screen/Auth/NumberVerificationScreen';
import ForgetPasswordScreen from '../screen/Auth/ForgetPasswordScreen';


// import LoginScreen from '../screen/LoginScreen';
import AppTabs from "./TabNavigator";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Wellcome" component={WellcomeScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="VerificationCode" component={VerificationCodeScreen} />
        <Stack.Screen name="PasswordVerification" component={PasswordVerificationScreen} />
        <Stack.Screen name="NumberVerification" component={NumberVerificationScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="AppTabs" component={AppTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
