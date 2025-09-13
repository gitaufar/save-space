import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import SpaceHeader from '../../components/space/headerSpace';
import Logo from '../../../assets/space/new_space.svg';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { TextField } from '../../components/common/TextField';
import Division from '../../../assets/space/division.svg';
import { Button } from '../../components/common/Button';
import { SpaceRepositoryImpl } from '../../../data/repositories/SpaceRepositoryImpl';
import { CreateSpaceUseCase } from '../../../domain/usecases/space/CreateSpaceUseCase';

export default function NewSpaceScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [divisi, setDivisi] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [budayaKerja, setBudayaKerja] = useState('');
  const [jamKerja, setJamKerja] = useState('');
  const [loading, setLoading] = useState(false);

  const repo = new SpaceRepositoryImpl();
  const createSpaceUseCase = new CreateSpaceUseCase(repo);

  const handleGoBack = () => navigation.goBack();

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      setLoading(true);
      const space = await createSpaceUseCase.execute({
        name: name.trim(),
        division: divisi || null as any,
        job_desc: deskripsi || null as any,
        work_hours: jamKerja || null as any,
        work_culture: budayaKerja || null as any,
      } as any);
      const token = space.id;
      navigation.navigate({ token } as never);
    } catch (e: any) {
      console.log('Create space error:', e);
      Alert.alert('Gagal membuat ruang', e?.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <TouchableOpacity className="absolute z-10 top-12 left-8" onPress={handleGoBack}>
        <ChevronLeft size={24} color="#333" />
      </TouchableOpacity>

      <View className="items-center w-full pt-32">
        <SpaceHeader title="Buat Ruang Kerja" desc="Kelola tim Anda dengan mudah" logo={<Logo />} />
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <View className="mb-8">
          <View className="justify-center gap-8 pb-20 mt-10">
            <View className="bg-white rounded-2xl p-8 border border-[#E5E7EB]">
              <Text className="text-left text-[18px] font-bold text-[#1F2937] pb-10">Informasi Ruang</Text>
              <TextField label="Nama Ruang" placeholder="Contoh: Tim HRD" value={name} onChangeText={setName} />
              <TextField label="Divisi" placeholder="Contoh: Human Resources" value={divisi} onChangeText={setDivisi} icon={<Division />} />
              <TextField label="Deskripsi Pekerjaan" placeholder="Deskripsi pekerjaan dan tanggung jawab" value={deskripsi} onChangeText={setDeskripsi} />
              <TextField label="Jam Kerja" placeholder="Contoh : 08:00 - 17:00" value={jamKerja} onChangeText={setJamKerja} />
              <TextField label="Budaya Kerja" placeholder="Jelaskan budaya kerja di perusahaan" value={budayaKerja} onChangeText={setBudayaKerja} />
            </View>

            <Button text="Buat" onPress={handleCreate} margin="mt-8" rounded="rounded-xl" loading={loading} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
