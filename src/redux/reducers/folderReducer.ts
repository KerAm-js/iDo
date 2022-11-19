import { FolderAction } from "./../types/folder";
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
      iconXml: award(textColors.grey),
    },
    {
      id: "2",
      title: "Привычки",
      iconXml: repeat(textColors.grey),
    },
    {
      id: "3",
      title: "Разработка",
      iconXml: code(textColors.grey),
    },
    {
      id: "4",
      title: "Чтение",
      iconXml: book(textColors.grey),
    },
    {
      id: "5",
      title: "Блог",
      iconXml: instagram(textColors.grey),
    },
  ],
};

export const folderReducer = (
  state: FolderState = initialState,
  action: FolderAction
): FolderState => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
