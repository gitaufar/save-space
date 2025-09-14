import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderCard from '../../components/manager/HeaderCard';
import InsightCard from '../../components/manager/InsightCard';
import MoodKaryawanNull from '../../../assets/hrd/mood_karyawan_null.svg'; // svg ilustrasi
import MoodDistributionCard from '../../components/manager/MoodDistributionCard';
import EmployeeMoodCard from '../../components/manager/EmployeeMoodCard';

export default function DashboardHRD() {
  const navigation = useNavigation();
  const moodData = null;

  const employees: {
    name: string;
    department: string;
    avatar: string;
    mood?: string | null;
  }[] = [
    {
      name: 'Andi Pratama',
      department: 'Marketing',
      avatar: 'https://i.pravatar.cc/150?img=1',
      mood: 'Senang',
    },
    {
      name: 'Maya Sari',
      department: 'IT',
      avatar: 'https://i.pravatar.cc/150?img=2',
      mood: 'Stress',
    },
    {
      name: 'Budi Santoso',
      department: 'Finance',
      avatar: 'https://i.pravatar.cc/150?img=3',
      mood: 'Marah',
    },
  ];

  // cek apakah semua mood masih kosong/null
  const noMoodData = employees.every(emp => emp.mood == null);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <HeaderCard
        name="Sarah Wijaya"
        department="Marketing"
        avatar="https://i.pravatar.cc/150?img=10"
      />

      <View style={{ padding: 16 }}>
        <InsightCard text="Mood divisi marketing cenderung lelah minggu ini. Disarankan HRD mengatur beban kerja atau memberi waktu pemulihan." />

        <MoodDistributionCard data={moodData} />

        {/* Header section */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 16,
          }}
        >
          <Text style={{ fontWeight: '600', fontSize: 16 }}>Mood Karyawan</Text>
          {!noMoodData && (
            <TouchableOpacity onPress={() => (navigation as any).navigate('ListKaryawanScreen', { employees })}>
              <Text style={{ color: '#10B981', fontSize: 14 }}>
                Lihat Semua
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ marginTop: 12 }}>
          {noMoodData ? (
            // === Tampilan kalau belum ada data mood ===
            <View
              style={{
                borderRadius: 12,
                padding: 16,
                alignItems: 'center',
                backgroundColor: '#fff',
              }}
            >
              <MoodKaryawanNull
                width={200}
                height={150}
                style={{ marginBottom: 16 }}
              />
              <Text style={{ textAlign: 'center', color: '#6b7280' }}>
                Belum ada riwayat mood karyawan. Data akan muncul setelah
                karyawan mulai mengisi mood.
              </Text>
            </View>
          ) : (
            // === Tampilan daftar karyawan kalau ada data mood ===
            employees.map((emp, idx) => (
              <EmployeeMoodCard
                key={idx}
                name={emp.name}
                department={emp.department}
                avatar={emp.avatar}
                mood={emp.mood as any}
                onPress={() => (navigation as any).navigate('DetailKaryawanScreen', { employee: emp })}
              />
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}
