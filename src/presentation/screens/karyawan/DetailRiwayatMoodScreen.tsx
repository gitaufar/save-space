import React, { useState } from "react";
import { Text, View, TouchableOpacity, Modal, Pressable } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { Calendar } from 'react-native-calendars';
import { NullDetailRiwayatLayout } from "../../components/karyawan/DetailRiwayatMood/NullDetailRiwayatLayout";
import { DetailRiwayatLayout } from "../../components/karyawan/DetailRiwayatMood/DetailRiwayatLayout";

// Definisikan mockMoodData di luar komponen
// Definisikan mockMoodData di luar komponen sesuai interface MoodData
const mockMoodData = [
  { 
    id: '1', 
    value: 6, // Tenang
    date: '2025-09-12',
    time: 'Pagi',
    timeDisplay: '08:30',
    note: 'Merasa segar dan siap memulai hari. Semangat untuk mengerjakan project baru.',
    energyLevel: 'tinggi' as const,  // Tetap 'tinggi'
    focusLevel: 'baik' as const
  },
  { 
    id: '2', 
    value: 7, // Senang
    date: '2025-09-12',
    time: 'Sore',
    timeDisplay: '16:45',
    note: 'Mood membaik setelah break. Berhasil menyelesaikan task dengan baik.',
    energyLevel: 'sedang' as const,  // Ubah 'baik' menjadi 'sedang'
    focusLevel: 'membaik' as const
  }
];

export default function DetailRiwayatMoodScreen() {
    const navigation = useNavigation();
    const [showDatePicker, setShowDatePicker] = useState(false);
    
    // Format tanggal awal (hari ini)
    const today = new Date();
    const formattedToday = formatDateForCalendar(today);
    
    // State untuk tanggal terpilih
    const [selectedDate, setSelectedDate] = useState({
        id: formattedToday,
        label: formatDateForDisplay(today)
    });
    
    // Format tanggal untuk Calendar (YYYY-MM-DD)
    function formatDateForCalendar(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Format tanggal untuk tampilan (DD-MM-YYYY)
    function formatDateForDisplay(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
    
    // Format tanggal dari string Calendar (YYYY-MM-DD) ke Date object
    function parseDate(dateString: string): Date {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }
    
    const handleGoBack = () => {
        navigation.goBack();
    };
    
    const handleSelectDate = (dateString: string) => {
        const date = parseDate(dateString);
        setSelectedDate({
            id: dateString,
            label: formatDateForDisplay(date)
        });
        setShowDatePicker(false);
    };
    
    return (
        <View className="flex-1 bg-[#FAFAFA]">
            {/* Header dengan tombol back */}
            <View className="pt-12 pb-6 px-5">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        className="p-2"
                        onPress={handleGoBack}
                    >
                        <MaterialIcons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text className="ml-4 text-[18px] font-bold text-[#111827]">
                        Detail Riwayat Mood
                    </Text>
                </View>
            </View>
            
            {/* Date Dropdown */}
            <View className="px-5 mb-4">
                <Pressable
                    className="flex-row items-center justify-between bg-white px-4 py-2 rounded-xl border border-gray-200 self-start"
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text className="text-[16px] font-medium text-gray-800">
                    {selectedDate.label}
                    </Text>
                    <MaterialIcons 
                        name="calendar-today" 
                        size={20} 
                        color="#6B7280" 
                        style={{ marginLeft: 16 }}  // Gunakan style alih-alih className
                    />
                </Pressable>
            </View>

            
            {/* Calendar Modal */}
            <Modal
                visible={showDatePicker}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDatePicker(false)}
            >
                <TouchableOpacity
                    className="flex-1 bg-black/30 justify-center items-center"
                    activeOpacity={1}
                    onPress={() => setShowDatePicker(false)}
                >
                    <View className="bg-white rounded-xl w-11/12 overflow-hidden">
                        <View className="p-4 border-b border-gray-100">
                            <Text className="text-center font-bold text-gray-800 text-lg">Pilih Tanggal</Text>
                        </View>
                        
                        <Calendar
                            onDayPress={(day) => handleSelectDate(day.dateString)}
                            markedDates={{
                                [selectedDate.id]: {selected: true, selectedColor: '#00BFA6'}
                            }}
                            theme={{
                                todayTextColor: '#00BFA6',
                                selectedDayBackgroundColor: '#00BFA6',
                                arrowColor: '#00BFA6',
                            }}
                            // Opsional: Batasi tanggal yang bisa dipilih
                            minDate={'2023-01-01'}
                            maxDate={formattedToday}
                        />
                        
                        <TouchableOpacity 
                            className="p-4 bg-gray-50"
                            onPress={() => setShowDatePicker(false)}
                        >
                            <Text className="text-center font-medium text-primary">Tutup</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
            
            {/* Hanya tampilkan DetailRiwayatLayout */}
            <DetailRiwayatLayout data={mockMoodData} />
        </View>
    );
}