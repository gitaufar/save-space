import React from 'react';
import { View, StyleSheet } from 'react-native';

type StepperProps = {
  step: number; // step sekarang (1-based)
  totalSteps: number; // total step
};

export default function Stepper({ step, totalSteps }: StepperProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, idx) => {
        const isActive = idx + 1 === step;

        return (
          <View
            key={idx}
            style={[
              styles.dot,
              isActive ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // ganti sesuai warna "bg-primary"
  },
  dot: {
    height: 8,
    borderRadius: 9999,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#00BFA6', // warna aktif
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#D1D5DB', // warna gray-300
  },
});
