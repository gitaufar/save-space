import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native"; // kalau sudah pakai lucide
import { StatusMoodCard } from "../../components/mood/StatusMoodCard";
import { AIDailyInsight } from "../../components/karyawan/Beranda/AIDailyInsight";
import { RiwayatMood } from "../../components/karyawan/Beranda/RiwayatMood";
import { CBITestCard } from "../../components/manager/CBITestCard";

type Employee = {
  name: string;
  department: string;
  avatar: string;
  mood?: string | null;
};

const moodLabels = ['Stress', 'Sedih', 'Marah', 'Netral', 'Tenang', 'Lelah', 'Senang'];

export default function DetailKaryawanScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { employee } = route.params as { employee?: Employee } || {};

  // Data default jika tidak ada employee dari props
  const defaultEmployee = {
    name: "Maya Sari",
    department: "Marketing",
    avatar: "https://i.pravatar.cc/150?img=12",
    mood: 'Marah'
  };

  const currentEmployee = employee || defaultEmployee;
  const moodType = employee?.mood || defaultEmployee.mood || 'Netral';

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-semibold text-[#111827]">
          Detail Karyawan
        </Text>
        <View style={{ width: 24 }} /> {/* spacer biar seimbang */}
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Profil */}
        <View className="flex-row items-center mb-4">
          <Image
            source={{ uri: currentEmployee.avatar }}
            className="w-16 h-16 rounded-full"
          />
          <View className="ml-4">
            <Text className="text-lg font-semibold text-[#111827]">
              {currentEmployee.name}
            </Text>
            <Text className="text-gray-500">{currentEmployee.department}</Text>
          </View>
        </View>

        {/* Status Mood */}
        <StatusMoodCard moodType={moodType as any} />

        {/* AI Daily Insight */}
        <AIDailyInsight
          insightText={`${currentEmployee.name} menunjukkan mood ${moodType} hari ini. Disarankan untuk melakukan follow-up dan memberikan dukungan yang tepat.`}
        />

        {/* Riwayat Mood */}
        <RiwayatMood />

        {/* CBI Test Result */}
        <CBITestCard score={47} label="Client Burnout" />
      </ScrollView>
    </View>
  );
}
