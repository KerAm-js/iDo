import React, { FC, useEffect, useReducer, useRef } from "react";
import { Dimensions, FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { getTasks } from "../../../redux/selectors/taskSelector";
import DateItem from "./DateItem";
import { calendarStyles } from "./styles";
import { CalendarMonthItemType, ListPropType } from "./types";

const List: FC<ListPropType> = ({
  state,
  onScrollEnd,
  date,
  reference,
  setDate,
  isCardBackgroundColor,
}) => {
  const { width: WIDTH } = Dimensions.get("screen");
  const tasks = useSelector(getTasks);

  const datesObject = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    datesObject.current = {};
    tasks.forEach(
      (task) => {
        datesObject.current[new Date(task.time).toLocaleDateString()] = true
      }
    );
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
                  isSelected={
                    object.date.toLocaleDateString() ===
                    date.toLocaleDateString()
                  }
                  isBusy={datesObject.current[object.date.toLocaleDateString()]}
                  onClick={setDate}
                  key={object.date.valueOf()}
                  data={object}
                  isCardBackgroundColor={isCardBackgroundColor}
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
