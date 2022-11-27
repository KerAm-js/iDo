import { useEffect, useState } from "react";
import { isToday } from "../utils/date";
import { hoursRegex, miniutesRegex } from "../utils/regex";

export const useTimeValidation = (
  date: Date
): [string, (value: string) => void, (value: string) => void, boolean, boolean] => {
  const [time, setTime] = useState<string>("");
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const onChange = (value: string) => {
    let newString = value;

    if (time.length === 1 && value.length === 2) {
      newString = value + ":";
    } else if (time.length === 3 && value.length === 2) {
      newString = value[0];
    }

    const hours = newString.slice(0, 2);
    const minutes = newString.slice(3, 5);
    const isHoursValid = hoursRegex.test(hours);
    const isMinutesValid =  miniutesRegex.test(minutes);

    if ((hours.length > 0 && !isHoursValid) || (minutes.length > 0 && !isMinutesValid)) {
      return;
    }

    setTime(newString);
  };

  useEffect(() => {
    const isCurrDay = isToday(date);
    const hours = time.slice(0, 2);
    const minutes = time.slice(3, 5);

    if (hours.length === 2) {
      const isExpiredTime =
        new Date().setSeconds(0, 0) >=
        new Date().setHours(Number(hours), Number(minutes || 0), 0, 0);

      if (isCurrDay && isExpiredTime) {
        setIsExpired(true);
      } else if (isExpired) {
        setIsExpired(false);
      }
    }

    const isTimeCorrect =
      !(isNaN(Number(hours)) && isNaN(Number(minutes))) &&
      hours.length === 2 &&
      minutes.length === 2;
    
    setIsValid(isTimeCorrect && time.length === 5);

  }, [time, date]);

  return [time, setTime, onChange, isValid, isExpired];
};
