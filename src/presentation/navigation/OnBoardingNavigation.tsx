import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

export type OnboardingStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnBoardingNavigation() {
  return (
    <View></View>
    // <Stack.Navigator screenOptions={{ headerShown: false }}>
    //   <Stack.Screen name="Onboarding1" component={Onboarding1} />
    //   <Stack.Screen name="Onboarding2" component={Onboarding2} />
    //   <Stack.Screen name="Onboarding3" component={Onboarding3} />
    // </Stack.Navigator>
  );
}
