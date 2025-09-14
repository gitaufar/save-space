import React from 'react';
import { View, Text } from 'react-native';
import CbiTestResultSvg from '../../../assets/hrd/cbi_result_icon.svg'; // svg file

interface CBITestCardProps {
  score: number;
  label: string;
}

export const CBITestCard = ({ score, label }: CBITestCardProps) => {
  return (
    <View className="bg-white rounded-xl p-4 border border-gray-200 mb-4">
      {/* Header */}
      <View className="flex-row items-center mb-2 justify-between">
        <CbiTestResultSvg width={24} height={24} />
        <Text className="ml-2 text-2xl font-semibold text-gray-900">
          CBI Test Result
        </Text>
        <View style={{ width: 24 }} /> {/* spacer biar seimbang */}
      </View>

      {/* Score */}
      <View className="flex-row items-end mb-1 justify-center">
        <Text className="text-3xl font-bold text-amber-500">{score}</Text>
        <Text className="text-2xl text-gray-500">/100</Text>
      </View>

      {/* Label */}
      <Text className="text-xl text-center font-semibold text-orange-600">{label}</Text>
    </View>
  );
};
