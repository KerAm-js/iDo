import React, { FC, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  View,
} from "react-native";
import DateItem from "./DateItem";
import { calendarStyles } from "./styles";
import { CalendarMonthItemType, ListPropType } from "./types";

const List: FC<ListPropType> = ({ state, onScroll, date, reference, setDate }) => {
  const { width: WIDTH } = Dimensions.get("screen");

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
                  onClick={setDate}
                  key={object.date.valueOf()}
                  data={object}
                />
              ))}
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <FlatList
      getItemLayout={(_, index) => (
        {length: WIDTH, offset: WIDTH * index, index}
      )}
      ref={reference}
      data={state}
      keyExtractor={(_, index) => index.toString()}
      style={[calendarStyles.srollView]}
      horizontal
      pagingEnabled
      initialNumToRender={3}
      showsHorizontalScrollIndicator={false}
      maxToRenderPerBatch={5}
      onMomentumScrollEnd={onScroll}
      renderItem={renderItem}
    />
  );
};

export default List;
