import React, {useEffect, useState, useRef} from "react";
import { ScrollView, View, Text, Image, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
// Pastikan impor MainBoxType dari file yang benar
import { MainBox, MainBoxType } from "./MainBox";
import WelcomeIcon from "../../../../assets/karyawan/welcome_icon.svg"; // Perhatikan path
import MoodIcon from "../../../../assets/karyawan/mood_icon.svg"       // Perhatikan path
import CBIIcon from "../../../../assets/karyawan/cbi_icon.svg";         // Perhatikan path
import AILampIcon from "../../../../assets/karyawan/ai_lamp.svg";   // Icon untuk AI Insight
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RiwayatMood } from "./RiwayatMood";
import { AIDailyInsight } from "./AIDailyInsight";
import { useAuth } from "../../../contexts/AuthContext";
import { useSpace } from "../../../contexts/SpaceContext";
import { useCBI } from "../../../contexts/CBIContext";
import { useAIInsight } from "../../../contexts/AIInsightContext";
import { useMood } from "../../../contexts/MoodContext";

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
  },
  [MainBoxType.AI_INSIGHT]: {
    title: "AI Daily Insight",
    paragraph: "Wawasan AI berdasarkan mood Anda hari ini",
    image: <AILampIcon width={120} height={120} />,
    onPress: () => console.log("AI insight pressed")
  }
};

