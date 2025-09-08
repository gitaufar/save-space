import './global.css';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};
// contoh simpan state (nanti bisa ganti pake async storage / supabase session)
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnBoardingNavigation from './src/presentation/navigation/OnBoardingNavigation';
import AuthNavigator from './src/presentation/navigation/AuthNavigator';
import KaryawanNavigator from './src/presentation/navigation/KaryawanNavigator';
import HrdNavigator from './src/presentation/navigation/HrdNavigator';
import OnBoardingScreen from './src/presentation/screens/onboarding/OnBoardingScreen';

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(true);
  const [user, setUser] = useState<{ role: 'hrd' | 'karyawan' } | null>(null);

  const onboardingShowed = () => setIsFirstLaunch(false);

  useEffect(() => {
    // cek apakah onboarding sudah pernah ditampilkan
    // AsyncStorage.getItem('alreadyLaunched').then(value => {
    //   if (value == null) {
    //     AsyncStorage.setItem('alreadyLaunched', 'true'); // pertama kali buka app
    //     setIsFirstLaunch(true);
    //   } else {
    //     setIsFirstLaunch(false);
    //   }
    // });

    // TODO: cek session user dari Supabase / local storage
    // misalnya contoh dummy:
    // setUser({ role: "karyawan" });
    // setUser({ role: "hrd" });
    // setUser(null); // kalau belum login
  }, []);

  if (isFirstLaunch === null) {
    return null; // bisa kasih splash screen disini
  }

  return isFirstLaunch ? (
    <NavigationContainer>
      <OnBoardingScreen onBoardingShowed={onboardingShowed} />
    </NavigationContainer>
  ) : !user ? (
    <AuthNavigator />
  ) : user.role === 'karyawan' ? (
    <KaryawanNavigator />
  ) : (
    <HrdNavigator />
  );
}
