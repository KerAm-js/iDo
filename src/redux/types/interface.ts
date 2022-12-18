import { Action } from "@reduxjs/toolkit";

export type SectionVisibilityValueType = {
  list: number,
  completedList: number,
}

export type InterfaceState = {
  sectionsVisibilities: {
    [key: string]: SectionVisibilityValueType
  },
}

export interface InterfaceAction extends Action {
  sectionTitle: string,
  sectionVisiblity: SectionVisibilityValueType,
  sectionsVisibilities: {
    [key: string]: SectionVisibilityValueType
  }
}