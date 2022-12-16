import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { LocalDB } from "./src/backend/sqlite";
import Root from "./src/components/Navigators/Root/Root";
import { store } from "./src/redux/store";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

const loadApp = async () => {
  try {
    await LocalDB.initTasks();
  } catch (err) {
    console.log(err);
  }
};

export default function App() {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  useEffect(() => {
    async function prepare() {
      try {
        if (!isAppReady) {
          await loadApp();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsAppReady(true);
      }
    }

    prepare();
  }, []);

  const onAppReady = useCallback(() => {
    if (isAppReady) {
      setTimeout(async () => {
        try {
          await SplashScreen.hideAsync(); 
        } catch (error) {
          console.log(error)
        }
      }, 1500)
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Root onAppReady={onAppReady} />
      </SafeAreaProvider>
    </Provider>
  );
}
