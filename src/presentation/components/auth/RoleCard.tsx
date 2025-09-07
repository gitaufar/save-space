import React, { ReactNode } from 'react';
import { Pressable, Text, View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type RoleCardProps = {
  bgIconColor: string;
  title: string;
  desc: string;
  icon: ReactNode;
  onPress?: () => void;
  loading?: boolean;
};

export default function RoleCard({
  bgIconColor,
  title,
  desc,
  icon,
  onPress,
  loading = false,
}: RoleCardProps) {
  return (
    <Pressable
      disabled={loading}
      className={`flex flex-row items-center bg-white p-6 rounded-xl gap-6 ${
        loading ? 'opacity-50' : ''
      }`}
      onPress={onPress}
    >
      <View className={`${bgIconColor} rounded-full p-4`}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" /> // ✅ loader ganti icon
        ) : (
          icon
        )}
      </View>
      <View className="flex flex-col gap-2 max-w-[170px]">
        <Text className="text-lg text-black_common font-semibold">{title}</Text>
        <Text className="text-sm text-light_grey font-normal">{desc}</Text>
      </View>
      {!loading && <Icon name="chevron-right" size={24} color="grey" />}
    </Pressable>
  );
}
