import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useDataSource } from './DataSourceContext';
import { useAuth } from './AuthContext';

// Context untuk mengelola AI Daily Insights
interface AIInsightContextType {
  currentInsight: string | null;
  loading: boolean;
  error: string | null;
  
  // Operations
  refreshInsight: () => Promise<void>;
  getCurrentInsight: () => string | null;
}

const AIInsightContext = createContext<AIInsightContextType | undefined>(undefined);

export const AIInsightProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dataSource = useDataSource();
  const { user } = useAuth();
  
  const [currentInsight, setCurrentInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function untuk fetch latest AI insight untuk user hari ini
  const refreshInsight = useCallback(async () => {
    if (!user?.id) {
      setCurrentInsight(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const latest = await dataSource.getLatestAIInsightByEmployeeToday(user.id);
      setCurrentInsight(latest?.insight_text ?? null);
    } catch (err) {
      console.error('Error fetching AI insight:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch AI insight');
      setCurrentInsight(null);
    } finally {
      setLoading(false);
    }
  }, [user?.id, dataSource]);

  // Function untuk get current insight tanpa fetch
  const getCurrentInsight = useCallback(() => {
    return currentInsight;
  }, [currentInsight]);

  // Auto fetch insight ketika user berubah
  useEffect(() => {
    refreshInsight();
  }, [refreshInsight]);

  return (
    <AIInsightContext.Provider
      value={{
        currentInsight,
        loading,
        error,
        refreshInsight,
        getCurrentInsight,
      }}
    >
      {children}
    </AIInsightContext.Provider>
  );
};

export const useAIInsight = () => {
  const context = useContext(AIInsightContext);
  if (!context) {
    throw new Error('useAIInsight must be used within an AIInsightProvider');
  }
  return context;
};