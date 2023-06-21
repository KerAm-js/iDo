import React, { FC } from "react";
import { Dimensions, FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { tasksSelector } from "../../../redux/selectors/taskSelector";
import { calendarStyles } from "./styles";
import { DatesObjetType, ListPropType } from "./types";
import Month from "./Month";

const List: FC<ListPropType> = ({
  date,
  setDate,
  state,
  onScrollEnd,
  reference,
  isCardBackgroundColor,
  pastDatesShown,
  busynessShown,
}) => {
  const { width: WIDTH } = Dimensions.get("screen");
  const tasks = useSelector(tasksSelector);

  const datesObject: DatesObjetType = {};

  tasks.forEach((task) => {
    const key = new Date(task.time).toLocaleDateString();
    const currObj = datesObject[key] || {
      hasCompleted: false,
      hasExpired: false,
      hasUncompleted: false,
    };

    if (task.isExpired && !task.isCompleted) {
      datesObject[key] = {
        hasUncompleted: false,
        hasCompleted: false,
        hasExpired: true,
      };
    } else if (!task.isCompleted && !currObj.hasExpired) {
      datesObject[key] = {
        hasUncompleted: true,
        hasCompleted: false,
        hasExpired: false,
      };
    } else if (
      task.isCompleted &&
      !currObj.hasExpired &&
      !currObj.hasUncompleted
    ) {
      datesObject[key] = {
        ...currObj,
        hasCompleted: true,
      };
    }
  });

  return (
    <FlatList
      getItemLayout={(_, index) => ({
        length: WIDTH,
        offset: WIDTH * index,
        index,
      })}
      ref={reference}
      data={state}
      keyExtractor={(_, index) => index.toString()}
      style={[calendarStyles.srollView]}
      horizontal
      pagingEnabled
      initialNumToRender={1}
      showsHorizontalScrollIndicator={false}
      maxToRenderPerBatch={5}
      onMomentumScrollEnd={onScrollEnd}
      renderItem={({ item }) => (
        <Month
          pastDatesShown={pastDatesShown}
          isCardBackgroundColor={isCardBackgroundColor}
          item={item}
          busynessShown={busynessShown}
          datesObject={datesObject}
          date={date}
          setDate={setDate}
        />
      )}
    />
  );
};

export default List;
