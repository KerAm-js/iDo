import { RootState } from "../types/rootState";

export const taskStateSelector = (state: RootState) => state.tasks;