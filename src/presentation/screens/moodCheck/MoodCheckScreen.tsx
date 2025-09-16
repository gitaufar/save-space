import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button } from '../../components/common/Button';
import { Tips } from '../../components/common/tips'; // Menggunakan komponen Tips dari cbiTest
import { useAuth } from '../../contexts/AuthContext';
import { SupabaseDataSource } from '../../../data/datasources/SupabaseDataSource';
import { useMoodViewModel } from '../../viewModels/karyawan/KaryawanViewModel';
import { GeminiRemoteDatasourceImpl } from '../../../data/datasources/GeminiRemoteDataSource';
import { GeminiRepositoryImpl } from '../../../data/repositories/GeminiRepositoryImpl';
import { GetResponseGeminiUseCase } from '../../../domain/usecases/ai/GetResponseGeminiUseCase';
import { useGeminiViewModel } from '../../viewModels/common/GeminiViewModel';

export default function MoodCheckScreen() {
  const navigation = useNavigation();
  const [moodNote, setMoodNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const ds = useMemo(() => new SupabaseDataSource(), []);
  const { setInputText, predictMood } = useMoodViewModel();
  const [workStartMinutes, setWorkStartMinutes] = useState<number>(9 * 60);
  const [space, setSpace] = useState<any>(null);

  // Gemini wiring (follow HomeScreen usage)
  const datasource = useMemo(() => new GeminiRemoteDatasourceImpl(), []);
  const repo = useMemo(() => new GeminiRepositoryImpl(datasource), [datasource]);
  const usecase = useMemo(() => new GetResponseGeminiUseCase(repo), [repo]);
  const { generate, loading: geminiLoading, data: geminiQuestion, error: geminiError } = useGeminiViewModel(usecase);

  const PRE_PROMPT =
    'Daily Question Sebelum Kerja: Anda adalah AI HR Assistant untuk perusahaan. Tugas Anda adalah membuat satu pertanyaan harian SINGKAT dan MUDAH dipahami yang dikirim ke karyawan sebelum jam kerja dimulai. Pertanyaan ini harus bisa mengukur kondisi mental, energi, dan kesiapan kerja mereka secara emosional. Outputkan 1 pertanyaan saja dalam Bahasa Indonesia dengan nada ramah, profesional, dan suportif. Langsung outputkan pertanyaannya saja';
  const POST_PROMPT =
    'Daily Question Setelah Kerja: Anda adalah AI HR Assistant untuk perusahaan. Tugas Anda adalah membuat satu pertanyaan harian SINGKAT dan MUDAH dipahami yang dikirim ke karyawan setelah jam kerja selesai. Pertanyaan ini harus bisa mengukur tingkat stres, kepuasan, dan kondisi emosional mereka setelah bekerja. Outputkan 1 pertanyaan dalam Bahasa Indonesia dengan nada ramah, profesional, dan suportif. Langsung outputkan pertanyaannya saja';

  // Load work hours start time
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        if (!user?.space_id) return;
        const sp = await ds.getSpaceById(user.space_id);
        const start = parseStartMinutes(sp?.work_hours);
        if (active) { setWorkStartMinutes(start); setSpace(sp); }
      } catch {}
    }
    load();
    return () => { active = false; };
  }, [user?.space_id, ds]);

  function parseStartMinutes(workHours?: string): number {
    try {
      const text = String(workHours || '').trim();
      const m = text.match(/(\d{1,2})(?::(\d{2}))?/);
      if (!m) return 9 * 60;
      const hh = Math.min(23, Math.max(0, parseInt(m[1], 10)));
      const mm = m[2] ? Math.min(59, Math.max(0, parseInt(m[2], 10))) : 0;
      return hh * 60 + mm;
    } catch { return 9 * 60; }
  }

  // Generate daily question from Gemini (before vs after work start)
  useEffect(() => {
    const nowMinutes = (() => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); })();
    const prompt = nowMinutes < workStartMinutes ? PRE_PROMPT : POST_PROMPT;
    generate(prompt);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workStartMinutes]);

  const normalizeMood = (label: string) => {
    const t = String(label || '').trim().toLowerCase();
    // Map to canonical display names used in Manager dashboard color map
    const map: Record<string, string> = {
      stress: 'Stress',
      marah: 'Marah',
      sedih: 'Sedih',
      lelah: 'Lelah',
      netral: 'Netral',
      tenang: 'Tenang',
      senang: 'Senang',
    };
    return map[t] || (t.charAt(0).toUpperCase() + t.slice(1));
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      Alert.alert('Error', 'Anda belum masuk.');
      return;
    }
    if (moodNote.trim().length < minCharacters) return;
    setSubmitting(true);
    try {
      // 1) Predict mood via AI service (follow HomeScreen pattern via view model)
      let prediction: any = null;
      let moodLabel = 'Netral';
      try {
        prediction = await predictMood(moodNote.trim());
        moodLabel = normalizeMood(prediction?.predictedMood || 'Netral');
      } catch (e) {
        // Fallback: proceed with Netral if AI service times out/fails
        moodLabel = 'Netral';
      }

      // 2) Save to mood_responses
      await ds.addMoodResponse({
        employee_id: user.id,
        mood: moodLabel,
        response_text: moodNote.trim(),
      });

      // 3) Generate AI Daily Insight via Gemini using the employee's answer + predicted mood + space context
      const s = space || {};
      const insightPrompt = `Anda adalah AI HR Assistant. 
Berdasarkan jawaban karyawan berikut: "${moodNote.trim()}", 
klasifikasi mood: ${moodLabel} (keyakinan ${prediction?.confidence ?? '-'}), 
dan data karyawan:
- ID: ${s.id ?? '-'}
- Nama: ${s.name ?? '-'}
- Divisi: ${s.division ?? '-'}
- Job Desc: ${s.job_desc ?? '-'}
- Jam Kerja: ${s.work_hours ?? '-'}
- Budaya Kerja: ${s.work_culture ?? '-'}
- Dibuat pada: ${s.created_at ?? '-'}
- Diperbarui pada: ${s.updated_at ?? '-'}

Tulis AI Daily Insight SINGKAT (maks 2 kalimat, <=200 karakter), suportif dan actionable. 
Outputkan hanya teks insight dalam Bahasa Indonesia.`;
      let insight = '';
      try {
        const insightRes = await usecase.execute(insightPrompt);
        insight = (insightRes?.text || '').trim();
      } catch (e: any) {
        // fallback if Gemini fails
        insight = '';
      }
      if (!insight) {
        insight = `Ringkasan: ${moodLabel}. Jaga kebiasaan positif dan kelola beban kerja dengan baik.`;
      }

      await ds.createAIInsight({
        employee_id: user.id,
        insight_text: insight,
        mood_summary: moodLabel,
      });

      Alert.alert('Tersimpan', 'Mood berhasil dikirim dan insight dibuat.');
      navigation.goBack();
    } catch (e: any) {
      Alert.alert('Gagal', e?.message || 'Tidak dapat menyimpan mood.');
    } finally {
      setSubmitting(false);
    }
  };

  // Count characters
  const characterCount = moodNote.length;
  const minCharacters = 1;
  const maxCharacters = 500;

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      {/* Header */}
      <View className="flex items-center h-32 px-5 pt-4 bg-primary">
        <Text className="text-lg font-medium text-[#FAFAFA] pt-10">Mood Check</Text>
      </View>

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }} // Memastikan konten minimal setinggi layar
        showsVerticalScrollIndicator={false}
      >
        <View className="p-5">
          {/* Title */}
          <Text className="text-xl text-[20px] font-bold text-gray-900 mb-5 w-4/5">
            Ceritakan sedikit tentang perasaanmu hari ini
          </Text>

          {/* Question Section */}
          <View className="mt-4 mb-5">
            

            {/* Text Input */}
            <View className="p-4 bg-white border border-gray-200 rounded-lg">
              <View className="flex-row items-center mb-4">
                <View className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20">
                  <MaterialIcons 
                    name="favorite"
                    size={20}
                    color="#00BFA6"
                  />
                </View>
                <View className="flex-col">                  
                  <Text className="ml-4 text-base font-semibold text-gray-800">
                    {geminiLoading ? 'Memuat pertanyaan...' : (geminiQuestion || 'Bagaimana perasaan Anda hari ini?')}
                  </Text>
                  {!!geminiError && (
                    <Text className="mb-3 ml-4 text-gray-500">Pertanyaan default digunakan</Text>
                  )}
                </View>
              </View>

              <TextInput
                className="min-h-[100px] text-gray-800 border border-[#E5E7EB] rounded-lg p-6 bg-white"
                placeholder="Tulis perasaan dan pikiran Anda hari ini. Misalnya: kondisi kerja, hubungan dengan rekan, atau hal yang membuat Anda bahagia/stress..."
                placeholderTextColor="#9CA3AF"
                multiline
                textAlignVertical="top"
                value={moodNote}
                onChangeText={setMoodNote}
                maxLength={maxCharacters}
              />
              
              <View className="flex-row items-center justify-between mt-2">
                <Text className="text-xs text-gray-500">Minimal {minCharacters} karakter</Text>
                <Text className="text-xs text-gray-500">
                  {characterCount}/{maxCharacters}
                </Text>
              </View>
            </View>
          </View>

          <Tips />

          {/* Submit Button */}
          <Button
            text="Selesai"
            onPress={handleSubmit}
            loading={submitting}
            disabled={characterCount < minCharacters}
            padding="py-4 px-6"
            margin="mt-4 mb-8 mx-0"
            rounded="rounded-md"
            icon={<MaterialIcons name="check" size={20} color="#FFFFFF" />}
          />
        </View>
      </ScrollView>
    </View>
  );
}
