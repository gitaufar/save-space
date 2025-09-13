import React from 'react';
import { ScrollView, View } from 'react-native';
import HeaderCard from '../../components/manager/HeaderCard';
import InsightCard from '../../components/manager/InsightCard';
import MoodDistributionCard from '../../components/manager/MoodDistributionCard';
import EmployeeMoodCard from '../../components/manager/EmployeeMoodCard';

export default function DashboardHRD() {
  const moodData = [
    { mood: 'Senang', value: 4, color: '#22c55e' },
    { mood: 'Tenang', value: 3, color: '#3b82f6' },
    { mood: 'Marah', value: 2, color: '#ef4444' },
    { mood: 'Netral', value: 5, color: '#9ca3af' },
    { mood: 'Lelah', value: 6, color: '#f59e0b' },
    { mood: 'Sedih', value: 1, color: '#6366f1' },
    { mood: 'Stress', value: 3, color: '#dc2626' },
  ];

  const employees = [
    { name: 'Andi Pratama', department: 'Marketing', avatar: 'https://i.pravatar.cc/150?img=1', mood: 2 },
    { name: 'Maya Sari', department: 'IT', avatar: 'https://i.pravatar.cc/150?img=2', mood: 5 },
    { name: 'Budi Santoso', department: 'Finance', avatar: 'https://i.pravatar.cc/150?img=3', mood: 1 },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <HeaderCard name="Sarah Wijaya" department="Marketing" avatar="https://i.pravatar.cc/150?img=10" />

      <View style={{ padding: 16 }}>
        <InsightCard text="Mood divisi marketing cenderung lelah minggu ini. Disarankan HRD mengatur beban kerja atau memberi waktu pemulihan." />

        <MoodDistributionCard data={moodData} />

        <View style={{ marginTop: 16 }}>
          {employees.map((emp, idx) => (
            <EmployeeMoodCard
              key={idx}
              name={emp.name}
              department={emp.department}
              avatar={emp.avatar}
              mood={emp.mood as any}
              onPress={() => console.log('Detail', emp.name)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
