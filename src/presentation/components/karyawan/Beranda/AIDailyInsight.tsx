import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../../../assets/karyawan/ai_lamp.svg";// Perhatikan path

// Interface untuk props komponen
interface AIDailyInsightProps {
  insightText?: string;  // Teks insight dari AI (opsional)
  title?: string;        // Judul komponen (opsional)
  onPress?: () => void;  // Handler untuk tombol (opsional)
  loading?: boolean;     // Status loading saat mengambil data dari AI
}

export const AIDailyInsight: React.FC<AIDailyInsightProps> = ({ 
  insightText,
  title = "AI Daily Insight",
  onPress,
  loading = false
}) => {
    const navigation = useNavigation();
    
    // Default text jika tidak ada insight dari AI
    const defaultText = "Lengkapi mood hari ini untuk mendapatkan saran dari AI.";
    
    // Handler ketika komponen ditekan
    const handlePress = () => {
      if (onPress) {
        onPress();
      } else {
        // Default behavior jika tidak ada handler
        navigation.navigate('AIInsightScreen' as never);
      }
    };
    
    return (
        <TouchableOpacity 
            className="w-full bg-[#FFB74D80]/20 rounded-3xl shadow-md p-6 border border-[#FFB74D] mb-4"
            activeOpacity={0.8}
            onPress={handlePress}
        >
            <View className="flex flex-row items-center">
                <View className="p-2 bg-[#FFB74D]/20 rounded-full">
                    <Logo width={40} height={40} />
                </View>
                <Text className="text-[18px] font-bold text-[#111827] ml-2">{title}</Text>
            </View>
            
            <View className="bg-[#FFFFFF]/60 mt-4 rounded-3xl p-4">
                {loading ? (
                  <Text className="text-[#6B7280] ml-2">
                    Memuat insight dari AI...
                  </Text>
                ) : (
                  <Text className="text-[#6B7280] ml-2">
                    {insightText || defaultText}
                  </Text>
                )}
            </View>
        </TouchableOpacity>
    );
}