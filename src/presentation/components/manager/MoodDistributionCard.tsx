import React from 'react';
import { View, Text } from 'react-native';
import { PolarChart, Pie } from 'victory-native';
import PieChartNull from '../../../assets/hrd/pie_chart_mood_karyawan_null.svg'; // svg file

type MoodDistributionCardProps = {
  data: { mood: string; value: number; color: string }[] | null;
};

export default function MoodDistributionCard({
  data,
}: MoodDistributionCardProps) {
  if (!data || data.length === 0) {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 16,
          marginVertical: 12,
          flexDirection: 'row', // biar horizontal
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Bagian kiri: judul + teks */}
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 8 }}>
            Distribusi Mood Karyawan
          </Text>
          <Text style={{ textAlign: 'left', color: '#6b7280' }}>
            Data mood belum tersedia. Ajak karyawan mengisi mood harian mereka
            untuk melihat distribusi di sini.
          </Text>
        </View>

        {/* Bagian kanan: SVG ilustrasi */}
        <PieChartNull width={120} height={120} />
      </View>
    );
  }

  const chartData = data.map(item => ({
    label: item.mood,
    value: item.value,
    color: item.color,
  }));

  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginVertical: 12,
      }}
    >
      <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 12 }}>
        Distribusi Mood Karyawan
      </Text>

      <View style={{ height: 200 }}>
        <PolarChart
          data={chartData}
          labelKey="label"
          valueKey="value"
          colorKey="color"
        >
          <Pie.Chart />
        </PolarChart>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
        {data.map((item, idx) => (
          <View
            key={idx}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 12,
              marginBottom: 4,
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                backgroundColor: item.color,
                borderRadius: 2,
                marginRight: 6,
              }}
            />
            <Text style={{ fontSize: 12 }}>{item.mood}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
