import React, { useEffect } from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";
import { getLanguage } from "../../../redux/selectors/prefsSelectors";
import ThemeText from "../../Layouts/Theme/Text/ThemeText";
import { LangTextPropTypes } from "./types";

const LangText = ({
  title,
  setScreenTitle,
  handleTheme = true,
  ...textProps
}: LangTextPropTypes) => {
  const language = useSelector(getLanguage);
  let text = "";
  if (typeof title === "function") {
    text = title(language);
  } else {
    text = title[language];
  }

  useEffect(() => {
    if (setScreenTitle) setScreenTitle(language);
  });

  if (handleTheme) return <ThemeText {...textProps}>{text}</ThemeText>;
  return <Text {...textProps}>{text}</Text>;
};

export default LangText;
