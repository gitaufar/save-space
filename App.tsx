import './global.css';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import LoginScreen from './src/presentation/screens/auth/LoginScreen';
import OnBoardingScreen from './src/presentation/screens/onboarding/OnBoardingScreen';
import SpaceScreen from './src/presentation/screens/space/SpaceScreen';
import NewSpaceScreen from './src/presentation/screens/space/NewSpaceScreen';
import OldSaceScreen from './src/presentation/screens/space/OldSpaceScreen';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <OldSaceScreen />
    </NavigationContainer>
  );
}

