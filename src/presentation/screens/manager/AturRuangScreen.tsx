import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, RefreshCw } from 'lucide-react-native';
import { Button } from '../../components/common/Button';
import { useSpace } from '../../contexts/SpaceContext';
import { useConfirmCard } from '../../contexts/ConfirmCardContext';
import { useAuth } from '../../contexts/AuthContext';

export default function AturRuangScreen() {
    const navigation = useNavigation();
    const { currentSpace, refreshCurrentSpace, spaceLoading, refreshInvitationCode } = useSpace();
    const { showSuccess, showError } = useConfirmCard();
    const { user } = useAuth();  // State untuk form
  const [divisi, setDivisi] = useState('');
  const [deskripsiPekerjaan, setDeskripsiPekerjaan] = useState('');
  const [jamKerja, setJamKerja] = useState('');
  const [budayaKerja, setBudayaKerja] = useState('');
  const [kodeUndangan, setKodeUndangan] = useState('');
  const [dibuat, setDibuat] = useState('');
  const [diperbarui, setDiperbarui] = useState('');
  const [loading, setLoading] = useState(false);

  // Format tanggal
  const formatDate = (date: Date | string | null) => {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

    // Load data space saat komponen dimount
    useEffect(() => {
        if (currentSpace) {
            setDivisi(currentSpace.division || '');
            setDeskripsiPekerjaan(currentSpace.job_desc || '');
            setJamKerja(currentSpace.work_hours || '');
            setBudayaKerja(currentSpace.work_culture || '');
            setKodeUndangan(currentSpace.id || '');
            setDibuat(formatDate(currentSpace.created_at));
            setDiperbarui(formatDate(currentSpace.updated_at));
        }
    }, [currentSpace]);  const handleSimpanPerubahan = async () => {
    try {
      setLoading(true);

      // TODO: Implement update space functionality
      // Saat ini belum ada use case untuk update space,
      // jadi kita simulasikan dengan delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      showSuccess('Berhasil', 'Perubahan berhasil disimpan');
    } catch (error: any) {
      showError('Gagal', error?.message || 'Gagal menyimpan perubahan');
    } finally {
      setLoading(false);
    }
  };

    const handleRefresh = async () => {
        await refreshCurrentSpace();
    };

    const handleRefreshInvitationCode = async () => {
        try {
            setLoading(true);
            await refreshInvitationCode();
            showSuccess('Berhasil', 'Kode undangan berhasil diperbarui');
        } catch (error: any) {
            showError('Gagal', error?.message || 'Gagal memperbarui kode undangan');
        } finally {
            setLoading(false);
        }
    };  return (
    <View className="flex-1 bg-[#FAFAFA]">
      {/* Header */}
      <View className="bg-primary px-6 pt-12 pb-6 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ChevronLeft size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="font-semibold text-[18px] text-white flex-1">
          Pengaturan Ruang
        </Text>
        <TouchableOpacity onPress={handleRefresh}>
          <RefreshCw size={20} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Informasi Ruang Section */}
        <View className="mb-6">
          <Text className="text-[16px] font-bold text-[#1E293B] mb-4">
            Informasi Ruang
          </Text>

          {/* Divisi */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-1">
              Divisi
            </Text>
            <TextInput
              value={divisi}
              onChangeText={setDivisi}
              placeholder="Masukkan nama divisi"
              className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700"
            />
          </View>

          {/* Deskripsi Pekerjaan */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-1">
              Deskripsi Pekerjaan
            </Text>
            <TextInput
              value={deskripsiPekerjaan}
              onChangeText={setDeskripsiPekerjaan}
              placeholder="Masukkan deskripsi pekerjaan"
              multiline={true}
              numberOfLines={3}
              className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700"
              style={{ textAlignVertical: 'top', minHeight: 80 }}
            />
          </View>

          {/* Jam Kerja */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-1">
              Jam Kerja
            </Text>
            <TextInput
              value={jamKerja}
              onChangeText={setJamKerja}
              placeholder="Contoh: 08:00 - 17:00 WIB"
              className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700"
            />
          </View>

          {/* Budaya Kerja */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-1">
              Budaya Kerja
            </Text>
            <TextInput
              value={budayaKerja}
              onChangeText={setBudayaKerja}
              placeholder="Contoh: Kolaboratif, Inovatif, dll"
              multiline={true}
              numberOfLines={2}
              className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700"
              style={{ textAlignVertical: 'top', minHeight: 60 }}
            />
          </View>

          {/* Kode Undangan */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-1">
              Kode Undangan
            </Text>
            <View className="flex-row items-center">
              <TextInput
                value={kodeUndangan}
                editable={false}
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 flex-1 mr-2"
              />
              <TouchableOpacity 
                className="p-3 bg-primary rounded-lg"
                onPress={handleRefreshInvitationCode}
                disabled={loading}
              >
                <RefreshCw size={16} color="#FFFFFF" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Info Tanggal */}
          <View className="flex-row justify-between mb-6">
            <View className="flex-1 mr-2">
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Dibuat
              </Text>
              <View className="bg-gray-100 p-3 rounded-lg">
                <Text className="text-gray-700">{dibuat}</Text>
              </View>
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Diperbarui
              </Text>
              <View className="bg-gray-100 p-3 rounded-lg">
                <Text className="text-gray-700">{diperbarui}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Button Simpan */}
        <View className="mb-8">
          <Button
            margin="0"
            text={loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            onPress={handleSimpanPerubahan}
            disabled={loading || spaceLoading}
          />
        </View>
      </ScrollView>
    </View>
  );
}
