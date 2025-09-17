import React from 'react';
import './global.css';
import { AuthProvider } from './src/presentation/contexts/AuthContext';
import { DataSourceProvider } from './src/presentation/contexts/DataSourceContext';
import { SpaceProvider } from './src/presentation/contexts/SpaceContext';
import { EmployeeProvider } from './src/presentation/contexts/EmployeeContext';
import { AIInsightProvider } from './src/presentation/contexts/AIInsightContext';
import { MoodProvider } from './src/presentation/contexts/MoodContext';
import { MoodHistoryProvider } from './src/presentation/contexts/MoodHistoryContext';
import AppNavigator from './src/presentation/navigation/AppNavigator';
import { AuthDataSource } from './src/data/datasources/AuthDataSource';
import { AuthRepositoryImpl } from './src/data/repositories/AuthRepositoryImpl';
import { LoginUseCase } from './src/domain/usecases/auth/LoginUseCase';
import { RegisterUseCase } from './src/domain/usecases/auth/RegisterUseCase';
import { FetchCurrentUserUseCase } from './src/domain/usecases/auth/FetchCurrentUserUseCase';
import { LogoutUseCase } from './src/domain/usecases/auth/LogoutUseCase';
import { UpdateAvatarUseCase } from './src/domain/usecases/auth/UpdateAvatarUseCase';
import { UpdateProfileUseCase } from './src/domain/usecases/auth/UpdateProfileUseCase';
import { ChangePasswordUseCase } from './src/domain/usecases/auth/ChangePasswordUseCase';
import { CBIProvider } from './src/presentation/contexts/CBIContext';
import { CreateCBITestForSpaceUseCase } from './src/domain/usecases/cbi/CreateCBITestForSpaceUseCase';
import { CBIRepositoryImpl } from './src/data/repositories/CBIRepositoryImpl';
import { ConfirmCardProvider } from './src/presentation/contexts/ConfirmCardContext';

const dataSource = new AuthDataSource();
const authRepository = new AuthRepositoryImpl(dataSource);
const loginUseCase = new LoginUseCase(authRepository);
const registerUseCase = new RegisterUseCase(authRepository);
const fetchCurrentUserUseCase = new FetchCurrentUserUseCase(authRepository);
const logoutUseCase = new LogoutUseCase(authRepository);
const updateAvatarUseCase = new UpdateAvatarUseCase(authRepository);
const updateProfileUseCase = new UpdateProfileUseCase(authRepository);
const changePasswordUseCase = new ChangePasswordUseCase(authRepository);

const cbiRepository = new CBIRepositoryImpl();
const createCBITestForSpaceUseCase = new CreateCBITestForSpaceUseCase(cbiRepository);
// export default function App() {
//   return <AppNavigator />;
// };
export default function App() {
  return (
    <DataSourceProvider>
      <AuthProvider
        signUpUseCase={registerUseCase}
        signInUseCase={loginUseCase}
        signOutUseCase={logoutUseCase}
        fetchCurrentUserUseCase={fetchCurrentUserUseCase}
        updateAvatarUseCase={updateAvatarUseCase}
        updateProfileUseCase={updateProfileUseCase}
        changePasswordUseCase={changePasswordUseCase}
      >
        <SpaceProvider>
          <EmployeeProvider>
            <MoodProvider>
              <MoodHistoryProvider>
                <AIInsightProvider>
                  <CBIProvider 
                    createCBITestForSpaceUseCase={createCBITestForSpaceUseCase} 
                    cbiRepository={cbiRepository}
                  >
                    <ConfirmCardProvider>
                      <AppNavigator />
                    </ConfirmCardProvider>
                  </CBIProvider>
                </AIInsightProvider>
              </MoodHistoryProvider>
            </MoodProvider>
          </EmployeeProvider>
        </SpaceProvider>
      </AuthProvider>
    </DataSourceProvider>
  );
}
