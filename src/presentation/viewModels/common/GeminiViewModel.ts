import { useState } from "react";
import { GetResponseGeminiUseCase } from "../../../domain/usecases/ai/GetResponseGeminiUseCase";

export function useGeminiViewModel(getResponseGeminiUseCase: GetResponseGeminiUseCase) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = async (prompt: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getResponseGeminiUseCase.execute(prompt);
      setData(result.text);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    data,
    error,
    generate,
  };
}
