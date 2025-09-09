import React from 'react';
import { Text, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Stepper from '../../common/Stepper';

type HeaderRegisterProps = {
  title: string;
  step: number;
  subtitle: string;
};

export default function HeaderRegister({ title, step, subtitle }: HeaderRegisterProps) {
  return (
    <SafeAreaView>
      <View className="flex flex-col px-5 gap-4"> 
        <View className="w-full flex-row items-center">
          <Pressable>
            <Icon name="arrow-back" size={24} color="black" />
          </Pressable>
          <Text className="flex-1 text-center font-bold text-lg text-black_common">{title}</Text>
          {/* biar balance, tambahin spacer di kanan */}
          <View style={{ width: 24 }} />
        </View>
        <Stepper step={step} totalSteps={3}/>
        <Text className='text-sm text-light_grey text-center'>Langkah {step} dari 3</Text>
        <Text className='text-2xl text-center font-bold text-black_common'>{subtitle}</Text>
      </View>
    </SafeAreaView>
  );
}
