import React, { useState } from "react";
import { View, Text } from "react-native";
import { Question } from "./question";
import { Tips } from "../common/tips";
import { Button } from "../common/Button";
import { useNavigation } from "@react-navigation/native";

export const CBITestLayout = () => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const navigation = useNavigation();

    const options = [
      { id: 1, text: 'Selalu', value: 0 },
      { id: 2, text: 'Sering', value: 1 },
      { id: 3, text: 'Kadang - kadang', value: 2 },
      { id: 4, text: 'Jarang', value: 3 },
      { id: 5, text: 'Tidak Pernah / Hampir Tidak Pernah', value: 4 }
    ];
    
    const handleAnswerSelect = (answerId: number) => {
      setSelectedAnswer(answerId);
      console.log('Selected:', answerId);
    };
    
    return (
        <View className="flex-1 px-5 pt-6">
            <Tips />            
            <Question 
              number={1}
              question="Apakah Anda memiliki cukup energi untuk keluarga dan teman saat waktu luang?"
              options={options}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={handleAnswerSelect}
            />
            <Button
                text="Selesai"
                onPress={() => navigation.navigate('SpaceMain' as never)}
                margin="mt-8"
                rounded="rounded-xl"
            />
            
        </View>
    );
}