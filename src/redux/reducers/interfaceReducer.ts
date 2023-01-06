import {
  UPDATE_SECTIONS_VISIBILITIES,
  UPDATE_SECTION_VISIBILITY,
} from "../constants/interface";
import { InterfaceAction, InterfaceState } from "../types/interface";

const initialState: InterfaceState = {
  sectionsVisibilities: {},
};

export const interfaceReducer = (
  state: InterfaceState = initialState,
  action: InterfaceAction
): InterfaceState => {
  switch (action.type) {
    case UPDATE_SECTION_VISIBILITY: {
      return {
        ...state,
        sectionsVisibilities: {
          ...state.sectionsVisibilities,
          [action.sectionTitle]: action.sectionVisiblity,
        },
      };
    }
    case UPDATE_SECTIONS_VISIBILITIES: {
      return {
        ...state,
        sectionsVisibilities: action.sectionsVisibilities,
      };
    }
    default: {
      return state;
    }
  }
};
