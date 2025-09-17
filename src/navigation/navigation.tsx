// src/navigation/Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, StyleSheet} from 'react-native';

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
import { Color } from '../utiles/color';
import { SafeAreaProvider, SafeAreaView  } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <SafeAreaProvider >
    <SafeAreaView style={styles.container} edges={Platform.OS === 'android' ?[ 'bottom' , 'top'] : ['top']}>
      <StatusBar translucent backgroundColor="red" barStyle="dark-content" />
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
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
});
