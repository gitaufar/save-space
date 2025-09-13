import React from "react";
import { View, Text, Pressable } from "react-native";

type Answer = {
  id: number;
  text: string;
  value: number;
};

type QuestionProps = {
  number: number;
  question: string;
  options: Answer[];
  selectedAnswer?: number | null;
  onAnswerSelect: (answerId: number) => void;
};

export const Question = ({ number, question, options, selectedAnswer, onAnswerSelect }: QuestionProps) => {
  return (
    <View className="bg-white p-5 rounded-xl mb-4 border border-[#E5E7EB] shadow-sm">
      {/* Question */}
      <View className="flex flex-row mb-4 gap-4">
        <Text className="text-gray-900 font-bold text-lg">
          {number}. 
        </Text>
        <Text className="text-gray-900 font-bold text-lg">
          {question}
        </Text>
      </View>

      {/* Answer options */}
      <View className="w-full gap-4">
        {options.map((option) => (
          <Pressable 
            key={option.id}
            className="flex-row items-center py-1"
            onPress={() => onAnswerSelect(option.id)}
            android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
            style={({ pressed }) => [
              pressed && { opacity: 0.7 }
            ]}
          >
            <View 
              className={`w-10 h-10 rounded-full ${
                selectedAnswer === option.id    
                  ? 'bg-[#E5E7EB] border border-[#E5E7EB]' 
                  : 'bg-white border border-[#E5E7EB]'
              } mr-3 items-center justify-center`}
            >
              {selectedAnswer === option.id && (
                <View className="w-6 h-6 rounded-full bg-[#4B5563]" />
              )}
            </View>
            <Text className="text-gray-800 font-semibold">{option.text}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};