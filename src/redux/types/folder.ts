import { Action } from "@reduxjs/toolkit"
import { TaskType } from "../../components/UI/Task/types"

export type Folder = {
  id: string,
  title: string,
  tasks: Array<string>,
  iconXml: string,
}

export type FolderState = {
  folders: Array<Folder>
}

export interface FolderAction extends Action {
  folder: Folder
  taskId: string
}