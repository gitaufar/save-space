import React, { useState } from "react";
import { Text, View, TouchableOpacity, Modal, Pressable } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { Calendar } from 'react-native-calendars'; // Perlu install: npm install react-native-calendars
import { NullDetailRiwayatLayout } from "../../components/karyawan/DetailRiwayatMood/NullDetailRiwayatLayout";
import { DetailRiwayatLayout } from "../../components/karyawan/DetailRiwayatMood/DetailRiwayatLayout";

export default function DetailRiwayatMoodScreen() {
    // Tambahkan mock data untuk tanggal spesial
const mockMoodData = [
  { 
    id: '1', 
    value: 5, 
    date: '2025-09-12',
    note: 'Hari yang sangat produktif, berhasil menyelesaikan semua task.'
  },
  { 
    id: '2', 
    value: 4, 
    date: '2025-09-11',
    note: 'Meeting berjalan lancar, mendapat feedback positif dari klien.'
  },
  { 
    id: '3', 
    value: 5, 
    date: '2025-09-10',
    note: 'Berhasil mencapai target sprint dengan baik.'
  }
];

    const navigation = useNavigation();
    const [showDatePicker, setShowDatePicker] = useState(false);
    
    // Format tanggal awal (hari ini)
    const today = new Date();
    const formattedToday = formatDateForCalendar(today); // Format: YYYY-MM-DD untuk Calendar
    
    // State untuk tanggal terpilih
    const [selectedDate, setSelectedDate] = useState({
        id: formattedToday,
        label: formatDateForDisplay(today) // Format: DD-MM-YYYY untuk tampilan
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
            <View className="pt-12 pb-6 px-8">
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
            <View className="px-8 mb-4">
                <Pressable
                    className="flex-row items-center justify-between bg-white px-4 py-2 rounded-xl border border-gray-200 self-start"
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text className="text-[16px] font-medium text-gray-800">
                    {selectedDate.label}
                    </Text>
                    <MaterialIcons name="calendar-today" size={20} color="#6B7280" className="ml-4" />
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
            
            {/* Selalu tampilkan NullDetailRiwayatLayout */}
            {/* <NullDetailRiwayatLayout date={selectedDate.id} /> */}
            {/* Hanya tampilkan DetailRiwayatLayout dengan tanggal 12/09/2025 */}
            <DetailRiwayatLayout data={mockMoodData} />
        </View>
    );
}