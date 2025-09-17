import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

// Import SVG sama kayak StatusMoodCard
import StressSvg from '../../../assets/moods/stress.svg';
import MarahSvg from '../../../assets/moods/marah.svg';
import SedihSvg from '../../../assets/moods/sedih.svg';
import LelahSvg from '../../../assets/moods/lelah.svg';
import NetralSvg from '../../../assets/moods/netral.svg';
import TenangSvg from '../../../assets/moods/tenang.svg';
import SenangSvg from '../../../assets/moods/senang.svg';

type MoodType =
  | 'Stress'
  | 'Marah'
  | 'Sedih'
  | 'Lelah'
  | 'Netral'
  | 'Tenang'
  | 'Bahagia';

type EmployeeMoodCardProps = {
  name: string;
  department: string;
  avatar: string;
  mood: MoodType;
  onPress: () => void;
};

// Mapping mood → warna & ikon
const moodConfig: Record<
  MoodType,
  { bg: string; color: string; icon: React.FC<any> }
> = {
  Stress: { bg: 'bg-red-100', color: '#DC2626', icon: StressSvg },
  Marah: { bg: 'bg-orange-100', color: '#EA580C', icon: MarahSvg },
  Sedih: { bg: 'bg-blue-100', color: '#2563EB', icon: SedihSvg },
  Lelah: { bg: 'bg-purple-100', color: '#9333EA', icon: LelahSvg },
  Netral: { bg: 'bg-gray-100', color: '#4B5563', icon: NetralSvg },
  Tenang: { bg: 'bg-teal-100', color: '#0D9488', icon: TenangSvg },
  Bahagia: { bg: 'bg-green-100', color: '#16A34A', icon: SenangSvg },
};

export default function EmployeeMoodCard({
  name,
  department,
  avatar,
  mood,
  onPress,
}: EmployeeMoodCardProps) {
  const safeMood = (mood as any) in moodConfig ? (mood as MoodType) : 'Netral';
  const { bg, color, icon: MoodIcon } = moodConfig[safeMood];

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center p-3 mb-3 bg-white shadow-sm rounded-2xl"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      {/* Avatar */}
      <Image
        source={{ uri: avatar }}
        className="w-12 h-12 mr-3 rounded-full"
      />

      {/* Info */}
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-900" numberOfLines={1} ellipsizeMode="tail">{name}</Text>
        {!!department && (
          <Text className="text-sm text-gray-500" numberOfLines={1} ellipsizeMode="tail">{department}</Text>
        )}
      </View>

      {/* Mood */}
      <View
        className={`w-12 h-12 rounded-full items-center justify-center mr-2 ${bg}`}
      >
        <MoodIcon width={32} height={32} />
      </View>

      {/* Arrow */}
      <ChevronRight size={20} color="#9ca3af" />
    </TouchableOpacity>
  );
}
