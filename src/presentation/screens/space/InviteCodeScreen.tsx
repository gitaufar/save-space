import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SpaceStackParamList } from '../../navigation/SpaceNavigator';
import SpaceHeader from '../../components/space/headerSpace';
import InvitationKey from '../../../assets/space/invitation_key.svg';
import { Copy } from 'lucide-react-native';
import { Button } from '../../components/common/Button';

type Nav = NativeStackNavigationProp<SpaceStackParamList, 'InviteCode'>;

export default function InviteCodeScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute();
  const { token } = route.params as { token: string; };

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <View className="items-center w-full pt-24">
        <SpaceHeader
          title="Undangan Ruang Kerja"
          desc="Bagikan kode ini ke tim Anda"
          logo={<InvitationKey width={64} height={64} />}
        />
      </View>

      <View className="px-5 mt-10">
        <View className="bg-white rounded-2xl p-8 border border-[#E5E7EB]">
          <Text className="text-center text-[18px] font-bold text-[#1F2937] pb-4">
            Kode Undangan
          </Text>
          <Text className='mb-2 text-center text-light_grey'>
            Gunakan kode ini untuk bergabung ke ruang
          </Text>
          <Text className='text-center text-[22px] font-extrabold text-primary mb-4'>
            {token}
          </Text>
          <TouchableOpacity className='flex-row items-center justify-center gap-2 mb-10'
            onPress={() => {
              // fallback copy for RN 0.81 via deprecated API or add a Clipboard module if available
              try { (global as any).navigator?.clipboard?.writeText?.(token); } catch {}
            }}
          >
            <Copy size={16} color="#00BFA6" />
            <Text className='font-semibold text-center text-primary'>
              Salin Kode
            </Text>
          </TouchableOpacity>

          <View className="p-8 bg-primary/5 rounded-xl">
            <Text className="text-[16px] font-bold text-gray-800 mb-4">
              Cara Menggunakan:
            </Text>
            <View className="gap-4">
              <Text className="text-gray-600">1. Bagikan kode ini kepada karyawan</Text>
              <Text className="text-gray-600">2. Karyawan memasukkan kode di aplikasi</Text>
              <Text className="text-gray-600">3. Mulai monitoring kesehatan mental tim</Text>
            </View>
          </View>
        </View>

        <Button
          text="Selesai"
          onPress={() => navigation.navigate('Space')}
          margin="mt-8"
          rounded="rounded-xl"
        />
      </View>
    </View>
  );
}

