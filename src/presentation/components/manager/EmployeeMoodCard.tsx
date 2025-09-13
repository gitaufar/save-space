import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

type MoodId = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type EmployeeMoodCardProps = {
  name: string;
  department: string;
  avatar: string;
  mood: MoodId;
  onPress: () => void;
};

const moodConfig: Record<
  MoodId,
  { label: string; emoji: string; bg: string }
> = {
  0: { label: 'Bahagia', emoji: '😊', bg: '#bbf7d0' },  // hijau muda
  1: { label: 'Lelah', emoji: '😓', bg: '#fde68a' },    // kuning
  2: { label: 'Marah', emoji: '😡', bg: '#fecaca' },    // merah muda
  3: { label: 'Netral', emoji: '😐', bg: '#d1d5db' },   // abu
  4: { label: 'Sedih', emoji: '😢', bg: '#bfdbfe' },    // biru muda
  5: { label: 'Stress', emoji: '😖', bg: '#fca5a5' },   // merah
  6: { label: 'Tenang', emoji: '😌', bg: '#fde68a' },   // kuning lembut
};

export default function EmployeeMoodCard({
  name,
  department,
  avatar,
  mood,
  onPress,
}: EmployeeMoodCardProps) {
  const { emoji, bg } = moodConfig[mood];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      {/* Avatar */}
      <Image
        source={{ uri: avatar }}
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          marginRight: 12,
        }}
      />

      {/* Info */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#111' }}>
          {name}
        </Text>
        <Text style={{ fontSize: 14, color: '#6b7280' }}>{department}</Text>
      </View>

      {/* Mood */}
      <View
        style={{
          backgroundColor: bg,
          borderRadius: 999,
          width: 48,
          height: 48,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 8,
        }}
      >
        <Text style={{ fontSize: 22 }}>{emoji}</Text>
      </View>

      {/* Arrow */}
      <ChevronRight size={20} color="#9ca3af" />
    </TouchableOpacity>
  );
}
