import { createContext, ReactNode, useContext, useState, useEffect, useCallback } from "react";
import { useCBIViewModel } from "../viewModels/cbi/useCBIViewModel";
import { CreateCBITestForSpaceUseCase } from "../../domain/usecases/cbi/CreateCBITestForSpaceUseCase";
import { CBIRepository } from "../../domain/repositories/CBIRepository";
import { useDataSource } from "./DataSourceContext";
import { useAuth } from "./AuthContext";

type CBIContextType = ReturnType<typeof useCBIViewModel> & {
  // Current user's CBI test status
  currentCBITest: any | null;
  hasPendingCBI: boolean;
  cbiLoading: boolean;
  
  // Operations
  refreshCBIStatus: () => Promise<void>;
  getCurrentCBITest: () => any | null;
};

// bikin context
const CBIContext = createContext<CBIContextType | undefined>(undefined);

// provider
type CBIProviderProps = {
  children: ReactNode;
  createCBITestForSpaceUseCase: CreateCBITestForSpaceUseCase;
  cbiRepository: CBIRepository;
};

export function CBIProvider({
  children,
  createCBITestForSpaceUseCase,
  cbiRepository,
}: CBIProviderProps) {
  const dataSource = useDataSource();
  const { user } = useAuth();
  
  const cbi = useCBIViewModel(createCBITestForSpaceUseCase, cbiRepository);
  
  // State untuk current user's CBI test
  const [currentCBITest, setCurrentCBITest] = useState<any | null>(null);
  const [hasPendingCBI, setHasPendingCBI] = useState(false);
  const [cbiLoading, setCbiLoading] = useState(false);

  // Function untuk refresh CBI status
  const refreshCBIStatus = useCallback(async () => {
    if (!user?.id) {
      setCurrentCBITest(null);
      setHasPendingCBI(false);
      return;
    }

    setCbiLoading(true);
    try {
      const test = await dataSource.getCBITestByEmployee(user.id);
      setCurrentCBITest(test);
      setHasPendingCBI(Boolean(test && test.finished === false));
    } catch (error) {
      console.error('Error fetching CBI status:', error);
      setCurrentCBITest(null);
      setHasPendingCBI(false);
    } finally {
      setCbiLoading(false);
    }
  }, [user?.id, dataSource]);

  // Function untuk get current CBI test
  const getCurrentCBITest = useCallback(() => {
    return currentCBITest;
  }, [currentCBITest]);

  // Auto fetch CBI status ketika user berubah
  useEffect(() => {
    refreshCBIStatus();
  }, [refreshCBIStatus]);

  const contextValue: CBIContextType = {
    ...cbi,
    currentCBITest,
    hasPendingCBI,
    cbiLoading,
    refreshCBIStatus,
    getCurrentCBITest,
  };

  return <CBIContext.Provider value={contextValue}>{children}</CBIContext.Provider>;
}

// custom hook untuk konsumsi
export function useCBI() {
  const context = useContext(CBIContext);
  if (!context) {
    throw new Error("useCBI must be used within a CBIProvider");
  }
  return context;
}