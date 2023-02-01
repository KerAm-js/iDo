import { RootState } from "../types/rootState";

export const taskStateSelector = (state: RootState) => state.tasks;
export const getTaskToEdit = (state: RootState) => state.tasks.taskToEdit;
export const getNewTaskData = (state: RootState) => state.tasks.newTaskData;
export const getPositions = (state: RootState) => state.tasks.positions;
export const getTasks = (state: RootState) => state.tasks.tasks;
export const getIsTaskAddingAnimated = (state: RootState) => state.tasks.isTaskAddingAnimated;