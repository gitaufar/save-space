import React, { useMemo, useEffect, useState } from 'react';
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
import { useDataSource } from '../../contexts/DataSourceContext';
import { GeminiRemoteDatasourceImpl } from '../../../data/datasources/GeminiRemoteDataSource';
import { GeminiRepositoryImpl } from '../../../data/repositories/GeminiRepositoryImpl';
import { GetResponseGeminiUseCase } from '../../../domain/usecases/ai/GetResponseGeminiUseCase';
import { supabase } from '../../../core/utils/SupabaseClient';

export default function DashboardHRD() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { currentSpace } = useSpace();
  const { employees, loading, getEmployeesWithMoods } = useEmployees();
  const employeesWithMood = useMemo(() => getEmployeesWithMoods(), [getEmployeesWithMoods]);
  const dataSource = useDataSource();

  const [divisionInsight, setDivisionInsight] = useState<string>('');
  const [divLoading, setDivLoading] = useState(false);

  const geminiDs = useMemo(() => new GeminiRemoteDatasourceImpl(), []);
  const geminiRepo = useMemo(() => new GeminiRepositoryImpl(geminiDs), [geminiDs]);
  const gemini = useMemo(() => new GetResponseGeminiUseCase(geminiRepo), [geminiRepo]);

  const spaceLabel = currentSpace?.name || 'Ruang Kerja';

  const [todayMoods, setTodayMoods] = useState<Record<string, any>>({});
  
  // Hitung karyawan yang sudah mengisi mood hari ini
  const employeesWithMoodToday = useMemo(() => {
    return employees.filter(emp => todayMoods[emp.id]?.mood);
  }, [employees, todayMoods]);
  
  const noMoodData = employeesWithMoodToday.length === 0;

  // Fetch today's moods for employees in this space
  useEffect(() => {
    async function fetchTodayMoods() {
      if (!currentSpace?.id || employees.length === 0) {
        setTodayMoods({});
        return;
      }
      
      try {
        const employeeIds = employees.map(emp => emp.id);
        const moodResponses = await dataSource.getTodaysMoodsForEmployees(employeeIds);
        setTodayMoods(moodResponses);
      } catch (error) {
        console.error('Error fetching today moods:', error);
        setTodayMoods({});
      }
    }
    
    fetchTodayMoods();
  }, [currentSpace?.id, employees, dataSource]);

  const moodData = useMemo(() => {
    const moodCounts = Object.keys(todayMoods);
    if (moodCounts.length === 0) return null;
    
    const counts: Record<string, number> = {};
    
    // Hitung mood dari today's mood responses
    Object.values(todayMoods).forEach((moodResponse: any) => {
      const mood = moodResponse.mood;
      if (mood) {
        counts[mood] = (counts[mood] ?? 0) + 1;
      }
    });
    
    // Jika tidak ada mood yang valid, return null
    if (Object.keys(counts).length === 0) return null;
    
    const colorMap: Record<string, string> = {
      Stress: '#DC2626',
      Marah: '#EA580C',
      Sedih: '#2563EB',
      Lelah: '#9333EA',
      Netral: '#4B5563',
      Tenang: '#0D9488',
      Bahagia: '#16A34A',
    };
    return Object.keys(counts).map(k => ({ mood: k, value: counts[k], color: colorMap[k] || '#9CA3AF' }));
  }, [todayMoods]);

  useEffect(() => {
    let active = true;
    async function run() {
      try {
        if (!currentSpace?.id) { if (active) setDivisionInsight(''); return; }
        const total = employees.length;
        
        if (total === 0) {
          if (active) setDivisionInsight('Distribusi mood karyawan lumayan baik coba follow up yang lain ya');
          return;
        }
        
        // Ambil mood responses hari ini untuk semua employee di space ini
        const employeeIds = employees.map(emp => emp.id);
        const todayMoodResponses = await dataSource.getTodaysMoodsForEmployees(employeeIds);
        const withMoodCount = Object.keys(todayMoodResponses).length;
        
        if (withMoodCount === 0) {
          if (active) setDivisionInsight('Belum ada karyawan yang mengisi mood hari ini. Ingatkan tim Anda untuk mengisi mood.');
          return;
        }
        setDivLoading(true);
        const existing = await dataSource.getLatestDivisionEvaluationToday(currentSpace.id);
        if (existing?.evaluation_text) {
          if (active) setDivisionInsight(existing.evaluation_text);
          return;
        }
        const division = currentSpace?.name || '';
        const workHours = currentSpace?.work_hours || '';
        const jobDesc = (currentSpace as any)?.job_desc || '';
        const culture = (currentSpace as any)?.work_culture || '';
        
        // Hitung distribusi mood dari mood responses hari ini
        const counts: Record<string, number> = {};
        Object.values(todayMoodResponses).forEach((moodResponse: any) => {
          const mood = moodResponse.mood;
          if (mood) {
            counts[mood] = (counts[mood] ?? 0) + 1;
          }
        });
        
        const distrText = Object.keys(counts).map(k => `${k}: ${counts[k]}`).join(', ');
        const responseRate = `${withMoodCount}/${total}`;
        
        const prompt = `Anda adalah AI HR Assistant. Buat satu evaluasi divisi (maks 6 kalimat) berdasarkan data berikut:
Divisi: ${division}
Jam kerja: ${workHours}
Budaya kerja: ${culture}
Job desk: ${jobDesc}
Response rate: ${responseRate} karyawan yang mengisi mood
Distribusi mood hari ini: ${distrText || 'Tidak tersedia'}
Tulis insight spesifik, ringkas, dan actionable untuk HRD. Sertakan catatan tentang response rate jika tidak 100%.`;
        let text = '';
        try {
          const res = await gemini.execute(prompt);
          text = (res?.text || '').trim();
        } catch {}
        if (!text) {
          const dominantMood = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0] || 'kondisi stabil';
          text = `Evaluasi divisi berdasarkan ${responseRate} responden: tren mood menunjukkan ${dominantMood}. Tingkatkan partisipasi pengisian mood untuk evaluasi yang lebih komprehensif.`;
        }
        await dataSource.createDivisionEvaluation({ space_id: currentSpace.id, evaluation_text: text });
        if (active) setDivisionInsight(text);
      } finally {
        if (active) setDivLoading(false);
      }
    }
    run();
    return () => { active = false; };
  }, [currentSpace?.id, currentSpace?.work_hours, (currentSpace as any)?.work_culture, (currentSpace as any)?.job_desc, employees.length, employees]);

  // Realtime (Supabase v1): update division insight when a new evaluation row arrives
  useEffect(() => {
    if (!currentSpace?.id) return;
    const handler = async () => {
      try {
        const row = await dataSource.getLatestDivisionEvaluationToday(currentSpace.id);
        if (row?.evaluation_text) setDivisionInsight(row.evaluation_text);
      } catch {}
    };
    const sub: any = supabase
      .from(`division_evaluasion:space_id=eq.${currentSpace.id}`)
      .on('INSERT', handler)
      .on('UPDATE', handler)
      .subscribe();
    return () => { try { supabase.removeSubscription(sub); } catch {} };
  }, [currentSpace?.id, dataSource]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <HeaderCard
        name={user?.name || 'Manager'}
        department={spaceLabel || user?.email || ''}
        avatar={user?.avatar_url || 'https://i.pravatar.cc/150?img=10'}
      />

      <View style={{ padding: 16, marginTop: -24 }}>
        <InsightCard text={divisionInsight || (divLoading ? 'Memuat evaluasi divisi...' : 'Ingatkan tim Anda untuk mengisi mood agar bisa mendapatkan evaluasi divisi.')} />

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
            <TouchableOpacity onPress={() => {
              (navigation as any).navigate('ListKaryawanScreen', { employees: employeesWithMoodToday });
            }}>
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
            // === Tampilan daftar karyawan yang sudah mengisi mood ===
            employeesWithMoodToday.map((emp, idx) => {
              const moodResponse = todayMoods[emp.id];
              const currentMood = moodResponse?.mood || 'Netral';
              
              return (
                <EmployeeMoodCard
                  key={idx}
                  name={emp.name}
                  department={emp.department}
                  avatar={emp.avatar}
                  mood={currentMood as any}
                  onPress={() => (navigation as any).navigate('DetailKaryawanScreen', { employee: emp })}
                />
              );
            })
          )}
        </View>
      </View>
    </ScrollView>
  );
}
