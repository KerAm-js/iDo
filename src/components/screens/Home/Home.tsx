import React, { FC } from "react";
import { View } from "react-native";
import { getDate } from "../../../utils/utils";
import ScreenLayout from "../../Layouts/ScreenLayout/ScreenLayout";
import Section from "../../UI/Section/Section";

const Home: FC = () => {
  const { date, weekDay } = getDate("ru");
  const sections = [
    {
      title: "Сегодня",
      list: [
        {
          id: 'a3',
          task: "Задача 3",
          time: new Date(2022, 9, 21, 14, 0),
          isCompleted: false,
        },
        {
          id: 'a4',
          task: "Задача 4",
          isCompleted: false,
        },
        {
          id: 'a5',
          task: "Задача 5",
          isCompleted: false,
        },
        { 
          id: 'a1', 
          task: "Задача 1",
          time: new Date(2022, 9, 21, 10, 0),
          isCompleted: false 
        },
        {
          id: 'a2',
          task: "Задача 2",
          time: new Date(2022, 9, 21, 21, 0),
          isCompleted: false,
        },
      ],
    },
  ];
  return (
    <ScreenLayout title={date} subtitle={weekDay}>
      <View>
        {sections.map(({ title, list }, index) => {
          return <Section key={title + index} title={title} list={list} />;
        })}
      </View>
    </ScreenLayout>
  );
};

export default Home;
