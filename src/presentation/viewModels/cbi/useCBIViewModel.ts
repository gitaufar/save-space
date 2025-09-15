// viewmodels/useCBIViewModel.ts
import { useState } from 'react';
import { CreateCBITestForSpaceUseCase } from '../../../domain/usecases/cbi/CreateCBITestForSpaceUseCase';
import { CBITest } from '../../../domain/repositories/CBIRepository';

export function useCBIViewModel(
  createCBITestForSpaceUseCase: CreateCBITestForSpaceUseCase,
) {
  const [cbiTests, setCBITests] = useState<CBITest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function createCBITestForSpace(spaceId: string) {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      const newTests = await createCBITestForSpaceUseCase.execute({ spaceId });
      setCBITests(prev => [...prev, ...newTests]);
      setSuccess(`CBI Test berhasil dibuat untuk ${newTests.length} karyawan`);
      
      return newTests;
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat membuat CBI Test');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function clearMessages() {
    setError(null);
    setSuccess(null);
  }

  return {
    cbiTests,
    loading,
    error,
    success,
    createCBITestForSpace,
    clearMessages,
  };
}