import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Space } from '../../domain/entities/Space';
import { User } from '../../domain/entities/User';
import { SpaceRepositoryImpl } from '../../data/repositories/SpaceRepositoryImpl';
import { CreateSpaceUseCase } from '../../domain/usecases/space/CreateSpaceUseCase';
import { JoinSpaceByCodeUseCase } from '../../domain/usecases/space/JoinSpaceByCodeUseCase';
import { useSpaceViewModel } from '../viewModels/space/useSpaceViewModel';
import { useDataSource } from './DataSourceContext';
import { useAuth } from './AuthContext';

// Extended type untuk context yang lebih lengkap
interface SpaceContextProps {
  spaces: Space[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  
  // Current space data
  currentSpace: Space | null;
  spaceLoading: boolean;
  
  // Space operations
  createSpace: (data: {
    name: string;
    division?: string;
    job_desc?: string;
    work_hours?: string;
    work_culture?: string;
  }) => Promise<Space>;
  joinSpace: (userId: string, code: string) => Promise<User>;
  
  // Current space operations
  refreshCurrentSpace: () => Promise<void>;
  getCurrentSpace: () => Space | null;
}

// Default value biar tidak undefined
const SpaceContext = createContext<SpaceContextProps | undefined>(undefined);

// Provider
export const SpaceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dataSource = useDataSource();
  const { user } = useAuth();
  
  const spaceRepository = new SpaceRepositoryImpl();
  const createSpaceUseCase = new CreateSpaceUseCase(spaceRepository);
  const joinSpaceByCodeUseCase = new JoinSpaceByCodeUseCase(spaceRepository);

  const { spaces, currentUser, loading, error, createSpace, joinSpace } =
    useSpaceViewModel(createSpaceUseCase, joinSpaceByCodeUseCase);

  // State untuk current space
  const [currentSpace, setCurrentSpace] = useState<Space | null>(null);
  const [spaceLoading, setSpaceLoading] = useState(false);

  // Function untuk fetch current space
  const refreshCurrentSpace = useCallback(async () => {
    if (!user?.space_id) {
      setCurrentSpace(null);
      return;
    }
    
    setSpaceLoading(true);
    try {
      const space = await dataSource.getSpaceById(user.space_id);
      setCurrentSpace(space);
    } catch (error) {
      setCurrentSpace(null);
    } finally {
      setSpaceLoading(false);
    }
  }, [user?.space_id, dataSource]);

  // Function untuk get current space tanpa fetch
  const getCurrentSpace = useCallback(() => {
    return currentSpace;
  }, [currentSpace]);

  // Auto fetch current space ketika user space_id berubah
  useEffect(() => {
    refreshCurrentSpace();
  }, [refreshCurrentSpace]);

  return (
    <SpaceContext.Provider
      value={{ 
        spaces, 
        currentUser, 
        loading, 
        error, 
        createSpace, 
        joinSpace,
        currentSpace,
        spaceLoading,
        refreshCurrentSpace,
        getCurrentSpace
      }}
    >
      {children}
    </SpaceContext.Provider>
  );
};

// Hook biar gampang dipakai di komponen
export function useSpace() {
  const context = useContext(SpaceContext);
  if (!context) {
    throw new Error('useSpace must be used within a SpaceProvider');
  }
  return context;
}
