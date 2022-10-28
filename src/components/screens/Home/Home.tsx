import React, { FC } from "react";
import { View } from "react-native";
import { circles } from "../../../../assets/icons/circles";
import { getSections } from "../../../utils/utils";
import { getDate } from "../../../utils/date";
import ScreenLayout from "../../Layouts/Screen/ScreenLayout";
import IconButton from "../../UI/buttons/IconButton/IconButton";
import Section from "../../UI/Section/Section";
import { HomePropType, SectionsType } from "./types";

const tasks = [
  {
    id: "a1",
    task: "Задача 1",
    time: new Date(2022, 9, 27, 10, 0),
    isCompleted: false,
  },
  {
    id: "a2",
    task: "Задача 2",
    isCompleted: false,
    time: new Date(2022, 9, 27, 14, 0),
  },
  {
    id: "a3",
    task: "Задача 3",
    isCompleted: false,
    time: new Date(2022, 9, 27, 15, 0),
  },
  {
    id: "a4",
    task: "Задача 4",
    time: new Date(2022, 9, 27, 21, 0),
    isCompleted: false,
  },
  {
    id: "a5",
    task: "Задача 5",
    time: new Date(2022, 9, 28, 10, 0),
    isCompleted: false,
  },
  {
    id: "a6",
    task: "Задача 6",
    time: new Date(2022, 9, 28, 21, 0),
    isCompleted: false,
  },
  {
    id: "a7",
    task: "Задача 7",
    time: new Date(2022, 9, 28, 14, 0),
    isCompleted: false,
  },
  {
    id: "a8",
    task: "Задача 8",
    time: new Date(2022, 9, 29, 10, 0),
    isCompleted: false,
  },
  // {
  //   id: "a9",
  //   task: "Задача 9",
  //   time: new Date(2022, 9, 31, 21, 0),
  //   isCompleted: false,
  // },
  // {
  //   id: "a10",
  //   task: "Задача 10",
  //   time: new Date(2022, 9, 31, 21, 0),
  //   isCompleted: false,
  // },
  // {
  //   id: "a11",
  //   task: "Задача 11",
  //   isCompleted: false,
  // },
  // {
  //   id: "a12",
  //   task: "Задача 12",
  //   isCompleted: false,
  // },
  // {
  //   id: "a13",
  //   task: "Задача 13",
  //   isCompleted: false,
  // },
  // {
  //   id: "a14",
  //   task: "Задача 14",
  //   isCompleted: false,
  // },
  // {
  //   id: "a15",
  //   task: "Задача 15",
  //   isCompleted: false,
  // },
];

const Home: FC<HomePropType> = ({ showSettingModal, periodsState }) => {
  const { date, weekDay } = getDate("ru");
  const sections: SectionsType[] = getSections(periodsState, tasks);

  return (
    <ScreenLayout
      title={date}
      subtitle={weekDay}
      headingLeft={
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
          return <Section key={title.toString() + index} title={title} list={list} />;
        })}
      </View>
    </ScreenLayout>
  );
};
export default Home;
