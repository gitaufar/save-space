import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewSpaceScreen from '../screens/space/NewSpaceScreen';
import OldSpaceScreen from '../screens/space/OldSpaceScreen';
import InviteCodeScreen from '../screens/space/InviteCodeScreen';
import SpaceScreen from '../screens/space/SpaceScreen';

// ✅ Hanya daftar screen + parameternya
export type SpaceStackParamList = {
  NewSpace: undefined;
  OldSpace: undefined;
  Space: undefined;
  InviteCode: { token: string };
};

type SpaceNavigatorProps = {
  // ✅ initialRouteName harus salah satu dari nama screen di atas
  initialRouteName: keyof SpaceStackParamList;
};

const Stack = createNativeStackNavigator<SpaceStackParamList>();

export default function SpaceNavigator({
  initialRouteName,
}: SpaceNavigatorProps) {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="NewSpace" component={NewSpaceScreen} />
      <Stack.Screen name="OldSpace" component={OldSpaceScreen} />
      <Stack.Screen name="Space" component={SpaceScreen} />
      <Stack.Screen name="InviteCode" component={InviteCodeScreen} />
    </Stack.Navigator>
  );
}
