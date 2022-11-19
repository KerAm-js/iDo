import React, { FC } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from "react-native";
import DateItem from "./DateItem";
import { calendarStyles } from "./styles";
import { CalendarMonthItemType } from "./types";

const List: FC<{
  state: Array<CalendarMonthItemType>;
  date: Date;
  setDate: (date: Date) => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}> = ({ state, onScroll, date, setDate }) => {
  const { width: WIDTH } = Dimensions.get("screen");
  return (
    <FlatList
      data={state}
      keyExtractor={(_, index) => index.toString()}
      style={[calendarStyles.srollView]}
      horizontal
      pagingEnabled
      initialNumToRender={5}
      showsHorizontalScrollIndicator={false}
      maxToRenderPerBatch={5}
      onMomentumScrollEnd={onScroll}
      renderItem={({
        item,
      }: {
        item: CalendarMonthItemType;
        index: number;
      }) => {
        return (
          <View>
            {item.map((line, index) => {
              return (
                <View
                  key={index}
                  style={[calendarStyles.daysContainer, { width: WIDTH }]}
                >
                  {line.map((object) => (
                    <DateItem
                      isSelected={
                        object.date.toLocaleDateString() ===
                        date.toLocaleDateString()
                      }
                      onClick={(date) => setDate(date)}
                      key={object.date.valueOf()}
                      data={object}
                    />
                  ))}
                </View>
              );
            })}
          </View>
        );
      }}
    />
  );
};

export default List;
