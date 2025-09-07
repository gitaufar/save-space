import './global.css';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import RegisterScreen from './src/presentation/screens/auth/RegisterScreen';

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
      <RegisterScreen />
    </NavigationContainer>
  );
}

