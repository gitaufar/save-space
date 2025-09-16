// presentation/viewmodels/MoodViewModel.ts
import { useState } from 'react';
import { Mood } from '../../../domain/entities/Mood';
import { getMood } from '../../../domain/usecases/ai/GetMoodUseCase';

export function useMoodViewModel() {
  const [inputText, setInputText] = useState('');
  const [mood, setMood] = useState<Mood | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const predictMood = async (textOverride?: string): Promise<Mood> => {
    setLoading(true);
    setError('');
    try {
      const input = typeof textOverride === 'string' && textOverride.length > 0 ? textOverride : inputText;
      const result = await getMood(input);
      setMood(result);
      return result;
    } catch (err: any) {
      const msg = err?.message || 'Gagal memprediksi mood';
      setError(msg);
      throw err;
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
