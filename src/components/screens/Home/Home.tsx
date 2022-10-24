import React, { FC } from "react";
import { View } from "react-native";
import { circles } from "../../../../assets/icons/circles";
import { getDate } from "../../../utils/utils";
import ScreenLayout from "../../Layouts/Screen/ScreenLayout";
import IconButton from "../../UI/buttons/IconButton/IconButton";
import Section from "../../UI/Section/Section";
import { HomePropType } from "./types";

const Home: FC<HomePropType> = ({ showSettingModal }) => {
  const { date, weekDay } = getDate("ru");

  const sections = [
    {
      title: "Сегодня",
      list: [
        {
          id: "a1",
          task: "Задача 1",
          time: new Date(2022, 9, 21, 10, 0),
          isCompleted: false,
        },
        {
          id: "a2",
          task: "Задача 2",
          time: new Date(2022, 9, 21, 21, 0),
          isCompleted: false,
        },
        {
          id: "a3",
          task: "Задача 3",
          time: new Date(2022, 9, 21, 14, 0),
          isCompleted: false,
        },
        {
          id: "a4",
          task: "Задача 4",
          isCompleted: false,
        },
        {
          id: "a5",
          task: "Задача 5",
          isCompleted: false,
        },
        {
          id: "a6",
          task: "Задача 6",
          isCompleted: false,
        },
      ],
    },
    {
      title: "Завтра",
      list: [
        {
          id: "a1",
          task: "Задача 1",
          time: new Date(2022, 9, 21, 10, 0),
          isCompleted: false,
        },
        {
          id: "a2",
          task: "Задача 2",
          time: new Date(2022, 9, 21, 21, 0),
          isCompleted: false,
        },
        {
          id: "a3",
          task: "Задача 3",
          time: new Date(2022, 9, 21, 14, 0),
          isCompleted: false,
        },
        {
          id: "a4",
          task: "Задача 4",
          isCompleted: false,
        },
        {
          id: "a5",
          task: "Задача 5",
          isCompleted: false,
        },
        {
          id: "a6",
          task: "Задача 6",
          isCompleted: false,
        },
      ],
    },
  ];

  return (
    <View> 
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
            return <Section key={title + index} title={title} list={list} />;
          })}
        </View>
      </ScreenLayout>
    </View>
  );
};

export default Home;
