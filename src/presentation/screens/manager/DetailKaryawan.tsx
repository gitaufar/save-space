import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native"; // kalau sudah pakai lucide
import { StatusMoodCard } from "../../components/mood/StatusMoodCard";
import { AIDailyInsight } from "../../components/karyawan/Beranda/AIDailyInsight";
import { RiwayatMood } from "../../components/karyawan/Beranda/RiwayatMood";
import { CBITestCard } from "../../components/manager/CBITestCard";
import { useDataSource } from "../../contexts/DataSourceContext";
import { CBICalculation } from "../../../core/utils/CBICalculation";
import { supabase } from "../../../core/utils/SupabaseClient";

type Employee = {
  id: string;
  name: string;
  department: string;
  avatar: string;
  mood?: string | null;
};

const moodLabels = ['Stress', 'Sedih', 'Marah', 'Netral', 'Tenang', 'Lelah', 'Senang'];

export default function DetailKaryawanScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { employee } = route.params as { employee?: Employee } || {};

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

  // Load latest employee evaluation (today)
  useEffect(() => {
    let active = true;
    async function loadEval() {
      try {
        if (!currentEmployee.id) { if(active) setEmployeeEvaluation(""); return; }
        const ev = await dataSource.getLatestEvaluationByEmployeeToday(currentEmployee.id);
        if (active) setEmployeeEvaluation(ev?.evaluation_text || "");
      } catch {
        if (active) setEmployeeEvaluation("");
      }
    }
    loadEval();
    return () => { active = false; };
  }, [currentEmployee.id, dataSource]);

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
          insightText={employeeEvaluation || `${currentEmployee.name} menunjukkan mood ${moodType} hari ini. Disarankan untuk melakukan follow-up dan memberikan dukungan yang tepat.`}
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
