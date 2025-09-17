import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native';
// Pastikan impor MainBoxType dari file yang benar
import { MainBox, MainBoxType } from './MainBox';
import WelcomeIcon from '../../../../assets/karyawan/welcome_icon.svg';
import MoodIcon from '../../../../assets/karyawan/mood_icon.svg';
import CBIIcon from '../../../../assets/karyawan/cbi_icon.svg';
import AILampIcon from '../../../../assets/karyawan/ai_lamp.svg';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RiwayatMood } from './RiwayatMood';
import { AIDailyInsight } from './AIDailyInsight';
import { useAuth } from '../../../contexts/AuthContext';
import { useSpace } from '../../../contexts/SpaceContext';
import { useCBI } from '../../../contexts/CBIContext';
import { useAIInsight } from '../../../contexts/AIInsightContext';
import { useMood } from '../../../contexts/MoodContext';

export const mainBoxDefaultData = {
  [MainBoxType.WELCOME]: {
    title: 'Selamat Pagi!',
    paragraph:
      'Ingat, keseimbangan kerja dan istirahat adalah kunci produktivitas.',
    image: <WelcomeIcon width={120} height={120} />,
    onPress: () => console.log('Welcome pressed'),
  },
  [MainBoxType.MOOD_CHECK]: {
    title: 'Mood Check!',
    paragraph: 'Bagikan perasaan Anda hari ini!',
    image: <MoodIcon width={120} height={120} />,
    onPress: () => console.log('Mood check pressed'),
  },
  [MainBoxType.CBI_TEST]: {
    title: 'Yuk, Cek Burnout!',
    paragraph: 'Ikuti CBI Test untuk memahami kondisi kerja Anda',
    image: <CBIIcon width={120} height={120} />,
    onPress: () => console.log('CBI test pressed'),
  },
  [MainBoxType.AI_INSIGHT]: {
    title: 'AI Daily Insight',
    paragraph: 'Wawasan AI berdasarkan mood Anda hari ini',
    image: <AILampIcon width={120} height={120} />,
    onPress: () => console.log('AI insight pressed'),
  },
};

