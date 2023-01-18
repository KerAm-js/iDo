import { FolderAction } from "./../types/folder";
import { FolderState } from "../types/folder";
import { UPDATE_FOLDERS } from "../constants/folder";

const initialState: FolderState = {
  folders: [],
};

export const folderReducer = (
  state: FolderState = initialState,
  action: FolderAction
): FolderState => {
  switch (action.type) {
    case UPDATE_FOLDERS: {
      return {
        ...state,
        folders: action.folders
      }
    }
    default: {
      return state;
    }
  }
};
