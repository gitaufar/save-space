import React from 'react';
import { View } from 'react-native';
import HeaderRegister from './HeaderRegister';
import TipsFotoProfil from './TipsFotoProfil';
import PhotoPicker from '../../common/PhotoPicker';

type Props = {
  step: number;
  photo: string | null;
  onTakePhoto: () => void;
  onChooseGallery: () => void;
  onBack: () => void;
};

export default function Step2FotoProfil({
  step,
  photo,
  onTakePhoto,
  onChooseGallery,
  onBack,
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

      <TipsFotoProfil
        tips={[
          'Gunakan foto wajah yang jelas dan terlihat',
          'Pastikan pencahayaan yang cukup',
          'Hindari foto yang terlalu gelap atau blur',
        ]}
      />
    </View>
  );
}
