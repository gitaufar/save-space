import { ReactNode } from "react";
import { Text, TextInput, View } from "react-native";

type TextFieldProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  icon?: ReactNode;
};

export const TextField = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  icon,
}: TextFieldProps) => {
  return (
    <View className="mb-4">
      {label && (
        <Text className="mb-2 text-gray-700 font-medium">{label}</Text>
      )}

      <View className="flex flex-row w-full items-center border border-gray-300 rounded-lg px-3 py-1 bg-white">
        <TextInput
          className="flex-1 text-base text-gray-900"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#9CA3AF"
        />
        {icon && <View className="ml-2">{icon}</View>}
      </View>
    </View>
  );
};
