import React, { FC } from "react";
import { View } from "react-native";
import { getDate } from "../../../utils/date";
import ScreenLayout from "../../Layouts/Screen/ScreenLayout";
import Section from "../../UI/Section/Section";
import { HomePropType, SectionsObjectType } from "./types";
import { useDispatch, useSelector } from "react-redux";
import {
  getGesturePositions,
  getTasks,
} from "../../../redux/selectors/taskSelector";
import { getSections } from "../../../utils/section/sections";
import { getPrefs } from "../../../redux/selectors/prefsSelectors";
import { useNavigation } from "@react-navigation/native";
import { EXPIRED, LATER, PERIODS_LIST } from "../../../utils/constants/periods";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { getGesturePositionsFromASAction } from "../../../redux/actions/taskActions";
import { getSectionsVisibilities } from "../../../redux/selectors/interfaceSelectors";
import { getSectionsVisibilitiesFromASAction } from "../../../redux/actions/interfaceActions";
import CalendarIconButton from "../../UI/buttons/IconButton/CalendarIconButton";
import { textColors } from "../../../styles/global/colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackNavigatorParamsList } from "../../Navigators/Stack/Home/types";

const Home: FC<HomePropType> = () => {
  const { language } = useSelector(getPrefs);
  const navigator = useNavigation<StackNavigationProp<HomeStackNavigatorParamsList>>();
  const dispatch: AppDispatch = useDispatch();
  const gesturePositions = useSelector(getGesturePositions);
  const sectionsVisibilities = useSelector(getSectionsVisibilities);
  const { date, weekDay } = getDate(language);
  const tasks = useSelector(getTasks);
  const sections: SectionsObjectType = getSections(
    PERIODS_LIST,
    tasks,
    gesturePositions
  );

  const HeadingRight = (
    <CalendarIconButton
      date={new Date()}
      color={textColors.blue}
      onPress={() => navigator.navigate('Calendar')}
    />
  );

  return (
    <ScreenLayout
      title={date}
      subtitle={weekDay}
      headingRight={HeadingRight}
      onUnmount={() => {
        dispatch(getSectionsVisibilitiesFromASAction());
        dispatch(getGesturePositionsFromASAction());
      }}
    >
      <View>
        {PERIODS_LIST.map((period) => {
          if (
            (period === EXPIRED && sections[EXPIRED].list.length === 0) ||
            (period === LATER && sections[LATER].list.length === 0)
          ) {
            return null;
          }
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
