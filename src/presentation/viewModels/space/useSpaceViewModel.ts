// viewmodels/UseSpaceViewModel.ts
import { useState } from 'react';
import { CreateSpaceUseCase } from '../../../domain/usecases/space/CreateSpaceUseCase';
import { JoinSpaceByCodeUseCase } from '../../../domain/usecases/space/JoinSpaceByCodeUseCase';
import { Space } from '../../../domain/entities/Space';
import { User } from '../../../domain/entities/User';

export function useSpaceViewModel(
  createSpaceUseCase: CreateSpaceUseCase,
  joinSpaceByCodeUseCase: JoinSpaceByCodeUseCase,
) {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createSpace(data: {
    name: string;
    division?: string;
    job_desc?: string;
    work_hours?: string;
    work_culture?: string;
    invitation_code: string;
  }) {
    try {
      setLoading(true);
      setError(null);
      const newSpace = await createSpaceUseCase.execute(data);
      setSpaces(prev => [...prev, newSpace]);
      return newSpace;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function joinSpace(userId: string, code: string) {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await joinSpaceByCodeUseCase.execute(userId, code);
      setCurrentUser(updatedUser);
      return updatedUser;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    spaces,
    currentUser,
    loading,
    error,
    createSpace,
    joinSpace,
  };
}
