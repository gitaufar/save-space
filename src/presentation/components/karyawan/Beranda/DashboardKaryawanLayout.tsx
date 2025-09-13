import React, {useEffect, useState} from "react";
import { ScrollView, View, Text, Image } from "react-native";
// Pastikan impor MainBoxType dari file yang benar
import { MainBox, MainBoxType } from "./MainBox";
import WelcomeIcon from "../../../../assets/karyawan/welcome_icon.svg"; // Perhatikan path
import MoodIcon from "../../../../assets/karyawan/mood_icon.svg"       // Perhatikan path
import CBIIcon from "../../../../assets/karyawan/cbi_icon.svg";         // Perhatikan path
import { useNavigation } from "@react-navigation/native";
import { RiwayatMood } from "./RiwayatMood";
import { AIDailyInsight } from "./AIDailyInsight";
import { useAuth } from "../../../contexts/AuthContext";
import { SupabaseDataSource } from "../../../../data/datasources/SupabaseDataSource";

export const mainBoxDefaultData = {
  [MainBoxType.WELCOME]: {
    title: "Selamat Pagi!",
    paragraph: "Ingat, keseimbangan kerja dan istirahat adalah kunci produktivitas.",
    image: <WelcomeIcon width={120} height={120} />,
    onPress: () => console.log("Welcome pressed")
  },
  [MainBoxType.MOOD_CHECK]: {
    title: "Mood Check!",
    paragraph: "Bagikan perasaan Anda hari ini!",
    image: <MoodIcon width={120} height={120} />,
    onPress: () => console.log("Mood check pressed")
  },
  [MainBoxType.CBI_TEST]: {
    title: "Yuk, Cek Burnout!",
    paragraph: "Ikuti CBI Test untuk memahami kondisi kerja Anda",
    image: <CBIIcon width={120} height={120} />,
    onPress: () => console.log("CBI test pressed")
  }
};

export const DashboardKaryawanLayout = () => {
    const navigation = useNavigation();
    const { user } = useAuth();
    
    // State untuk data yang bisa berubah
    const [mainBoxData, setMainBoxData] = useState(mainBoxDefaultData);
    const [aiInsight, setAiInsight] = useState<string | null>(null);
    const [aiLoading, setAiLoading] = useState<boolean>(false);
    
    // Handler untuk navigasi ke halaman mood check
    const handleMoodCheck = () => {
      navigation.navigate('MoodCheckScreen' as never);
    };
    
    // Handler untuk navigasi ke halaman CBI test
    const handleCBITest = () => {
      navigation.navigate('CBITestScreen' as never);
    };
    
    // Override data default jika diperlukan
    useEffect(() => {
      setMainBoxData(prev => ({
        ...prev,
        [MainBoxType.MOOD_CHECK]: {
          ...prev[MainBoxType.MOOD_CHECK],
          onPress: handleMoodCheck
        },
        [MainBoxType.CBI_TEST]: {
          ...prev[MainBoxType.CBI_TEST],
          onPress: handleCBITest
        }
      }));
    }, []);

    // Tidak perlu fetch space lagi; ambil nama & role dari app_users via AuthContext

    // Ambil AI Daily Insight terbaru hari ini untuk user (app_users.id)
    useEffect(() => {
      let active = true;
      async function loadInsight() {
        if (!user?.id) return;
        setAiLoading(true);
        try {
          const ds = new SupabaseDataSource();
          const latest = await ds.getLatestAIInsightByEmployeeToday(user.id);
          if (active) setAiInsight(latest?.insight_text ?? null);
        } catch (e) {
          if (active) setAiInsight(null);
        } finally {
          if (active) setAiLoading(false);
        }
      }
      loadInsight();
      return () => { active = false; };
    }, [user?.id]);
    
    return (
        <ScrollView className="flex-1">
            <View className="w-full bg-primary pt-12 pb-6 px-6 flex-row items-center justify-between mb-8 rounded-b-3xl">
                <View>
                    <Text className="font-semibold text-[18px] text-[#FAFAFA]">
                        {user?.name ? `Halo ${user.name},` : 'Halo,'}
                    </Text>
                    <Text className="text-[14px] text-[#FAFAFA]">
                        {user?.role || ''}
                    </Text>
                </View>
                
                <View className="h-20 w-20 rounded-full overflow-hidden border-8 border-white/30">
                    <Image 
                        source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
                        className="h-full w-full"
                    />
                </View>
            </View>
            
            <View className="px-5">
                <MainBox 
                    title={mainBoxData[MainBoxType.WELCOME].title}
                    paragraph={mainBoxData[MainBoxType.WELCOME].paragraph}
                    image={mainBoxData[MainBoxType.WELCOME].image}
                    onPress={mainBoxData[MainBoxType.WELCOME].onPress}
                    type={MainBoxType.WELCOME}
                />
                <RiwayatMood
                 />
                <AIDailyInsight insightText={aiInsight ?? undefined} loading={aiLoading} />
            </View>
        </ScrollView>
    );
}
