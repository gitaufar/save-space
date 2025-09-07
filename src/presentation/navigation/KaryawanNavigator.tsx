import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View } from "react-native";

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
    <View></View>
    // <Tab.Navigator
    //   screenOptions={({ route }) => ({
    //     headerShown: false,
    //     tabBarIcon: ({ color, size }) => {
    //       let iconName: string = "home";
    //       if (route.name === "Home") iconName = "home";
    //       if (route.name === "Profile") iconName = "person";
    //       return <Icon name={iconName} size={size} color={color} />;
    //     },
    //   })}
    // >
    //   <Tab.Screen name="Home" component={HomeStackNavigator} />
    //   <Tab.Screen name="Profile" component={ProfileScreen} />
    // </Tab.Navigator>
  );
}
