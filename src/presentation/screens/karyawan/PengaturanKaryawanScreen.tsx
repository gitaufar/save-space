import React from "react";
import { View, ScrollView } from "react-native";
import { PengaturanKaryawanLayout } from '../../components/karyawan/Pengaturan/PengaturanKaryawanLayout';

export default function PengaturanKaryawanScreen() {
  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }} // Ini memastikan konten minimal setinggi layar
        showsVerticalScrollIndicator={false}
      >
        <PengaturanKaryawanLayout />
      </ScrollView>
    </View>
  );
}