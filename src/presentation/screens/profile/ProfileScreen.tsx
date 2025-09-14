import React, { useState } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { TextField } from "../../components/common/TextField";
import { Button } from "../../components/common/Button";

export default function ProfileScreen() {
    const navigation = useNavigation();
    
    // State untuk form data
    const [formData, setFormData] = useState({
        nama: "Sarah Wijaya",
        email: "sarah.wijaya@company.com",
        telepon: "+62 812-3456-7890",
        jabatan: "Staff"
    });

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleSave = () => {
        console.log("Data tersimpan:", formData);
        navigation.goBack();
    };

    return(
        <ScrollView className="flex-1 bg-[#F9FAFB]">
            {/* Header */}
            <View className="w-full bg-primary pt-12 pb-4 px-5 flex-row items-center">
                <TouchableOpacity
                    onPress={handleGoBack}
                    className="mr-4 mb-4"
                >
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="font-semibold text-[18px] text-white ml-20 mb-4">
                    Pengaturan Profil
                </Text>
            </View>

            {/* Foto Profil Section */}
            <View className="mx-4 mt-4 mb-4 bg-white rounded-xl p-6 border border-[#E4E4E7]">
                <View className="items-center">
                    <View className="relative">
                        <Image 
                            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
                            className="h-24 w-24 rounded-full"
                        />
                        <TouchableOpacity 
                            className="absolute bottom-0 right-0 bg-primary rounded-full p-1"
                        >
                            <MaterialIcons name="camera-alt" size={18} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text className="font-bold text-[18px] text-gray-800 mt-3 mb-1">Foto Profil</Text>
                    <Text className="text-gray-500 text-[14px] text-center">
                        Ketuk ikon kamera untuk mengubah foto profil
                    </Text>
                </View>
            </View>

            {/* Informasi Pribadi Section */}
            <View className="mx-4 bg-white rounded-xl p-6 border border-[#E4E4E7] mb-4">
                <View className="flex-row items-center mb-4">
                    <MaterialIcons name="person" size={18} color="#00BFA6" />
                    <Text className="ml-2 font-semibold text-gray-800">Informasi Pribadi</Text>
                </View>
                
                {/* Nama Lengkap */}
                <View className="mb-4">
                    <TextField
                        label="Nama Lengkap"
                        value={formData.nama}
                        onChangeText={(text) => setFormData({...formData, nama: text})}
                    />
                </View>
                
                {/* Email */}
                <View className="mb-4">
                    <TextField
                        label="Email"
                        value={formData.email}
                        onChangeText={(text) => setFormData({...formData, email: text})}
                    />
                </View>
                
                {/* Nomor Telepon */}
                <View className="mb-2">
                    <TextField
                        label="Nomor Telepon"
                        value={formData.telepon}
                        onChangeText={(text) => setFormData({...formData, telepon: text})}
                        keyboardType="phone-pad"
                    />
                </View>
            </View>

            {/* Keamanan Section */}
            <View className="mx-4 bg-white rounded-xl p-6 border border-[#E4E4E7] mb-6">
                <View className="flex-row items-center mb-4">
                    <MaterialIcons name="shield" size={18} color="#00BFA6" />
                    <Text className="ml-2 font-semibold text-gray-800">Keamanan</Text>
                </View>
                
                <TouchableOpacity 
                    className="flex-row justify-between items-center border border-gray-200 rounded-lg px-3 py-4"
                    onPress={() => console.log("Change password")}
                >
                    <View className="flex-row items-center">
                        <MaterialIcons name="lock" size={18} color="#64748B" style={{marginRight: 8}} />
                        <Text className="text-gray-700">Ubah Password</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={20} color="#64748B" />
                </TouchableOpacity>
            </View>

            {/* Button Simpan */}
            <View className="px-4 mb-8">
                <Button
                    text="Simpan Perubahan"
                    onPress={handleSave}
                    padding="py-4"
                    rounded="rounded-lg"
                    margin="0"
                />
            </View>
        </ScrollView>
    );
}