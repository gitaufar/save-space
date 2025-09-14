import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Question } from "./question";
import { Tips } from "../common/tips";
import { Button } from "../common/Button";
import { useNavigation } from "@react-navigation/native";
import { 
  CBI_QUESTION_PERSONAL, 
  CBI_QUESTION_WORK, 
  CBI_QUESTION_CLIENT 
} from "../../../core/constants/const";

export const CBITestLayout = () => {
    const navigation = useNavigation();
    // Gabungkan semua pertanyaan menjadi satu array
    const allQuestions = [...CBI_QUESTION_PERSONAL, ...CBI_QUESTION_WORK, ...CBI_QUESTION_CLIENT];
    
    // Buat state untuk menyimpan jawaban untuk setiap pertanyaan
    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    
    const options = [
      { id: 1, text: 'Selalu', value: 0 },
      { id: 2, text: 'Sering', value: 1 },
      { id: 3, text: 'Kadang - kadang', value: 2 },
      { id: 4, text: 'Jarang', value: 3 },
      { id: 5, text: 'Tidak Pernah / Hampir Tidak Pernah', value: 4 }
    ];
    
    // Handler untuk memperbarui jawaban untuk pertanyaan tertentu
    const handleAnswerSelect = (questionIndex: number, answerId: number) => {
      setAnswers(prev => ({
        ...prev,
        [questionIndex]: answerId
      }));
      console.log(`Question ${questionIndex + 1}, Selected: ${answerId}`);
    };
    
    // Handler untuk tombol Selesai
    const handleSubmit = () => {
      console.log("All answers:", answers);
      navigation.navigate('SpaceMain' as never);
    };
    

    
    return (
        <View className="flex-1 px-5 pt-6">
            <Tips />
            
            {allQuestions.map((question, index) => (
              <React.Fragment key={index}>
                <Question 
                  number={index + 1}
                  question={question}
                  options={options}
                  selectedAnswer={answers[index]}
                  onAnswerSelect={(answerId) => handleAnswerSelect(index, answerId)}
                />
              </React.Fragment>
            ))}
            
            <Button
                text="Selesai"
                onPress={handleSubmit}
                margin="mt-8 mb-8"
                rounded="rounded-xl"
            />
            
        </View>
    );
}