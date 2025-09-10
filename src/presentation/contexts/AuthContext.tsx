import { createContext, ReactNode, useContext } from "react";
import { useAuthViewModel } from "../viewModels/auth/AuthViewModel";
import { RegisterUseCase } from "../../domain/usecases/auth/RegisterUseCase";
import { LoginUseCase } from "../../domain/usecases/auth/LoginUseCase";
import { LogoutUseCase } from "../../domain/usecases/auth/LogoutUseCase";
import { FetchCurrentUserUseCase } from "../../domain/usecases/auth/FetchCurrentUserUseCase";

type AuthContextType = ReturnType<typeof useAuthViewModel>;

// bikin context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// provider
type AuthProviderProps = {
  children: ReactNode;
  signUpUseCase: RegisterUseCase;
  signInUseCase: LoginUseCase;
  signOutUseCase: LogoutUseCase;
  fetchCurrentUserUseCase: FetchCurrentUserUseCase;
};

export function AuthProvider({
  children,
  signUpUseCase,
  signInUseCase,
  signOutUseCase,
  fetchCurrentUserUseCase,
}: AuthProviderProps) {
  const auth = useAuthViewModel({
    signUpUseCase,
    signInUseCase,
    signOutUseCase,
    fetchCurrentUserUseCase,
  });

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// custom hook untuk konsumsi
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
