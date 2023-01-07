import { StatusBarStyle } from "expo-status-bar";

export type RootPropType = {
  onAppReady: (statusBarStyle: StatusBarStyle) => void,
}