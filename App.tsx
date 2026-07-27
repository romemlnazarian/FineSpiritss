import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import Navigation from './src/navigation/navigation';
import {NotificationsBootstrap} from './src/component/notifications';
import {ToastProvider} from './src/utiles/Toast/ToastProvider';
import {configureGoogleSignIn} from './src/service/googleSignIn';

export default function App() {
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ToastProvider>
        <NotificationsBootstrap />
        <Navigation />
      </ToastProvider>
    </GestureHandlerRootView>
  );
}