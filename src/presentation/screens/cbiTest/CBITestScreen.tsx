import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { Tips } from '../../components/common/tips';
import { Question } from '../../components/cbiTest/question';
import { CBITestLayout } from "../../components/cbiTest/CbiTestLayout";

export default function CBITestScreen() {
    const navigation = useNavigation();
    return (
        <View className="flex-1 bg-[#FAFAFA]">
              <View className="relative flex items-center h-32 px-5 pt-4 bg-primary">
                {/* Back Button */}
                <TouchableOpacity 
                  onPress={() => navigation.goBack()}
                  className="absolute z-10 left-4 top-14"
                >
                  <ArrowLeft size={24} color="#FAFAFA" />
                </TouchableOpacity>
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