import React from 'react';
import { View, Text } from 'react-native';
import Time from '../../../assets/moods/time.svg';
import Stats from '../../../assets/moods/stats.svg';

interface MoodAnalysisCardProps {
  averageMood: 'stress' | 'marah' | 'sedih' | 'lelah' | 'netral' | 'tenang' | 'bahagia';
  goodMoodDuration: string; // Format: "X.X jam"
  insight: string;
}

export const MoodAnalysisCard = ({ 
  averageMood, 
  goodMoodDuration, 
  insight 
}: MoodAnalysisCardProps) => {
  return (
    <View className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
      {/* Row 1: Stats */}
      <View className="flex-row justify-around mb-6">
        {/* Average Mood */}
        <View className="items-center">
          <View className="bg-teal-50 w-16 h-16 rounded-full items-center justify-center mb-2">
            <Stats width={32} height={32} />
          </View>
          <Text className="text-gray-500 text-center">Rata-rata Mood</Text>
          <Text className="font-bold text-xl text-gray-800">{averageMood.charAt(0).toUpperCase() + averageMood.slice(1)}</Text>
        </View>
        
        {/* Good Mood Duration */}
        <View className="items-center">
          <View className="bg-amber-50 w-16 h-16 rounded-full items-center justify-center mb-2">
            <Time width={32} height={32} />
          </View>
          <Text className="text-gray-500 text-center">Durasi Mood Baik</Text>
          <Text className="font-bold text-xl text-gray-800">{goodMoodDuration}</Text>
        </View>
      </View>
      
      {/* Row 2: Insight */}
      <View>
        <Text className="font-bold text-xl text-gray-800 mb-2">Insight AI</Text>
        <Text className="text-gray-600 leading-relaxed">
          {insight}
        </Text>
      </View>
    </View>
  );
};