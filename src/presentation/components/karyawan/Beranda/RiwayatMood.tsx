import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../../../assets/karyawan/query_stats.svg'; // Perhatikan path
import { Button } from '../../common/Button';
import DetailRiwayatMoodScreen from '../../../screens/karyawan/DetailRiwayatMoodScreen';

// Interface untuk data mood
export interface MoodData {
  value: number; // Nilai mood (1-5)
  date: string; // Tanggal mood (format bebas, untuk display bisa dikustomisasi)
}

// Interface untuk props komponen
interface RiwayatMoodProps {
  data?: MoodData[]; // Data mood dari backend
  onViewDetail?: () => void; // Handler untuk tombol lihat detail
  title?: string; // Judul komponen (opsional)
  loading?: boolean; // State loading (opsional)
  error?: string; // Pesan error jika ada (opsional)
}

export const RiwayatMood: React.FC<RiwayatMoodProps> = ({
  data,
  onViewDetail,
  title = 'Riwayat Mood',
  loading = false,
  error,
}) => {
  const navigation = useNavigation();

  // Default data jika tidak ada data dari props
  const defaultMoodData: MoodData[] = [
    { value: 1, date: '2023-09-01' },
    { value: 1, date: '2023-09-02' },
    { value: 1, date: '2023-09-03' },
    { value: 1, date: '2023-09-04' },
    { value: 1, date: '2023-09-05' },
    { value: 1, date: '2023-09-06' },
    { value: 1, date: '2023-09-07' },
  ];

  // Gunakan data dari props jika ada, jika tidak gunakan default
  const moodData = data || defaultMoodData;

  // Transformasi data untuk chart
  const chartValues = moodData.map(item => item.value);

  // Hitung nama hari dari tanggal
  // Hitung nama hari dari tanggal
  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    return days[date.getDay()];
  };

  // Buat array 7 hari terakhir (rolling sampai hari ini)
  const getLast7Days = () => {
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const today = new Date().getDay(); // 0 = Min, 1 = Sen, dst
    const rotated = [];

    for (let i = 1; i <= 7; i++) {
      rotated.push(days[(today + i) % 7]);
    }
    return rotated;
  };

  const dayLabels = getLast7Days();
  
  // Buat garis horizontal (axis)
  const yAxis = [5, 4, 3, 2, 1];

  // Handle view detail
  const handleViewDetail = () => {
    if (onViewDetail) {
      onViewDetail();
    } else {
      // Default behavior jika tidak ada handler
      navigation.navigate('DetailRiwayatMoodScreen' as never);
      // Pastikan nama screen sesuai dengan yang didaftarkan di KaryawanNavigator.tsx
    }
  };

  // Tinggi setiap unit grid
  const gridUnitHeight = 24;

  return (
    <View className="w-full bg-white rounded-3xl shadow-md p-6 mb-4 border border-[#E5E7EB]">
      <View className="flex-row items-center mb-4">
        <Logo width={24} height={24} />
        <Text className="text-[18px] font-bold text-[#111827] ml-2">
          {title}
        </Text>
      </View>

      {/* Loading state */}
      {loading && (
        <View className="items-center justify-center py-8">
          <Text className="text-gray-500">Loading...</Text>
        </View>
      )}

      {/* Error state */}
      {error && (
        <View className="items-center justify-center py-4">
          <Text className="text-red-500">{error}</Text>
        </View>
      )}

      {/* Chart container dengan grid */}
      {!loading && !error && (
        <View className="mb-4" style={{ height: gridUnitHeight * 5 }}>
          {/* Y-axis labels (kiri) */}
          <View className="absolute left-0 h-full justify-between">
            {yAxis.map(value => (
              <Text key={value} className="text-xs text-gray-500">
                {value}
              </Text>
            ))}
          </View>

          {/* Chart area */}
          <View className="ml-7 mr-2 h-full">
            {/* Grid lines */}
            {yAxis.map(value => (
              <View
                key={value}
                className="w-full border-b border-gray-100"
                style={{ height: gridUnitHeight }}
              />
            ))}

            {/* Data points and lines */}
            <View className="absolute flex-row justify-between w-full bottom-0 top-0">
              {chartValues.map((value, index) => {
                const nextValue = chartValues[index + 1];

                return (
                  <View key={index} className="items-center justify-end">
                    {/* Point */}
                    <View
                      className="h-3 w-3 rounded-full bg-primary absolute"
                      style={{ bottom: (value - 1) * gridUnitHeight }}
                    />

                    {/* Line to next point (if not last) */}
                    {nextValue && index < chartValues.length - 1 && (
                      <View
                        className="bg-primary absolute h-0.5"
                        style={{
                          width: `${100 / chartValues.length}%`,
                          bottom: (value - 1) * gridUnitHeight + 1.5,
                          transform: [
                            {
                              rotate: `${Math.atan2(
                                (nextValue - value) * gridUnitHeight,
                                100 / chartValues.length,
                              )}rad`,
                            },
                          ],
                        }}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          </View>

          {/* X-axis labels (days) */}
          <View className="flex-row justify-between mt-2 ml-7 mr-2">
            {dayLabels.map((day, i) => (
              <Text key={i} className="text-xs text-gray-500">
                {day}
              </Text>
            ))}
          </View>
        </View>
      )}

      <Button
        text="Lihat Detail Riwayat"
        onPress={handleViewDetail}
        margin="mt-4"
        rounded="rounded-xl"
      />
    </View>
  );
};
