import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import EmployeeMoodCard from '../../components/manager/EmployeeMoodCard';
import { ArrowLeft } from 'lucide-react-native'; // kalau pakai lucide-react-native
import { useAuth } from '../../contexts/AuthContext';
import { SupabaseDataSource } from '../../../data/datasources/SupabaseDataSource';

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
  const { user } = useAuth();
  const ds = useMemo(() => new SupabaseDataSource(), []);
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const rp = (route.params as any)?.employees as Employee[] | undefined;
    return rp || [];
  });

  useEffect(() => {
    const load = async () => {
      if (employees.length > 0) return; // sudah dapat dari route
      if (!user?.space_id) return;
      try {
        const karys = await ds.getKaryawansBySpace(user.space_id);
        const ids = (karys || []).map((k: any) => k.id);
        const latestMap = await ds.getLatestMoodsForEmployees(ids);
        const mapped = (karys || []).map((k: any) => ({
          name: k.name || k.email || 'Karyawan',
          department: '-',
          avatar: k.avatar_url || 'https://i.pravatar.cc/150?img=1',
          mood: latestMap[k.id]?.mood || 'Netral',
        }));
        setEmployees(mapped);
      } catch (e) {
        // ignore for now
      }
    };
    load();
  }, [user?.space_id]);

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
            mood={(emp.mood as any) || 'Netral'}
            onPress={() => (navigation as any).navigate('DetailKaryawanScreen', { employee: emp })}
          />
        ))}
      </ScrollView>
    </View>
  );
}
