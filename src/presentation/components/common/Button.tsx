import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

type ButtonProps = {
    text: string;
    padding?: string;
    fontSize?: string;
    icon: React.ReactNode;
    margin?: string;
    rounded?: string;
}
export default function Button({text, icon, padding = "px-6 py-3", fontSize = "text-[16px]", margin = "m-6", rounded = "rounded-[8px]"}: ButtonProps) {
  if (!text){
    throw new Error("Text tidak boleh kosong");
  }

  return (
    <TouchableOpacity className={`bg-[#00BFA6] ${rounded} self-start ${padding} ${margin}`}>
        <View className="flex-row items-center justify-center">
            {icon && <View className="mr-2">{icon}</View>}
            <Text className={`text-[#FAFAFA] text-center font-medium ${fontSize}`}>{text}</Text>
        </View>
    </TouchableOpacity>
  )
}