import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import Navigation from './src/navigation/navigation';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ToastProvider } from './src/utiles/Toast/ToastProvider';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaView style={styles.container}> 
      <ToastProvider>
        <Navigation />
      </ToastProvider>
    </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})