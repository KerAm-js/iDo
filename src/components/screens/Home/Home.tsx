import React, { FC, useState } from "react";
import { View } from "react-native";
import { getDate } from "../../../utils/date";
import ScreenLayout from "../../Layouts/Screen/ScreenLayout";
import Section from "../../UI/Section/Section";
import { HomePropType, SectionsObjectType, SectionsType } from "./types";
import { useSelector } from "react-redux";
import { getTasks } from "../../../redux/selectors/taskSelector";
import { getSections } from "../../../utils/section/sections";
import { getPrefs } from "../../../redux/selectors/prefsSelectors";
import { useFocusEffect } from "@react-navigation/native";
import { PERIODS_LIST } from "../../../utils/constants/periods";

const Home: FC<HomePropType> = () => {
  const { language, periods } = useSelector(getPrefs);
  const [visible, setVisible] = useState<boolean>(false);
  const { date, weekDay } = getDate(language);
  const tasks = useSelector(getTasks);
  const sections: SectionsObjectType = getSections(periods, tasks);

  useFocusEffect(() => {
    setVisible(true);
    return () => setVisible(false);
  });

  if (!visible) {
    return null;
  }

  return (
    <ScreenLayout
      title={date}
      subtitle={weekDay}
    >
      <View>
        {PERIODS_LIST.map((period) => {
          return (
            <Section
              key={period}
              title={sections[period].title}
              list={sections[period].list}
            />
          );
        })}
      </View>
    </ScreenLayout>
  );
};
export default Home;
