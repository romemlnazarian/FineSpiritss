// src/navigation/Navigation.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Platform, StyleSheet} from 'react-native';
const NetInfo = require('@react-native-community/netinfo');

import SplashScreen from '../screen/SplashScreen';
import WellcomeScreen from '../screen/WellcomeScreen';
import SignupScreen from '../screen/Auth/SignupScreen';
import SigninScreen from '../screen/Auth/SigninScreen';
import VerificationCodeScreen from '../screen/Auth/VerificationCodeScreen';
import PasswordVerificationScreen from '../screen/Auth/PasswordVerificationScreen';
import NumberVerificationScreen from '../screen/Auth/NumberVerificationScreen';
import ForgetPasswordScreen from '../screen/Auth/ForgetPasswordScreen';

// import LoginScreen from '../screen/LoginScreen';
import AppTabs from './TabNavigator';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import GoogleAuthScreen from '../screen/Auth/GoogleAuthScreen';
import AppleAuthScreen from '../screen/Auth/AppleAthScreen';

const Stack = createNativeStackNavigator();

function OfflineBanner() {
  return (
    <View style={offlineStyles.banner}>
      <Text style={offlineStyles.text}>No internet connection</Text>
    </View>
  );
}

export default function Navigation() {
  const [isConnected, setIsConnected] = React.useState<boolean | null>(true);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      const connected = state.isConnected && state.isInternetReachable !== false;
      setIsConnected(Boolean(connected));
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        edges={Platform.OS === 'android' ? ['bottom', 'top'] : ['top']}>
        <StatusBar barStyle="dark-content" />
        {isConnected === false && <OfflineBanner />}
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false ,gestureEnabled: false}}>
            <Stack.Screen name="Splash" component={SplashScreen} options={{gestureEnabled: false}} />
            <Stack.Screen name="Wellcome" component={WellcomeScreen} options={{gestureEnabled: false}} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{gestureEnabled: false}} />
            <Stack.Screen name="Signin" component={SigninScreen} options={{gestureEnabled: false}} />
            <Stack.Screen
              name="GoogleAuth"
              component={GoogleAuthScreen}
              options={{headerShown: false}}
            />
               <Stack.Screen
              name="AppleAuth"
              component={AppleAuthScreen}
              options={{headerShown: false,gestureEnabled: false}}
            />
            <Stack.Screen
              name="VerificationCode"
              component={VerificationCodeScreen}
              options={{gestureEnabled: false}}
            />
            <Stack.Screen
              name="PasswordVerification"
              component={PasswordVerificationScreen}
              options={{gestureEnabled: false}}
            />
            <Stack.Screen
              name="NumberVerification"
              component={NumberVerificationScreen}
              options={{gestureEnabled: false}}
            />
            <Stack.Screen
              name="ForgetPassword"
              component={ForgetPasswordScreen}
              options={{gestureEnabled: false}}
            />
            <Stack.Screen name="AppTabs" component={AppTabs} options={{gestureEnabled: false}} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const offlineStyles = StyleSheet.create({
  banner: {
    backgroundColor: '#D93025',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
