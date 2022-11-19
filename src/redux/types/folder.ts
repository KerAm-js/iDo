import { Action } from "@reduxjs/toolkit"

export type Folder = {
  id: string,
  title: string,
  iconXml: string,
}

export type FolderState = {
  folders: Array<Folder>
}

export interface FolderAction extends Action {
  folder: Folder
  taskId: string
}