import React from 'react';
import { View } from 'react-native';

type StepperProps = {
  step: number;        // step sekarang (1-based)
  totalSteps: number;  // total step
};

export default function Stepper({ step, totalSteps }: StepperProps) {
  return (
    <View className="flex-row items-center justify-center bg-primary">
      {Array.from({ length: totalSteps }).map((_, idx) => {
        const isActive = idx + 1 === step;

        return (
          <View
            key={idx}
            className={`h-2 rounded-full mx-1 ${
              isActive ? 'bg-primary w-6' : 'bg-gray-300 w-2'
            }`}
          />
        );
      })}
    </View>
  );
}
