// presentation/viewmodels/MoodViewModel.ts
import { useState } from 'react';
import { Mood } from '../../../domain/entities/Mood';
import { getMood } from '../../../domain/usecases/GetMoodUseCase';

export function useMoodViewModel() {
  const [inputText, setInputText] = useState('');
  const [mood, setMood] = useState<Mood | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const predictMood = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getMood(inputText);
      setMood(result);
    } catch {
      setError('Gagal memprediksi mood');
    } finally {
      setLoading(false);
    }
  };

  return {
    inputText,
    setInputText,
    mood,
    loading,
    error,
    predictMood,
  };
}
