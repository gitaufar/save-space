import React, { useEffect, useState, useMemo } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native"; // kalau sudah pakai lucide
import { StatusMoodCard } from "../../components/mood/StatusMoodCard";
import { AIDailyInsight } from "../../components/karyawan/Beranda/AIDailyInsight";
import { RiwayatMood } from "../../components/karyawan/Beranda/RiwayatMood";
import { CBITestCard } from "../../components/manager/CBITestCard";
import { useDataSource } from "../../contexts/DataSourceContext";
import { useSpace } from "../../contexts/SpaceContext";
import { CBICalculation } from "../../../core/utils/CBICalculation";
import { supabase } from "../../../core/utils/SupabaseClient";
import { GeminiRemoteDatasourceImpl } from "../../../data/datasources/GeminiRemoteDataSource";
import { GeminiRepositoryImpl } from "../../../data/repositories/GeminiRepositoryImpl";
import { GetResponseGeminiUseCase } from "../../../domain/usecases/ai/GetResponseGeminiUseCase";

type Employee = {
  id: string;
  name: string;
  department: string;
  avatar: string;
  mood?: string | null;
};

const moodLabels = ['Stress', 'Sedih', 'Marah', 'Netral', 'Tenang', 'Lelah', 'Bahagia'];

export default function DetailKaryawanScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { employee } = route.params as { employee?: Employee } || {};
  const { currentSpace } = useSpace();

  // Data default jika tidak ada employee dari props
  const defaultEmployee: Employee = {
    id: "",
    name: "Maya Sari",
    department: "Marketing",
    avatar: "https://i.pravatar.cc/150?img=12",
    mood: 'Marah'
  };

  const currentEmployee = employee || defaultEmployee;
  const moodType = employee?.mood || defaultEmployee.mood || 'Netral';

  const dataSource = useDataSource();
  const [cbiSummary, setCbiSummary] = useState<number | null>(null);
  const [cbiLabel, setCbiLabel] = useState<string>("CBI Summary");
  const [employeeEvaluation, setEmployeeEvaluation] = useState<string>("");
  const [evalLoading, setEvalLoading] = useState(false);

  // Initialize Gemini AI
  const geminiDs = useMemo(() => new GeminiRemoteDatasourceImpl(), []);
  const geminiRepo = useMemo(() => new GeminiRepositoryImpl(geminiDs), [geminiDs]);
  const gemini = useMemo(() => new GetResponseGeminiUseCase(geminiRepo), [geminiRepo]);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        if (!currentEmployee.id) { setCbiSummary(null); return; }
        // Prefer finished test; if none, fallback to latest unfinished (pending) test
        const latest = await dataSource.getLatestFinishedCBITestByEmployee(currentEmployee.id);
        let summaryRaw: any = latest?.summary;
        let summary = typeof summaryRaw === 'number' ? summaryRaw : (summaryRaw != null ? Number(summaryRaw) : undefined);
        if (summary === undefined || summary === null) {
          const pending = await dataSource.getCBITestByEmployee(currentEmployee.id);
          const pRaw: any = pending?.summary;
          summary = typeof pRaw === 'number' ? pRaw : (pRaw != null ? Number(pRaw) : undefined);
        }
        if (!active) return;
        if (typeof summary === 'number' && Number.isFinite(summary)) {
          setCbiSummary(summary);
          // Derive label based on summary level
          const level = CBICalculation.getInterpretation({ personalBurnout: 0, workBurnout: 0, clientBurnout: 0, summary }).overallLevel;
          setCbiLabel(level);
        } else {
          setCbiSummary(null);
        }
      } catch (e) {
        setCbiSummary(null);
      }
    }
    load();
    return () => { active = false; };
  }, [currentEmployee.id, dataSource]);

  // Load/Generate employee evaluation dengan Gemini AI
  useEffect(() => {
    let active = true;
    async function loadEval() {
      try {
        // Validasi employee ID lebih ketat
        if (!currentEmployee?.id || currentEmployee.id === "") { 
          console.log('No valid employee ID, skipping evaluation');
          if(active) setEmployeeEvaluation(""); 
          return; 
        }

        console.log('Starting loadEval for employee:', currentEmployee.id);

        // Cek evaluasi yang sudah ada hari ini
        try {
          const existingEval = await dataSource.getLatestEvaluationByEmployeeToday(currentEmployee.id);
          if (existingEval?.evaluation_text) {
            console.log('Found existing evaluation, using it');
            if (active) setEmployeeEvaluation(existingEval.evaluation_text);
            return;
          }
          console.log('No existing evaluation found, will generate new one');
        } catch (evalError) {
          console.log('Error checking existing evaluation:', evalError);
          // Continue to generate new evaluation
        }

        // Jika belum ada, generate dengan Gemini AI
        if (active) setEvalLoading(true);
        
        // Ambil data mood history karyawan (7 hari terakhir)
        let moodHistory = [];
        try {
          moodHistory = await dataSource.getMoodResponsesLast7Days(currentEmployee.id);
          console.log('Mood history loaded:', moodHistory?.length || 0, 'records');
        } catch (moodError) {
          console.log('Error loading mood history:', moodError);
          // Continue with empty mood history
        }
        
        // Ambil data CBI jika ada
        let cbiData = null;
        let cbiScore = null;
        let cbiLevel = null;
        try {
          cbiData = await dataSource.getLatestFinishedCBITestByEmployee(currentEmployee.id);
          cbiScore = cbiData?.summary || null;
          cbiLevel = cbiScore ? CBICalculation.getInterpretation({ 
            personalBurnout: 0, 
            workBurnout: 0, 
            clientBurnout: 0, 
            summary: cbiScore 
          }).overallLevel : null;
          console.log('CBI data loaded:', { cbiScore, cbiLevel });
        } catch (cbiError) {
          console.log('Error loading CBI data:', cbiError);
          // Continue without CBI data
        }

        // Data space/divisi
        const spaceName = currentSpace?.name || 'Divisi';
        const workHours = currentSpace?.work_hours || '';
        const workCulture = (currentSpace as any)?.work_culture || '';
        
        // Siapkan data mood history
        const moodHistoryText = moodHistory && moodHistory.length > 0 
          ? moodHistory.map((m: any) => `${m.created_at?.split('T')[0]}: ${m.mood}`).join(', ')
          : 'Belum ada riwayat mood';

        console.log('Prepared data for AI:', {
          employee: currentEmployee.name,
          mood: moodType,
          historyCount: moodHistory?.length || 0,
          hasCBI: !!cbiLevel
        });

        // Generate prompt untuk manager
        const prompt = `Anda adalah AI Assistant untuk Manager HR. Berikan evaluasi dan rekomendasi aksi untuk karyawan berikut:

INFORMASI KARYAWAN:
- Nama: ${currentEmployee.name}
- Departemen: ${currentEmployee.department}
- Mood hari ini: ${moodType}
- Riwayat mood 7 hari: ${moodHistoryText}
${cbiLevel ? `- Tingkat CBI: ${cbiLevel} (Skor: ${cbiScore})` : '- Belum ada data CBI'}

INFORMASI DIVISI:
- Divisi: ${spaceName}
- Jam kerja: ${workHours}
- Budaya kerja: ${workCulture}

TUGAS:
Sebagai manager, berikan evaluasi singkat (maksimal 4 kalimat) yang berisi:
1. Analisis kondisi karyawan saat ini
2. Rekomendasi aksi konkret yang harus manager lakukan
3. Langkah follow-up yang diperlukan

Fokus pada perspektif manager - apa yang harus DILAKUKAN untuk membantu karyawan ini.`;

        let evaluationText = '';
        try {
          console.log('Calling Gemini AI...');
          const response = await gemini.execute(prompt);
          evaluationText = response?.text?.trim() || '';
          console.log('Gemini response received:', evaluationText ? 'Success' : 'Empty response');
        } catch (error) {
          console.log('Gemini AI error:', error);
          // Will use fallback below
        }

        // Fallback jika Gemini gagal
        if (!evaluationText) {
          evaluationText = `${currentEmployee.name} menunjukkan mood ${moodType} hari ini. Sebagai manager, disarankan untuk: 1) Melakukan check-in personal untuk memahami kondisi karyawan, 2) Memberikan dukungan atau penyesuaian beban kerja jika diperlukan, 3) Follow-up dalam 2-3 hari untuk memantau perkembangan.`;
          console.log('Using fallback evaluation text');
        }

        // Simpan evaluasi ke database
        if (evaluationText && currentEmployee.id) {
          try {
            await dataSource.createEvaluation({
              employee_id: currentEmployee.id,
              evaluation_text: evaluationText
            });
            console.log('Evaluation saved to database');
          } catch (error) {
            console.log('Error saving evaluation:', error);
            // Continue anyway, we still have the text
          }
        }

        if (active) setEmployeeEvaluation(evaluationText);
      } catch (error) {
        console.error('Error in loadEval:', error);
        if (active) {
          const fallbackText = `${currentEmployee.name} memerlukan perhatian manager terkait mood ${moodType}. Lakukan pendekatan personal untuk memberikan dukungan yang tepat.`;
          setEmployeeEvaluation(fallbackText);
        }
      } finally {
        if (active) setEvalLoading(false);
      }
    }
    loadEval();
    return () => { active = false; };
  }, [currentEmployee.id, moodType, currentSpace?.id, dataSource, gemini]); // Simplified dependencies

  // Realtime (Supabase v1): listen for evaluations for this employee
  useEffect(() => {
    if (!currentEmployee.id) return;
    const handler = async () => {
      try {
        const ev = await dataSource.getLatestEvaluationByEmployeeToday(currentEmployee.id);
        setEmployeeEvaluation(ev?.evaluation_text || "");
      } catch {}
    };
    const sub: any = supabase
      .from(`evaluations:employee_id=eq.${currentEmployee.id}`)
      .on('INSERT', handler)
      .on('UPDATE', handler)
      .subscribe();
    return () => { try { supabase.removeSubscription(sub); } catch {} };
  }, [currentEmployee.id, dataSource]);

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-semibold text-[#111827]">
          Detail Karyawan
        </Text>
        <View style={{ width: 24 }} /> {/* spacer biar seimbang */}
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Profil */}
        <View className="flex-row items-center mb-4">
          <Image
            source={{ uri: currentEmployee.avatar }}
            className="w-16 h-16 rounded-full"
          />
          <View className="ml-4">
            <Text className="text-lg font-semibold text-[#111827]" numberOfLines={1} ellipsizeMode="tail">
              {currentEmployee.name}
            </Text>
            <Text className="text-gray-500" numberOfLines={1} ellipsizeMode="tail">{currentEmployee.department}</Text>
          </View>
        </View>

        {/* Status Mood */}
        <StatusMoodCard moodType={moodType as any} />

        {/* AI Daily Insight */}
        <AIDailyInsight
          insightText={
            evalLoading 
              ? "Menganalisis kondisi karyawan dan menyiapkan rekomendasi untuk manager..." 
              : employeeEvaluation || `${currentEmployee.name} menunjukkan mood ${moodType} hari ini. Disarankan untuk melakukan follow-up dan memberikan dukungan yang tepat.`
          }
        />

        {/* Riwayat Mood untuk karyawan ini */}
        <RiwayatMood userId={currentEmployee.id} />

        {/* CBI Test Result (latest finished) */}
        {cbiSummary !== null ? (
          <CBITestCard score={cbiSummary} label={cbiLabel} />
        ) : (
          <View className="p-4 mb-4 bg-white border border-gray-200 rounded-xl">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="ml-2 text-lg font-semibold text-gray-900">CBI Test Result</Text>
              <View style={{ width: 24 }} />
            </View>
            <Text className="text-center text-gray-600">Belum ada hasil CBI untuk karyawan ini.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
