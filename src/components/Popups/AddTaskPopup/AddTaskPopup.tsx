import React, { FC, useEffect, useRef, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { bell } from "../../../../assets/icons/bell";
import { clock, clockActive } from "../../../../assets/icons/clock";
import { penFill } from "../../../../assets/icons/penFill";
import { plus } from "../../../../assets/icons/plus";
import { repeat, repeatActive } from "../../../../assets/icons/repeat";
import {
  addTaskAction,
  chooseTaskToEditAction,
  editTaskAction,
  setDefaultTaskDataAction,
} from "../../../redux/actions/taskActions";
import { folderSelector } from "../../../redux/selectors/folderSelector";
import { taskSelector } from "../../../redux/selectors/taskSelector";
import { AppDispatch } from "../../../redux/types/appDispatch";
import {
  text14,
  text16Input,
  text17Input,
  textSemiBold,
} from "../../../styles/global/texts";
import BottomPopup from "../../Layouts/BottomPopup/BottomPopup";
import CircleButton from "../../UI/buttons/CircleButton/CircleButton";
import IconButton from "../../UI/buttons/IconButton/IconButton";
import ChooseFolderButton from "../../UI/ChooseFolderButton/ChooseFolderButton";
import { addTaskPopupStyles } from "./styles";
import { AddTaskPopupPropType } from "./types";

const AddTaskPopup: FC<AddTaskPopupPropType> = ({
  visible,
  title,
  handleKeyboard,
  openCalendar,
}) => {
  const { taskToEdit, newTaskData } = useSelector(taskSelector);
  const { folders } = useSelector(folderSelector);
  const dispatch: AppDispatch = useDispatch();
  const [task, setTask] = useState<string>("");
  const [choosedFolder, setChoosedFolder] = useState<string>(taskToEdit?.folder || "");
  const [circleButtonDisabled, setCircleButtonDisabled] =
    useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const taskInput = useRef<TextInput | null>(null);

  const setDefaults = () => {
    setTask("");
    setDescription("");
    dispatch(setDefaultTaskDataAction());
  };

  const onSubmit = () => {
    const timeData = newTaskData || {
      time: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        23,
        59,
        59,
        999
      ).valueOf(),
      timeType: "day",
    };
    if (task.length > 0) {
      dispatch(
        !!taskToEdit
          ? editTaskAction({
              id: taskToEdit.id,
              isCompleted: taskToEdit.isCompleted,
              task,
              description,
              completingTime: taskToEdit.completingTime,
              folder: choosedFolder,
              ...timeData,
            })
          : addTaskAction({
              id: `${new Date().toString()}`,
              // id: `${task}`,
              isCompleted: false,
              task,
              description,
              folder: choosedFolder,
              ...timeData,
            })
      );
      setDefaults();
      if (!!taskToEdit) {
        dispatch(chooseTaskToEditAction(undefined));
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
      const isTaskNotEdited =
        task === taskToEdit.task && description === taskToEdit.description;
      const isTimeNotEdited = newTaskData?.time === taskToEdit.time;
      if ((isTaskNotEdited && isTimeNotEdited) || task.length === 0) {
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
  }, [task, description, newTaskData]);

  return (
    <BottomPopup
      title={title}
      visible={visible}
      handleKeyboard={handleKeyboard}
    >
      <TextInput
        value={task}
        onChangeText={(text) => setTask(text)}
        multiline
        maxLength={50}
        ref={taskInput}
        placeholder="Задача"
        style={[text17Input, textSemiBold, addTaskPopupStyles.input]}
      />
      <TextInput
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
        maxLength={100}
        placeholder="Описание"
        style={[text16Input, addTaskPopupStyles.input]}
      />
      <ScrollView
        style={[addTaskPopupStyles.foldersContainer]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
      >
        {folders.map((folder, index) => (
          <ChooseFolderButton
            key={folder.id}
            title={folder.title}
            isFirst={index === 0}
            isLast={index === folders.length - 1}
            isActive={choosedFolder === folder.id}
            onPress={() => setChoosedFolder(folder.id)}
          />
        ))}
      </ScrollView>
      <View style={[addTaskPopupStyles.buttonsContainer]}>
        <View style={[addTaskPopupStyles.settingButtonContainer]}>
          <IconButton
            xml={
              newTaskData || (taskToEdit && taskToEdit.time)
                ? clockActive
                : clock
            }
            iconWidth={20}
            iconHeight={20}
            style={addTaskPopupStyles.iconButton}
            onClick={openCalendar}
          />
          <IconButton
            xml={choosedFolder === '2' ? repeatActive : repeat}
            iconWidth={20}
            iconHeight={20}
            style={addTaskPopupStyles.iconButton}
            onClick={() => setChoosedFolder('2')}
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
