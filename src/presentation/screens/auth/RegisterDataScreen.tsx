import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { AuthStackParamList } from '../../navigation/type';
import { PermissionsAndroid, Platform } from 'react-native';
import Step2FotoProfil from '../../components/auth/registerData/Step2FotoProfil';
import Step3Selesai from '../../components/auth/registerData/Step3Selesai';
import Step1DataDiri from '../../components/auth/registerData/Step1DataDiri';

type RegisterStepRoute = {
  role: 'manager' | 'karyawan';
};

type AuthNav = NativeStackNavigationProp<AuthStackParamList, 'RegisterStep'>;

export default function RegisterDataScreen() {
  const navigation = useNavigation<AuthNav>();
  const route = useRoute();
  const { role } = route.params as RegisterStepRoute;

  const [step, setStep] = useState(1);

  // state form
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // state foto profil
  const [photo, setPhoto] = useState<string | null>(null);

  const handleNextStep = () => {
    if (step >= 3) {
      navigation.navigate('Login');
      return;
    }
    setStep(step + 1);
  };

  const handleBackStep = () => {
    if (step === 1) {
      navigation.navigate('Register');
      return;
    }
    setStep(step - 1);
  };

  async function requestCameraPermission() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Izin Kamera',
          message:
            'Aplikasi ini membutuhkan akses kamera untuk mengambil foto.',
          buttonNeutral: 'Tanya Nanti',
          buttonNegative: 'Batal',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  }

  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    launchCamera({ mediaType: 'photo', quality: 0.7 }, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri || null);
      }
    });
  };

  const handleChooseFromGallery = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.7 },
      (response: ImagePickerResponse) => {
        if (response.assets && response.assets.length > 0) {
          setPhoto(response.assets[0].uri || null);
        }
      },
    );
  };

  return (
    <View className="flex-1 bg-white">
      {step === 1 && (
        <Step1DataDiri
          step={step}
          nama={nama}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          setNama={setNama}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          togglePassword={() => setShowPassword(!showPassword)}
          toggleConfirmPassword={() =>
            setShowConfirmPassword(!showConfirmPassword)
          }
          onNext={handleNextStep}
          onBack={handleBackStep}
        />
      )}

      {step === 2 && (
        <Step2FotoProfil
          step={step}
          photo={photo}
          onTakePhoto={handleTakePhoto}
          onChooseGallery={handleChooseFromGallery}
          onBack={handleBackStep}
        />
      )}

      {step === 3 && <Step3Selesai step={step} onBack={handleBackStep} />}
    </View>
  );
}
