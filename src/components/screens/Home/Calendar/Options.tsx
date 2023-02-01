import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { getLanguage } from "../../../../redux/selectors/prefsSelectors";
import { toMonthYearString } from "../../../../utils/date";
import { languageTexts } from "../../../../utils/languageTexts";

const Options = () => {
  const navigation = useNavigation();
  const language = useSelector(getLanguage);
  const theme = useTheme();
  useEffect(() => {
    navigation.setOptions({
      title: toMonthYearString({ date: new Date(), language }),
      headerBackTitle: languageTexts.words.close[language],
    });
  }, [language]);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
    });
  }, []);
  return <View />;
};

export default Options;
