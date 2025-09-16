import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useDataSource } from './DataSourceContext';
import { useAuth } from './AuthContext';

// Type untuk mood data dari database
export interface MoodResponseData {
  id: string;
  employee_id: string;
  mood: string;
  response_text?: string;
  created_at: string;
}

// Type untuk mood data yang sudah diformat untuk chart
export interface MoodChartData {
  value: number; // 1-7 (stress, sedih, marah, netral, tenang, lelah, senang)
  date: string;
  moodName: string;
  response_text?: string;
}

// Context untuk mengelola mood history
interface MoodHistoryContextType {
  moodHistory: MoodChartData[];
  loading: boolean;
  error: string | null;
  
  // Operations
  refreshMoodHistory: (userId?: string) => Promise<void>;
  getMoodHistoryForUser: (userId: string) => Promise<MoodChartData[]>;
}

const MoodHistoryContext = createContext<MoodHistoryContextType | undefined>(undefined);

export const MoodHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dataSource = useDataSource();
  const { user } = useAuth();
  
  const [moodHistory, setMoodHistory] = useState<MoodChartData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mapping mood string ke nilai numerik untuk chart
  const moodToValue = (mood: string): number => {
    const moodMap: Record<string, number> = {
      'stress': 1,
      'sedih': 2, 
      'marah': 3,
      'netral': 4,
      'tenang': 5,
      'lelah': 6,
      'senang': 7
    };
    return moodMap[mood.toLowerCase()] || 4; // default netral
  };

  // Convert mood response data ke chart data
  const convertToChartData = (responses: MoodResponseData[]): MoodChartData[] => {
    return responses.map(response => ({
      value: moodToValue(response.mood),
      date: new Date(response.created_at).toISOString().split('T')[0], // YYYY-MM-DD
      moodName: response.mood,
      response_text: response.response_text
    }));
  };

  // Function untuk fetch mood history (7 hari terakhir)
  const refreshMoodHistory = useCallback(async (userId?: string) => {
    const targetUserId = userId || user?.id;
    if (!targetUserId) {
      setMoodHistory([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const responses = await dataSource.getMoodResponsesLast7Days(targetUserId);
      const chartData = convertToChartData(responses || []);
      setMoodHistory(chartData);
    } catch (err) {
      console.error('Error fetching mood history:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch mood history');
      setMoodHistory([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id, dataSource]);

  // Function untuk get mood history untuk user tertentu (untuk manager screen)
  const getMoodHistoryForUser = useCallback(async (userId: string): Promise<MoodChartData[]> => {
    try {
      const responses = await dataSource.getMoodResponsesLast7Days(userId);
      return convertToChartData(responses || []);
    } catch (err) {
      console.error('Error fetching mood history for user:', err);
      return [];
    }
  }, [dataSource]);

  // Auto fetch mood history ketika user berubah (untuk current user)
  useEffect(() => {
    if (user?.id) {
      refreshMoodHistory();
    }
  }, [user?.id, refreshMoodHistory]);

  return (
    <MoodHistoryContext.Provider
      value={{
        moodHistory,
        loading,
        error,
        refreshMoodHistory,
        getMoodHistoryForUser,
      }}
    >
      {children}
    </MoodHistoryContext.Provider>
  );
};

export const useMoodHistory = () => {
  const context = useContext(MoodHistoryContext);
  if (!context) {
    throw new Error('useMoodHistory must be used within a MoodHistoryProvider');
  }
  return context;
};