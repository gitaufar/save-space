import { Button, Text, View } from 'react-native';
import { useMoodViewModel } from '../../viewModels/karyawan/KaryawanViewModel';
import { TextField } from '../../components/common/TextField';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen() {
  const { inputText, setInputText, mood, loading, error, predictMood } =
    useMoodViewModel();

  return (
    <View className="flex-1 items-center justify-center px-5">
      <TextField
        label="Password"
        placeholder="••••••"
        value={inputText}
        onChangeText={setInputText}
        secureTextEntry={true}
        icon={<Icon name="visibility" size={24} color="gray" />}
      />
      <Button title="Prediksi Mood" onPress={predictMood} disabled={loading} />
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      {mood && <Text>{mood.predictedMood}</Text>}
    </View>
  );
}
