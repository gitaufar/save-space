import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

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
    onPress: () => void;
    type: MainBoxType;
    // Properti opsional untuk data kustom
    customData?: any;
    // Properti opsional untuk styling
    minHeight?: number; // Tinggi minimum box dalam pixel
}

export const MainBox = ({ 
    title, 
    onPress, 
    image, 
    paragraph, 
    type, 
    minHeight = 180 // Default 180px (h-48 equivalent)
}: MainBoxProps) => {

    // Base styling yang digunakan oleh kedua container
    const baseStyle = {
        minHeight, // Gunakan minHeight sebagai tinggi minimum
        padding: 32, // p-8 equivalent
    };
    
    // Konten yang akan ditampilkan di dalam container
    const content = (
        <View className="flex-row items-center">
            <View className="items-start justify-center w-1/2">
                <Text className="text-[18px] font-bold text-white">{title}</Text>
                <Text className="text-[14px] text-white/80 mt-1">{paragraph}</Text>
            </View>
            <View className="items-end justify-center w-1/2">
                {image}
            </View>
        </View>
    );
    
    // Render berbeda berdasarkan tipe
    if (type === MainBoxType.WELCOME) {
        return (
            <View 
                className={`w-full bg-primary rounded-3xl shadow-md mb-4 justify-center`}
                style={baseStyle}
            >
                {content}
            </View>
        );
    } else {
        return (
            <TouchableOpacity 
                onPress={onPress} 
                className={`w-full bg-primary rounded-3xl shadow-md mb-4 justify-center`}
                style={baseStyle}
                activeOpacity={0.9}
            >
                {content}
            </TouchableOpacity>
        );
    }
}