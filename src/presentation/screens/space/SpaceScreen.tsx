import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import LinearGradient from 'react-native-linear-gradient';
import Header from "../../components/auth/Header";
import SpaceMenu from '../../../assets/space/space_menu.svg';
import { Plus, History } from "lucide-react-native";
export default function SpaceScreen() {
  return (
    <LinearGradient
      colors={['#00BFA6', '#FFFFFF']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0.2 }}
    >
      {/* Container atas dengan padding seperti NewSpaceScreen */}
      <View className="flex-1 px-5 pt-32">
        <View className="w-full items-center mb-8">
          <Header
            title="Save Space"
            desc="Pilih ruang Anda untuk melanjutkan"
          />
        </View>

        <View className="items-center mb-4">
          <SpaceMenu width={180} height={180} />
        </View>

        <View className="w-full flex-col items-center justify-between px-2 gap-8 ">
            <TouchableOpacity 
                className="w-full bg-primary rounded-3xl px-32 py-24 pb-8 flex-row items-center justify-center border border-[#E5E7EB]"
                activeOpacity={0.8}
            >
                <View className="flex flex-row items-center absolute top-4 left-4 gap-4 px-2 py-1">
                    <View className="bg-[#FAFAFA]/20 p-5 rounded-3xl">                            
                        <Plus size={24} color="white" />
                    </View>

                    <Text className="text-[#FAFAFA] text-[20px] font-semibold font-poppins leading-[28px]">
                        Buat Ruang Baru
                    </Text>      
                </View>

                <Text className="text-[#FAFAFA] text-[16px] font-poppins w-[300px]">
                    Mulai dengan membuat workspace baru untuk tim Anda dan mulai monitoring kesejahteraan karyawan
                </Text>
                
            </TouchableOpacity>

            <TouchableOpacity 
                className="w-full bg-[#FAFAFA] rounded-3xl px-32 py-24 pb-8 flex-row gap-10 items-center justify-center space-x-2 border border-[#E5E7EB]"
                activeOpacity={0.8}
            >
                <View className="flex flex-row items-center absolute top-4 left-4 gap-4 px-2 py-1 rounded-full">
                    <View className="bg-[#FFB74D]/20 p-5 rounded-3xl">                            
                        <History size={24} color="#FFB74D" />
                    </View>

                    <Text className="text-black text-[20px] font-semibold font-poppins leading-[28px]">
                        Akses Ruang{'\n'}Sebelumnya
                    </Text>
                </View>
                
                <Text className="text-[#4B5563] text-[16px] font-poppins w-[300px]">
                    Kembali ke workspace yang sudah ada
                    dan lanjutkan monitoring yang sedang
                    berjalan                                                             
                </Text>
                
            </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}