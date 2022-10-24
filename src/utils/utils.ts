import { TaskType } from "../components/UI/Task/types";
import { languageTexts } from "./languageTexts";

export const getDate = (lang: string) => {
  const language = languageTexts[lang];
  const date = new Date().getDate();
  const month = language.months.fulls[new Date().getMonth()];
  const weekDay = language.weekDays.fulls[new Date().getDay()];

  return {
    date: date + " " + month,
    weekDay,
  };
};
