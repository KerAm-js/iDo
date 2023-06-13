import React, { FC } from "react";
import { View } from "react-native";
import { getDate } from "../../../utils/date";
import ScreenLayout from "../../Layouts/Screen/ScreenLayout";
import Section from "../../UI/Section/Section";
import { useDispatch, useSelector } from "react-redux";
import { getSections } from "../../../utils/section/sections";
import { useNavigation } from "@react-navigation/native";
import {
  EXPIRED,
  FOR_TODAY,
  FOR_TOMORROW,
  FOR_WEEK,
  PERIODS_LIST,
} from "../../../utils/constants/periods";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { loadSectionsVisibilitiesFromASAction } from "../../../redux/actions/interfaceActions";
import CalendarIconButton from "../../UI/buttons/IconButton/CalendarIconButton";
import { textColors } from "../../../styles/global/colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackNavigatorParamsList } from "../../Navigators/Stack/Home/types";
import { LanguageType } from "../../../redux/types/prefs";
import { taskStateSelector } from "../../../redux/selectors/taskSelector";
import { interfaceSelector } from "../../../redux/selectors/interfaceSelectors";
import { SectionsObjectType } from "./types";

const Home: FC<undefined> = () => {
  const navigator =
    useNavigation<StackNavigationProp<HomeStackNavigatorParamsList>>();
  const dispatch: AppDispatch = useDispatch();
  const { sectionsVisibilities } = useSelector(interfaceSelector);
  const { tasks, positions } = useSelector(taskStateSelector);
  const sections: SectionsObjectType = getSections(
    PERIODS_LIST,
    tasks,
    positions
  );

  const screenTitleGetter = (lang: LanguageType) => getDate(lang).date;
  const screenSubTitleGetter = (lang: LanguageType) => getDate(lang).weekDay;

  const HeadingRight = (
    <CalendarIconButton
      date={new Date()}
      color={textColors.blue}
      onPress={() => navigator.navigate("Calendar")}
    />
  );

  return (
    <ScreenLayout
      title={screenTitleGetter}
      subtitle={screenSubTitleGetter}
      headingRight={HeadingRight}
      onUnmount={() => {
        dispatch(loadSectionsVisibilitiesFromASAction());
      }}
    >
      <View>
        {sections[EXPIRED].list.length !== 0 && (
          <Section
            key={EXPIRED}
            title={sections[EXPIRED].title}
            list={sections[EXPIRED].list}
            initPositions={sections[EXPIRED].positions}
            visibilities={sectionsVisibilities[EXPIRED]}
          />
        )}
        <Section
          key={FOR_TODAY}
          title={sections[FOR_TODAY].title}
          list={sections[FOR_TODAY].list}
          initPositions={sections[FOR_TODAY].positions}
          visibilities={sectionsVisibilities[FOR_TODAY]}
        />
        <Section
          key={FOR_TOMORROW}
          title={sections[FOR_TOMORROW].title}
          list={sections[FOR_TOMORROW].list}
          initPositions={sections[FOR_TOMORROW].positions}
          visibilities={sectionsVisibilities[FOR_TOMORROW]}
        />
        <Section
          key={FOR_WEEK}
          title={sections[FOR_WEEK].title}
          list={sections[FOR_WEEK].list}
          initPositions={sections[FOR_WEEK].positions}
          visibilities={sectionsVisibilities[FOR_WEEK]}
        />
        {/* {PERIODS_LIST.map((period) => {
          if (period === EXPIRED && sections[EXPIRED].list.length === 0) {
            return null;
          }
          return (
            <Section
              key={period}
              title={sections[period].title}
              list={sections[period].list}
              initPositions={sections[period].positions}
              visibilities={sectionsVisibilities[period]}
            />
          );
        })} */}
      </View>
    </ScreenLayout>
  );
};
export default Home;
