import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/auth/Header';
import Logo from '../../../assets/register/register_illustration.svg';
import RoleCard from '../../components/auth/RoleCard';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function RegisterScreen() {
  return (
    <LinearGradient
      colors={['#00BFA6', '#FFFFFF']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0.2 }}
    >
      <View className="flex-1 flex flex-col pt-24 px-5 items-center">
        <Header title="Save Space" desc="Pilih peran anda untuk melanjutkan" />
        <Logo width={300} height={300} />
        <View className="flex flex-col gap-4">
          <RoleCard
            title="Daftar sebagai HRD"
            bgIconColor="bg-primary"
            icon={<Icon name="person" size={24} color="white" />}
            desc="Kelola karyawan dan analisis burnout"
          />
          <RoleCard
            title="Daftar sebagai Karyawan"
            bgIconColor="bg-[#FFB74D]"
            icon={<Icon name="person" size={24} color="white" />}
            desc="Pantau kesehatan mental anda"
          />
        </View>
      </View>
    </LinearGradient>
  );
}
