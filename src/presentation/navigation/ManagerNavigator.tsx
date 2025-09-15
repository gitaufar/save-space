import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardManager from '../screens/manager/DashboardManager';
import PengaturanKaryawanScreen from '../screens/karyawan/PengaturanKaryawanScreen';
import ListKaryawanScreen from '../screens/manager/ListKaryawanScreen.tsx';
import CBITestScreen from '../screens/cbiTest/CBITestScreen';
import DetailKaryawanScreen from '../screens/manager/DetailKaryawan';
import { NavbarManager } from '../components/manager/NavbarManager';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type ManagerTabParamList = {
  DashboardManager: undefined;
  PengaturanManager: undefined;
};

// Tab Navigator untuk navigasi utama dengan tab bar
function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <NavbarManager {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="DashboardManager" component={DashboardManager} />
      <Tab.Screen name="PengaturanManager" component={PengaturanKaryawanScreen} />
    </Tab.Navigator>
  );
}

// Stack Navigator utama yang berisi TabNavigator dan screen lainnya
export default function ManagerNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Tab Navigator sebagai screen pertama */}
      <Stack.Screen name="MainTab" component={MainTabNavigator} />
      
      {/* Screen lain yang tidak menampilkan tab bar bisa ditambah di sini */}
      <Stack.Screen name="ListKaryawanScreen" component={ListKaryawanScreen} />
      <Stack.Screen name="CBITestScreen" component={CBITestScreen} />
      <Stack.Screen name="DetailKaryawanScreen" component={DetailKaryawanScreen} />
      {/* <Stack.Screen name="DetailManagerScreen" component={DetailManagerScreen} /> */}
    </Stack.Navigator>
  );
}
