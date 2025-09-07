import { useCallback, useState } from 'react';
import { FetchCurrentUserUseCase } from '../../../domain/usecases/auth/FetchCurrentUserUseCase';
import { LoginUseCase } from '../../../domain/usecases/auth/LoginUseCase';
import { LogoutUseCase } from '../../../domain/usecases/auth/LogoutUseCase';
import { RegisterUseCase } from '../../../domain/usecases/auth/RegisterUseCase';
import { User } from '../../../domain/entities/User';

type AuthUseCases = {
  signUpUseCase: RegisterUseCase;
  signInUseCase: LoginUseCase;
  signOutUseCase: LogoutUseCase;
  fetchCurrentUserUseCase: FetchCurrentUserUseCase;
};

export function useAuthViewModel({
  signUpUseCase,
  signInUseCase,
  signOutUseCase,
  fetchCurrentUserUseCase,
}: AuthUseCases) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        const newUser = await signUpUseCase.execute(email, password);
        setUser(newUser);
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

  return { user, loading, error, signUp, signIn, signOut, fetchCurrentUser };
}
