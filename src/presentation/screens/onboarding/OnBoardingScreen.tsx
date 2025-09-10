import React from 'react';
import { View } from 'react-native';
import { OnBoardingLayout } from '../../components/onboarding/OnBoardingLayout';
import Onboarding1 from '../../../assets/onboarding/onboarding1.svg';
import Onboarding2 from '../../../assets/onboarding/onboarding2.svg';
import Onboarding3 from '../../../assets/onboarding/onboarding3.svg';

const slides = [
  {
    title: "Awali Harimu dengan Jujur",
    image: <Onboarding1 />,
    paragraph: 'Isi mood setiap pagi dan sore, biarkan AI membantumu memahami pola emosimu.',
  },
  {
    title: "Kolaborasi Efektif",
    image: <Onboarding2 />,
    paragraph: 'Dapatkan insight harian serta deteksi dini burnout, demi kesehatan mental lebih baik.',
  },
  {
    title: "Ruang Cipta Bersama",
    image: <Onboarding3 />,
    paragraph: 'HRD dan karyawan berkolaborasi dengan data dan empati, solusi tetap ada di tangan manusia.',
  },
];

export default function OnBoardingScreen() {
  return (
    <View className="flex-1 bg-white">
      <OnBoardingLayout slides={slides} />
    </View>
  );
}