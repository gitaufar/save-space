import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Polyline, Circle } from 'react-native-svg';
import Logo from '../../../../assets/karyawan/query_stats.svg';
import { Button } from '../../common/Button';
import { useMoodHistory, MoodChartData } from '../../../contexts/MoodHistoryContext';
import { useAuth } from '../../../contexts/AuthContext';

interface RiwayatMoodProps {
  userId?: string;
  onViewDetail?: () => void;
  title?: string;
}

export const RiwayatMood: React.FC<RiwayatMoodProps> = ({
  userId,
  onViewDetail,
  title = 'Riwayat Mood',
}) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { moodHistory, loading, error, getMoodHistoryForUser } = useMoodHistory();
  const [displayData, setDisplayData] = useState<MoodChartData[]>([]);

  // Fetch data berdasarkan userId atau current user
  useEffect(() => {
    if (userId && userId !== user?.id) {
      // Untuk manager screen - fetch data karyawan tertentu
      getMoodHistoryForUser(userId).then(setDisplayData);
    } else {
      // Untuk employee dashboard - gunakan data dari context
      setDisplayData(moodHistory);
    }
  }, [userId, user?.id, moodHistory, getMoodHistoryForUser]);

  // Buat data 7 hari dengan padding jika tidak ada data
  const getLast7DaysData = (): MoodChartData[] => {
    const result: MoodChartData[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Cari data untuk tanggal ini
      const existingData = displayData.find(item => item.date === dateStr);
      
      if (existingData) {
        result.push(existingData);
      } else {
        // Tambahkan data kosong dengan nilai netral (4)
        result.push({
          value: 4,
          date: dateStr,
          moodName: 'netral'
        });
      }
    }
    
    return result;
  };

  const chartData = getLast7DaysData();
  const chartValues = chartData.map(item => item.value);

  // Hitung nama hari dari tanggal
  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    return days[date.getDay()];
  };

  const dayLabels = chartData.map(item => getDayName(item.date));
  
  // Buat garis horizontal (axis) - mood scale 1-7
  const yAxis = [7, 6, 5, 4, 3, 2, 1];

  // Handle view detail
  const handleViewDetail = () => {
    if (onViewDetail) {
      onViewDetail();
    } else {
      // Kirimkan userId jika tersedia (untuk manager)
      const params: any = userId ? { userId } : undefined;
      (navigation as any).navigate('DetailRiwayatMoodScreen', params);
    }
  };

  // Tinggi setiap unit grid (untuk 7 level mood)
  const gridUnitHeight = 20;
  const chartWidth = 280; // Fixed width untuk konsistensi
  const chartHeight = gridUnitHeight * 7;

  // Hitung posisi X dan Y untuk setiap titik
  const getChartPoints = () => {
    const points: { x: number; y: number; value: number }[] = [];
    const stepX = chartWidth / (chartValues.length - 1);
    
    chartValues.forEach((value, index) => {
      const x = index * stepX;
      const y = chartHeight - ((value - 1) * gridUnitHeight);
      points.push({ x, y, value });
    });
    
    return points;
  };

  const chartPoints = getChartPoints();

  // Buat string untuk polyline SVG
  const polylinePoints = chartPoints.map(point => `${point.x},${point.y}`).join(' ');

  return (
    <View className="w-full bg-white rounded-3xl shadow-md p-6 mb-4 border border-[#E5E7EB]">
      <View className="flex-row items-center mb-4">
        <Logo width={24} height={24} />
        <Text className="text-[18px] font-bold text-[#111827] ml-2" numberOfLines={1} ellipsizeMode="tail">
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
        <View className="mb-4">
          {/* Chart dengan SVG */}
          <View className="relative" style={{ height: chartHeight }}>
            {/* Y-axis labels (kiri) */}
            <View className="absolute left-0 h-full justify-between z-10">
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

              {/* SVG Chart */}
              <View className="absolute inset-0">
                <Svg height={chartHeight} width={chartWidth}>
                  {/* Garis yang menghubungkan titik-titik */}
                  <Polyline
                    points={polylinePoints}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Titik-titik data */}
                  {chartPoints.map((point, index) => (
                    <Circle
                      key={index}
                      cx={point.x}
                      cy={point.y}
                      r="6"
                      fill="#10B981"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  ))}
                </Svg>
              </View>
            </View>

            {/* X-axis labels (bawah) */}
            <View className="flex-row justify-between mt-2 ml-7 mr-2">
              {dayLabels.map((day, index) => (
                <Text key={index} className="text-xs text-gray-500">
                  {day}
                </Text>
              ))}
            </View>
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
