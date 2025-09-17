import React from "react";
import { View, ScrollView } from "react-native";
import { PengaturanManagerLayout } from '../../components/manager/Pengaturan/PengaturanManagerLayout';

export default function PengaturanManagerScreen() {
  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }} // Ini memastikan konten minimal setinggi layar
        showsVerticalScrollIndicator={false}
      >
        <PengaturanManagerLayout />
      </ScrollView>
    </View>
  );
}