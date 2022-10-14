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
        { task: "Почитать книгу", time: "10:00", isCompleted: true },
        {
          task: "Доделать главную страницу",
          time: "20:00",
          isCompleted: false,
        },
      ],
    },
    {
      title: "Завтра",
      list: [
        { task: "Почитать книгу", time: "10:00", isCompleted: true },
        {
          task: "Доделать главную страницу",
          time: "20:00",
          isCompleted: false,
        },
      ],
    },
  ];
  return (
    <>
      <ScreenLayout title={date} subtitle={weekDay}>
        <View>
          {sections.map(({ title, list }, index) => {
            return <Section key={title + index} title={title} list={list} />;
          })}
        </View>
        <View style={{ height: 2000 }}></View>
      </ScreenLayout>
    </>
  );
};

export default Home;
