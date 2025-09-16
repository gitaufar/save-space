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

  const noMoodData = employeesWithMood.length === 0;

  const moodData = useMemo(() => {
    if (noMoodData) return null;
    const counts: Record<string, number> = {};
    for (const e of employeesWithMood) {
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
  }, [employeesWithMood, noMoodData]);

  useEffect(() => {
    let active = true;
    async function run() {
      try {
        if (!currentSpace?.id) { if (active) setDivisionInsight(''); return; }
        const total = employees.length;
        const filled = employeesWithMood.length;
        if (total === 0) {
          if (active) setDivisionInsight('Belum ada karyawan dalam space ini.');
          return;
        }
        if (filled < total) {
          if (active) setDivisionInsight('Belum semua karyawan mengisi mood. Ingatkan tim Anda untuk mendapatkan evaluasi divisi hari ini.');
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
        const counts: Record<string, number> = {};
        for (const e of employeesWithMood) { const k = String(e.mood); counts[k] = (counts[k] ?? 0) + 1; }
        const distrText = Object.keys(counts).map(k => `${k}: ${counts[k]}`).join(', ');
        const prompt = `Anda adalah AI HR Assistant. Buat satu evaluasi divisi (maks 6 kalimat) berdasarkan data berikut:
Divisi: ${division}
Jam kerja: ${workHours}
Budaya kerja: ${culture}
Job desk: ${jobDesc}
Distribusi mood hari ini: ${distrText || 'Tidak tersedia'}
Tulis insight spesifik, ringkas, dan actionable untuk HRD.`;
        let text = '';
        try {
          const res = await gemini.execute(prompt);
          text = (res?.text || '').trim();
        } catch {}
        if (!text) text = 'Evaluasi divisi: tren mood stabil. Lanjutkan monitoring dan komunikasikan kebijakan kerja yang mendukung kesejahteraan tim.';
        await dataSource.createDivisionEvaluation({ space_id: currentSpace.id, evaluation_text: text });
        if (active) setDivisionInsight(text);
      } finally {
        if (active) setDivLoading(false);
      }
    }
    run();
    return () => { active = false; };
  }, [currentSpace?.id, currentSpace?.work_hours, (currentSpace as any)?.work_culture, (currentSpace as any)?.job_desc, employees.length, employeesWithMood]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <HeaderCard
        name={user?.name || 'Manager'}
        department={spaceLabel || user?.email || ''}
        avatar={user?.avatar_url || 'https://i.pravatar.cc/150?img=10'}
      />

      <View style={{ padding: 16, marginTop: -24 }}>
        <InsightCard text={divisionInsight || (divLoading ? 'Memuat evaluasi divisi...' : 'Belum semua karyawan mengisi mood. Ingatkan tim Anda untuk mendapatkan evaluasi divisi hari ini.')} />

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
            <TouchableOpacity onPress={() => (navigation as any).navigate('ListKaryawanScreen', { employees: employeesWithMood })}>
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
            employeesWithMood.map((emp, idx) => (
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
