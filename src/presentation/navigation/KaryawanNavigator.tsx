import React from "react";
import { View } from "react-native";

// import screen kamu
// import HomeScreen from "../screens/karyawan/HomeScreen";
// import DetailScreen from "../screens/karyawan/DetailScreen";
// import ProfileScreen from "../screens/karyawan/ProfileScreen";



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
    <View />
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