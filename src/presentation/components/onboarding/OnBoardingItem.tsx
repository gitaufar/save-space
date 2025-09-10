import React, { ReactNode } from "react";
import { View, Text } from "react-native";

type OnBoardingItemProps = {
  image: ReactNode;
  title: string;
  paragraph: string;
  index: number; // tambahkan prop index
};

export const OnBoardingItem = ({ image, title, paragraph, index }: OnBoardingItemProps) => (
  <View className="items-center">
    <View className="pt-5 pb-20 items-center">
      {image && React.cloneElement(image as any, { 
        width: index === 0 ? 200 : 312, 
        height: index === 0 ? 200 : 332 
      })}
    </View>
    <Text
      className="text-center text-[32px] text-[#1F2937] font-bold pb-8"
      style={{ lineHeight: 32, fontWeight: "700" }}
    >
      {title}
    </Text>
    <Text
      className="text-center text-[16px] text-[#4B5563]"
      style={{
        width: 276,
        height: 78,
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 26,
      }}
    >
      {paragraph}
    </Text>
  </View>
);