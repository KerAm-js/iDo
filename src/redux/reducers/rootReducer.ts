import { combineReducers } from "@reduxjs/toolkit";
import { taskReducer } from "./taskReducer";

export const rootReducer = combineReducers({
  tasks: taskReducer
})