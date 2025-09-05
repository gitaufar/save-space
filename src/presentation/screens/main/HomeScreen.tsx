import { Button, Text, TextInput, View } from "react-native";
import { useMoodViewModel } from "../../viewModels/karyawan/KaryawanViewModel";

export default function HomeScreen() {
  const { inputText, setInputText, mood, loading, error, predictMood } = useMoodViewModel();

  return (
    <View className="flex-1 items-center justify-center">
      <TextInput className="bg-white p-2 rounded w-full" value={inputText} onChangeText={setInputText} />
      <Button title="Prediksi Mood" onPress={predictMood} disabled={loading} />
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      {mood && <Text>{mood.predictedMood}</Text>}
    </View>
  );
}
