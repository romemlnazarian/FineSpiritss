import "react-native-gesture-handler";
import React from 'react'
import Navigation from './src/navigation/navigation'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
export default function App() {
  return (
    <SafeAreaView style={styles.container}> 
      <Navigation />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})