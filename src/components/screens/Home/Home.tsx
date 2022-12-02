import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { circles } from "../../../../assets/icons/circles";
import { getDate } from "../../../utils/date";
import ScreenLayout from "../../Layouts/Screen/ScreenLayout";
import IconButton from "../../UI/buttons/IconButton/IconButton";
import Section from "../../UI/Section/Section";
import { HomePropType, SectionsType } from "./types";
import { useSelector } from "react-redux";
import { getTasks } from "../../../redux/selectors/taskSelector";
import { getSections } from "../../../utils/section/sections";
import { prefsSelector } from "../../../redux/selectors/prefsSelectors";
import { themeColors } from "../../../styles/global/colors";
import { useFocusEffect } from "@react-navigation/native";
import ThemeBackground from "../../Layouts/Theme/Background/ThemeBackground";

const Home: FC<HomePropType> = React.memo(
  ({ showSettingModal, periodsState }) => {
    const { language, theme } = useSelector(prefsSelector);
    const [visible, setVisible] = useState<boolean>(false);
    const { date, weekDay } = getDate(language);
    const tasks = useSelector(getTasks);
    const sections: SectionsType[] = getSections(periodsState, tasks);

    useFocusEffect(() => {
      setVisible(true);
      return () => setVisible(false);
    });

    if (!visible) {
      return null;
    }

    return (
      <ThemeBackground>
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
            {sections.map(({ title, list }) => {
              return <Section key={title} title={title} list={list} />;
            })}
          </View>
        </ScreenLayout>
      </ThemeBackground>
    );
  }
);
export default Home;
