import React, { FC } from "react";
import { View } from "react-native";
import { getDate } from "../../../utils/utils";
import ScreenLayout from "../../Layouts/ScreenLayout/ScreenLayout";
import Section from "../../UI/Section/Section";
import { TaskType } from "../../UI/Task/types";

const Home: FC = () => {
  const { date, weekDay } = getDate("ru");
  const sections = [
    {
      title: "Сегодня",
      list: [
        { 
          id: 'a1', 
          task: "1",
          time: "19:00", 
          isCompleted: false 
        },
        {
          id: 'a2',
          task: "2",
          time: "21:00",
          isCompleted: false,
        },
        {
          id: 'a3',
          task: "3",
          time: "14:00",
          isCompleted: false,
        },
        {
          id: 'a4',
          task: "4",
          time: "10:00",
          isCompleted: false,
        },
        {
          id: 'a5',
          task: "5",
          time: "17:00",
          isCompleted: false,
        },
      ],
    },
    {
      title: "Завтра",
      list: [
        { 
          id: 'a1', 
          task: "1",
          time: "19:00", 
          isCompleted: false 
        },
        {
          id: 'a2',
          task: "2",
          time: "21:00",
          isCompleted: false,
        },
        {
          id: 'a3',
          task: "3",
          time: "14:00",
          isCompleted: false,
        },
        {
          id: 'a4',
          task: "4",
          time: "10:00",
          isCompleted: false,
        },
        {
          id: 'a5',
          task: "5",
          time: "17:00",
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
