import "react-native-gesture-handler";
import React from 'react'
import Navigation from './src/navigation/navigation'
import { ToastProvider } from './src/utiles/Toast/ToastProvider'

export default function App() {
  return (
    <ToastProvider>
      <Navigation />
    </ToastProvider>
  )
}