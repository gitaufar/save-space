import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useDataSource } from './DataSourceContext';
import { useAuth } from './AuthContext';
import { supabase } from '../../core/utils/SupabaseClient';

// Type untuk employee dengan mood data
export interface EmployeeWithMood {
  id: string;
  name: string;
  email: string;
  department: string;
  avatar: string;
  mood?: any | null;
  avatar_url?: string;
}

// Context untuk mengelola data karyawan
interface EmployeeContextType {
  employees: EmployeeWithMood[];
  loading: boolean;
  error: string | null;
  
  // Operations
  refreshEmployees: () => Promise<void>;
  getEmployeeById: (id: string) => EmployeeWithMood | undefined;
  getEmployeesWithMoods: () => EmployeeWithMood[];
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dataSource = useDataSource();
  const { user } = useAuth();
  
  const [employees, setEmployees] = useState<EmployeeWithMood[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function untuk fetch employees dengan mood data
  const refreshEmployees = useCallback(async () => {
    if (!user?.space_id) {
      setEmployees([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Ambil semua karyawan di space ini
      const karys = await dataSource.getKaryawansBySpace(user.space_id);
      const ids = (karys || []).map((k: any) => k.id);
      
      // Ambil mood terbaru HARI INI untuk setiap karyawan
      const latestMap = await dataSource.getTodaysMoodsForEmployees(ids);
      
      // Mapping data dengan mood
      const mapped: EmployeeWithMood[] = (karys || []).map((k: any) => ({
        id: k.id,
        name: k.name || k.email || 'Karyawan',
        email: k.email || '',
        department: k.department || '-',
        avatar: k.avatar_url || 'https://i.pravatar.cc/150?img=1',
        avatar_url: k.avatar_url,
        mood: (latestMap as any)?.[k.id]?.mood || null,
      }));
      
      setEmployees(mapped);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch employees');
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  }, [user?.space_id, dataSource]);

  // Function untuk get employee by ID
  const getEmployeeById = useCallback((id: string) => {
    return employees.find(emp => emp.id === id);
  }, [employees]);

  // Function untuk get employees dengan mood data
  const getEmployeesWithMoods = useCallback(() => {
    return employees.filter(emp => emp.mood !== null);
  }, [employees]);

  // Auto fetch employees ketika user space_id berubah
  useEffect(() => {
    refreshEmployees();
  }, [refreshEmployees]);

  // Realtime (Supabase v1): subscribe to mood_responses changes to refresh employee moods
  useEffect(() => {
    if (!user?.space_id) return;
    const handler = () => refreshEmployees();
    const subscription: any = supabase
      .from('mood_responses')
      .on('INSERT', handler)
      .on('UPDATE', handler)
      .on('DELETE', handler)
      .subscribe();

    return () => {
      try { supabase.removeSubscription(subscription); } catch {}
    };
  }, [user?.space_id, refreshEmployees]);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        error,
        refreshEmployees,
        getEmployeeById,
        getEmployeesWithMoods,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};
