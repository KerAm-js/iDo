import { combineReducers } from "@reduxjs/toolkit";
import { folderReducer } from "./folderReducer";
import { prefsReducer } from "./prefsReducer";
import { taskReducer } from "./taskReducer";

export const rootReducer = combineReducers({
  tasks: taskReducer,
  folders: folderReducer,
  prefs: prefsReducer,
})