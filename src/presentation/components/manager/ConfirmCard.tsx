import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ClipboardList } from 'lucide-react-native';

type ConfirmCardProps = {
  title: string;
  cancelText?: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmCard({
  title,
  cancelText = 'Batal',
  confirmText = 'Mulai',
  onCancel,
  onConfirm,
}: ConfirmCardProps) {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        margin: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 5,
      }}
    >
      {/* Icon bulat */}
      <View
        style={{
          backgroundColor: '#fbbf24', // amber-400
          borderRadius: 999,
          padding: 20,
          marginBottom: 16,
        }}
      >
        <ClipboardList size={40} color="white" />
      </View>

      {/* Judul */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#000',
          marginBottom: 24,
          textAlign: 'center',
        }}
      >
        {title}
      </Text>

      {/* Tombol */}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <TouchableOpacity
          onPress={onCancel}
          style={{
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#d1d5db',
            paddingVertical: 12,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#000', fontWeight: '600' }}>{cancelText}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onConfirm}
          style={{
            flex: 1,
            backgroundColor: '#fbbf24',
            borderRadius: 12,
            paddingVertical: 12,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>
            {confirmText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
