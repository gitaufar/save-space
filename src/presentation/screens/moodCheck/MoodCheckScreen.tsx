import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button } from '../../components/common/Button';
import { Tips } from '../../components/common/tips'; // Menggunakan komponen Tips dari cbiTest

export default function MoodCheckScreen() {
  const navigation = useNavigation();
  const [moodNote, setMoodNote] = useState('');

  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Submitted mood note:', moodNote);
    // Navigate back or to next screen
    navigation.goBack();
  };

  // Count characters
  const characterCount = moodNote.length;
  const minCharacters = 50;
  const maxCharacters = 500;

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      {/* Header */}
      <View className="flex items-center px-5 h-32 pt-4 bg-primary">
        <Text className="text-lg font-medium text-[#FAFAFA] pt-10">Mood Check</Text>
      </View>

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }} // Memastikan konten minimal setinggi layar
        showsVerticalScrollIndicator={false}
      >
        <View className="p-5">
          {/* Title */}
          <Text className="text-xl text-[20px] font-bold text-gray-900 mb-5 w-4/5">
            Ceritakan sedikit tentang perasaanmu hari ini
          </Text>

          {/* Question Section */}
          <View className="mb-5 mt-4">
            

            {/* Text Input */}
            <View className="bg-white border border-gray-200 rounded-lg p-4">
              <View className="flex-row items-center mb-4">
                <View className="flex items-center justify-center rounded-full bg-primary/20 w-10 h-10">
                  <MaterialIcons 
                    name="favorite"
                    size={20}
                    color="#00BFA6"
                  />
                </View>
                <View className="flex-col">                  
                  <Text className="font-semibold text-gray-800 text-base ml-4">
                    Bagaimana perasaan Anda hari ini?
                  </Text>
                  <Text className="text-gray-500 ml-4 mb-3">
                    Ceritakan dengan bebas
                  </Text>
                </View>
              </View>

              <TextInput
                className="min-h-[100px] text-gray-800 border border-[#E5E7EB] rounded-lg p-6 bg-white"
                placeholder="Tulis perasaan dan pikiran Anda hari ini. Misalnya: kondisi kerja, hubungan dengan rekan, atau hal yang membuat Anda bahagia/stress..."
                placeholderTextColor="#9CA3AF"
                multiline
                textAlignVertical="top"
                value={moodNote}
                onChangeText={setMoodNote}
                maxLength={maxCharacters}
              />
              
              <View className="flex-row justify-between items-center mt-2">
                <Text className="text-gray-500 text-xs">
                  Minimal {minCharacters} karakter
                </Text>
                <Text className="text-gray-500 text-xs">
                  {characterCount}/{maxCharacters}
                </Text>
              </View>
            </View>
          </View>

          <Tips />

          {/* Submit Button */}
          <Button
            text="Selesai"
            onPress={handleSubmit}
            loading={characterCount < minCharacters}
            padding="py-4 px-6"
            margin="mt-4 mb-8 mx-0"
            rounded="rounded-md"
            icon={<MaterialIcons name="check" size={20} color="#FFFFFF" />}
          />
        </View>
      </ScrollView>
    </View>
  );
}