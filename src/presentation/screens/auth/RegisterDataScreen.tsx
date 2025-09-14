import React, { useState } from 'react';
import { View, Text, Image, Pressable, Alert } from 'react-native';
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
import { useAuth } from '../../contexts/AuthContext';

type RegisterStepRoute = {
  role: 'manager' | 'karyawan';
};

type AuthNav = NativeStackNavigationProp<AuthStackParamList, 'RegisterStep'>;

export default function RegisterDataScreen() {
  const navigation = useNavigation<AuthNav>();
  const route = useRoute();
  const { role } = route.params as RegisterStepRoute;
  const { signUp, updateAvatar, loading, error } = useAuth();

  const [step, setStep] = useState(1);

  // state form
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // validation state
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  // state foto profil
  const [photo, setPhoto] = useState<string | null>(null); // preview uri
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [photoType, setPhotoType] = useState<string | null>(null); // e.g., image/jpeg

  const handleNextStep = async () => {
    if (step === 1) {
      // Reset validation errors
      setValidationErrors({});
      
      // Validate form
      const errors: {[key: string]: string} = {};
      
      if (!nama.trim()) {
        errors.nama = 'Nama lengkap harus diisi';
      }
      
      if (!email.trim()) {
        errors.email = 'Email harus diisi';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Format email tidak valid';
      }
      
      if (!password) {
        errors.password = 'Password harus diisi';
      } else if (password.length < 6) {
        errors.password = 'Password minimal 6 karakter';
      }
      
      if (!confirmPassword) {
        errors.confirmPassword = 'Konfirmasi password harus diisi';
      } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Password dan konfirmasi password tidak sama';
      }

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        Alert.alert('Error', 'Mohon perbaiki kesalahan pada form');
        return;
      }

      // Register user
      try {
        const mappedRole = role === 'manager' ? 'Manager' : 'Karyawan';
        await signUp(email, password, nama, mappedRole);
        // lanjut ke step 2 untuk isi profil
        setStep(step + 1);
      } catch (err: any) {
        Alert.alert('Error', err.message || 'Gagal mendaftar');
        return;
      }
      return;
    }
    
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

    launchCamera({ mediaType: 'photo', quality: 0.7, includeBase64: true }, response => {
      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        setPhoto(asset.uri || null);
        setPhotoBase64(asset.base64 || null);
        setPhotoType(asset.type || 'image/jpeg');
      }
    });
  };

  const handleChooseFromGallery = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.7, includeBase64: true },
      (response: ImagePickerResponse) => {
        if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          setPhoto(asset.uri || null);
          setPhotoBase64(asset.base64 || null);
          setPhotoType(asset.type || 'image/jpeg');
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
          loading={loading}
          validationErrors={validationErrors}
        />
      )}

      {step === 2 && (
        <Step2FotoProfil
          step={step}
          photo={photo}
          onTakePhoto={handleTakePhoto}
          onChooseGallery={handleChooseFromGallery}
          onBack={handleBackStep}
          loading={loading}
          onSave={async () => {
            try {
              if (photo) {
                await updateAvatar(photo);
              }
              await handleNextStep();
            } catch (e: any) {
              Alert.alert('Error', e?.message || 'Gagal menyimpan foto profil');
            }
          }}
        />
      )}

      {step === 3 && (
        <Step3Selesai
          step={step}
          onBack={handleBackStep}
          onFinish={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
        />
      )}
    </View>
  );
}
