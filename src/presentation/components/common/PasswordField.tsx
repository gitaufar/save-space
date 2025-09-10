import React from 'react';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TextField } from './TextField';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secure: boolean;
  toggleSecure: () => void;
};

export default function PasswordField({ label, value, onChangeText, secure, toggleSecure }: Props) {
  return (
    <TextField
      label={label}
      placeholder={`Masukkan ${label.toLowerCase()}`}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={!secure}
      icon={
        <Pressable onPress={toggleSecure}>
          <Icon name={secure ? 'eye-off' : 'eye'} size={20} color="#6B7280" />
        </Pressable>
      }
    />
  );
}
