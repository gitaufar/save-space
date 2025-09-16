import React, {useEffect, useState, useRef} from "react";
import { ScrollView, View, Text, Image, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
// Pastikan impor MainBoxType dari file yang benar
import { MainBox, MainBoxType } from "./MainBox";
import WelcomeIcon from "../../../../assets/karyawan/welcome_icon.svg"; // Perhatikan path
import MoodIcon from "../../../../assets/karyawan/mood_icon.svg"       // Perhatikan path
import CBIIcon from "../../../../assets/karyawan/cbi_icon.svg";         // Perhatikan path
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
    const [workStartMinutes, setWorkStartMinutes] = useState<number>(9 * 60); // default 09:00
    const [hasPendingCBI, setHasPendingCBI] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const sliderRef = useRef<ScrollView | null>(null);
    
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

    // Refetch insight ketika dashboard kembali fokus
    useFocusEffect(
      React.useCallback(() => {
        let active = true;
        async function refetch() {
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
        refetch();
        return () => { active = false; };
      }, [user?.id])
    );

    // Ambil jam kerja dari space dan parse waktu mulai
    useEffect(() => {
      let active = true;
      async function loadWorkHours() {
        if (!user?.space_id) return;
        try {
          const ds = new SupabaseDataSource();
          const space = await ds.getSpaceById(user.space_id);
          const start = parseStartMinutes(space?.work_hours);
          if (active) setWorkStartMinutes(start);
        } catch {}
      }
      loadWorkHours();
      return () => { active = false; };
    }, [user?.space_id]);

    // Cek apakah ada CBI Test yang belum selesai untuk user
    useEffect(() => {
      let active = true;
      async function loadCBI() {
        if (!user?.id) return;
        try {
          const ds = new SupabaseDataSource();
          const test = await ds.getCBITestByEmployee(user.id);
          if (active) setHasPendingCBI(Boolean(test));
        } catch {
          if (active) setHasPendingCBI(false);
        }
      }
      loadCBI();
      return () => { active = false; };
    }, [user?.id]);

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

    // Time-based visibility
    const nowMinutes = (() => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); })();
    const showWelcome = nowMinutes < workStartMinutes;
    const showMoodCheck = nowMinutes >= workStartMinutes;
    
    const activeMainBoxes: Array<{ type: MainBoxType; key: string }> = [];
    if (showWelcome) activeMainBoxes.push({ type: MainBoxType.WELCOME, key: 'welcome' });
    if (showMoodCheck) activeMainBoxes.push({ type: MainBoxType.MOOD_CHECK, key: 'mood' });
    if (hasPendingCBI) activeMainBoxes.push({ type: MainBoxType.CBI_TEST, key: 'cbi' });

    useEffect(() => {
      if (activeMainBoxes.length <= 1) return;
      const w = Dimensions.get('window').width;
      const id = setInterval(() => {
        setCurrentIndex(prev => {
          const next = (prev + 1) % activeMainBoxes.length;
          sliderRef.current?.scrollTo({ x: next * w, animated: true });
          return next;
        });
      }, 5000);
      return () => clearInterval(id);
    }, [activeMainBoxes.length]);

    const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const w = Dimensions.get('window').width;
      const idx = Math.round((e.nativeEvent.contentOffset.x || 0) / w);
      setCurrentIndex(Math.max(0, Math.min(idx, activeMainBoxes.length - 1)));
    };
    
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
                        source={{ uri: user?.avatar_url || 'https://i.pravatar.cc/150?img=44' }}
                        className="h-full w-full"
                    />
                </View>
            </View>
            
            <View className="px-0">
                {activeMainBoxes.length > 0 && (
                  <ScrollView
                    ref={sliderRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={onMomentumEnd}
                  >
                    {activeMainBoxes.map(item => (
                      <View key={item.key} style={{ width: Dimensions.get('window').width }}>
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
                <RiwayatMood
                 />
                <AIDailyInsight insightText={aiInsight ?? undefined} loading={aiLoading} />
            </View>
        </ScrollView>
    );
}
