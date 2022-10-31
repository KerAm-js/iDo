import { RootState } from "../types/rootState";

export const taskSelector = (state: RootState) => state.tasks;