import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type RoleCardProps = {
  bgIconColor: string;
  title: string;
  desc: string;
  icon: ReactNode;
};

export default function RoleCard({
  bgIconColor,
  title,
  desc,
  icon,
}: RoleCardProps) {
  return (
    <View className="flex flex-row items-center bg-white p-6 rounded-xl gap-6">
      <View className={`${bgIconColor} rounded-full p-4`}>{icon}</View>
      <View className='flex flex-col gap-2 max-w-[170px]'>
        <Text className='text-lg text-black_common font-semibold'>{title}</Text>
        <Text className='text-sm text-light_grey font-normal'>{desc}</Text>
      </View>
      <Icon name="chevron-right" size={24} color="grey" />
    </View>
  );
}
