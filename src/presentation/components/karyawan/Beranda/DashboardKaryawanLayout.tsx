import React, {useState} from "react";
import { ScrollView, View, Text, Image } from "react-native";
// Pastikan impor MainBoxType dari file yang benar
import { MainBox, MainBoxType } from "./MainBox";
import WelcomeIcon from "../../../../assets/karyawan/welcome_icon.svg"; // Perhatikan path
import MoodIcon from "../../../../assets/karyawan/mood_icon.svg"       // Perhatikan path
import CBIIcon from "../../../../assets/karyawan/cbi_icon.svg";         // Perhatikan path
import { useNavigation } from "@react-navigation/native";
import { RiwayatMood } from "./RiwayatMood";
import { AIDailyInsight } from "./AIDailyInsight";

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
    
    // State untuk data yang bisa berubah
    const [mainBoxData, setMainBoxData] = useState(mainBoxDefaultData);
    
    // Handler untuk navigasi ke halaman mood check
    const handleMoodCheck = () => {
      navigation.navigate('MoodCheckScreen' as never);
    };
    
    // Handler untuk navigasi ke halaman CBI test
    const handleCBITest = () => {
      navigation.navigate('CBITestScreen' as never);
    };
    
    // Override data default jika diperlukan
    React.useEffect(() => {
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
    
    return (
        <ScrollView className="flex-1">
            <View className="w-full bg-primary pt-12 pb-6 px-6 flex-row items-center justify-between mb-8 rounded-b-3xl">
                <View>
                    <Text className="font-semibold text-[18px] text-[#FAFAFA]">
                        Halo Sarah Wijaya,
                    </Text>
                    <Text className="text-[14px] text-[#FAFAFA]">
                        Marketing
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
                    title={mainBoxData[MainBoxType.CBI_TEST].title}
                    paragraph={mainBoxData[MainBoxType.CBI_TEST].paragraph}
                    image={mainBoxData[MainBoxType.CBI_TEST].image}
                    onPress={mainBoxData[MainBoxType.CBI_TEST].onPress}
                    type={MainBoxType.CBI_TEST}
                />
                <RiwayatMood
                 />
                <AIDailyInsight   
                />
            </View>
        </ScrollView>
    );
}