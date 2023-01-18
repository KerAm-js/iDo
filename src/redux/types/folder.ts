import { Action } from "@reduxjs/toolkit";

export type Folder = {
  id: number;
  title: string;
  iconXml: string;
};

export type FolderState = {
  folders: Array<Folder>;
};

export interface FolderAction extends Action {
  folder: Folder;
  folders: Array<Folder>;
  taskId: string;
}
