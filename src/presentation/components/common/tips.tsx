import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Lamp from '../../../assets/karyawan/ai_lamp.svg'; // Pastikan path ini benar

export const Tips = () => {
  return (
    <LinearGradient 
      colors={['rgba(255, 183, 77, 0.1)', 'rgba(0, 191, 166, 0.05)']} 
      start={{x: 0, y: 0}} 
      end={{x: 1, y: 0}}
      style={{ borderRadius: 16 }} 
      className="p-4 rounded-xl mb-6"
    >
      <View className="flex-row items-start">
        <View className="bg-amber-100 rounded-full w-12 h-12 items-center justify-center mr-4">
          <Lamp width={32} height={32} />
        </View>
        
        <View className="flex-1">
          <Text className="font-bold text-gray-800 text-lg mb-1">Tips</Text>
          <Text className="text-gray-600 leading-5">
            Jujurlah dengan perasaan Anda. Sharing ini membantu kami memberikan dukungan yang 
            tepat untuk kesejahteraan mental Anda.
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};