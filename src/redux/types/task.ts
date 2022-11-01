import { ListObject } from './../../types/global/ListObject';
import { GesturePositionsType } from './../../types/global/GesturePositions';
import { Action } from "@reduxjs/toolkit"
import { TaskType } from "../../components/UI/Task/types"

export type TaskState = {
  tasks: Array<TaskType>,
  gesturePositions: GesturePositionsType,
  taskToEdit: TaskType | undefined,
}

export interface TaskAction extends Action {
  task: TaskType,
  tasks: Array<TaskType>,
  positions: GesturePositionsType,
  id: string
}