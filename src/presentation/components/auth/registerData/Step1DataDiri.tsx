import React from 'react';
import { View } from 'react-native';
import HeaderRegister from './HeaderRegister';
import { TextField } from '../../common/TextField';
import { Button } from '../../common/Button';
import PasswordField from '../../common/PasswordField';
import ConfirmPasswordField from '../../common/ConfirmPasswordField';

type Props = {
  step: number;
  nama: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  setNama: (text: string) => void;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
  setConfirmPassword: (text: string) => void;
  togglePassword: () => void;
  toggleConfirmPassword: () => void;
  onNext: () => void;
  onBack: () => void;
  loading?: boolean;
  validationErrors?: {[key: string]: string};
};

export default function Step1DataDiri({
  step,
  nama,
  email,
  password,
  confirmPassword,
  showPassword,
  showConfirmPassword,
  setNama,
  setEmail,
  setPassword,
  setConfirmPassword,
  togglePassword,
  toggleConfirmPassword,
  onNext,
  onBack,
  loading = false,
  validationErrors = {},
}: Props) {
  return (
    <View className="p-4">
      <HeaderRegister
        onBackPress={onBack}
        title="Data Diri"
        step={step}
        subtitle="Lengkapi Data Diri Anda"
        desc="Mulai dengan membuat akun Anda. Ini adalah langkah pertama untuk membangun ruang kerja yang sehat"
      />
      <View className="flex flex-col gap-4 justify-center">
        <TextField
          label="Nama Lengkap"
          placeholder="Masukkan nama lengkap"
          value={nama}
          onChangeText={setNama}
        />
        <TextField
          label="Email"
          placeholder="Masukkan email"
          value={email}
          onChangeText={setEmail}
        />
        <PasswordField
          label="Password"
          value={password}
          onChangeText={setPassword}
          secure={showPassword}
          toggleSecure={togglePassword}
        />
        <ConfirmPasswordField
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secure={showConfirmPassword}
          toggleSecure={toggleConfirmPassword}
          password={password}
        />
        <Button 
          text={loading ? "Mendaftar..." : "Selanjutnya"} 
          onPress={onNext} 
          margin="0" 
        />
      </View>
    </View>
  );
}
