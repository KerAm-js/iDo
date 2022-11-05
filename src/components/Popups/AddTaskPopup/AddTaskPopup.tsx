import React, { FC, useEffect, useRef, useState } from "react";
import { TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { bell } from "../../../../assets/icons/bell";
import { clock } from "../../../../assets/icons/clock";
import { flag } from "../../../../assets/icons/flag";
import { penFill } from "../../../../assets/icons/penFill";
import { plus } from "../../../../assets/icons/plus";
import { repeat } from "../../../../assets/icons/repeat";
import {
  addTaskAction,
  chooseTaskToEdit,
  editTaskAction,
} from "../../../redux/actions/taskActions";
import { taskSelector } from "../../../redux/selectors/taskSelector";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { text14Input, text17Input } from "../../../styles/global/texts";
import BottomPopup from "../../Layouts/BottomPopup/BottomPopup";
import CircleButton from "../../UI/buttons/CircleButton/CircleButton";
import IconButton from "../../UI/buttons/IconButton/IconButton";
import { addTaskPopupStyles } from "./styles";
import { AddTaskPopupPropType } from "./types";

const AddTaskPopup: FC<AddTaskPopupPropType> = ({
  visible,
  title,
  handleKeyboard,
  openCalendar,
}) => {
  const { taskToEdit } = useSelector(taskSelector);
  const dispatch: AppDispatch = useDispatch();
  const [task, setTask] = useState<string>("");
  const [circleButtonDisabled, setCircleButtonDisabled] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const taskInput = useRef<TextInput | null>(null);

  const setDefaults = () => {
    setTask("");
    setDescription("");
  };

  const onSubmit = () => {
    if (task.length > 0) {
      dispatch(
        !!taskToEdit
          ? editTaskAction({
              id: taskToEdit.id,
              isCompleted: taskToEdit.isCompleted,
              task,
              description,
            })
          : addTaskAction({
              id: `${new Date().toString()}`,
              isCompleted: false,
              task,
              description,
            })
      );
      setDefaults();
      if (!!taskToEdit) {
        dispatch(chooseTaskToEdit(undefined));
      }
    }
  };

  useEffect(() => {
    if (visible && !taskToEdit) {
      taskInput.current?.focus();
    }
  }, [visible]);

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit?.task || "");
      setDescription(taskToEdit?.description || "");
    } else {
      setDefaults();
    }
  }, [taskToEdit]);

  useEffect(() => {
    if (!!taskToEdit) {
      if ((task === taskToEdit.task && description === taskToEdit.description) || task.length === 0) {
        setCircleButtonDisabled(true);
      } else {
        setCircleButtonDisabled(false);
      }
    } else {
      if (task.length > 0) {
        setCircleButtonDisabled(false);
      } else {
        setCircleButtonDisabled(true);
      }
    }
  }, [task, description])

  return (
    <BottomPopup
      title={title}
      visible={visible}
      handleKeyboard={handleKeyboard}
    >
      <TextInput
        value={task}
        onChangeText={(text) => setTask(text)}
        ref={taskInput}
        placeholder="Задача"
        style={[text17Input, addTaskPopupStyles.input]}
      />
      <TextInput
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="Описание"
        style={[text14Input, addTaskPopupStyles.input]}
      />
      <View style={[addTaskPopupStyles.buttonsContainer]}>
        <View style={[addTaskPopupStyles.settingButtonContainer]}>
          <IconButton
            xml={clock}
            iconWidth={20}
            iconHeight={20}
            style={addTaskPopupStyles.iconButton}
            onClick={openCalendar}
          />
          <IconButton
            xml={flag}
            iconWidth={20}
            iconHeight={20}
            style={addTaskPopupStyles.iconButton}
          />
          <IconButton
            xml={repeat}
            iconWidth={30}
            iconHeight={30}
            style={addTaskPopupStyles.iconButton}
          />
          <IconButton
            xml={bell}
            iconWidth={20}
            iconHeight={20}
            style={addTaskPopupStyles.iconButton}
          />
        </View>
        <CircleButton
          xml={!!taskToEdit ? penFill : plus}
          size="small"
          disabled={circleButtonDisabled}
          onClick={onSubmit}
        />
      </View>
    </BottomPopup>
  );
};

export default AddTaskPopup;
