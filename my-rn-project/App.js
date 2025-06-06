import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import React from 'react';
import Perfil from './src/screens/Perfil';


export default function App() {
  return (
  
  <NavigationContainer>
     <StackNavigation />
  </NavigationContainer>
  
)
  
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
