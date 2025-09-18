import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import EmployeeMoodCard from '../../components/manager/EmployeeMoodCard';
import { ArrowLeft } from 'lucide-react-native'; // kalau pakai lucide-react-native
import { useEmployees } from '../../contexts/EmployeeContext';

type Employee = {
  id: string;
  name: string;
  department: string;
  avatar: string;
  mood: any;
};

export default function ListKaryawanScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { employees: contextEmployees, getEmployeesWithMoods } = useEmployees();
  
  // Ambil employees dari route params atau dari context
  const employees = useMemo(() => {
    const routeEmployees = (route.params as any)?.employees as Employee[] | undefined;
    if (routeEmployees && routeEmployees.length > 0) {
      return routeEmployees;
    }
    
    // Convert dari context employees ke format yang dibutuhkan screen ini, hanya yang punya mood hari ini
    const filtered = getEmployeesWithMoods();
    return filtered.map(emp => ({
      id: emp.id,
      name: emp.name,
      department: emp.department,
      avatar: emp.avatar,
      mood: emp.mood || 'Netral',
    }));
  }, [route.params, contextEmployees]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
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
            mood={(emp.mood as any) || 'Netral'}
            onPress={() => (navigation as any).navigate('DetailKaryawanScreen', { employee: emp })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
