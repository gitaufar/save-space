import React from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/type';
import HeaderRegister from '../../components/auth/registerData/HeaderRegister';
import Stepper from '../../components/common/Stepper';

type RegisterStepRoute = {
  role: 'manager' | 'karyawan';
};

type AuthNav = NativeStackNavigationProp<AuthStackParamList, 'RegisterStep'>;

export default function RegisterDataScreen() {
  const navigation = useNavigation<AuthNav>();
  const route = useRoute();
  const { role } = route.params as RegisterStepRoute;

  return (
    <View className="flex-1 bg-white flex flex-col">
      <HeaderRegister
        title='Foto Profile'
        step={1}
        subtitle='sdsdas'
      />
    </View>
  );
}
