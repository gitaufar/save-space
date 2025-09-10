import React from 'react';
import { View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TextField } from './TextField';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  secure: boolean;
  toggleSecure: () => void;
  password: string;
};

export default function ConfirmPasswordField({
  value,
  onChangeText,
  secure,
  toggleSecure,
  password,
}: Props) {
  return (
    <TextField
      label="Konfirmasi Password"
      placeholder="Ulangi password"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={!secure}
      icon={
        <View className="flex-row items-center ml-2">
          <Pressable onPress={toggleSecure}>
            <Icon name={secure ? 'eye-off' : 'eye'} size={20} color="#6B7280" />
          </Pressable>
          {value.length > 0 && (
            <Icon
              name={password === value ? 'check' : 'x'}
              size={20}
              color={password === value ? 'green' : 'red'}
              style={{ marginLeft: 6 }}
            />
          )}
        </View>
      }
    />
  );
}
