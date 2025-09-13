import React from 'react';
import { View, Text } from 'react-native';

// Import SVG dari folder assets/mood menggunakan path absolut
import StressSvg from '../../../assets/moods/stress.svg';
import MarahSvg from '../../../assets/moods/marah.svg';
import SedihSvg from '../../../assets/moods/sedih.svg';
import LelahSvg from '../../../assets/moods/lelah.svg';
import NetralSvg from '../../../assets/moods/netral.svg';
import TenangSvg from '../../../assets/moods/tenang.svg';
import SenangSvg from '../../../assets/moods/senang.svg';

// Interface untuk props
interface StatusMoodCardProps {
  moodType: 'stress' | 'marah' | 'sedih' | 'lelah' | 'netral' | 'tenang' | 'senang';
}

// Menggunakan arrow function untuk deklarasi komponen
export const StatusMoodCard = ({ moodType }: StatusMoodCardProps) => {
  // Mapping untuk warna background dan teks berdasarkan mood
  const moodConfig = {
    stress: { bg: 'bg-red-100', text: 'Stress', textColor: 'text-red-600', icon: StressSvg },
    marah: { bg: 'bg-orange-100', text: 'Marah', textColor: 'text-orange-600', icon: MarahSvg },
    sedih: { bg: 'bg-blue-100', text: 'Sedih', textColor: 'text-blue-600', icon: SedihSvg },
    lelah: { bg: 'bg-purple-100', text: 'Lelah', textColor: 'text-purple-600', icon: LelahSvg },
    netral: { bg: 'bg-gray-100', text: 'Netral', textColor: 'text-gray-600', icon: NetralSvg },
    tenang: { bg: 'bg-teal-100', text: 'Tenang', textColor: 'text-teal-600', icon: TenangSvg },
    senang: { bg: 'bg-green-100', text: 'Senang', textColor: 'text-green-600', icon: SenangSvg }
  };

  const { bg, text, textColor, icon: MoodIcon } = moodConfig[moodType];

  return (
    <View className={`rounded-xl ${bg} p-3 flex-row items-center mb-4 border border-${textColor}`}>
      <MoodIcon width={64} height={64} />
      <View className="ml-4">
        <Text className={`${textColor} text-sm`}>Status Mood Saat Ini</Text>
        <Text className={`font-semibold ${textColor} text-[16px]`}>{text}</Text>
      </View>
    </View>
  );
};