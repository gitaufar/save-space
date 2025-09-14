import { useCallback, useState } from 'react';
import { FetchCurrentUserUseCase } from '../../../domain/usecases/auth/FetchCurrentUserUseCase';
import { LoginUseCase } from '../../../domain/usecases/auth/LoginUseCase';
import { LogoutUseCase } from '../../../domain/usecases/auth/LogoutUseCase';
import { RegisterUseCase } from '../../../domain/usecases/auth/RegisterUseCase';
import { User } from '../../../domain/entities/User';
import { UpdateAvatarUseCase } from '../../../domain/usecases/auth/UpdateAvatarUseCase';

type AuthUseCases = {
  signUpUseCase: RegisterUseCase;
  signInUseCase: LoginUseCase;
  signOutUseCase: LogoutUseCase;
  fetchCurrentUserUseCase: FetchCurrentUserUseCase;
  updateAvatarUseCase: UpdateAvatarUseCase;
};

export function useAuthViewModel({
  signUpUseCase,
  signInUseCase,
  signOutUseCase,
  fetchCurrentUserUseCase,
  updateAvatarUseCase,
}: AuthUseCases) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      name: string,
      role: 'Manager' | 'Karyawan',
      space_id?: string
    ) => {
      setLoading(true);
      setError(null);
      try {
        await signUpUseCase.execute(email, password, name, role, space_id);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [signUpUseCase],
  );

  const signIn = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        const loggedInUser = await signInUseCase.execute(email, password);
        setUser(loggedInUser);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [signInUseCase],
  );

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      await signOutUseCase.execute();
      setUser(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [signOutUseCase]);

  const fetchCurrentUser = useCallback(async () => {
    setLoading(true);
    try {
      const current = await fetchCurrentUserUseCase.execute();
      setUser(current);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchCurrentUserUseCase]);

  const updateAvatar = useCallback(async (fileUri: string) => {
    setLoading(true);
    try {
      const url = await updateAvatarUseCase.execute(fileUri);
      setUser(prev => prev ? { ...prev, avatar_url: url } : prev);
      return url;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [updateAvatarUseCase]);

  return { user, loading, error, signUp, signIn, signOut, fetchCurrentUser, updateAvatar };
}
