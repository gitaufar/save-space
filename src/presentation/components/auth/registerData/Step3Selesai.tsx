import React from 'react';
import { View } from 'react-native';
import HeaderRegister from './HeaderRegister';
import { Button } from '../../common/Button';

type Props = {
  step: number;
  onBack: () => void;
  onFinish: () => void;
};

export default function Step3Selesai({ step, onBack, onFinish }: Props) {
  return (
    <View className="p-4">
      <HeaderRegister
        onBackPress={onBack}
        title="Selesai"
        step={step}
        subtitle="Pendaftaran Berhasil"
        desc="Akun Anda siap digunakan. Lanjut ke pengaturan ruang kerja."
      />
      <View className="mt-6">
        <Button text="Lanjutkan" onPress={onFinish} margin="0" />
      </View>
    </View>
  );
}
