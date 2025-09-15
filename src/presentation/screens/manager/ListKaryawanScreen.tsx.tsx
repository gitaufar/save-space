import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import EmployeeMoodCard from '../../components/manager/EmployeeMoodCard';
import { ArrowLeft } from 'lucide-react-native'; // kalau pakai lucide-react-native

type Employee = {
  name: string;
  department: string;
  avatar: string;
  mood: number;
};

type ListKaryawanScreenProps = {
  employees?: Employee[];
};

export default function ListKaryawanScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { employees: routeEmployees } = route.params as { employees?: Employee[] } || {};

  // Default employees jika tidak ada props
  const defaultEmployees = [
    { name: 'Andi Pratama', department: 'Marketing', avatar: 'https://i.pravatar.cc/150?img=1', mood: 1 },
    { name: 'Maya Sari', department: 'IT', avatar: 'https://i.pravatar.cc/150?img=2', mood: 1 },
    { name: 'Budi Santoso', department: 'Finance', avatar: 'https://i.pravatar.cc/150?img=3', mood: 1 },
    { name: 'Andi Pratama', department: 'Marketing', avatar: 'https://i.pravatar.cc/150?img=4', mood: 2 },
    { name: 'Maya Sari', department: 'IT', avatar: 'https://i.pravatar.cc/150?img=5', mood: 3 },
    { name: 'Budi Santoso', department: 'Finance', avatar: 'https://i.pravatar.cc/150?img=6', mood: 0 },
    { name: 'Andi Pratama', department: 'Marketing', avatar: 'https://i.pravatar.cc/150?img=7', mood: 4 },
    { name: 'Maya Sari', department: 'IT', avatar: 'https://i.pravatar.cc/150?img=8', mood: 5 },
    { name: 'Budi Santoso', department: 'Finance', avatar: 'https://i.pravatar.cc/150?img=9', mood: 5 },
  ];

  const employees = routeEmployees || defaultEmployees;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 16,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={{ flex: 1, textAlign: 'center', fontWeight: '600', fontSize: 18 }}>
          List Karyawan
        </Text>
        {/* Dummy space untuk balance layout */}
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {employees.map((emp, idx) => (
          <EmployeeMoodCard
            key={idx}
            name={emp.name}
            department={emp.department}
            avatar={emp.avatar}
            mood={emp.mood as any}
            onPress={() => (navigation as any).navigate('DetailKaryawanScreen', { employee: emp })}
          />
        ))}
      </ScrollView>
    </View>
  );
}
