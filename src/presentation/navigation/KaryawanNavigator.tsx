import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PengaturanKaryawanScreen from '../screens/karyawan/PengaturanKaryawanScreen';
import { NavbarKaryawan } from '../components/karyawan/Beranda/NavbarKaryawan';
import DashboardKaryawanScreen from '../screens/karyawan/DashboardKaryawanScreen';
import DetailRiwayatMoodScreen from '../screens/karyawan/DetailRiwayatMoodScreen';
import CBITestScreen from "../screens/cbiTest/CBITestScreen";
import ListKaryawanScreen from '../screens/manager/ListKaryawanScreen.tsx';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Tab Navigator untuk navigasi utama dengan tab bar
function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <NavbarKaryawan {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="DashboardKaryawan" component={DashboardKaryawanScreen} />
      <Tab.Screen name="PengaturanKaryawan" component={PengaturanKaryawanScreen} />
    </Tab.Navigator>
  );
}

// Stack Navigator utama yang berisi TabNavigator dan screen lainnya
export default function KaryawanNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Tab Navigator sebagai screen pertama */}
      <Stack.Screen name="MainTab" component={MainTabNavigator} />
      
      {/* Screen lain yang tidak menampilkan tab bar */}
      <Stack.Screen name="DetailRiwayatMoodScreen" component={DetailRiwayatMoodScreen} />
      <Stack.Screen name="CBITestScreen" component={CBITestScreen} />
      <Stack.Screen name="ListKaryawanScreen" component={ListKaryawanScreen} />
    </Stack.Navigator>
  );
}