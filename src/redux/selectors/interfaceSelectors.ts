import { RootState } from "../types/rootState";

export const interfaceSelector = (state: RootState) => state.interface;
export const getSectionsVisibilities = (state: RootState) => state.interface.sectionsVisibilities;