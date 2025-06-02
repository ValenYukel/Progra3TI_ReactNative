import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import BottomTabs from './BottomTabs'
import Registro from "../screens/Registro";
const Stack = createNativeStackNavigator();

export default function StackNavigation() {
    return (
       
       
        <Stack.Navigator> 
        <Stack.Screen 
        name='LogIn' 
        component={Login}
        options={
            {
                headerShown: false
            }
        }
        />
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

