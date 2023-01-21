import React from "react";
import { AppState, useColorScheme } from "react-native";
import { setStatusBarStyle, StatusBarStyle } from "expo-status-bar";
import * as Localization from "expo-localization";
import { LocalDB } from "./src/backend/sqlite/sqlite";
import Root from "./src/components/Navigators/Root/Root";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { AppDispatch } from "./src/redux/types/appDispatch";
import { useDispatch } from "react-redux";
import { loadPrefsFromASAction } from "./src/redux/actions/prefsActions";
import {
  loadTasksFromLocalDB,
  loadPositionsFromASAction,
} from "./src/redux/actions/taskActions";
import { loadSectionsVisibilitiesFromASAction } from "./src/redux/actions/interfaceActions";
import { store } from "./src/redux/store";
import { savePositions } from "./src/backend/asyncStorage/positions";
import {
  FOLDER_ID,
  IS_REGULAR,
  NOTIFICATION_ID,
} from "./src/backend/sqlite/constants/taskProps";
import { loadFoldersFromDBAction } from "./src/redux/actions/folderActions";

const loadApp = async () => {
  try {
    await LocalDB.initTasksTable();
    await LocalDB.initFoldersTable();
    await LocalDB.setDefaultFolders();
    const result = await LocalDB.getTableColumns("tasks");

    if (result) {
      let hasNotificationId = false;
      let hasFolderColumn = false;
      let hasIsRegular = false;

      result.forEach((columnData) => {
        switch (columnData.name) {
          case NOTIFICATION_ID: {
            hasNotificationId = true;
            break;
          }
          case FOLDER_ID: {
            hasFolderColumn = true;
            break;
          }
          case IS_REGULAR: {
            hasIsRegular = true;
            break;
          }
        }
      });

      if (!hasNotificationId) {
        await LocalDB.addColumn({
          table: "tasks",
          columnName: NOTIFICATION_ID,
          columnType: "TEXT",
          defaultValue: "NULL",
        });
      }
      if (!hasFolderColumn) {
        await LocalDB.addColumn({
          table: "tasks",
          columnName: FOLDER_ID,
          columnType: "INTEGER",
          defaultValue: "NULL",
        });
      }
      if (!hasIsRegular) {
        await LocalDB.addColumn({
          table: "tasks",
          columnName: IS_REGULAR,
          columnType: "INT",
          defaultValue: 0,
          notNull: true,
        });
        await LocalDB.updateTasksTable();
      }
    }
  } catch (err) {
    console.log("loadApp", err);
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
          setStatusBarStyle("light");
          await loadApp();
          dispatch(loadPrefsFromASAction(systemTheme, Localization.locale));
          dispatch(loadSectionsVisibilitiesFromASAction());
          dispatch(loadFoldersFromDBAction());
          dispatch(loadPositionsFromASAction());
          dispatch(loadTasksFromLocalDB());
        }
      } catch (error) {
        console.log("prepare", error);
      } finally {
        setTimeout(() => {
          setIsAppReady(true);
        }, 200);
      }
    }
    prepare();
    const subscription = AppState.addEventListener("change", (nextState) => {
      const positions = store.getState().tasks.positions;
      if (nextState === "background" || nextState === "inactive") {
        savePositions(positions);
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const onAppReady = useCallback(
    async (statusBarStyle: StatusBarStyle) => {
      if (isAppReady) {
        try {
          setTimeout(async () => {
            await SplashScreen.hideAsync();
            setStatusBarStyle(statusBarStyle);
          }, 1000);
        } catch (error) {
          console.log("onAppReady", error);
        }
      }
    },
    [isAppReady]
  );

  if (!isAppReady) {
    return null;
  }

  return <Root onAppReady={onAppReady} />;
}
