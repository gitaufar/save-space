import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Home, Settings } from "lucide-react-native";
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export const NavbarKaryawan = ({ state, navigation }: BottomTabBarProps) => {
  return (
    <View className="w-full bg-white flex flex-row items-center justify-center shadow-2xl rounded-t-3xl py-8 px-10">
        <View className="w-full flex flex-row items-center justify-between px-14">
            <TouchableOpacity 
                className="flex flex-col items-center justify-center"
                onPress={() => navigation.navigate('DashboardKaryawan')}
            >
                <Home 
                size={24} 
                color={state.index === 0 ? "#00BFA6" : "#94A3B8"} 
                strokeWidth={2}
                />
                <Text className={`text-xs mt-1 ${state.index === 0 ? "text-primary font-medium" : "text-gray-400"}`}>
                Beranda
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                className="flex flex-col items-center justify-center"
                onPress={() => navigation.navigate('PengaturanKaryawan')}
            >
                <Settings 
                size={24} 
                color={state.index === 1 ? "#00BFA6" : "#94A3B8"} 
                strokeWidth={2}
                />
                <Text className={`text-xs mt-1 ${state.index === 1 ? "text-primary font-medium" : "text-gray-400"}`}>
                Pengaturan
                </Text>
            </TouchableOpacity>
        </View>
        
    </View>
  );
}