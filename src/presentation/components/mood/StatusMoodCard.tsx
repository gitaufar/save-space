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
  moodType: 'Stress' | 'Marah' | 'Sedih' | 'Lelah' | 'Netral' | 'Tenang' | 'Bahagia';
}

// Menggunakan arrow function untuk deklarasi komponen
export const StatusMoodCard = ({ moodType }: StatusMoodCardProps) => {
  // Mapping untuk warna background dan teks berdasarkan mood
  const moodConfig = {
    Stress: { border: 'border-red-300',bg: 'bg-red-100', text: 'Stress', textColor: 'text-red-600', icon: StressSvg },
    Marah: { border: 'border-orange-300', bg: 'bg-orange-100', text: 'Marah', textColor: 'text-orange-600', icon: MarahSvg },
    Sedih: { border: 'border-blue-300', bg: 'bg-blue-100', text: 'Sedih', textColor: 'text-blue-600', icon: SedihSvg },
    Lelah: { border: 'border-purple-300', bg: 'bg-purple-100', text: 'Lelah', textColor: 'text-purple-600', icon: LelahSvg },
    Netral: { border: 'border-gray-300', bg: 'bg-gray-100', text: 'Netral', textColor: 'text-gray-600', icon: NetralSvg },
    Tenang: { border: 'border-teal-300', bg: 'bg-teal-100', text: 'Tenang', textColor: 'text-teal-600', icon: TenangSvg },
    Bahagia: { border: 'border-green-300', bg: 'bg-green-100', text: 'Bahagia', textColor: 'text-green-600', icon: SenangSvg }
  };

  const safeMood = (moodType as any) in moodConfig ? moodType : 'Netral';
  const { border, bg, text, textColor, icon: MoodIcon } = moodConfig[safeMood as keyof typeof moodConfig];

  return (
    <View className={`rounded-xl ${bg} p-3 flex-row items-center mb-4 border ${border}`}>
      <MoodIcon width={64} height={64} />
      <View className="ml-4">
        <Text className={`${textColor} text-sm`}>Status Mood Saat Ini</Text>
        <Text className={`font-semibold ${textColor} text-[16px]`}>{text}</Text>
      </View>
    </View>
  );
};
