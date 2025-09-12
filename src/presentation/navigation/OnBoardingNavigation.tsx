import React from 'react';
import { View } from 'react-native';

export type OnboardingStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
};


export default function OnBoardingNavigation() {
  return (
    <View />
    // <Stack.Navigator screenOptions={{ headerShown: false }}>
    //   <Stack.Screen name="Onboarding1" component={Onboarding1} />
    //   <Stack.Screen name="Onboarding2" component={Onboarding2} />
    //   <Stack.Screen name="Onboarding3" component={Onboarding3} />
    // </Stack.Navigator>
  );
}
