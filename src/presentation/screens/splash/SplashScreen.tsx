import React from "react";
import { View, Image, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function SplashScreen() {
    return (
        <LinearGradient
            colors={['#00BFA6', '#0D9488']}
            className="flex-1 justify-center items-center"
        >
            {/* Circles for decoration - top left */}
            <View className="absolute top-20 left-10 w-24 h-24 rounded-full bg-white/10" />
            
            {/* Circles for decoration - top right */}
            <View className="absolute top-36 right-12 w-12 h-12 rounded-full bg-white/10" />
            
            {/* Circles for decoration - bottom */}
            <View className="absolute bottom-32 right-16 w-16 h-16 rounded-full bg-white/10" />
            
            {/* Logo */}
            <View className="bg-white p-4 rounded-3xl shadow-md mb-5">
                <Image 
                    source={require("../../../assets/splashscreen/logo.png")} 
                    style={{ width: 60, height: 60 }}
                    resizeMode="contain"
                />
            </View>
            
            {/* App Name */}
            <Text className="text-white text-3xl font-bold mb-1">
                Safe Space
            </Text>
            
            {/* Tagline */}
            <Text className="text-white/90 text-[18px] mb-3">
                AI Burnout Detection
            </Text>
            
            {/* Subtitle */}
            <Text className="text-white/80 text-[14px] mb-12">
                Untuk Kesehatan Mental Karyawan
            </Text>
            
            {/* Features icons */}
            <View className="flex-row justify-center space-x-5 mb-20">
                <View className="items-center">
                    <View className="bg-white/20 p-3 rounded-lg mb-2">
                        <MaterialIcons name="bar-chart" size={24} color="white" />
                    </View>
                    <Text className="text-white text-xs">Analytics</Text>
                </View>
                
                <View className="items-center">
                    <View className="bg-white/20 p-3 rounded-lg mb-2">
                        <MaterialIcons name="favorite" size={24} color="white" />
                    </View>
                    <Text className="text-white text-xs">Wellbeing</Text>
                </View>
                
                <View className="items-center">
                    <View className="bg-white/20 p-3 rounded-lg mb-2">
                        <MaterialIcons name="group" size={24} color="white" />
                    </View>
                    <Text className="text-white text-xs">Team Care</Text>
                </View>
            </View>
            
            {/* Version */}
            <Text className="absolute bottom-10 text-white/50 text-xs">
                v1.0.0
            </Text>
        </LinearGradient>
    );
}