import React, { useMemo } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderCard from '../../components/manager/HeaderCard';
import InsightCard from '../../components/manager/InsightCard';
import MoodKaryawanNull from '../../../assets/hrd/mood_karyawan_null.svg'; // svg ilustrasi
import MoodDistributionCard from '../../components/manager/MoodDistributionCard';
import EmployeeMoodCard from '../../components/manager/EmployeeMoodCard';
import { useSpace } from '../../contexts/SpaceContext';
import { useEmployees } from '../../contexts/EmployeeContext';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardHRD() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { currentSpace } = useSpace();
  const { employees, loading } = useEmployees();

  const spaceLabel = currentSpace?.name || 'Ruang Kerja';

  const noMoodData = employees.length === 0 || employees.every(emp => !emp.mood);

  const moodData = useMemo(() => {
    if (noMoodData) return null;
    const counts: Record<string, number> = {};
    for (const e of employees) {
      const m = e.mood;
      if (!m) continue;
      counts[m] = (counts[m] ?? 0) + 1;
    }
    const colorMap: Record<string, string> = {
      Stress: '#DC2626',
      Marah: '#EA580C',
      Sedih: '#2563EB',
      Lelah: '#9333EA',
      Netral: '#4B5563',
      Tenang: '#0D9488',
      Senang: '#16A34A',
    };
    return Object.keys(counts).map(k => ({ mood: k, value: counts[k], color: colorMap[k] || '#9CA3AF' }));
  }, [employees, noMoodData]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <HeaderCard
        name={user?.name || 'Manager'}
        department={spaceLabel || user?.email || ''}
        avatar={user?.avatar_url || 'https://i.pravatar.cc/150?img=10'}
      />

      <View style={{ padding: 16, marginTop: -24 }}>
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
              <Text style={{ color: '#00BFA6', fontSize: 14 }}>
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
                mood={(emp.mood || 'Netral') as any}
                onPress={() => (navigation as any).navigate('DetailKaryawanScreen', { employee: emp })}
              />
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}
