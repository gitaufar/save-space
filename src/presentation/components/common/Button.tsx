import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

type ButtonProps = {
  text: string;
  padding?: string;
  fontSize?: string;
  icon?: React.ReactNode;
  margin?: string;
  rounded?: string;
  loading?: boolean;
  onPress: () => void;
};

export const Button = ({
  text,
  icon,
  padding = 'px-6 py-3',
  fontSize = 'text-[16px]',
  margin = 'm-6',
  rounded = 'rounded-[8px]',
  loading = false,
  onPress,
}: ButtonProps) => {
  if (!text) {
    throw new Error('Text tidak boleh kosong');
  }

  return (
    <Pressable
      onPress={!loading ? onPress : undefined}
      disabled={loading}
      className={`bg-[#00BFA6] ${rounded} w-full self-start ${padding} ${margin} ${
        loading ? 'opacity-50' : 'active:opacity-70'
      }`}
    >
      <View className="flex-row items-center justify-center">
        {loading ? (
          <ActivityIndicator color="#FAFAFA" />
        ) : (
          <>
            {icon && <View className="mr-2">{icon}</View>}
            <Text className={`text-[#FAFAFA] text-center font-medium ${fontSize}`}>
              {text}
            </Text>
          </>
        )}
      </View>
    </Pressable>
  );
};
