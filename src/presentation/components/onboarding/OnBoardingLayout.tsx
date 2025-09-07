import { ReactNode } from "react";
import { Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

type OnBoardingLayoutProps = {
    paragraph?: string;
    title?: string;
    image?: ReactNode;
}

export const OnBoardingLayout = ({
  paragraph,
  title,
  image,
}: OnBoardingLayoutProps) => {
  return (
    <LinearGradient
      colors={['#00BFA6', '#FFFFFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1, paddingHorizontal: 24, justifyContent: 'center', alignItems: 'center' }}
    >
      <View className="mb-10">
        {image}
      </View>
      <View className="items-center">
        {title && <Text className="text-3xl font-bold text-center mb-4">{title}</Text>}
        {paragraph && <Text className="text-center text-gray-600">{paragraph}</Text>}
      </View>
    </LinearGradient>
  );
};