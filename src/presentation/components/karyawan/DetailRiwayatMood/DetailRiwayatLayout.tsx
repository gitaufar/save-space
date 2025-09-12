import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { format } from 'date-fns'; // Pastikan menginstall date-fns: npm install date-fns
import { id } from 'date-fns/locale/id'; // Locale bahasa Indonesia


interface MoodData {
  id: string;
  value: number; // 1-5
  date: string;
  note?: string;
}

// Layout komponen ketika ada data
export const DetailRiwayatLayout = ({ data }: { data: MoodData[] }) => {
  const mappedMoodText = (value: number) => {
    switch (value) {
      case 1: return 'Sangat Buruk';
      case 2: return 'Buruk';
      case 3: return 'Netral';
      case 4: return 'Baik';
      case 5: return 'Sangat Baik';
      default: return 'Tidak Diketahui';
    }
  };

  const getMoodColor = (value: number) => {
    switch (value) {
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-amber-500';
      case 4: return 'bg-lime-500';
      case 5: return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'EEEE, dd MMMM yyyy', { locale: id });
  };

  return (
    <ScrollView 
      className="flex-1 px-5" 
      showsVerticalScrollIndicator={false}
    >
      <View className="mt-4 mb-8">
        {/* Data Mood Harian */}
        <View className="bg-white p-6 rounded-xl shadow-sm mb-4">
          <Text className="text-[16px] font-bold mb-4">Riwayat Mood Harian</Text>
          
          {data.map((item) => (
            <View key={item.id} className="mb-4 border-b border-gray-100 pb-3">
              <Text className="font-medium text-gray-700 mb-1">{formatDate(item.date)}</Text>
              <View className="flex-row items-center mb-2">
                <View className={`h-4 w-4 rounded-full ${getMoodColor(item.value)} mr-2`} />
                <Text className="font-medium">
                  {mappedMoodText(item.value)}
                </Text>
              </View>
              {item.note && (
                <View className="bg-gray-50 p-3 rounded-lg">
                  <Text className="text-gray-600">{item.note}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
        
        {/* Insight */}
        <View className="bg-white p-6 rounded-xl shadow-sm">
          <Text className="text-[16px] font-bold mb-4">Insight Mood</Text>
          <Text className="text-gray-600">
            {data.length > 5 
              ? "Mood Anda cenderung stabil minggu ini dengan beberapa fluktuasi di akhir pekan. Cobalah untuk beristirahat yang cukup dan menjaga keseimbangan aktivitas."
              : "Belum cukup data untuk memberikan insight yang akurat. Terus catat mood Anda secara rutin untuk mendapatkan analisis yang lebih baik."}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
