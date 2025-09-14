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
import { UpdateAvatarUseCase } from "./src/domain/usecases/auth/UpdateAvatarUseCase";
import { UpdateProfileUseCase } from "./src/domain/usecases/auth/UpdateProfileUseCase";
import { ChangePasswordUseCase } from "./src/domain/usecases/auth/ChangePasswordUseCase";

const dataSource = new AuthDataSource();
const authRepository = new AuthRepositoryImpl(dataSource);
const loginUseCase = new LoginUseCase(authRepository);
const registerUseCase = new RegisterUseCase(authRepository);
const fetchCurrentUserUseCase = new FetchCurrentUserUseCase(authRepository);
const logoutUseCase = new LogoutUseCase(authRepository);
const updateAvatarUseCase = new UpdateAvatarUseCase(authRepository);
const updateProfileUseCase = new UpdateProfileUseCase(authRepository);
const changePasswordUseCase = new ChangePasswordUseCase(authRepository);
// export default function App() {
//   return <AppNavigator />;
// };
export default function App() {
  return (
    <AuthProvider
      signUpUseCase={registerUseCase}
      signInUseCase={loginUseCase}
      signOutUseCase={logoutUseCase}
      fetchCurrentUserUseCase={fetchCurrentUserUseCase}
      updateAvatarUseCase={updateAvatarUseCase}
      updateProfileUseCase={updateProfileUseCase}
      changePasswordUseCase={changePasswordUseCase}
    >
      <AppNavigator />
    </AuthProvider>
  );
}
