import { FC } from "react";
import { DayType, WeekPropType } from "./types";
import { Dimensions, View } from "react-native";
import { calendarStyles } from "./styles";
import Day from "./Day";
import { useSelector } from "react-redux";
import { calendarChoosedDateSelector } from "../../../redux/selectors/popupsSelector";

const Week: FC<WeekPropType> = ({
  line,
  busynessShown,
  datesObject,
  isCardBackgroundColor,
  pastDatesShown,
  setDate,
  date,
}) => {
  const { width: WIDTH } = Dimensions.get("screen");
  const choosedDate = useSelector(calendarChoosedDateSelector);
  return (
    <View style={[calendarStyles.daysContainer, { width: WIDTH }]}>
      {line.map((object: DayType) => {
        if (date?.toLocaleDateString() === object.date.toLocaleDateString())
          console.log(object, object.date.toLocaleDateString());
        return (
          <Day
            busynessShown={busynessShown}
            busyness={datesObject[object.date.toLocaleDateString()]}
            key={object.date.valueOf()}
            data={object}
            isChoosed={Boolean(
              date
                ? date.toLocaleDateString() === object.date.toLocaleDateString()
                : choosedDate &&
                    new Date(choosedDate).toLocaleDateString() ===
                      object.date.toLocaleDateString()
            )}
            isCardBackgroundColor={isCardBackgroundColor}
            pastDatesShown={pastDatesShown}
            date={date}
            setDate={setDate}
          />
        );
      })}
    </View>
  );
};

export default Week;
