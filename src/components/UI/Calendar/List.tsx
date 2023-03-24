import React, { FC, useEffect, useReducer, useRef } from "react";
import { Dimensions, FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { taskStateSelector } from "../../../redux/selectors/taskSelector";
import DateItem from "./DateItem";
import { calendarStyles } from "./styles";
import { CalendarMonthItemType, DateBusynessType, ListPropType } from "./types";

const List: FC<ListPropType> = ({
  state,
  onScrollEnd,
  date,
  reference,
  setDate,
  isCardBackgroundColor,
  pastDatesShown,
  busynessShown,
}) => {
  const { width: WIDTH } = Dimensions.get("screen");
  const { tasks } = useSelector(taskStateSelector);

  const datesObject = useRef<{
    [key: string]: DateBusynessType | undefined;
  }>({});

  useEffect(() => {
    datesObject.current = {};
    tasks.forEach((task) => {
      const key = new Date(task.time).toLocaleDateString();
      const currObj = datesObject.current[key] || {
        hasCompleted: false,
        hasExpired: false,
        hasUncompleted: false,
      };

      if (task.isExpired && !task.isCompleted) {
        datesObject.current[key] = {
          hasUncompleted: false,
          hasCompleted: false,
          hasExpired: true,
        };
      } else if (!task.isCompleted && !currObj.hasExpired) {
        datesObject.current[key] = {
          hasUncompleted: true,
          hasCompleted: false,
          hasExpired: false,
        };
      } else if (
        task.isCompleted &&
        !currObj.hasExpired &&
        !currObj.hasUncompleted
      ) {
        datesObject.current[key] = {
          ...currObj,
          hasCompleted: true,
        };
      }
    });
  }, [tasks]);

  const renderItem = ({
    item,
  }: {
    item: CalendarMonthItemType;
    index: number;
  }) => {
    return (
      <View>
        {item.map((line, lineIndex) => {
          return (
            <View
              key={lineIndex}
              style={[calendarStyles.daysContainer, { width: WIDTH }]}
            >
              {line.map((object) => (
                <DateItem
                  busynessShown={busynessShown}
                  isSelected={
                    object.date.toLocaleDateString() ===
                    date.toLocaleDateString()
                  }
                  busyness={
                    datesObject.current[object.date.toLocaleDateString()]
                  }
                  onClick={setDate}
                  key={object.date.valueOf()}
                  data={object}
                  isCardBackgroundColor={isCardBackgroundColor}
                  pastDatesShown={pastDatesShown}
                />
              ))}
            </View>
          );
        })}
      </View>
    );
  };

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
      renderItem={renderItem}
    />
  );
};

export default List;
