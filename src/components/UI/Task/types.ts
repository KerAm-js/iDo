export type TaskPropTypes = {
  id: string,
  task: string,
  time: string,
  isCompleted: boolean,
  completeTask: (id: string) => void,
}

export type TaskType = {
  id: string,
  task: string,
  time: string,
  isCompleted: boolean,
}

export type CompletedMarkerPropTypes = {
  onPress: () => void,
  opacity: {value: number},
}