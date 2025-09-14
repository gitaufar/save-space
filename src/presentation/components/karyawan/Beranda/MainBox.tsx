import React from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';

// Import SVG mood icons
import StressSvg from '../../../../assets/moods/stress.svg';
import MarahSvg from '../../../../assets/moods/marah.svg';
import LelahSvg from '../../../../assets/moods/lelah.svg';
import SedihSvg from '../../../../assets/moods/sedih.svg';
import NetralSvg from '../../../../assets/moods/netral.svg';
import TenangSvg from '../../../../assets/moods/tenang.svg';
import SenangSvg from '../../../../assets/moods/senang.svg';

// Definisikan enum untuk tipe box
export enum MainBoxType {
  WELCOME = "welcome",
  MOOD_CHECK = "mood",
  CBI_TEST = "cbi",
  AI_INSIGHT = "ai_insight"
}

// Definisikan tipe mood
export type MoodType = 'stress' | 'marah' | 'lelah' | 'sedih' | 'netral' | 'tenang' | 'senang';

// Mapping warna dan SVG berdasarkan tipe mood
const moodConfig = {
  stress: { 
    color: '#D32F2F', 
    bg: 'bg-[#D32F2F]', 
    text: 'Stress',
    svg: StressSvg 
  },
  marah: { 
    color: '#F44336', 
    bg: 'bg-[#F44336]', 
    text: 'Marah',
    svg: MarahSvg 
  },
  lelah: { 
    color: '#FF9800', 
    bg: 'bg-[#FF9800]', 
    text: 'Lelah',
    svg: LelahSvg 
  },
  sedih: { 
    color: '#FFC107', 
    bg: 'bg-[#FFC107]', 
    text: 'Sedih',
    svg: SedihSvg 
  },
  netral: { 
    color: '#9E9E9E', 
    bg: 'bg-[#9E9E9E]', 
    text: 'Netral',
    svg: NetralSvg 
  },
  tenang: { 
    color: '#4DB6AC', 
    bg: 'bg-[#4DB6AC]', 
    text: 'Tenang',
    svg: TenangSvg 
  },
  senang: { 
    color: '#00BFA6', 
    bg: 'bg-[#00BFA6]', 
    text: 'Senang',
    svg: SenangSvg 
  },
};

// Tambahkan properti type dan moodType pada MainBoxProps
type MainBoxProps = {
  title: string;
  paragraph: string;
  image: React.ReactNode;
  onPress?: () => void;
  type: MainBoxType;
  moodType?: MoodType;  // Tambahkan moodType untuk AI_INSIGHT
  customData?: any;
  minHeight?: number;
};

export const MainBox = ({
  title,
  image,
  paragraph,
  type,
  moodType = 'tenang',  // Default moodType
  minHeight = 180,
}: MainBoxProps) => {
  const navigation = useNavigation<any>();
  
  const baseStyle = {
    minHeight,
    padding: 32, // p-8
  };

  const handleCBITestNavigation = () => {
    navigation.navigate('CBITestScreen');
  };

  const handleMoodCheck = () => {
    navigation.navigate('MoodCheckScreen');
  };

  // Render mood icon untuk tipe AI_INSIGHT
  const renderMoodIcon = () => {
    if (type === MainBoxType.AI_INSIGHT && moodType) {
      const { svg: MoodSvg } = moodConfig[moodType];
      
      return (
        <View className="bg-white/20 rounded-full w-20 h-20 items-center justify-center">
          <MoodSvg width={40} height={40} />
        </View>
      );
    }
    return image;
  };

  // "Button" non-klik khusus untuk MOOD_CHECK dan CBI_TEST
  const renderAction = () => {
    if (type === MainBoxType.MOOD_CHECK) {
      return (
        <Pressable
          className="mt-3 self-start flex-row items-center bg-[#E5E7EB]/50 px-6 py-4 rounded-xl"
          onPress={handleMoodCheck}
        >
          <Text className="text-[14px] font-semibold text-[#1E293B] mr-1">Isi Sekarang</Text>
          <MaterialIcons name="chevron-right" size={16} color="#1E293B"  />
        </Pressable>
      );
    }
    if (type === MainBoxType.CBI_TEST) {
      return (
        <Pressable
          className="mt-3 self-start flex-row items-center bg-[#E5E7EB]/50 px-6 py-4 rounded-xl"
          onPress={handleCBITestNavigation}
        >
          <Text className="text-[13px] text-[#1E293B] mr-1">Mulai Tes CBI</Text>
          <MaterialIcons name="edit" size={16} color="#1E293B" />
        </Pressable>
      );
    }
    return null;
  };

  // Konten dalam box
  const content = (
    <View className="flex-row items-center">
      <View className="items-start justify-center w-1/2">
        <Text className="text-[18px] font-bold text-white">{title}</Text>
        <Text className="text-[14px] text-white/80 mt-1">{paragraph}</Text>
        {renderAction()}
      </View>
      <View className="items-end justify-center w-1/2">
        {type === MainBoxType.AI_INSIGHT ? renderMoodIcon() : image}
      </View>
    </View>
  );

  // Tentukan warna background berdasarkan tipe
  const getBgColor = () => {
    if (type === MainBoxType.AI_INSIGHT && moodType) {
      return moodConfig[moodType].bg;
    }
    return "bg-primary";
  };

  // Semua tipe menjadi View (tidak TouchableOpacity)
  return (
    <View
      className={`w-full ${getBgColor()} rounded-3xl shadow-md mb-4 justify-center`}
      style={baseStyle}
    >
      {content}
    </View>
  );
};