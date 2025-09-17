import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardManager from '../screens/manager/DashboardManager';
import PengaturanManagerScreen from '../screens/manager/PengaturanManagerScreen';
import AturRuangScreen from '../screens/manager/AturRuangScreen';
import ListKaryawanScreen from '../screens/manager/ListKaryawanScreen.tsx';
import DetailKaryawanScreen from '../screens/manager/DetailKaryawan';
import DetailRiwayatMoodScreen from '../screens/karyawan/DetailRiwayatMoodScreen';
import ProfileKaryawan from '../screens/profile/ProfileScreen';
import { NavbarManager } from '../components/manager/NavbarManager';
import { CBIProvider } from '../contexts/CBIContext';
import { CBIRepositoryImpl } from '../../data/repositories/CBIRepositoryImpl';
import { CreateCBITestForSpaceUseCase } from '../../domain/usecases/cbi/CreateCBITestForSpaceUseCase';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Initialize CBI dependencies
const cbiRepository = new CBIRepositoryImpl();
const createCBITestForSpaceUseCase = new CreateCBITestForSpaceUseCase(cbiRepository);

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
      <Tab.Screen name="PengaturanManager" component={PengaturanManagerScreen} />
    </Tab.Navigator>
  );
}

// Stack Navigator utama yang berisi TabNavigator dan screen lainnya
export default function ManagerNavigator() {
  return (
    <CBIProvider 
      createCBITestForSpaceUseCase={createCBITestForSpaceUseCase}
      cbiRepository={cbiRepository}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Tab Navigator sebagai screen pertama */}
        <Stack.Screen name="MainTab" component={MainTabNavigator} />
        
        {/* Screen lain yang tidak menampilkan tab bar bisa ditambah di sini */}
        <Stack.Screen name="ListKaryawanScreen" component={ListKaryawanScreen} />
        <Stack.Screen name="DetailKaryawanScreen" component={DetailKaryawanScreen} />
        <Stack.Screen name="DetailRiwayatMoodScreen" component={DetailRiwayatMoodScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileKaryawan} />
        <Stack.Screen name="AturRuangScreen" component={AturRuangScreen} />
        {/* <Stack.Screen name="DetailManagerScreen" component={DetailManagerScreen} /> */}
      </Stack.Navigator>
    </CBIProvider>
  );
}
