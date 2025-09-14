import React from 'react';
import { View, Animated, Easing, ViewStyle, StyleProp, DimensionValue } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface SkeletonProps {
  width: DimensionValue;
  height: DimensionValue;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
}

export const Skeleton = ({ width, height, style, borderRadius = 4 }: SkeletonProps) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: true,
      })
    ).start();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [typeof width === 'number' ? -width : -300, typeof width === 'number' ? width : 300]
  });

  return (
    <View 
      style={[
        { 
          backgroundColor: '#E5E7EB', 
          overflow: 'hidden',
          borderRadius,
          width,
          height
        },
        style
      ]}
    >
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          transform: [{ translateX }]
        }}
      >
        <LinearGradient
          colors={['transparent', 'rgba(255, 255, 255, 0.3)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: '100%', height: '100%' }}
        />
      </Animated.View>
    </View>
  );
};

export const SkeletonLoader: React.FC = () => {
  return (
    <View className="bg-white p-5 rounded-xl mb-4 border border-gray-100 shadow-sm">
      {/* Question Title Skeleton */}
      <View className="mb-6">
        <Skeleton width="80%" height={24} style={{ marginBottom: 8 }} />
        <Skeleton width="60%" height={24} />
      </View>

      {/* Options Skeleton */}
      <View className="space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <View key={item} className="flex-row items-center">
            <Skeleton width={24} height={24} borderRadius={12} style={{ marginRight: 12 }} />
            <Skeleton width="70%" height={20} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default SkeletonLoader;