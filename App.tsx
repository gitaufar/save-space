import React from "react";
import "./global.css";
import { AuthProvider } from "./src/presentation/contexts/AuthContext";
import AppNavigator from "./src/presentation/navigation/AppNavigator";
import { AuthDataSource } from "./src/data/datasources/AuthDataSource";
import { AuthRepositoryImpl } from "./src/data/repositories/AuthRepositoryImpl";
import { LoginUseCase } from "./src/domain/usecases/auth/LoginUseCase";
import { RegisterUseCase } from "./src/domain/usecases/auth/RegisterUseCase";
import { FetchCurrentUserUseCase } from "./src/domain/usecases/auth/FetchCurrentUserUseCase";
import { LogoutUseCase } from "./src/domain/usecases/auth/LogoutUseCase";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import KaryawanNavigator from './src/presentation/navigation/KaryawanNavigator';
import DashboardHRD from "./src/presentation/screens/manager/DashboardManager";

const dataSource = new AuthDataSource();
const authRepository = new AuthRepositoryImpl(dataSource);
const loginUseCase = new LoginUseCase(authRepository);
const registerUseCase = new RegisterUseCase(authRepository);
const fetchCurrentUserUseCase = new FetchCurrentUserUseCase(authRepository);
const logoutUseCase = new LogoutUseCase(authRepository);
export default function App() {
  return (
    <AuthProvider
      signUpUseCase={registerUseCase}
      signInUseCase={loginUseCase}
      signOutUseCase={logoutUseCase}
      fetchCurrentUserUseCase={fetchCurrentUserUseCase}
    >
      <AppNavigator />
    </AuthProvider>
  );
}
