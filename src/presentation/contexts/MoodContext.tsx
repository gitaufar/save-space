import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useDataSource } from './DataSourceContext';
import { useAuth } from './AuthContext';
import { useSpace } from './SpaceContext';
import { supabase } from '../../core/utils/SupabaseClient';

// Context untuk mengelola mood responses
interface MoodContextType {
  todayMoodResponse: any | null;
  hasMoodToday: boolean;
  hasMorningMood: boolean;
  hasEveningMood: boolean;
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
  const { currentSpace } = useSpace();
  
  const [todayMoodResponse, setTodayMoodResponse] = useState<any | null>(null);
  const [hasMoodToday, setHasMoodToday] = useState(false);
  const [hasMorningMood, setHasMorningMood] = useState(false);
  const [hasEveningMood, setHasEveningMood] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function untuk fetch mood response hari ini
  const refreshMoodStatus = useCallback(async () => {
    if (!user?.id) {
      setTodayMoodResponse(null);
      setHasMoodToday(false);
      setHasMorningMood(false);
      setHasEveningMood(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0];
      const responses = await dataSource.getMoodResponsesByDate(user.id, dateStr);

      setTodayMoodResponse(responses?.[responses.length - 1] || null);
      setHasMoodToday((responses || []).length > 0);

      // derive morning/evening by work hours
      const parseStartEnd = (wh?: string) => {
        try {
          const text = String(wh || '').trim();
          const m = text.match(/(\d{1,2})(?:(?::|\.)\s*(\d{2}))?/);
          const n = text.match(/-(\s*)?(\d{1,2})(?:(?::|\.)\s*(\d{2}))?/);
          const sH = m ? Math.min(23, Math.max(0, parseInt(m[1], 10))) : 9;
          const sM = m && m[2] ? Math.min(59, Math.max(0, parseInt(m[2], 10))) : 0;
          const eH = n ? Math.min(23, Math.max(0, parseInt(n[2], 10))) : (sH + 8 > 23 ? 17 : sH + 8);
          const eM = n && n[3] ? Math.min(59, Math.max(0, parseInt(n[3], 10))) : 0;
          return { start: sH * 60 + sM, end: eH * 60 + eM };
        } catch { return { start: 9 * 60, end: 17 * 60 }; }
      };
      const { start, end } = parseStartEnd(currentSpace?.work_hours);
      let morning = false, evening = false;
      (responses || []).forEach((r: any) => {
        const t = new Date(r.created_at);
        const minutes = t.getHours() * 60 + t.getMinutes();
        if (minutes >= start && minutes < end) morning = true;
        if (minutes >= end) evening = true;
      });
      setHasMorningMood(morning);
      setHasEveningMood(evening);
    } catch (err) {
      console.error('Error fetching mood status:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch mood status');
      setTodayMoodResponse(null);
      setHasMoodToday(false);
      setHasMorningMood(false);
      setHasEveningMood(false);
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

  // Realtime (Supabase v1): subscribe to mood_responses for current user
  useEffect(() => {
    if (!user?.id) return;
    const handler = () => refreshMoodStatus();
    const subscription: any = supabase
      .from(`mood_responses:employee_id=eq.${user.id}`)
      .on('INSERT', handler)
      .on('UPDATE', handler)
      .on('DELETE', handler)
      .subscribe();

    return () => {
      try { supabase.removeSubscription(subscription); } catch {}
    };
  }, [user?.id, refreshMoodStatus]);

  return (
    <MoodContext.Provider
      value={{
        todayMoodResponse,
        hasMoodToday,
        hasMorningMood,
        hasEveningMood,
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
