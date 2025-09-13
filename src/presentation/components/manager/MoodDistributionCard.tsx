import React from 'react';
import { View, Text } from 'react-native';
import { VictoryPie } from 'victory-pie';

type MoodDistributionCardProps = {
  data: { mood: string; value: number; color: string }[];
};

export default function MoodDistributionCard({ data }: MoodDistributionCardProps) {
  if (data.length === 0) {
    return (
      <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16, marginVertical: 12 }}>
        <Text style={{ textAlign: 'center', color: '#6b7280' }}>Data mood belum tersedia.</Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16, marginVertical: 12 }}>
      <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 12 }}>Distribusi Mood Karyawan</Text>

      <VictoryPie
        data={data.map(item => ({ x: item.mood, y: item.value }))}
        colorScale={data.map(item => item.color)}
        innerRadius={40} // biar bentuk donat
        padAngle={2}
        height={150}
      />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
        {data.map((item, idx) => (
          <View
            key={idx}
            style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12, marginBottom: 4 }}
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
