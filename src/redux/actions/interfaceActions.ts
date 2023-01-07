import { Dispatch } from "@reduxjs/toolkit";
import {
  getSectionsVisibilitiesFromAS,
  saveSectionVisibilityToAS,
} from "../../backend/asyncStorage/section";
import { HomePeriodsKeys } from "../../types/global/Periods";
import {
  UPDATE_SECTIONS_VISIBILITIES,
  UPDATE_SECTION_VISIBILITY,
} from "../constants/interface";
import { SectionVisibilityValueType } from "../types/interface";

export const loadSectionsVisibilitiesFromASAction =
  () => async (dispatch: Dispatch) => {
    try {
      const sectionsVisibilities = await getSectionsVisibilitiesFromAS();
      dispatch({ type: UPDATE_SECTIONS_VISIBILITIES, sectionsVisibilities });
    } catch (error) {
      console.log("getSectionsVisibilitiesFromASAction", error);
    }
  };

export const updateSectionVisibility =
  (title: HomePeriodsKeys, sectionVisiblity: SectionVisibilityValueType) =>
  async (dispatch: Dispatch) => {
    try {
      await saveSectionVisibilityToAS(title, sectionVisiblity);
      dispatch({ type: UPDATE_SECTION_VISIBILITY, title, sectionVisiblity });
    } catch (error) {
      console.log("updateSectionVisibility", error);
    }
  };
