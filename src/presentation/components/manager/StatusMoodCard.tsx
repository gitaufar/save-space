import React from 'react';
import { View, Text } from 'react-native';
import MoodIcon from '../../../assets/karyawan/mood_angry.svg'; // ganti sesuai mood icon

interface StatusMoodCardProps {
  mood: 'Bahagia' | 'Lelah' | 'Marah' | 'Sedih' | 'Stress' | 'Netral';
}

export const StatusMoodCard: React.FC<StatusMoodCardProps> = ({ mood }) => {
  // mapping warna berdasarkan mood
  const moodColors: Record<string, string> = {
    Bahagia: '#34D399', // hijau
    Tenang: '#60A5FA',  // biru
    Lelah: '#FBBF24',   // kuning
    Marah: '#F87171',   // merah
    Sedih: '#818CF8',   // ungu
    Stress: '#F472B6',  // pink
    Netral: '#9CA3AF',  // abu
  };

  const color = moodColors[mood] || '#F87171';

  return (
    <View
      className="w-full flex-row items-center border-[#FFB74D] p-4 rounded-2xl mb-4 border bg-[#FFB74D80]/20"
    >
      <MoodIcon width={40} height={40} />
      <Text className="ml-4 font-semibold text-[#111827]">
        Status Mood Saat Ini
      </Text>
      <Text className="ml-auto font-bold" style={{ color }}>
        {mood}
      </Text>
    </View>
  );
};
