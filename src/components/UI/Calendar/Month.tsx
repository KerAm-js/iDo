import { View } from "react-native";
import { MonthPropType } from "./types";
import { FC } from "react";
import Week from "./Week";
import { FlatList } from "react-native-gesture-handler";

const Month: FC<MonthPropType> = ({
  item,
  busynessShown,
  pastDatesShown,
  isCardBackgroundColor,
  datesObject,
  setDate,
  date
}) => {
  return (
    <View>
      <FlatList
        data={item}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Week
            datesObject={datesObject}
            pastDatesShown={pastDatesShown}
            line={item}
            busynessShown={busynessShown}
            isCardBackgroundColor={isCardBackgroundColor}
            date={date}
            setDate={setDate}
          />
        )}
      />
    </View>
  );
};

export default Month;
