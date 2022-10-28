import React, { FC, useEffect, useRef } from "react";
import { TextInput, View } from "react-native";
import { bell } from "../../../../assets/icons/bell";
import { clock } from "../../../../assets/icons/clock";
import { flag } from "../../../../assets/icons/flag";
import { plus } from "../../../../assets/icons/plus";
import { repeat } from "../../../../assets/icons/repeat";
import { text14Input, text17Input } from "../../../styles/global/texts";
import BottomPopup from "../../Layouts/BottomPopup/BottomPopup";
import CircleButton from "../../UI/buttons/CircleButton/CircleButton";
import IconButton from "../../UI/buttons/IconButton/IconButton";
import { addTaskPopupStyles } from "./styles";
import { AddTaskPopupPropType } from "./types";

const AddTaskPopup: FC<AddTaskPopupPropType> = ({ visible, title, handleKeyboard }) => {

  const taskInput = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      taskInput.current?.focus();
    }
  }, [visible])

  return (
    <BottomPopup title={title} visible={visible} handleKeyboard={handleKeyboard}>
      <TextInput ref={(ref) => taskInput.current = ref} placeholder="Задача" style={[ text17Input, addTaskPopupStyles.input ]} />
      <TextInput placeholder="Описание" style={[ text14Input, addTaskPopupStyles.input ]} />
      <View style={[ addTaskPopupStyles.buttonsContainer ]}>
        <View style={[ addTaskPopupStyles.settingButtonContainer ]}>
          <IconButton xml={clock} iconWidth={20} iconHeight={20} style={addTaskPopupStyles.iconButton} />
          <IconButton xml={flag} iconWidth={20} iconHeight={20} style={addTaskPopupStyles.iconButton} />
          <IconButton xml={repeat} iconWidth={30} iconHeight={30} style={addTaskPopupStyles.iconButton} />
          <IconButton xml={bell} iconWidth={20} iconHeight={20} style={addTaskPopupStyles.iconButton} />
        </View>
        <CircleButton xml={plus} size="small" onClick={() => console.log('ok')} />
      </View>
    </BottomPopup>
  )
}

export default AddTaskPopup;