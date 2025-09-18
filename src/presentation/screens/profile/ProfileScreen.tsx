import React, { useMemo, useState } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { TextField } from "../../components/common/TextField";
import { Button } from "../../components/common/Button";
import { useAuth } from "../../contexts/AuthContext";
import { useConfirmCard } from "../../contexts/ConfirmCardContext";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

export default function ProfileScreen() {
    const navigation = useNavigation();
    const { user, loading, updateAvatar, updateProfile, changePassword } = useAuth();
    const { showError, showSuccess, showWarning, showCustomConfirm } = useConfirmCard();
    const roleLabel = useMemo(() => user?.role ?? '-', [user?.role]);
    // State untuk form data (prefill dari backend)
    const [formData, setFormData] = useState({
        nama: user?.name || '',
        email: user?.email || '',
    });
    const [pwdVisible, setPwdVisible] = useState(false);
    const [pwd1, setPwd1] = useState("");
    const [pwd2, setPwd2] = useState("");

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleSave = async () => {
        try {
            const changes: any = {};
            if (formData.nama !== user?.name) changes.name = formData.nama;
            if (formData.email !== user?.email) changes.email = formData.email;
            if (Object.keys(changes).length === 0) {
                navigation.goBack();
                return;
            }
            await updateProfile(changes);
            showSuccess('Sukses', 'Profil berhasil diperbarui', () => navigation.goBack());
        } catch (e: any) {
            showError('Error', e?.message || 'Gagal memperbarui profil');
        }
    };

    const handlePickAvatar = () => {
        // Create helper functions for camera and gallery
        const handleCamera = () => {
            launchCamera({ mediaType: 'photo' }, async (res) => {
                const uri = res.assets?.[0]?.uri; 
                if (!uri) return;
                try { 
                    await updateAvatar(uri); 
                } catch (e: any) { 
                    showError('Error', e?.message || 'Gagal mengubah foto'); 
                }
            });
        };

        const handleGallery = () => {
            launchImageLibrary({ mediaType: 'photo' }, async (res) => {
                const uri = res.assets?.[0]?.uri; 
                if (!uri) return;
                try { 
                    await updateAvatar(uri); 
                } catch (e: any) { 
                    showError('Error', e?.message || 'Gagal mengubah foto'); 
                }
            });
        };

        // Use showCustomConfirm with "Kamera" and "Galeri" as button texts
        showCustomConfirm(
            'Ubah Foto Profil', 
            'Pilih sumber gambar',
            'Kamera',
            'Galeri',
            handleCamera,
            handleGallery
        );
    };

    const handleChangePassword = async () => {
        if (!pwd1 || pwd1.length < 6) {
            showError('Error', 'Password minimal 6 karakter');
            return;
        }
        if (pwd1 !== pwd2) {
            showError('Error', 'Konfirmasi password tidak sama');
            return;
        }
        try {
            await changePassword(pwd1);
            setPwd1(""); setPwd2(""); setPwdVisible(false);
            showSuccess('Sukses', 'Password berhasil diubah');
        } catch (e: any) {
            showError('Error', e?.message || 'Gagal mengubah password');
        }
    };

    return(
        <SafeAreaView className="flex-1 bg-[#F9FAFB]">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View className="w-full bg-primary pt-4 pb-4 px-5 flex-row items-center">
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
                            source={{ uri: user?.avatar_url || 'https://i.pravatar.cc/150?img=44' }}
                            className="h-24 w-24 rounded-full"
                        />
                        <TouchableOpacity 
                            className="absolute bottom-0 right-0 bg-primary rounded-full p-1"
                            onPress={handlePickAvatar}
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
                
                <View className="mb-1">
                    <Text className="text-gray-500">Role</Text>
                    <Text className="text-gray-800 font-medium">{roleLabel}</Text>
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
                    onPress={() => setPwdVisible(true)}
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
                    loading={loading}
                />
            </View>

            {/* Change Password Modal */}
            <Modal visible={pwdVisible} transparent animationType="fade">
              <View className="flex-1 bg-black/40 items-center justify-center px-6">
                <View className="w-full bg-white rounded-xl p-5">
                  <View className="flex-row items-center justify-between mb-3">
                    <Text className="text-lg font-semibold">Ubah Password</Text>
                    <TouchableOpacity onPress={() => setPwdVisible(false)}>
                      <MaterialIcons name="close" size={22} color="#64748B" />
                    </TouchableOpacity>
                  </View>
                  <View className="mb-3">
                    <TextField label="Password Baru" value={pwd1} onChangeText={setPwd1} secureTextEntry />
                  </View>
                  <View className="mb-5">
                    <TextField label="Konfirmasi Password" value={pwd2} onChangeText={setPwd2} secureTextEntry />
                  </View>
                  <View className="items-center">
                    <Button text="Simpan" onPress={handleChangePassword} padding="py-3 px-8" rounded="rounded-md" margin="0" loading={loading} />
                  </View>
                </View>
              </View>
            </Modal>
        </ScrollView>
        </SafeAreaView>
    );
}
