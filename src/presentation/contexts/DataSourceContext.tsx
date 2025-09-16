import React, { createContext, useContext, useMemo } from 'react';
import { SupabaseDataSource } from '../../data/datasources/SupabaseDataSource';

// Context untuk menyediakan instance DataSource tunggal
interface DataSourceContextType {
  dataSource: SupabaseDataSource;
}

const DataSourceContext = createContext<DataSourceContextType | undefined>(undefined);

export const DataSourceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Buat instance tunggal dan cache dengan useMemo
  const dataSource = useMemo(() => new SupabaseDataSource(), []);

  return (
    <DataSourceContext.Provider value={{ dataSource }}>
      {children}
    </DataSourceContext.Provider>
  );
};

export const useDataSource = () => {
  const context = useContext(DataSourceContext);
  if (!context) {
    throw new Error('useDataSource must be used within a DataSourceProvider');
  }
  return context.dataSource;
};