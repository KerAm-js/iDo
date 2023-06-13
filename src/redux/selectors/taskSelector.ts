import { RootState } from "../types/rootState";

export const taskStateSelector = (state: RootState) => state.tasks;
export const isTaskAddingAnimatedSelector = (state: RootState) => state.tasks.isTaskAddingAnimated;