import React from 'react';
import { View, Text } from 'react-native';
import { Lightbulb } from 'lucide-react-native';

type InsightCardProps = {
  text: string;
};

export default function InsightCard({ text }: InsightCardProps) {
  return (
    <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16, marginVertical: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 2 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Lightbulb size={20} color="#f59e0b" />
        <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 8 }}>AI Insight</Text>
      </View>
      <Text style={{ color: '#374151', fontSize: 14 }}>{text}</Text>
    </View>
  );
}
