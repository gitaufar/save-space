import { View, Text, TouchableOpacity, ScrollView } from "react-native"; // Tambahkan ScrollView
import React, { useState } from "react";
import SpaceHeader from "../../components/space/headerSpace";
import Logo from '../../../assets/space/old_space.svg';
import { ChevronLeft, Shield } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { TextField } from "../../components/common/TextField";
import Key from "../../../assets/space/key.svg";
import { Button } from "../../components/common/Button";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function OldSpaceScreen() {
    const navigation = useNavigation();
    const [divisi, setDivisi] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [budayaKerja, setBudayaKerja] = useState('');
    const [jamKerja, setJamKerja] = useState('');

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

            <View className="w-full items-center pt-32">
            </View>
            
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
                                Masukkan Kode Ruang
                            </Text>
                            <Text className="text-left text-[14px] font-medium text-[#6B7280] pb-6">
                                Masukkan kode ruang dari admin untuk bergabung ke workspace.
                            </Text>
                            <TextField
                                label="Kode Ruang"
                                placeholder="Contoh: Masukkan Kode Ruang"
                                value={divisi}
                                onChangeText={setDivisi}
                                icon={<Key />}
                            />
                            <Text className='text-center text-light_grey mb-4'>
                                Format Kode Ruang: XXXX-1234-XXXX-5678
                            </Text>
                            <Button
                                text="Menuju Ruang"
                                onPress={() => navigation.navigate('SpaceMain' as never)}
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