export const DashboardKaryawanLayout = () => {
    const navigation = useNavigation();
    const { user } = useAuth();
    const { currentSpace } = useSpace();
    const { hasPendingCBI, refreshCBIStatus } = useCBI();
    const { currentInsight: aiInsight, loading: aiLoading, refreshInsight } = useAIInsight();
    const { hasMoodToday, refreshMoodStatus } = useMood();
    
    // State untuk data yang bisa berubah
    const [mainBoxData, setMainBoxData] = useState(mainBoxDefaultData);
    const [workStartMinutes, setWorkStartMinutes] = useState<number>(9 * 60); // default 09:00
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const sliderRef = useRef<ScrollView | null>(null);
    
    // Function untuk mendapatkan MainBox type berdasarkan waktu dan kondisi user
    const getCurrentMainBoxType = (): MainBoxType => {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = currentHour * 60 + now.getMinutes();
        const workStartHour = Math.floor(workStartMinutes / 60);
        
        console.log('🕐 Current time:', `${currentHour}:${now.getMinutes().toString().padStart(2, '0')}`);
        console.log('🏢 Work start time:', `${workStartHour}:${(workStartMinutes % 60).toString().padStart(2, '0')}`);
        console.log('😊 Has mood today:', hasMoodToday);
        
        // Jam 6 pagi sampai jam masuk kerja = WELCOME
        if (currentHour >= 6 && currentMinutes < workStartMinutes) {
            console.log('📅 Showing WELCOME (before work hours)');
            return MainBoxType.WELCOME;
        }
        
        // Setelah jam masuk kerja
        if (currentMinutes >= workStartMinutes) {
            // Jika belum mood check hari ini = MOOD_CHECK
            if (!hasMoodToday) {
                console.log('😊 Showing MOOD_CHECK (work time, no mood yet)');
                return MainBoxType.MOOD_CHECK;
            }
            
            // Jika sudah mood check = AI_INSIGHT
            console.log('🤖 Showing AI_INSIGHT (work time, mood done)');
            return MainBoxType.AI_INSIGHT;
        }
        
        // Default fallback (sebelum jam 6 pagi)
        console.log('🌙 Showing WELCOME (early morning)');
        return MainBoxType.WELCOME;
    };
    
    // Function untuk mendapatkan data yang akan ditampilkan
    const getDisplayData = () => {
        const currentType = getCurrentMainBoxType();
        
        // Buat array berdasarkan kondisi
        const displayItems = [{ type: currentType }];
        
        // Tambahkan CBI Test jika ada pending
        if (hasPendingCBI) {
            displayItems.push({ type: MainBoxType.CBI_TEST });
        }
        
        return displayItems;
    };
    
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

    // Refetch insight, CBI status, dan mood status ketika dashboard kembali fokus
    useFocusEffect(
      React.useCallback(() => {
        refreshInsight();
        refreshCBIStatus();
        refreshMoodStatus();
      }, [refreshInsight, refreshCBIStatus, refreshMoodStatus])
    );

    // Parse waktu mulai dari space work_hours
    useEffect(() => {
        if (currentSpace?.work_hours) {
            const start = parseStartMinutes(currentSpace.work_hours);
            setWorkStartMinutes(start);
        }
    }, [currentSpace?.work_hours]);

    // Override data default dengan handlers
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
        },
        [MainBoxType.AI_INSIGHT]: {
          ...prev[MainBoxType.AI_INSIGHT],
          paragraph: aiInsight || "Wawasan AI berdasarkan mood Anda hari ini"
        }
      }));
    }, [aiInsight]);

    // Helper: parse start time (minutes after midnight) from work_hours string
    function parseStartMinutes(workHours?: string): number {
      try {
        const text = String(workHours || '').trim();
        const m = text.match(/(\d{1,2})(?::(\d{2}))?/);
        if (!m) return 9 * 60;
        const hh = Math.min(23, Math.max(0, parseInt(m[1], 10)));
        const mm = m[2] ? Math.min(59, Math.max(0, parseInt(m[2], 10))) : 0;
        return hh * 60 + mm;
      } catch {
        return 9 * 60;
      }
    }

    // Get dynamic display data
    const displayItems = getDisplayData();

    // Auto scroll effect untuk multiple items
    useEffect(() => {
      if (displayItems.length <= 1) return;
      const w = Dimensions.get('window').width;
      const id = setInterval(() => {
        setCurrentIndex(prev => {
          const next = (prev + 1) % displayItems.length;
          sliderRef.current?.scrollTo({ x: next * w, animated: true });
          return next;
        });
      }, 5000);
      return () => clearInterval(id);
    }, [displayItems.length]);

    const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const w = Dimensions.get('window').width;
      const idx = Math.round((e.nativeEvent.contentOffset.x || 0) / w);
      setCurrentIndex(Math.max(0, Math.min(idx, displayItems.length - 1)));
    };
    
    return (
        <ScrollView className="flex-1">
            <View className="flex-row items-center justify-between w-full px-6 pt-12 pb-6 mb-8 bg-primary rounded-b-3xl">
                <View>
                    <Text className="font-semibold text-[18px] text-[#FAFAFA]">
                        {user?.name ? `Halo ${user.name},` : 'Halo,'}
                    </Text>
                    <Text className="text-[14px] text-[#FAFAFA]">
                        {user?.role || ''}
                    </Text>
                </View>
                
                <View className="w-20 h-20 overflow-hidden border-8 rounded-full border-white/30">
                    <Image 
                        source={{ uri: user?.avatar_url || 'https://i.pravatar.cc/150?img=44' }}
                        className="w-full h-full"
                    />
                </View>
            </View>
            
            <View className="px-0">
                {displayItems.length > 0 && (
                  <ScrollView
                    ref={sliderRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={onMomentumEnd}
                  >
                    {displayItems.map((item, index) => (
                      <View key={`${item.type}-${index}`} style={{ width: Dimensions.get('window').width }}>
                        <View className="px-5">
                          <MainBox
                            title={mainBoxData[item.type].title}
                            paragraph={mainBoxData[item.type].paragraph}
                            image={mainBoxData[item.type].image}
                            onPress={mainBoxData[item.type].onPress}
                            type={item.type}
                          />
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                )}

                {/* Dots indicator */}
                {displayItems.length > 1 && (
                  <View className="flex-row justify-center mt-4 space-x-2">
                    {displayItems.map((_, index) => (
                      <View 
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </View>
                )}
                
                <RiwayatMood
                 />
                <AIDailyInsight insightText={aiInsight ?? undefined} loading={aiLoading} />
            </View>
        </ScrollView>
    );
}
