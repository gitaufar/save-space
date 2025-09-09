import React from 'react';
import { View } from 'react-native';
import HeaderRegister from './HeaderRegister';

type Props = {
  step: number;
  onBack: () => void;
};

export default function Step3Selesai({ step, onBack }: Props) {
  return (
    <View className="p-4">
      <HeaderRegister
        onBackPress={onBack}
        title="Selesai"
        step={step}
        subtitle="Pendaftaran Berhasil"
        desc="Akun Anda siap digunakan, silakan login"
      />
    </View>
  );
}
