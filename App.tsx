import './global.css';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import LoginScreen from './src/presentation/screens/auth/LoginScreen';
import HomeScreen from './src/presentation/screens/main/HomeScreen';

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
      <LoginScreen />
    </NavigationContainer>
  );
}

