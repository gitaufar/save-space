import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Tips } from '../../components/common/tips';
import { Question } from '../../components/cbiTest/question';
import { CBITestLayout } from "../../components/cbiTest/CbiTestLayout";

export default function CBITestScreen() {
    return (
        <View className="flex-1 bg-[#FAFAFA]">
          <View className="flex items-center px-5 h-32 pt-4 bg-primary">
            <Text className="text-lg font-medium text-[#FAFAFA] pt-10">CBI Test</Text>
          </View>
          <ScrollView 
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }} // Ini memastikan konten minimal setinggi layar
            showsVerticalScrollIndicator={false}
          >
            <CBITestLayout />
          </ScrollView>
        </View>
    )
}