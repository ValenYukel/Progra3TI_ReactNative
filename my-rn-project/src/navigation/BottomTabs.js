import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//import Home from '../screens/Home';
//import Registro from '../screens/Registro';
import Perfil from '../screens/Perfil';
import { FontAwesome } from '@expo/vector-icons'

const Tab= createBottomTabNavigator();
export default function BottomTabs() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
          name='Home' 
          component={Home}
          options={{
            tabBarIcon: () => <FontAwesome name='home' size={24} color={'black'} />
          }}
          />
        <Tab.Screen name='Perfil' component={Perfil} />
        <Tab.Screen name='Posteo' component={Posteo} />
    </Tab.Navigator>
  )
}
