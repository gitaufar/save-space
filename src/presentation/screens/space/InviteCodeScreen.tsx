import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SpaceStackParamList } from '../../navigation/SpaceNavigator';
import InvitationKey from '../../../assets/space/invitation_key.svg';
import { Copy } from 'lucide-react-native';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';

type Nav = NativeStackNavigationProp<SpaceStackParamList, 'InviteCode'>;

export default function InviteCodeScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute();
  const { token } = route.params as { token: string; };
  const { fetchCurrentUser } = useAuth();
  const displayToken = useMemo(() => {
    const raw = String(token || '');
    // If already a UUID (8-4-4-4-12), show as-is
    const uuidRe = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (uuidRe.test(raw)) return raw;
    // Otherwise, group alphanumerics in 4s for readability
    const cleaned = raw.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const groups = cleaned.match(/.{1,4}/g) || [];
    return groups.slice(0, 4).join('-');
  }, [token]);

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <View className="px-5 pt-24">
        <View className="bg-white rounded-2xl p-8 border border-[#E5E7EB]">
          <View className="flex items-center justify-center mb-4">
            <View className="bg-[#FFB74D]/20 p-3 rounded-xl">
              <InvitationKey width={24} height={24} />
            </View>
          </View>
          <Text className="text-center text-[18px] font-bold text-[#1F2937] pb-4">
            Kode Undangan
          </Text>
          <Text className='text-center text-light_grey mb-10'>
            Berikut adalah invitation code untuk karyawan Anda
          </Text>
          <Text className='text-center text-light_grey mb-2'>
            Kode Undangan
          </Text>
          <Text className='text-center text-[22px] font-extrabold text-primary mb-4'>
            {displayToken}
          </Text>
          <TouchableOpacity
            className='flex-row items-center justify-center gap-2 mb-10'
            onPress={() => {
              try { (global as any).navigator?.clipboard?.writeText?.(String(token)); } catch {}
            }}
          >
            <Copy size={16} color="#00BFA6" />
            <Text className='text-center text-primary font-semibold'>
              Salin Kode
            </Text>
          </TouchableOpacity>

          <View className="bg-primary/5 rounded-xl p-8">
            <Text className="text-[16px] font-bold text-gray-800 mb-4">
              Cara Menggunakan:
            </Text>
            <View className="gap-4">
              <View className="flex-row items-start">
                <View className="bg-primary w-6 h-6 rounded-full items-center justify-center mr-2">
                  <Text className="text-white font-bold">1</Text>
                </View>
                <Text className="text-gray-600 flex-1">Bagikan kode ini kepada karyawan</Text>
              </View>
              <View className="flex-row items-start">
                <View className="bg-primary w-6 h-6 rounded-full items-center justify-center mr-2">
                  <Text className="text-white font-bold">2</Text>
                </View>
                <Text className="text-gray-600 flex-1">Karyawan memasukkan kode di aplikasi</Text>
              </View>
              <View className="flex-row items-start">
                <View className="bg-primary w-6 h-6 rounded-full items-center justify-center mr-2">
                  <Text className="text-white font-bold">3</Text>
                </View>
                <Text className="text-gray-600 flex-1">Mulai monitoring kesehatan mental tim</Text>
              </View>
            </View>
          </View>
        </View>

        <Button
          text="Selesai"
          onPress={async () => {
            try {
              await fetchCurrentUser();
            } catch {}
          }}
          margin="mt-8"
          rounded="rounded-xl"
        />
      </View>
    </View>
  );
}
