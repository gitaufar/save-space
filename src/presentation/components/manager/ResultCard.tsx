import React from 'react';
import { View, Text } from 'react-native';
import { CheckCircle, XCircle } from 'lucide-react-native';

type ResultCardProps = {
  success: boolean;
  title: string;
  subtitle: string;
};

export default function ResultCard({ success, title, subtitle }: ResultCardProps) {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 4,
      }}
    >
      {success ? (
        <CheckCircle size={48} color="#22c55e" />
      ) : (
        <XCircle size={48} color="#ef4444" />
      )}

      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 12,
          color: '#000',
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: '#6b7280',
          marginTop: 4,
          textAlign: 'center',
        }}
      >
        {subtitle}
      </Text>
    </View>
  );
}
