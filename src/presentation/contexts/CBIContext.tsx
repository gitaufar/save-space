import { createContext, ReactNode, useContext } from "react";
import { useCBIViewModel } from "../viewModels/cbi/useCBIViewModel";
import { CreateCBITestForSpaceUseCase } from "../../domain/usecases/cbi/CreateCBITestForSpaceUseCase";

type CBIContextType = ReturnType<typeof useCBIViewModel>;

// bikin context
const CBIContext = createContext<CBIContextType | undefined>(undefined);

// provider
type CBIProviderProps = {
  children: ReactNode;
  createCBITestForSpaceUseCase: CreateCBITestForSpaceUseCase;
};

export function CBIProvider({
  children,
  createCBITestForSpaceUseCase,
}: CBIProviderProps) {
  const cbi = useCBIViewModel(createCBITestForSpaceUseCase);

  return <CBIContext.Provider value={cbi}>{children}</CBIContext.Provider>;
}

// custom hook untuk konsumsi
export function useCBI() {
  const context = useContext(CBIContext);
  if (!context) {
    throw new Error("useCBI must be used within a CBIProvider");
  }
  return context;
}