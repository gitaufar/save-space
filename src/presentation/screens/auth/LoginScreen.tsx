import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Header from '../../components/auth/Header';
import { TextField } from '../../components/common/TextField';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from '../../components/common/Button';
import { useAuthViewModel } from '../../viewModels/auth/AuthViewModel';
import { AuthRepositoryImpl } from '../../../data/repositories/AuthRepositoryImpl';
import { AuthDataSource } from '../../../data/datasources/AuthDataSource';
import { LoginUseCase } from '../../../domain/usecases/auth/LoginUseCase';
import { FetchCurrentUserUseCase } from '../../../domain/usecases/auth/FetchCurrentUserUseCase';
import { RegisterUseCase } from '../../../domain/usecases/auth/RegisterUseCase';
import { LogoutUseCase } from '../../../domain/usecases/auth/LogoutUseCase';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const dataSource = new AuthDataSource();
const authRepository = new AuthRepositoryImpl(dataSource);
const loginUseCase = new LoginUseCase(authRepository);
const registerUseCase = new RegisterUseCase(authRepository);
const fetchCurrentUserUseCase = new FetchCurrentUserUseCase(authRepository);
const logoutUseCase = new LogoutUseCase(authRepository);

type AuthNav = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<AuthNav>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const { loading, error, signIn } = useAuthViewModel({
    signUpUseCase: registerUseCase,
    signInUseCase: loginUseCase,
    signOutUseCase: logoutUseCase,
    fetchCurrentUserUseCase: fetchCurrentUserUseCase,
  });

  return (
    <View className="flex-1 bg-white flex flex-col pt-32">
      <Header title="Selamat Datang" desc="Masuk ke akun anda" />
      <View className="px-5 flex flex-col py-20 gap-4">
        <TextField
          label="Email"
          placeholder="nama@gmail.com"
          value={email}
          onChangeText={setEmail}
        />
        <TextField
          label="Password"
          placeholder="••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={isVisible}
          icon={
            isVisible ? (
              <Icon
                onPress={() => setIsVisible(!isVisible)}
                name="visibility"
                size={24}
                color="gray"
              />
            ) : (
              <Icon
                onPress={() => setIsVisible(!isVisible)}
                name="visibility-off"
                size={24}
                color="gray"
              />
            )
          }
        />

        {/* Error Message */}
        {error && (
          <Text className="text-red-500 text-center text-sm">{error}</Text>
        )}

        <Button
          text="Masuk"
          margin="m-0"
          onPress={() => signIn(email, password)}
          loading={loading}
        />

        <View className="text-base flex-row flex justify-center">
          <Text className="text-light_grey">Belum punya akun?</Text>
          <Pressable>
            <Text className="text-primary" onPress={() => navigation.navigate('Register')}> Daftar akun baru</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
