import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View } from "react-native";
import PengaturanKaryawanScreen from '../screens/karyawan/PengaturanKaryawanScreen';
import { NavbarKaryawan } from '../components/karyawan/Beranda/NavbarKaryawan';
import DashboardKaryawanScreen from '../screens/karyawan/DashboardKaryawanScreen';


// import screen kamu
// import HomeScreen from "../screens/karyawan/HomeScreen";
// import DetailScreen from "../screens/karyawan/DetailScreen";
// import ProfileScreen from "../screens/karyawan/ProfileScreen";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

// 🔹 Stack khusus untuk Home
// function HomeStackNavigator() {
//   return (
//     <HomeStack.Navigator screenOptions={{ headerShown: false }}>
//       <HomeStack.Screen name="HomeMain" component={HomeScreen} />
//       <HomeStack.Screen name="Detail" component={DetailScreen} />
//     </HomeStack.Navigator>
//   );
// }

// 🔹 Bottom Tabs
export default function KaryawanNavigator() {
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
