import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import Home from "../screens/Home";
import BottomTabs from './BottomTabs'
import Registro from "../screens/Registro";
const Stack = createNativeStackNavigator();

export default function StackNavigation() {
    const user = '' //props? no se la verdad despues lo veo
    return (
        <NavigationContainer>
            {user ? (
                <Stack.Navigator>
                    <Stack.Screen 
                        name='Tab' 
                        component={BottomTabs}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen 
                        name='Login' 
                        component={Login}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen 
                        name='Registro' 
                        component={Registro}
                        options={{ headerShown: false }}
                    />
                    </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}

