import React from 'react';
import { Text, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Stepper from '../../common/Stepper';

type HeaderRegisterProps = {
  title: string;
  step: number;
  subtitle: string;
  desc: string;
  onBackPress?: () => void;
};

export default function HeaderRegister({ title, step, subtitle, desc, onBackPress }: HeaderRegisterProps) {
  return (
    <SafeAreaView>
      <View className="flex flex-col px-5 gap-4"> 
        <View className="w-full flex-row items-center">
          <Pressable onPress={onBackPress}>
            <Icon name="arrow-back" size={24} color="black" />
          </Pressable>
          <Text className="flex-1 text-center font-bold text-2xl text-black_common">{title}</Text>
          <View style={{ width: 24 }} />
        </View>
        <Stepper step={step} totalSteps={3}/>
        <Text className='text-sm text-light_grey text-center'>Langkah {step} dari 3</Text>
        <Text className='text-2xl text-center font-bold text-black_common'>{subtitle}</Text>
        <Text className='text-base text-light_grey text-center'>{desc}</Text>
      </View>
    </SafeAreaView>
  );
}