export const DashboardKaryawanLayout = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { currentSpace } = useSpace();
  const { hasPendingCBI, refreshCBIStatus } = useCBI();
  const {
    currentInsight: aiInsight,
    loading: aiLoading,
    refreshInsight,
  } = useAIInsight();
  const { hasMoodToday, hasMorningMood, hasEveningMood, refreshMoodStatus } =
    useMood();

  // State untuk data yang bisa berubah
  const [mainBoxData, setMainBoxData] = useState(mainBoxDefaultData);
  const [workStartMinutes, setWorkStartMinutes] = useState<number>(9 * 60); // default 09:00
  const [workEndMinutes, setWorkEndMinutes] = useState<number>(17 * 60); // default 17:00

  // Function untuk mendapatkan MainBox type berdasarkan waktu dan kondisi user
  const getCurrentMainBoxType = (): MainBoxType => {
    // Prioritas 1: CBI test yang belum selesai
    if (hasPendingCBI) {
      console.log('📋 Showing CBI_TEST (pending test)');
      return MainBoxType.CBI_TEST;
    }

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = currentHour * 60 + now.getMinutes();

    console.log(
      '🕐 Current time:',
      `${currentHour}:${now.getMinutes().toString().padStart(2, '0')}`,
    );
    console.log('🤖 Has AI insight today:', !!aiInsight);

    // Logic MainBox berdasarkan waktu dan kondisi hari ini:
    
    // 1. Jam 00:00 - 06:00: WELCOME (reset period)
    if (currentHour >= 0 && currentHour < 6) {
      console.log('� Showing WELCOME (midnight reset period)');
      return MainBoxType.WELCOME;
    }
    
    // 2. Jam 06:00 - jam kerja dimulai: WELCOME
    if (currentHour >= 6 && currentMinutes < workStartMinutes) {
      console.log('🌅 Showing WELCOME (before work hours)');
      return MainBoxType.WELCOME;
    }
    
    // 3. Jam kerja dimulai: MOOD_CHECK (untuk mood pertama hari ini)
    if (currentMinutes >= workStartMinutes) {
      // Jika sudah ada AI insight hari ini, langsung tampilkan AI_INSIGHT
      if (aiInsight) {
        console.log('🤖 Showing AI_INSIGHT (already have today\'s insight)');
        return MainBoxType.AI_INSIGHT;
      }
      
      // Jika belum ada AI insight, tampilkan MOOD_CHECK untuk generate insight
      console.log('😊 Showing MOOD_CHECK (need mood to generate insight)');
      return MainBoxType.MOOD_CHECK;
    }
    
    // Default fallback
    console.log('🌙 Showing WELCOME (default)');
    return MainBoxType.WELCOME;
  };

  // Handler untuk navigasi ke halaman mood check
  const handleMoodCheck = () => {
    navigation.navigate('MoodCheckScreen' as never);
  };

  // Handler untuk navigasi ke halaman CBI test
  const handleCBITest = () => {
    navigation.navigate('CBITestScreen' as never);
  };

  // Helper: parse start & end minutes from work_hours string
  function parseStartEndMinutes(workHours?: string): {
    start: number;
    end: number;
  } {
    try {
      const text = String(workHours || '').trim();
      // Support "HH:mm-HH:mm", "HH.mm-HH.mm", with or without spaces around '-'
      const m = text.match(
        /(\d{1,2})(?:(?::|\.)\s*(\d{2}))?\s*-\s*(\d{1,2})(?:(?::|\.)\s*(\d{2}))?/,
      );
      if (!m) {
        // fallback if only start provided (also support dot)
        const startOnly = text.match(/(\d{1,2})(?:(?::|\.)\s*(\d{2}))?/);
        const sh = startOnly
          ? Math.min(23, Math.max(0, parseInt(startOnly[1], 10)))
          : 9;
        const sm =
          startOnly && startOnly[2]
            ? Math.min(59, Math.max(0, parseInt(startOnly[2], 10)))
            : 0;
        const start = sh * 60 + sm;
        const end = Math.min(23 * 60 + 59, start + 8 * 60);
        return { start, end };
      }
      const sh = Math.min(23, Math.max(0, parseInt(m[1], 10)));
      const sm = m[2] ? Math.min(59, Math.max(0, parseInt(m[2], 10))) : 0;
      const eh = Math.min(23, Math.max(0, parseInt(m[3], 10)));
      const em = m[4] ? Math.min(59, Math.max(0, parseInt(m[4], 10))) : 0;
      return { start: sh * 60 + sm, end: eh * 60 + em };
    } catch {
      return { start: 9 * 60, end: 17 * 60 };
    }
  }

  // Override data default dengan handlers
  useEffect(() => {
    setMainBoxData(prev => ({
      ...prev,
      [MainBoxType.MOOD_CHECK]: {
        ...prev[MainBoxType.MOOD_CHECK],
        onPress: handleMoodCheck,
      },
      [MainBoxType.CBI_TEST]: {
        ...prev[MainBoxType.CBI_TEST],
        onPress: handleCBITest,
      },
      [MainBoxType.AI_INSIGHT]: {
        ...prev[MainBoxType.AI_INSIGHT],
        paragraph: aiInsight || 'Wawasan AI berdasarkan mood Anda hari ini',
      },
    }));
  }, [aiInsight]);

  // Parse waktu mulai & selesai dari space work_hours (format: "HH:mm - HH:mm")
  useEffect(() => {
    if (currentSpace?.work_hours) {
      const { start, end } = parseStartEndMinutes(currentSpace.work_hours);
      setWorkStartMinutes(start);
      setWorkEndMinutes(end);
    }
  }, [currentSpace?.work_hours]);

  // Refetch insight, CBI status, dan mood status ketika dashboard kembali fokus
  useFocusEffect(
    React.useCallback(() => {
      refreshInsight();
      refreshCBIStatus();
      refreshMoodStatus();
    }, [refreshInsight, refreshCBIStatus, refreshMoodStatus]),
  );

  // Get current MainBox type
  const currentMainBoxType = getCurrentMainBoxType();

  return (
    <ScrollView className="flex-1">
      <View className="flex-row items-center justify-between w-full px-6 pt-12 pb-6 mb-8 bg-primary rounded-b-3xl">
        <View>
          <Text
            className="font-semibold text-[18px] text-[#FAFAFA] max-w-[260px]"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {user?.name ? `Halo ${user.name},` : 'Halo,'}
          </Text>
          <Text
            className="text-[14px] text-[#FAFAFA] max-w-[260px]"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {user?.role || ''}
          </Text>
        </View>

        <View className="w-20 h-20 overflow-hidden border-8 rounded-full border-white/30">
          <Image
            source={{
              uri: user?.avatar_url || 'https://i.pravatar.cc/150?img=44',
            }}
            className="w-full h-full"
          />
        </View>
      </View>

      <View className="px-5">
        <MainBox
          title={mainBoxData[currentMainBoxType].title}
          paragraph={mainBoxData[currentMainBoxType].paragraph}
          image={mainBoxData[currentMainBoxType].image}
          onPress={mainBoxData[currentMainBoxType].onPress}
          type={currentMainBoxType}
        />
      </View>
      
      <View className="mt-6 px-4">
        <RiwayatMood />
        <AIDailyInsight
          insightText={aiInsight ?? undefined}
          loading={aiLoading}
        />
      </View>
    </ScrollView>
  );
};