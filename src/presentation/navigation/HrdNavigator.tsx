import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

export type HrdTabParamList = {
  HrdHome: undefined;
  Profile: undefined;
  CbiTest: undefined;
};

const Tab = createBottomTabNavigator<HrdTabParamList>();

export default function HrdNavigator() {
  return (
    <View></View>
    // <Tab.Navigator screenOptions={{ headerShown: false }}>
    //   <Tab.Screen name="HrdHome" component={HrdHomeScreen} />
    //   <Tab.Screen name="Profile" component={ProfileScreen} />
    //   <Tab.Screen name="CbiTest" component={CbiTestScreen} />
    // </Tab.Navigator>
  );
}
