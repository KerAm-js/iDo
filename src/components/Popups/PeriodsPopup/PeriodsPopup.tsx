import React, { FC } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updatePeriodsAction } from "../../../redux/actions/prefsActions";
import {
  getLanguage,
  getPeriods,
} from "../../../redux/selectors/prefsSelectors";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { PERIODS_LIST } from "../../../utils/constants/periods";
import { languageTexts } from "../../../utils/languageTexts";
import BottomPopup from "../../Layouts/BottomPopup/BottomPopup";
import SwitchItem from "../../UI/PopupItems/SwitchItem";
import { SwitchPopupPropType } from "./types";

const PeriodsPopup: FC<SwitchPopupPropType> = ({ title, visible }) => {
  const periods = useSelector(getPeriods);
  const language = useSelector(getLanguage);
  const dispatch = useDispatch<AppDispatch>();
  const onStateChange = (key: string, value: boolean) => {
    dispatch(
      updatePeriodsAction({
        ...periods,
        [key]: value,
      })
    );
  };

  return (
    <BottomPopup title={title} visible={visible}>
      <View>
        {PERIODS_LIST.map((key, index) => {
          const title = languageTexts[language].periods[key];
          return (
            <SwitchItem
              key={key + index}
              title={title}
              value={periods[key]}
              onChange={(value) => onStateChange(key, value)}
            />
          );
        })}
      </View>
    </BottomPopup>
  );
};

export default PeriodsPopup;
