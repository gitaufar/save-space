import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/icon/icon_putih.svg';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

type Slide = {
  image: React.ReactNode;
  title: string;
  paragraph: string;
};

type OnBoardingLayoutProps = {
  slides: Slide[];
  onBoardingShowed: () => void;
};

export const OnBoardingLayout = ({ slides, onBoardingShowed }: OnBoardingLayoutProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log('Mulai ditekan'); // ganti dengan navigation.replace('Home') bila perlu
    }
  };

  const goToPreviousSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const currentSlide = slides[currentIndex];

  return (
    <LinearGradient
      colors={['#00BFA6', '#FFFFFF']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0.2 }}
    >
      <View className="pt-16 px-5 flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between mx-6">
          <View className="flex-row items-center">
            <View className="p-3 bg-primary rounded-xl mr-2">
              <Logo width={23} height={26} />
            </View>
            <Text
              style={{
                color: '#1F2937',
                fontFamily: 'Poppins',
                fontSize: 20,
                fontWeight: '700',
                lineHeight: 28,
              }}
            >
              Save Space
            </Text>
          </View>
          <Text
            className="text-[#6B7280] text-lg font-semibold"
            onPress={() => console.log('Lewati ditekan')}
          >
            Lewati
          </Text>
        </View>

        {/* Slide Content */}
        <View className="flex-1 items-center justify-center">
          <View className="items-center mb-6">
            {currentSlide.image &&
              React.cloneElement(currentSlide.image as any, { width: 312, height: 332 })}
          </View>

          <Text
            className="text-center text-[32px] text-[#1F2937] font-bold mb-4"
            style={{ lineHeight: 32 }}
          >
            {currentSlide.title}
          </Text>

          <Text
            className="text-center text-[16px] text-[#4B5563]"
            style={{
              width: 276,
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: 26,
            }}
          >
            {currentSlide.paragraph}
          </Text>

          {/* Nav arrows + step indicator (dekat paragraph) */}
          <View className="mt-4 w-full px-10 flex-row items-center justify-between">

            <Pressable
              onPress={goToPreviousSlide}
              disabled={currentIndex === 0}
              hitSlop={6}
              className={`p-6 rounded-full border ${
                currentIndex === 0 ? 'bg-gray-200/00 border-gray-300/0' : 'bg-[#FAFAFA] border-[#00BFA6]'
              }`}
            >
              <ChevronLeft size={24} color={currentIndex === 0 ? '#9CA3AF/0' : '#00BFA6'} />
            </Pressable>

            {/* Step indicator */}
            <View className="flex-row items-center justify-center flex-1 mx-4">
              {slides.map((_, idx) => (
                <View
                  key={idx}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 4,
                    backgroundColor: idx <= currentIndex ? '#1F2937' : '#D1D5DB', // hijau untuk yang sudah lewat
                  }}
                />
              ))}
            </View>
            {/* Right arrow */}
            <Pressable
              onPress={slides.length - 1 === currentIndex ? onBoardingShowed : goToNextSlide}
              hitSlop={8}
              className="p-6 rounded-full bg-[#1F2937]"
            >
              <ChevronRight size={24} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};
