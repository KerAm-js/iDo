import React from "react";
import { AppState, useColorScheme } from "react-native";
import { setStatusBarHidden, setStatusBarStyle, StatusBarStyle } from "expo-status-bar";
import * as Localization from "expo-localization";
import { LocalDB } from "./src/backend/sqlite/sqlite";
import Root from "./src/components/Navigators/Root/Root";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { AppDispatch } from "./src/redux/types/appDispatch";
import { useDispatch } from "react-redux";
import { loadPrefsFromASAction } from "./src/redux/actions/prefsActions";
import {
  loadTasksFromLocalDB, loadPositionsFromASAction,
} from "./src/redux/actions/taskActions";
import { loadSectionsVisibilitiesFromASAction } from "./src/redux/actions/interfaceActions";
import { store } from "./src/redux/store";
import { savePositions } from "./src/backend/asyncStorage/positions";

const loadApp = async () => {
  try {
    await LocalDB.initTasks();
    const result = await LocalDB.getTasksTableColumns();
    if (result) {
      const hasNotificationId = result.find(column => column.name === 'notificationId');
      if (!hasNotificationId) {
        await LocalDB.addColumn('tasks', 'notificationId', false)
      }
    }
  } catch (err) {
    console.log('loadApp', err);
  }
};

export default function AppLoading() {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const systemTheme = useColorScheme();

  useEffect(() => {
    async function prepare() {
      try {
        if (!isAppReady) {
          setStatusBarStyle('light');
          await loadApp();
          dispatch(loadPrefsFromASAction(systemTheme, Localization.locale));
          dispatch(loadSectionsVisibilitiesFromASAction());
          dispatch(loadPositionsFromASAction());
          dispatch(loadTasksFromLocalDB());
        }
      } catch (error) {
        console.log('prepare', error);
      } finally {
        setTimeout(() => {
          setIsAppReady(true);
        }, 200)
      }
    }
    prepare();
    const subscription = AppState.addEventListener('change', (nextState) => {
      const positions = store.getState().tasks.positions;
      if (nextState === 'background' || nextState === 'inactive') {
        savePositions(positions)
      }
    })
    return () => {
      subscription.remove();
    }
  }, []);

  const onAppReady = useCallback(async (statusBarStyle: StatusBarStyle) => {
    if (isAppReady) {
      try {
        setTimeout(async () => {
          await SplashScreen.hideAsync();
          setStatusBarStyle(statusBarStyle);
        }, 500);
      } catch (error) {
        console.log('onAppReady', error);
      }
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return <Root onAppReady={onAppReady} />
}
