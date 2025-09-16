import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { Question } from "./question";
import { Tips } from "../common/tips";
import { Button } from "../common/Button";
import { useNavigation } from "@react-navigation/native";
import { 
  CBI_QUESTION_PERSONAL, 
  CBI_QUESTION_WORK, 
  CBI_QUESTION_CLIENT,
  CBI_OPTIONS_FIRST_SET,
  CBI_OPTIONS_SECOND_SET,
  CBI_QUESTION_CONFIG
} from "../../../core/constants/const";
import { CBICalculation } from "../../../core/utils/CBICalculation";
import { useCBI } from "../../contexts/CBIContext";
import { useAuth } from "../../contexts/AuthContext";

export const CBITestLayout = () => {
    const navigation = useNavigation();
    const { markCBITestAsFinished, loading, cbiRepository } = useCBI();
    const { user } = useAuth();
    
    // Gabungkan semua pertanyaan menjadi satu array
    const allQuestions = [...CBI_QUESTION_PERSONAL, ...CBI_QUESTION_WORK, ...CBI_QUESTION_CLIENT];
    
    // Buat state untuk menyimpan jawaban untuk setiap pertanyaan
    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    
    // Fungsi untuk mendapatkan options yang tepat berdasarkan index pertanyaan
    const getOptionsForQuestion = (questionIndex: number) => {
        const config = CBI_QUESTION_CONFIG[questionIndex];
        return config?.optionSet === 'second' ? CBI_OPTIONS_SECOND_SET : CBI_OPTIONS_FIRST_SET;
    };
    
    // Handler untuk memperbarui jawaban untuk pertanyaan tertentu
    const handleAnswerSelect = (questionIndex: number, answerId: number) => {
      setAnswers(prev => ({
        ...prev,
        [questionIndex]: answerId
      }));
      console.log(`Question ${questionIndex + 1}, Selected: ${answerId}`);
    };
    
    // Handler untuk tombol Selesai
    const handleSubmit = async () => {
      try {
        // Validasi jawaban
        const validation = CBICalculation.validateAnswers(answers);
        
        if (!validation.isValid) {
          Alert.alert(
            "Pertanyaan Belum Dijawab", 
            `Mohon jawab pertanyaan nomor: ${validation.missingQuestions.map(q => q + 1).join(', ')}`
          );
          return;
        }

        // Hitung skor CBI
        const scores = CBICalculation.calculateScores(answers);
        console.log("CBI Scores:", scores);

        // Dapatkan interpretasi
        const interpretation = CBICalculation.getInterpretation(scores);
        console.log("CBI Interpretation:", interpretation);

        // Get current user's CBI test first
        if (user?.id) {
          try {
            // First get the CBI test for this employee
            const currentTest = await cbiRepository?.getCBITestByEmployeeId(user.id);
            
            if (!currentTest) {
              Alert.alert(
                "CBI Test Tidak Ditemukan", 
                "CBI Test tidak ditemukan untuk user ini. Silakan hubungi manager untuk membuat test baru."
              );
              return;
            }

            console.log("Current CBI Test:", currentTest);

            // Mark the test as finished with the calculated scores
            await markCBITestAsFinished(
              currentTest.id!,
              scores.personalBurnout,
              scores.workBurnout,
              scores.clientBurnout
            );

            Alert.alert(
              "CBI Test Selesai", 
              `Hasil Anda:\n\nBurnout Personal: ${scores.personalBurnout} (${interpretation.personalLevel})\nBurnout Kerja: ${scores.workBurnout} (${interpretation.workLevel})\nBurnout Klien: ${scores.clientBurnout} (${interpretation.clientLevel})\n\nSkor Keseluruhan: ${scores.summary} (${interpretation.overallLevel})`,
              [
                {
                  text: "OK",
                  onPress: () => navigation.goBack()
                }
              ]
            );
          } catch (testError) {
            console.error("Error processing CBI test:", testError);
            Alert.alert(
              "Error", 
              "Terjadi kesalahan saat memproses hasil tes. Pastikan Anda memiliki CBI test yang aktif."
            );
          }
        } else {
          Alert.alert("Error", "User tidak ditemukan. Silakan login ulang.");
        }
      } catch (error) {
        console.error("Error submitting CBI test:", error);
        Alert.alert("Error", "Terjadi kesalahan saat menyimpan hasil tes. Silakan coba lagi.");
      }
    };
    

    
    return (
        <View className="flex-1 px-5 pt-6">
            <Tips />
            
            {allQuestions.map((question, index) => (
              <React.Fragment key={index}>
                <Question 
                  number={index + 1}
                  question={question}
                  options={getOptionsForQuestion(index)}
                  selectedAnswer={answers[index]}
                  onAnswerSelect={(answerId) => handleAnswerSelect(index, answerId)}
                />
              </React.Fragment>
            ))}
            
            <Button
                text={loading ? "Menyimpan..." : "Selesai"}
                onPress={handleSubmit}
                margin="mt-8 mb-8"
                rounded="rounded-xl"
                disabled={loading}
            />
            
        </View>
    );
}