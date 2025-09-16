import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useDataSource } from './DataSourceContext';
import { useAuth } from './AuthContext';

// Context untuk mengelola mood responses
interface MoodContextType {
  todayMoodResponse: any | null;
  hasMoodToday: boolean;
  loading: boolean;
  error: string | null;
  
  // Operations
  refreshMoodStatus: () => Promise<void>;
  getTodayMoodResponse: () => any | null;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dataSource = useDataSource();
  const { user } = useAuth();
  
  const [todayMoodResponse, setTodayMoodResponse] = useState<any | null>(null);
  const [hasMoodToday, setHasMoodToday] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function untuk fetch mood response hari ini
  const refreshMoodStatus = useCallback(async () => {
    if (!user?.id) {
      setTodayMoodResponse(null);
      setHasMoodToday(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Get today's mood response for user
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      const moodResponse = await dataSource.getMoodResponseByUserToday(user.id, today);
      
      setTodayMoodResponse(moodResponse);
      setHasMoodToday(Boolean(moodResponse));
    } catch (err) {
      console.error('Error fetching mood status:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch mood status');
      setTodayMoodResponse(null);
      setHasMoodToday(false);
    } finally {
      setLoading(false);
    }
  }, [user?.id, dataSource]);

  // Function untuk get today mood response tanpa fetch
  const getTodayMoodResponse = useCallback(() => {
    return todayMoodResponse;
  }, [todayMoodResponse]);

  // Auto fetch mood status ketika user berubah
  useEffect(() => {
    refreshMoodStatus();
  }, [refreshMoodStatus]);

  return (
    <MoodContext.Provider
      value={{
        todayMoodResponse,
        hasMoodToday,
        loading,
        error,
        refreshMoodStatus,
        getTodayMoodResponse,
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};