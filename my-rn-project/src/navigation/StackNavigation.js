import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import Home from "../screens/Home";
import BottomTabs from './BottomTabs'
import Registro from "../screens/Registro";
const Stack = createNativeStackNavigator();

export default function StackNavigation() {
    const user = '' //props? no se la verdad despues lo veo
    return (
       
       
        <Stack.Navigator>
        <Stack.Screen 
       name='Register' 
       component={Registro}
       options={
           {
               headerShown: false
           }
       }
       />
       <Stack.Screen 
       name='Tab' 
       component={BottomTabs}
       options={
           {
               headerShown: false
           }
       }
       />
       </Stack.Navigator>
    );
}

