import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';

// Definisikan enum untuk tipe box
export enum MainBoxType {
  WELCOME = "welcome",
  MOOD_CHECK = "mood",
  CBI_TEST = "cbi"
}

// Tambahkan properti type pada MainBoxProps
type MainBoxProps = {
  title: string;
  paragraph: string;
  image: React.ReactNode;
  // onPress dihilangkan dari UI (tidak dipakai), jadikan opsional agar tidak error
  onPress?: () => void;
  type: MainBoxType;
  customData?: any;
  minHeight?: number; // Tinggi minimum box dalam pixel
};

export const MainBox = ({
  title,
  image,
  paragraph,
  type,
  minHeight = 180, // Default 180px (h-48 equivalent)
}: MainBoxProps) => {
  const navigation = useNavigation<any>();
  // Base styling yang digunakan oleh semua container
  const baseStyle = {
    minHeight,
    padding: 32, // p-8
  };

  // Handle navigasi ke CBITestScreen
  const handleCBITestNavigation = () => {
    navigation.navigate('CBITestScreen');
  };

  // "Button" non-klik khusus untuk MOOD_CHECK dan CBI_TEST
  const renderAction = () => {
    if (type === MainBoxType.MOOD_CHECK) {
      return (
        <View className="mt-3 self-start flex-row items-center bg-[#E5E7EB]/50 px-6 py-4 rounded-xl">
          <Text className="text-[14px] font-semibold text-[#1E293B] mr-1">Isi Sekarang</Text>
          <MaterialIcons name="chevron-right" size={16} color="#1E293B"  />
        </View>
      );
    }
    if (type === MainBoxType.CBI_TEST) {
      return (
        <TouchableOpacity 
          className="mt-3 self-start flex-row items-center bg-[#E5E7EB]/50 px-6 py-4 rounded-xl"
          onPress={handleCBITestNavigation}
        >
          <Text className="text-[13px] text-[#1E293B] mr-1">Mulai Tes CBI</Text>
          <MaterialIcons name="edit" size={16} color="#1E293B" />
        </TouchableOpacity>
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
        {image}
      </View>
    </View>
  );

  // Semua tipe menjadi View (tidak TouchableOpacity)
  return (
    <View
      className="w-full bg-primary rounded-3xl shadow-md mb-4 justify-center"
      style={baseStyle}
    >
      {content}
    </View>
  );
};