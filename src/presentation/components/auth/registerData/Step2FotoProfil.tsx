import React from 'react';
import { View } from 'react-native';
import HeaderRegister from './HeaderRegister';
import TipsFotoProfil from './TipsFotoProfil';
import PhotoPicker from '../../common/PhotoPicker';
import { Button } from '../../common/Button';

type Props = {
  step: number;
  photo: string | null;
  onTakePhoto: () => void;
  onChooseGallery: () => void;
  onBack: () => void;
  onSave: () => void;
  loading?: boolean;
};

export default function Step2FotoProfil({
  step,
  photo,
  onTakePhoto,
  onChooseGallery,
  onBack,
  onSave,
  loading = false,
}: Props) {
  return (
    <View className="p-4">
      <HeaderRegister
        onBackPress={onBack}
        title="Foto Profil"
        step={step}
        subtitle="Tambahkan Foto Profil"
        desc="Foto profil membantu rekan kerja mengenali Anda dengan mudah di platform Cipta Ruang"
      />

      <PhotoPicker
        photo={photo}
        onTakePhoto={onTakePhoto}
        onChooseGallery={onChooseGallery}
      />

      {photo ? (
        <View className="flex flex-col gap-4 justify-end">
          <Button text="Selanjutnya" onPress={onSave} margin="0" loading={loading} />
        </View>
      ) : (
        <TipsFotoProfil
          tips={[
            'Gunakan foto wajah yang jelas dan terlihat',
            'Pastikan pencahayaan yang cukup',
            'Hindari foto yang terlalu gelap atau blur',
          ]}
        />
      )}
    </View>
  );
}
