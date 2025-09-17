import React from 'react';
import OnBoardingScreen from '../screens/onboarding/OnBoardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type OnboardingStackParamList = {
  Onboarding: undefined;
};

export default function OnBoardingNavigation() {
  // Fungsi untuk menandai bahwa onboarding telah selesai
  const handleOnboardingComplete = async () => {
    try {
      // Simpan bahwa onboarding telah ditampilkan
      await AsyncStorage.setItem("alreadyLaunched", "true");
      // Aplikasi akan otomatis refresh dan menampilkan AuthNavigator
      
      // Reload halaman untuk trigger re-render AppNavigator
      // AppNavigator akan membaca ulang AsyncStorage dan menampilkan AuthNavigator
    } catch (error) {
      // Silent error handling for demo
    }
  };

  return (
    <OnBoardingScreen onBoardingShowed={handleOnboardingComplete} />
  );
}
