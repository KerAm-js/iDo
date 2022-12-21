import React from "react";
import { useColorScheme } from "react-native";
import * as Localization from "expo-localization";
import { LocalDB } from "./src/backend/sqlite/sqlite";
import Root from "./src/components/Navigators/Root/Root";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { AppDispatch } from "./src/redux/types/appDispatch";
import { useDispatch } from "react-redux";
import { getPrefsFromASAction } from "./src/redux/actions/prefsActions";
import {
  getGesturePositionsFromASAction,
  getTasksFromLocalDB,
} from "./src/redux/actions/taskActions";
import { getSectionsVisibilitiesFromASAction } from "./src/redux/actions/interfaceActions";

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
          dispatch(getPrefsFromASAction(systemTheme, Localization.locale));
          dispatch(getSectionsVisibilitiesFromASAction());
          dispatch(getTasksFromLocalDB());
          dispatch(getGesturePositionsFromASAction());
          await loadApp();
        }
      } catch (error) {
        console.log('prepare', error);
      } finally {
        setTimeout(() => {
          setIsAppReady(true);
        }, 1500);
      }
    }
    prepare();
  }, []);

  const onAppReady = useCallback(async () => {
    if (isAppReady) {
      try {
        await SplashScreen.hideAsync();
      } catch (error) {
        console.log('onAppReady', error);
      }
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return <Root onAppReady={onAppReady} />;
}
