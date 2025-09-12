import React, { createContext, useContext } from 'react';
import { Space } from '../../domain/entities/Space';
import { User } from '../../domain/entities/User';
import { SpaceRepositoryImpl } from '../../data/repositories/SpaceRepositoryImpl';
import { CreateSpaceUseCase } from '../../domain/usecases/space/CreateSpaceUseCase';
import { JoinSpaceByCodeUseCase } from '../../domain/usecases/space/JoinSpaceByCodeUseCase';
import { useSpaceViewModel } from '../viewModels/space/useSpaceViewModel';

// Buat type context
interface SpaceContextProps {
  spaces: Space[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  createSpace: (data: {
    name: string;
    division?: string;
    job_desc?: string;
    work_hours?: string;
    work_culture?: string;
    invitation_code: string;
  }) => Promise<Space>;
  joinSpace: (userId: string, code: string) => Promise<User>;
}

// Default value biar tidak undefined
const SpaceContext = createContext<SpaceContextProps | undefined>(undefined);

// Provider
export const SpaceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const spaceRepository = new SpaceRepositoryImpl();
  const createSpaceUseCase = new CreateSpaceUseCase(spaceRepository);
  const joinSpaceByCodeUseCase = new JoinSpaceByCodeUseCase(spaceRepository);

  const { spaces, currentUser, loading, error, createSpace, joinSpace } =
    useSpaceViewModel(createSpaceUseCase, joinSpaceByCodeUseCase);

  return (
    <SpaceContext.Provider
      value={{ spaces, currentUser, loading, error, createSpace, joinSpace }}
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
