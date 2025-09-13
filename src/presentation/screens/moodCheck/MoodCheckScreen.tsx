import React, { useState } from 'react';
import { View, Text, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';

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
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1">
          {/* Header */}
          <View className="bg-primary py-4">
            <Text className="text-white text-center text-lg font-medium">
              Mood Check
            </Text>
          </View>

          {/* Main Content */}
          <View className="p-5">
            {/* Title */}
            <Text className="text-xl font-bold text-gray-900 mb-5">
              Ceritakan sedikit tentang perasaanmu hari ini
            </Text>

            {/* Question Section */}
            <View className="mb-5">
              <View className="flex-row items-center mb-1">
                <Image 
                  source={require('../../../../assets/icons/heart.png')}
                  className="h-6 w-6 mr-2"
                />
                <Text className="font-semibold text-gray-800 text-base">
                  Bagaimana perasaan Anda hari ini?
                </Text>
              </View>
              <Text className="text-gray-500 ml-8 mb-3">
                Ceritakan dengan bebas
              </Text>

              {/* Text Input */}
              <View className="bg-white border border-gray-200 rounded-lg p-4">
                <TextInput
                  className="min-h-[100px] text-gray-800"
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

            {/* Tips Section */}
            <View className="bg-amber-50 p-4 rounded-lg mb-8">
              <View className="flex-row items-center mb-1">
                <Image 
                  source={require('../../../../assets/icons/lightbulb.png')}
                  className="h-6 w-6 mr-2"
                />
                <Text className="font-semibold text-amber-800">
                  Tips
                </Text>
              </View>
              <Text className="text-amber-800">
                Jujurlah dengan perasaan Anda. Sharing ini membantu kami memberikan dukungan yang tepat untuk kesejahteraan mental Anda.
              </Text>
            </View>

            {/* Submit Button - Sesuaikan props dengan definisi Button */}
            <Button
              text="Selesai"
              onPress={handleSubmit}
              loading={characterCount < minCharacters}
              padding="py-4 px-6"
              margin="mt-4 mb-8 mx-0"
              rounded="rounded-md"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}