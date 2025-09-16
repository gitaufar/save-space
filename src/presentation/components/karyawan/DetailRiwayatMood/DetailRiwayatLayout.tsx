import React from "react";
import { ScrollView, View, Text } from "react-native";
import { StatusMoodCard } from "../../mood/StatusMoodCard";
import { MoodEntryCard } from "../../mood/MoodEntryCard";
import { MoodAnalysisCard } from "../../mood/MoodAnalysisCard";

interface MoodData {
  id: string;
  value: number; // 1-7 untuk 7 jenis mood
  date: string;
  time: string;
  timeDisplay: string;
  note: string;
  energyLevel: 'rendah' | 'sedang' | 'tinggi';
  focusLevel: 'buruk' | 'ok' | 'baik' | 'membaik';
}

// Mapping dari value ke jenis mood
const getMoodType = (value: number) => {
  const moodTypes = ['stress', 'marah', 'sedih', 'lelah', 'netral', 'tenang', 'senang'];
  return moodTypes[value - 1] as 'stress' | 'marah' | 'sedih' | 'lelah' | 'netral' | 'tenang' | 'senang';
};

// Convert mood type untuk StatusMoodCard
const getMoodTypeForCard = (moodType: string): 'Stress' | 'Marah' | 'Sedih' | 'Lelah' | 'Netral' | 'Tenang' | 'Senang' => {
  const moodMap: { [key: string]: 'Stress' | 'Marah' | 'Sedih' | 'Lelah' | 'Netral' | 'Tenang' | 'Senang' } = {
    'stress': 'Stress',
    'marah': 'Marah',
    'sedih': 'Sedih',
    'lelah': 'Lelah',
    'netral': 'Netral',
    'tenang': 'Tenang',
    'senang': 'Senang'
  };
  return moodMap[moodType] || 'Netral';
};

interface DetailRiwayatLayoutProps {
  data: MoodData[];
}

export const DetailRiwayatLayout: React.FC<DetailRiwayatLayoutProps> = ({ data }) => {
  // Hitung mood rata-rata
  const averageMoodValue = Math.round(
    data.reduce((sum, item) => sum + item.value, 0) / data.length
  );
  const averageMoodType = getMoodType(averageMoodValue);
  
  // Hitung durasi mood baik (value >= 5)
  const goodMoodCount = data.filter(item => item.value >= 5).length;
  const goodMoodDuration = `${goodMoodCount * 1.5} jam`;
  
  // Insight AI (contoh statis)
  const insight = "Pola mood Anda menunjukkan tren positif. Penurunan mood di siang hari adalah normal setelah aktivitas intensif dan akan membaik setelah istirahat menjadi pola istirahat yang konsisten.";
  
  return (
    <ScrollView className="flex-1 px-5">
      <View className="mt-4 mb-8">
        {/* Status Mood Card */}
        <StatusMoodCard moodType={getMoodTypeForCard(averageMoodType)} />
        
        {/* Mood Entry Cards */}
        {data.map((item) => (
          <MoodEntryCard
            key={item.id}
            time={item.time}
            timeDisplay={item.timeDisplay}
            moodType={getMoodType(item.value)}
            note={item.note}
            energyLevel={item.energyLevel}
            focusLevel={item.focusLevel}
          />
        ))}
        
        {/* Mood Analysis Card */}
        <MoodAnalysisCard
          averageMood={averageMoodType}
          goodMoodDuration={goodMoodDuration}
          insight={insight}
        />
      </View>
    </ScrollView>
  );
};

export default DetailRiwayatLayout;