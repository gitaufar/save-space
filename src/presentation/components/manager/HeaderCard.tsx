import React from 'react';
import { View, Text, Image } from 'react-native';

type HeaderCardProps = {
  name: string;
  department: string;
  avatar: string;
};

export default function HeaderCard({ name, department, avatar }: HeaderCardProps) {
  return (
    <View style={{ backgroundColor: '#00BFA6', paddingTop: 20, paddingHorizontal: 20, paddingBottom: 36, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Halo {name},</Text>
          <Text style={{ color: 'white', fontSize: 14 }}>{department}</Text>
        </View>
        <Image source={{ uri: avatar }} style={{ width: 50, height: 50, borderRadius: 25 }} />
      </View>
    </View>
  );
}
