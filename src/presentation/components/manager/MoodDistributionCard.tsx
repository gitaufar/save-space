import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
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

  const chartData = data.map(item => ({ label: item.mood, value: item.value, color: item.color }));

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

      <View style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
        <DonutPie data={chartData} />
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

type DonutDatum = { label: string; value: number; color: string };

function DonutPie({ data }: { data: DonutDatum[] }) {
  const size = 200; // square
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 90;
  const innerR = 50;

  const total = data.reduce((acc, d) => acc + (d.value || 0), 0) || 1;

  // Special case: if only one data point, create a full circle
  if (data.length === 1) {
    return (
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Path
          d={`M ${cx} ${cy - outerR} A ${outerR} ${outerR} 0 1 1 ${cx - 0.01} ${cy - outerR} Z M ${cx} ${cy - innerR} A ${innerR} ${innerR} 0 1 0 ${cx - 0.01} ${cy - innerR} Z`}
          fill={data[0].color}
          fillRule="evenodd"
        />
      </Svg>
    );
  }

  let startAngle = -90; // start at 12 o'clock

  const segments = data.map((d) => {
    const sweep = (d.value / total) * 360;
    const seg = { start: startAngle, end: startAngle + sweep, color: d.color };
    startAngle += sweep;
    return seg;
  });

  const pathForSegment = (startDeg: number, endDeg: number, outerRadius: number, innerRadius: number) => {
    const rad = (deg: number) => (Math.PI * deg) / 180;

    const outerStart = {
      x: cx + outerRadius * Math.cos(rad(startDeg)),
      y: cy + outerRadius * Math.sin(rad(startDeg)),
    };
    const outerEnd = {
      x: cx + outerRadius * Math.cos(rad(endDeg)),
      y: cy + outerRadius * Math.sin(rad(endDeg)),
    };

    const innerStart = {
      x: cx + innerRadius * Math.cos(rad(endDeg)),
      y: cy + innerRadius * Math.sin(rad(endDeg)),
    };
    const innerEnd = {
      x: cx + innerRadius * Math.cos(rad(startDeg)),
      y: cy + innerRadius * Math.sin(rad(startDeg)),
    };

    const largeArc = endDeg - startDeg > 180 ? 1 : 0;

    const d = [
      `M ${outerStart.x} ${outerStart.y}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
      `L ${innerStart.x} ${innerStart.y}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}`,
      'Z',
    ].join(' ');

    return d;
  };

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {segments.map((s, i) => (
        <Path key={i} d={pathForSegment(s.start, s.end, outerR, innerR)} fill={s.color} />
      ))}
    </Svg>
  );
}
