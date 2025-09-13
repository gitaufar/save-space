import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { format } from 'date-fns'; // Pastikan menginstall date-fns: npm install date-fns
import { id } from 'date-fns/locale/id'; // Locale bahasa Indonesia
import Logo from '../../../../assets/karyawan/mood/null_detail_mood.svg'

// Layout komponen ketika tidak ada data
export const NullDetailRiwayatLayout = ({ date }: { date: string }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'EEEE, dd MMMM yyyy', { locale: id });
  };

  return (
    <ScrollView className="flex-1 px-5">
      <View className="flex-1 items-center justify-center py-20">
        <Logo width={380} height={380} />
        <Text className="text-[20px] font-extrabold text-[#111827] text-center mt-10">
          Mood Tidak Tersedia
        </Text>
        <Text className="text-[14px] text-[#64748B] mt-2 text-center px-10 w-4/5">
          Mood kosong nih. Ayo bagikan suasana hatimu sekarang
        </Text>
      </View>
    </ScrollView>
  );
};
