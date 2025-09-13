import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import OnBoardingNavigation from "./OnBoardingNavigation";
import AuthNavigator from "./AuthNavigator";
import KaryawanNavigator from "./KaryawanNavigator";
import HrdNavigator from "./HrdNavigator";
import { useAuth } from "../contexts/AuthContext";
import SpaceNavigator from "./SpaceNavigator";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

export default function AppNavigator() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const { user, fetchCurrentUser } = useAuth();

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });

    fetchCurrentUser(); // ambil session user dari supabase / storage
  }, [fetchCurrentUser]);

  if (isFirstLaunch === null) {
    return null; // splash screen bisa disini
  }

  return (
    <NavigationContainer theme={MyTheme}>
      {isFirstLaunch ? (
        <OnBoardingNavigation />
      ) : !user ? (
        <AuthNavigator />
      ) : !user.space_id ? (
        user.role === "Manager" ? (
          <SpaceNavigator initialRouteName="Space"/>
        ) : (
          <SpaceNavigator initialRouteName="OldSpace"/>
        )
      ) : user.role === "Karyawan" ? (
        // Setelah login atau join/create space, langsung ke dashboard karyawan
        <KaryawanNavigator />
      ) : (
        <HrdNavigator />
      )}
    </NavigationContainer>
  );
}
