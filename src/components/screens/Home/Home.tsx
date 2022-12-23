import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { getDate } from "../../../utils/date";
import ScreenLayout from "../../Layouts/Screen/ScreenLayout";
import Section from "../../UI/Section/Section";
import { HomePropType, SectionsObjectType } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { getGesturePositions, getTasks } from "../../../redux/selectors/taskSelector";
import { getSections } from "../../../utils/section/sections";
import { getPrefs } from "../../../redux/selectors/prefsSelectors";
import { useFocusEffect } from "@react-navigation/native";
import { PERIODS_LIST } from "../../../utils/constants/periods";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { getGesturePositionsFromASAction } from "../../../redux/actions/taskActions";
import { getSectionsVisibilities } from "../../../redux/selectors/interfaceSelectors";
import { getSectionsVisibilitiesFromASAction } from "../../../redux/actions/interfaceActions";
import { getAllNotifications } from "../../../native/notifications";

const Home: FC<HomePropType> = () => {
  const { language } = useSelector(getPrefs);
  const dispatch: AppDispatch = useDispatch();
  const gesturePositions = useSelector(getGesturePositions);
  const sectionsVisibilities = useSelector(getSectionsVisibilities);
  const [visible, setVisible] = useState<boolean>(false);
  const { date, weekDay } = getDate(language);
  const tasks = useSelector(getTasks);
  const sections: SectionsObjectType = getSections(PERIODS_LIST, tasks, gesturePositions);

  useFocusEffect(() => {
    setVisible(true);
    return () => {
      setVisible(false);
    };
  });

  if (!visible) {
    return null;
  }

  return (
    <ScreenLayout
      title={date}
      subtitle={weekDay}
      onUnmount={() => {
        dispatch(getSectionsVisibilitiesFromASAction());
        dispatch(getGesturePositionsFromASAction());
      }}
    >
      <View>
        {PERIODS_LIST.map((period) => {
          return (
            <Section
              key={period}
              title={sections[period].title}
              list={sections[period].list}
              initialGesturePositions={sections[period].gesturePositions}
              visibilities={sectionsVisibilities[period]}
            />
          );
        })}
      </View>
    </ScreenLayout>
  );
};
export default Home;
