import React from "react";
import { View, Text, ScrollView } from "react-native";

export default function PengaturanKaryawanScreen() {
  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="pt-12 px-5">
          <Text className="text-2xl font-bold text-gray-800">Pengaturan</Text>
          <Text className="mt-4 text-gray-600">
            Halaman pengaturan untuk karyawan (screen placeholder)
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}