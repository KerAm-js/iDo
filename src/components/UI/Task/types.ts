export type TaskPropTypes = {
  task: string,
  time: string,
  isCompleted: boolean,
  onLongPress?: () => void,
}

export type TaskType = {
  id: string,
  task: string,
  time: string,
  isCompleted: boolean,
}