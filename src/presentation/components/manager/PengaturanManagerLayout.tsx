import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { User, Shield, Settings, LogOut, Users, Bell } from 'lucide-react-native';

interface ButtonPengaturanProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showArrow?: boolean;
}

const ButtonPengaturan: React.FC<ButtonPengaturanProps> = ({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  showArrow = true 
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white p-4 rounded-lg flex-row items-center justify-between shadow-sm border border-gray-100"
    >
      <View className="flex-row items-center flex-1">
        <View className="mr-3">
          {icon}
        </View>
        <View className="flex-1">
          <Text className="text-gray-800 font-medium text-base">{title}</Text>
          {subtitle && (
            <Text className="text-gray-500 text-sm mt-1">{subtitle}</Text>
          )}
        </View>
      </View>
      {showArrow && (
        <View className="ml-2">
          <Text className="text-gray-400">›</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export const PengaturanManagerLayout = () => {
  const navigation = useNavigation();

  const handleProfilePress = () => {
    navigation.navigate('ProfileScreen' as never);
  };

  const handleTeamManagementPress = () => {
    navigation.navigate('ListKaryawanScreen' as never);
  };

  const handleNotificationPress = () => {
    // Navigate to notification settings
    console.log('Navigate to notification settings');
  };

  const handleSecurityPress = () => {
    // Navigate to security settings
    console.log('Navigate to security settings');
  };

  const handleSettingsPress = () => {
    // Navigate to general settings
    console.log('Navigate to general settings');
  };

  const handleLogoutPress = () => {
    // Handle logout
    console.log('Handle logout');
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4 pt-16">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Pengaturan Manager
          </Text>
          <Text className="text-gray-600">
            Kelola pengaturan akun dan tim Anda
          </Text>
        </View>

        <View className="space-y-6">
          {/* Profil Section */}
          <View>
            <Text className="text-lg font-semibold text-gray-800 mb-3">
              Profil
            </Text>
            <View className="space-y-3">
              <ButtonPengaturan 
                icon={<User size={20} color="#6B7280" />}
                title="Profil Saya"
                subtitle="Kelola informasi profil Anda"
                onPress={handleProfilePress}
              />
            </View>
          </View>

          {/* Manajemen Tim Section */}
          <View>
            <Text className="text-lg font-semibold text-gray-800 mb-3">
              Manajemen Tim
            </Text>
            <View className="space-y-3">
              <ButtonPengaturan 
                icon={<Users size={20} color="#6B7280" />}
                title="Kelola Karyawan"
                subtitle="Lihat dan kelola data karyawan"
                onPress={handleTeamManagementPress}
              />
            </View>
          </View>

          {/* Pengaturan Aplikasi Section */}
          <View>
            <Text className="text-lg font-semibold text-gray-800 mb-3">
              Pengaturan Aplikasi
            </Text>
            <View className="space-y-3">
              <ButtonPengaturan 
                icon={<Bell size={20} color="#6B7280" />}
                title="Notifikasi"
                subtitle="Atur preferensi notifikasi"
                onPress={handleNotificationPress}
              />
              <ButtonPengaturan 
                icon={<Shield size={20} color="#6B7280" />}
                title="Keamanan"
                subtitle="Pengaturan keamanan akun"
                onPress={handleSecurityPress}
              />
              <ButtonPengaturan 
                icon={<Settings size={20} color="#6B7280" />}
                title="Pengaturan Umum"
                subtitle="Konfigurasi aplikasi"
                onPress={handleSettingsPress}
              />
            </View>
          </View>

          {/* Aksi Section */}
          <View>
            <Text className="text-lg font-semibold text-gray-800 mb-3">
              Aksi
            </Text>
            <View className="space-y-3">
              <ButtonPengaturan 
                icon={<LogOut size={20} color="#EF4444" />}
                title="Keluar"
                subtitle="Keluar dari akun"
                onPress={handleLogoutPress}
                showArrow={false}
              />
            </View>
          </View>
        </View>

        {/* Bottom padding */}
        <View className="h-6" />
      </View>
    </ScrollView>
  );
};