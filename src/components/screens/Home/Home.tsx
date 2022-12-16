import React, { FC, useEffect, useReducer, useRef, useState } from "react";
import { View } from "react-native";
import { circles } from "../../../../assets/icons/circles";
import { getDate } from "../../../utils/date";
import ScreenLayout from "../../Layouts/Screen/ScreenLayout";
import IconButton from "../../UI/buttons/IconButton/IconButton";
import Section from "../../UI/Section/Section";
import { HomePropType, SectionsObjectType, SectionsType } from "./types";
import { useSelector } from "react-redux";
import { getTasks } from "../../../redux/selectors/taskSelector";
import { getSections } from "../../../utils/section/sections";
import { getPrefs } from "../../../redux/selectors/prefsSelectors";
import { themeColors } from "../../../styles/global/colors";
import { useFocusEffect } from "@react-navigation/native";
import { PERIODS_LIST } from "../../../utils/constants/periods";

const Home: FC<HomePropType> = React.memo(({ showSettingModal }) => {
  const { language, theme, periods } = useSelector(getPrefs);
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
      headingRight={
        <IconButton
          onClick={showSettingModal}
          xml={circles(themeColors[theme].colors.text)}
          iconWidth={23}
          iconHeight={5}
        />
      }
    >
      <View>
        {PERIODS_LIST.map((period) => {
          return (
            <Section
              key={period}
              title={sections[period].title}
              list={sections[period].list}
              visible={periods[period]}
            />
          );
        })}
      </View>
    </ScreenLayout>
  );
});
export default Home;
