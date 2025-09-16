import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native"; // Tambahkan ScrollView
import React, { useState } from "react";
import SpaceHeader from "../../components/space/headerSpace";
import Logo from '../../../assets/space/old_space.svg';
import { ChevronLeft, Shield } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { TextField } from "../../components/common/TextField";
import Key from "../../../assets/space/key.svg";
import { Button } from "../../components/common/Button";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from "../../contexts/AuthContext";
import { SpaceRepositoryImpl } from "../../../data/repositories/SpaceRepositoryImpl";
import { JoinSpaceByCodeUseCase } from "../../../domain/usecases/space/JoinSpaceByCodeUseCase";

export default function OldSpaceScreen() {
    const navigation = useNavigation();
    const { user, fetchCurrentUser } = useAuth();
    const [spaceCode, setSpaceCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View className="flex-1 bg-[#FAFAFA]">
            <TouchableOpacity
                className="absolute top-12 left-8 z-10"
                onPress={handleGoBack}
            >
                {/* <ChevronLeft size={24} color="#333" /> */}
                <MaterialIcons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            
            <ScrollView className="flex-1 pt-32 px-5" showsVerticalScrollIndicator={false}>
                <View className="w-full items-center">
                    <SpaceHeader
                        title="Akses Ruang Sebelumnya"
                        desc="Masuk ke ruang"
                        logo={<Logo />}
                    />
                </View>
                <View className="mb-8">
                    <View className="mt-10 justify-center gap-8 pb-20">
                        <View className="bg-white rounded-2xl p-8 border border-[#E5E7EB]">
                            <Text className="text-left text-[18px] font-bold text-[#1F2937] pb-2">
                                Masukkan ID Ruang
                            </Text>
                            <Text className="text-left text-[14px] font-medium text-[#6B7280] pb-6">
                                Masukkan ID ruang dari admin untuk bergabung ke workspace.
                            </Text>
                            <TextField
                                label="ID Ruang"
                                placeholder="Contoh: 123e4567-e89b-12d3-a456-426614174000"
                                value={spaceCode}
                                onChangeText={setSpaceCode}
                                icon={<Key />}
                            />
                            <Button
                                text={loading ? "Memproses..." : "Menuju Ruang"}
                                onPress={async () => {
                                  const code = spaceCode.trim();
                                  if (!code) {
                                    Alert.alert('Validasi', 'Mohon masukkan ID ruang yang valid.');
                                    return;
                                  }
                                  if (!user?.id) {
                                    Alert.alert('Error', 'User belum terautentikasi. Silakan login kembali.');
                                    return;
                                  }
                                  setLoading(true);
                                  try {
                                    const repo = new SpaceRepositoryImpl();
                                    const joinUseCase = new JoinSpaceByCodeUseCase(repo);
                                    await joinUseCase.execute(user.id, code);
                                    // refresh user so AppNavigator navigates to dashboard
                                    await fetchCurrentUser();
                                  } catch (e: any) {
                                    Alert.alert('Gagal Bergabung', e?.message || 'Kode ruang tidak ditemukan');
                                  } finally {
                                    setLoading(false);
                                  }
                                }}
                                margin="mt-8"
                                rounded="rounded-xl"
                            />
                        </View>

                        <View className="gap-1">
                            <View className="w-full bg-white rounded-2xl p-4 flex-row items-center border border-[#E5E7EB] mb-4">
                            <View className="bg-[#FFB74D33] px-4 py-2 rounded-xl mr-4">
                                <Text className="text-[#FFB74D] font-bold text-lg">i</Text>
                            </View>
                            <View className="flex-1">
                                    <Text className="text-[#1E293B] font-semibold text-[16px]">
                                        Butuh Bantuan?
                                    </Text>
                                    <Text className="text-light_grey">
                                        Hubungi administrator HR Anda untuk mendapatkan kode ruang organisasi Anda.
                                    </Text>
                                </View>
                            </View>

                            <View className="w-full bg-white rounded-2xl p-4 flex-row items-center border border-[#E5E7EB]">
                                <View className="bg-primary/20 p-2 rounded-xl mr-4">
                                    <Shield size={20} color="#14b8a6" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-[#1E293B] font-semibold text-[16px]">
                                        Keamanan & Privasi
                                    </Text>
                                    <Text className="text-light_grey">
                                        Data Anda dienkripsi dan hanya dapat diakses di dalam ruang kerja organisasi Anda.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
