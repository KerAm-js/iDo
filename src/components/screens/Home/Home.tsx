import React, { FC } from "react";
import { View } from "react-native";
import { circles } from "../../../../assets/icons/circles";
import { getDate } from "../../../utils/date";
import ScreenLayout from "../../Layouts/Screen/ScreenLayout";
import IconButton from "../../UI/buttons/IconButton/IconButton";
import Section from "../../UI/Section/Section";
import { HomePropType, SectionsType } from "./types";
import { useSelector } from "react-redux";
import { taskSelector } from "../../../redux/selectors/taskSelector";
import { getSections } from "../../../utils/section/sections";

const Home: FC<HomePropType> = ({ showSettingModal, periodsState }) => {
  const { date, weekDay } = getDate("ru");
  const { tasks } = useSelector(taskSelector);
  const sections: SectionsType[] = getSections(periodsState, tasks);

  console.log('ok');

  return (
    <ScreenLayout
      title={date}
      subtitle={weekDay}
      headingRight={
        <IconButton
          onClick={showSettingModal}
          xml={circles}
          iconWidth={23}
          iconHeight={5}
        />
      }
    >
      <View>
        {sections.map(({ title, list }, index) => {
          return (
            <Section key={title.toString() + index} title={title} list={list} />
          );
        })}
      </View>
    </ScreenLayout>
  );
};
export default Home;
