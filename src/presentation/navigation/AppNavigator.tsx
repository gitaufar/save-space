import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import KaryawanNavigator from "./KaryawanNavigator";
import ManagerNavigator from "./ManagerNavigator";
import { useAuth } from "../contexts/AuthContext";
import SpaceNavigator from "./SpaceNavigator";
// Import SplashScreen
import SplashScreen from "../screens/splash/SplashScreen";
import OnBoardingNavigation from "./OnBoardingNavigation"; // Gunakan OnBoardingNavigation

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
  const [initialSpaceRoute, setInitialSpaceRoute] = useState<"Space" | "NewSpace" | "OldSpace" | null>(null);
  // Tambahkan state untuk kontrol splash screen
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fungsi untuk melakukan inisialisasi aplikasi
    const initializeApp = async () => {
      try {
        // Periksa apakah ini pertama kali aplikasi diluncurkan
        const launchValue = await AsyncStorage.getItem("alreadyLaunched");
        
        if (launchValue == null) {
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
        
        // Ambil session user
        await fetchCurrentUser();
        
        // Buat timeout untuk menampilkan splash screen minimal 2 detik
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        // Silent error handling for demo
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [fetchCurrentUser]);

  // Listener untuk perubahan di AsyncStorage
  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const launchValue = await AsyncStorage.getItem("alreadyLaunched");
        if (launchValue !== null) {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        // Silent error handling for demo
      }
    };

    // Buat polling untuk mengecek perubahan
    const interval = setInterval(checkFirstLaunch, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Baca hint satu-kali setelah user berubah (mis. selesai register)
  useEffect(() => {
    const readPostRegisterRoute = async () => {
      try {
        const v = await AsyncStorage.getItem('postRegisterInitialSpaceRoute');
        if (v) {
          setInitialSpaceRoute(v as any);
          await AsyncStorage.removeItem('postRegisterInitialSpaceRoute');
        } else {
          setInitialSpaceRoute(null);
        }
      } catch {
        setInitialSpaceRoute(null);
      }
    };
    readPostRegisterRoute();
  }, [user]);

  // Tampilkan splash screen saat loading
  if (isLoading || isFirstLaunch === null) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer theme={MyTheme}>
      {isFirstLaunch ? (
        <OnBoardingNavigation /> // Gunakan OnBoardingNavigation bukan OnBoardingScreen
      ) : !user ? (
        <AuthNavigator />
      ) : !user.space_id ? (
        user.role === "Manager" ? (
          <SpaceNavigator initialRouteName={(initialSpaceRoute ?? "Space") as any}/>
        ) : (
          <SpaceNavigator initialRouteName="OldSpace"/>
        )
      ) : user.role === "Karyawan" ? (
        // Setelah login atau join/create space, langsung ke dashboard karyawan
        <KaryawanNavigator />
      ) : (
        <ManagerNavigator />
      )}
    </NavigationContainer>
  );
}