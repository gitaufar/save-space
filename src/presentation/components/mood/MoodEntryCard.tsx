import React from 'react';
import { View, Text } from 'react-native';

// Import SVG icons
import StressSvg from '../../../assets/moods/stress.svg';
import MarahSvg from '../../../assets/moods/marah.svg';
import SedihSvg from '../../../assets/moods/sedih.svg';
import LelahSvg from '../../../assets/moods/lelah.svg';
import NetralSvg from '../../../assets/moods/netral.svg';
import TenangSvg from '../../../assets/moods/tenang.svg';
import SenangSvg from '../../../assets/moods/senang.svg';

interface MoodEntryCardProps {
  time: string;
  timeDisplay: string; // Format jam (08:30)
  moodType: 'stress' | 'marah' | 'sedih' | 'lelah' | 'netral' | 'tenang' | 'bahagia';
  note: string;
  energyLevel: 'rendah' | 'sedang' | 'tinggi';
  focusLevel: 'buruk' | 'ok' | 'baik' | 'membaik';
}

export const MoodEntryCard = ({ 
  time, 
  timeDisplay, 
  moodType, 
  note,
  energyLevel,
  focusLevel
}: MoodEntryCardProps) => {
  // Mapping untuk warna tag
  const energyColorMap = {
    rendah: 'bg-red-100 text-red-600',
    sedang: 'bg-amber-100 text-amber-600',
    tinggi: 'bg-red-100 text-red-600'  // Diubah sesuai gambar (warna merah)
  };
  
  const focusColorMap = {
    buruk: 'bg-red-100 text-red-600',
    ok: 'bg-blue-100 text-blue-600',
    baik: 'bg-blue-100 text-blue-600',  // Diubah sesuai gambar (warna biru)
    membaik: 'bg-purple-100 text-purple-600'
  };

  // Mapping untuk jenis mood ke komponen SVG
  const moodIcons = {
    stress: StressSvg,
    marah: MarahSvg,
    sedih: SedihSvg,
    lelah: LelahSvg,
    netral: NetralSvg,
    tenang: TenangSvg,
    bahagia: SenangSvg
  };
  
  // Dapatkan komponen SVG sesuai jenis mood
  const MoodIcon = moodIcons[moodType];

  return (
    <View className="mb-2">
      <View className="flex-row justify-between mb-1">
        <Text className="text-gray-500">{timeDisplay}</Text>
      </View>
      
      <View className="bg-white p-3 flex-row items-center mb-4 border border-[#6B7280] rounded-xl">
        <View className="flex-row">
          {/* Mood icon dalam lingkaran */}
          <View className="bg-teal-100 rounded-full w-10 h-10 items-center justify-center m-4">
            <MoodIcon width={64} height={64} />
          </View>
          <View className="flex-col justify-between flex-1 gap-2">       
            <Text className="font-semibold text-gray-800 ml-4 text-[16px]">{time}</Text>
              
              {/* Teks note */}
              <Text className="text-gray-600 flex-1 ml-4 ">{note}</Text>
          </View>
        </View>
    
      </View>
    </View>
  );
};