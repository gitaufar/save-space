import { View, Text, TouchableOpacity, ScrollView } from "react-native"; // Tambahkan ScrollView
import React, { useState } from "react";
import SpaceHeader from "../../components/space/headerSpace";
import Logo from '../../../assets/space/new_space.svg';
import { ChevronLeft, Building, Copy } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { TextField } from "../../components/common/TextField";
import InvitationKey from '../../../assets/space/invitation_key.svg';
import Division from '../../../assets/space/division.svg';
import { Button } from "../../components/common/Button";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function InviteSpaceScreen() {
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
            <ScrollView className="flex-1 pt-32 px-5" showsVerticalScrollIndicator={false}>
                <View className="w-full items-center">
                    <SpaceHeader
                        title="Undangan Ruang Kerja"
                        desc="Kelola tim Anda dengan mudah"
                        logo={<Logo />}
                    />
                </View>
            
                <View className="mb-8">
                    <View className="mt-10 justify-center gap-8 pb-20">
                        <View className="bg-white rounded-2xl p-8 border border-[#E5E7EB]">
                            <Text className="text-left text-[18px] font-bold text-[#1F2937] pb-10">
                                Informasi Ruang 
                            </Text>
                            <TextField
                                label="Divisi"
                                placeholder="Contoh: Human Resources"
                                value={divisi}
                                onChangeText={setDivisi}
                                icon={<Division />}
                            />
                            <TextField
                                label="Deskripsi Pekerjaan"
                                placeholder="Deskripsi pekerjaan dan tanggung jawab"
                                value={deskripsi}
                                onChangeText={setDeskripsi}
                            ></TextField>
                            <TextField
                                label="Jam Kerja"
                                placeholder="Contoh : 08:00 - 17:00"
                                value={jamKerja}
                                onChangeText={setJamKerja}
                            ></TextField>
                            <TextField
                                label="Budaya Kerja"
                                placeholder="Jelaskan budaya kerja di perusahaan"
                                value={budayaKerja}
                                onChangeText={setBudayaKerja}
                            >
                            </TextField>
                        </View>

                            <View className="bg-white rounded-2xl p-8 border border-[#E5E7EB]">
                                <View className="flex items-center justify-center mb-4">
                                    <View className="bg-[#FFB74D]/20 p-3 rounded-xl w-fit   ">
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
                                    ABCD-1234-EFGH-5678
                                </Text>
                                <TouchableOpacity className='flex-row items-center justify-center gap-2 mb-10'>
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
                                            <Text className="text-gray-600 flex-1">
                                                Bagikan kode ini kepada karyawan
                                            </Text>
                                        </View>
                                        
                                        <View className="flex-row items-start">
                                            <View className="bg-primary w-6 h-6 rounded-full items-center justify-center mr-2">
                                                <Text className="text-white font-bold">2</Text>
                                            </View>
                                            <Text className="text-gray-600 flex-1">
                                                Karyawan memasukkan kode di aplikasi
                                            </Text>
                                        </View>
                                        
                                        <View className="flex-row items-start">
                                            <View className="bg-primary w-6 h-6 rounded-full items-center justify-center mr-2">
                                                <Text className="text-white font-bold">3</Text>
                                            </View>
                                            <Text className="text-gray-600 flex-1">
                                                Mulai monitoring kesehatan mental tim
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        <Button
                                text="Menuju Ruang"
                                onPress={() => navigation.navigate('SpaceMain' as never)}
                                margin="mt-8"
                                rounded="rounded-xl"
                            />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}