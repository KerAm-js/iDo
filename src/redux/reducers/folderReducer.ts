import { ADD_TASK_TO_FOLDER } from "./../constants/folder";
import { Folder, FolderAction } from "./../types/folder";
import { FolderState } from "../types/folder";
import { award } from "../../../assets/icons/folders/award";
import { textColors } from "../../styles/global/colors";
import { repeat } from "../../../assets/icons/folders/repeat";
import { code } from "../../../assets/icons/folders/code";
import { book } from "../../../assets/icons/folders/book";
import { instagram } from "../../../assets/icons/folders/instagram";

const initialState: FolderState = {
  folders: [
    {
      id: "1",
      title: "Цели",
      tasks: [],
      iconXml: award(textColors.grey),
    },
    {
      id: "2",
      title: "Привычки",
      tasks: [],
      iconXml: repeat(textColors.grey),
    },
    {
      id: "3",
      title: "Разработка",
      tasks: [],
      iconXml: code(textColors.grey),
    },
    {
      id: "4",
      title: "Чтение",
      tasks: [],
      iconXml: book(textColors.grey),
    },
    {
      id: "5",
      title: "Блог",
      tasks: [],
      iconXml: instagram(textColors.grey),
    },
  ],
};

export const folderReducer = (
  state: FolderState = initialState,
  action: FolderAction
): FolderState => {
  switch (action.type) {
    case ADD_TASK_TO_FOLDER: {
      const newFolders: Array<Folder> = state.folders.map((folder) => {
        if (folder.id === action.folder.id) {
          return {
            ...folder,
            tasks: [action.taskId, ...folder.tasks],
          };
        } else {
          return folder;
        }
      });
      return {
        ...state,
        folders: newFolders,
      };
    }
    default: {
      return state;
    }
  }
};
