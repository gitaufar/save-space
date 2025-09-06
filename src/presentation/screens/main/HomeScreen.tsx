import { Button, Text, View } from 'react-native';
import { useMoodViewModel } from '../../viewModels/karyawan/KaryawanViewModel';
import { TextField } from '../../components/common/TextField';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GeminiRemoteDatasourceImpl } from '../../../data/datasources/GeminiRemoteDataSource';
import { GeminiRepositoryImpl } from '../../../data/repositories/GeminiRepositoryImpl';
import { GetResponseGeminiUseCase } from '../../../domain/usecases/ai/GetResponseGeminiUseCase';
import { useGeminiViewModel } from '../../viewModels/common/GeminiViewModel';

const datasource = new GeminiRemoteDatasourceImpl();
const repo = new GeminiRepositoryImpl(datasource);
const usecase = new GetResponseGeminiUseCase(repo);

export default function HomeScreen() {
  const { inputText, setInputText, mood, loading, error, predictMood } =
    useMoodViewModel();
  const { generate, loading: geminiLoading, data, error: geminiError } = useGeminiViewModel(usecase);
  return (
    <View className="flex-1 items-center justify-center px-5 bg-white">
      <TextField
        label="Password"
        placeholder="••••••"
        value={inputText}
        onChangeText={setInputText}
        secureTextEntry={true}
        icon={<Icon name="visibility" size={24} color="gray" />}
      />
      <Button title="Prediksi Mood" onPress={predictMood} disabled={loading} />
      <Button title="Generate" onPress={() => generate(inputText)} disabled={geminiLoading} />
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      {mood && <Text>{mood.predictedMood}</Text>}
      {geminiLoading && <Text>Loading...</Text>}
      {geminiError && <Text>{geminiError}</Text>}
      {data && <Text>{data}</Text>}
    </View>
  );
}
