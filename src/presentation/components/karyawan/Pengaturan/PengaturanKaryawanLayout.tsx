import React, { useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { ButtonPengaturan } from "./ButtonPengaturan";
import { User, LogOut, HelpCircle, Info } from "lucide-react-native";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { LogoutModal } from "../../common/LogoutModal";

export const PengaturanKaryawanLayout = () => {
    const navigation = useNavigation<any>();
    const { user, signOut } = useAuth();
    const displayName = user?.name && user.name.trim().length > 0 ? user.name : (user?.email?.split("@")[0] ?? "-");
    const displayEmail = user?.email ?? "-";
    const roleLabel = user?.role ?? '-';
    const avatarUrl = user?.avatar_url || 'https://i.pravatar.cc/150?img=44';

    const [showLogout, setShowLogout] = useState(false);
    const handleLogout = () => setShowLogout(true);
    const handleConfirmLogout = async () => {
        try {
            await signOut();
        } finally {
            setShowLogout(false);
        }
    };
    return (
        <ScrollView className="flex-1 bg-[#F9FAFB]">
            {/* Header */}
            <View className="items-center w-full px-6 pt-12 pb-6 bg-primary">
                <Text className="font-semibold text-[18px] text-white mb-4">
                    Pengaturan
                </Text>
            </View>
            
            {/* Profile Card */}
            <View className="flex-row items-center p-4 mx-4 -mt-4 bg-white rounded-xl"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {
                        width: 0,
                        height: 2,
                        },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 4 // Penting untuk Android
                    }}
                >
                <Image 
                    source={{ uri: avatarUrl }}
                    className="w-20 h-20 rounded-full"
                />
                <View className="ml-3">
                    <Text className="font-semibold text-[#1E293B]">{displayName}</Text>
                    <Text className="text-sm text-gray-500">{displayEmail}</Text>
                    <View className="flex-row items-center mt-1">
                        <View className="w-2 h-2 mr-1 bg-green-500 rounded-full" />
                        <Text className="text-xs text-gray-500">Online ({roleLabel})</Text>
                    </View>
                </View>
            </View>
            
            {/* Section: Profil dan Ruang */}
            <View className="px-4 mt-6">
                <Text className="text-[16px] font-bold text-[#1E293B] mb-2">
                    Profil
                </Text>
                
                <ButtonPengaturan 
                    title="Atur Profil"
                    text="Ubah informasi pribadi"
                    icon={<User size={18} color="#00BFA6" strokeWidth={2} />}
                    colorBgIcon="rgba(0,191,166,0.15)"
                    onPress={() => navigation.navigate('ProfileScreen' as never)}
                    className="mb-2"
                />
            </View>
            
            {/* Section: Bantuan */}
            <View className="px-4 mt-4">
                <Text className="text-[16px] font-bold text-[#1E293B] mb-2">
                    Bantuan
                </Text>
                
                <ButtonPengaturan 
                    title="Pusat Bantuan"
                    text="FAQ & panduan pengguna"
                    icon={<HelpCircle size={18} color="#22C55E" strokeWidth={2} />}
                    colorBgIcon="rgba(34,197,94,0.15)"
                    onPress={() => console.log("Pusat Bantuan")}
                    className="mb-2"
                />
                
                <ButtonPengaturan 
                    title="Tentang Aplikasi"
                    text="Versi 1.0.0"
                    icon={<Info size={18} color="#64748B" strokeWidth={2} />}
                    colorBgIcon="rgba(100,116,139,0.15)"
                    onPress={() => console.log("Tentang Aplikasi")}
                />
            </View>
            
            {/* Section: Keluar */}
            <View className="px-4 mt-4 mb-24">
                <ButtonPengaturan 
                    title="Keluar"
                    text="Logout dari akun anda"
                    icon={<LogOut size={18} color="#EF4444" strokeWidth={2} />}
                    colorBgIcon="rgba(239,68,68,0.15)"
                    colorBorder="#FECACA"
                    color="#FEF2F2"
                    titleColor="#DC2626"
                    textColor="#EF4444"
                    onPress={handleLogout}
                />
            </View>

            {/* Logout Confirmation Modal (shared for all roles) */}
            <LogoutModal
                visible={showLogout}
                onCancel={() => setShowLogout(false)}
                onConfirm={handleConfirmLogout}
            />
        </ScrollView>
    );
};
