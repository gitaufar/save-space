import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // pastikan sudah install react-native-vector-icons

type TipsProps = {
  tips: string[];
};

export default function TipsFotoProfil({ tips }: TipsProps) {
  return (
    <View
      style={{
        marginTop: 20,
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
      }}
    >
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
      >
        <Icon
          name="info"
          size={18}
          color="#F59E0B"
          style={{ marginRight: 6 }}
        />
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
          Tips Foto Profil
        </Text>
      </View>

      {tips.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: 6,
          }}
        >
          <Icon
            name="check"
            size={16}
            color="#10B981"
            style={{ marginTop: 2, marginRight: 8 }}
          />
          <Text style={{ color: '#374151', fontSize: 14, flex: 1 }}>
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
}
