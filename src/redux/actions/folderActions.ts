import { Dispatch } from "@reduxjs/toolkit";
import { LocalDB } from "../../backend/sqlite/sqlite";
import { UPDATE_FOLDERS } from "../constants/folder";

export const loadFoldersFromDBAction = () => async (dispatch: Dispatch) => {
  const folders = await LocalDB.getFolders();
  dispatch({ type: UPDATE_FOLDERS, folders, });
}