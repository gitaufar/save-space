import React from "react";
import { View, ScrollView } from "react-native";
import { DashboardKaryawanLayout } from '../../components/karyawan/Beranda/DashboardKaryawanLayout';
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardKaryawanScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }} // Ini memastikan konten minimal setinggi layar
        showsVerticalScrollIndicator={false}
      >
        <DashboardKaryawanLayout />
      </ScrollView>
    </SafeAreaView>
  );
}