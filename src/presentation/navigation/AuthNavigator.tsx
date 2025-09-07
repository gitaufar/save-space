import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import RegisterScreen from '../screens/auth/RegisterScreen'
import LoginScreen from '../screens/auth/LoginScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterDataScreen from '../screens/auth/RegisterDataScreen';

// bikin instance Stack
const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RegisterStep" component={RegisterDataScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
