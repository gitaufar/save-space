import { useState, useCallback } from "react";
import { AuthRepository } from "../../../domain/repositories/AuthRepository";
import { User } from "../../../domain/entities/User";

export function useAuthViewModel(authRepository: AuthRepository) {
  // State untuk UI
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sign Up
  const signUp = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await authRepository.signUp(email, password);
      setUser(newUser);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [authRepository]);

  // Sign In
  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const loggedInUser = await authRepository.signIn(email, password);
      setUser(loggedInUser);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [authRepository]);

  // Sign Out
  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      await authRepository.signOut();
      setUser(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [authRepository]);

  // Get current user (misalnya cek saat app dibuka)
  const fetchCurrentUser = useCallback(async () => {
    setLoading(true);
    try {
      const current = await authRepository.getCurrentUser();
      setUser(current);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [authRepository]);

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    fetchCurrentUser,
  };
}
