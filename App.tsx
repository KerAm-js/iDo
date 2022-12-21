import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import * as SplashScreen from "expo-splash-screen";
import AppLoading from "./AppLoading";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar animated style="light" />
        <AppLoading />
      </SafeAreaProvider>
    </Provider>
  );
}
