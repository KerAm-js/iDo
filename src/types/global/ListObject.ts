import { TimeType } from "../../redux/types/task"

export type ListObject = {
  [x: string] : {
    position: number,
    prevPosition?: number,
    isCompleted: boolean,
    time: number,
    timeType: TimeType
  }
}