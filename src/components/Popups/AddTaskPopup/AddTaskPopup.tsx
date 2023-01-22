import React, { FC, useEffect, useRef, useState } from "react";
import * as Haptics from "expo-haptics";
import { Alert, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { arrowUp } from "../../../../assets/icons/arrowUp";
import { bell } from "../../../../assets/icons/bell";
import { clock } from "../../../../assets/icons/clock";
import { penFill } from "../../../../assets/icons/penFill";
import {
  addTaskAction,
  editTaskAction,
  setDefaultNewTaskDataAction,
  setIsNewTaskRegularAction,
  updateNewTaskTimeAction,
} from "../../../redux/actions/taskActions";
import { getLanguage } from "../../../redux/selectors/prefsSelectors";
import { taskStateSelector } from "../../../redux/selectors/taskSelector";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { textColors, themeColors } from "../../../styles/global/colors";
import {
  text16Input,
  text17Input,
  textSemiBold,
} from "../../../styles/global/texts";
import { languageTexts } from "../../../utils/languageTexts";
import BottomPopup from "../../Layouts/BottomPopup/BottomPopup";
import ThemeInput from "../../Layouts/Theme/Input/ThemeInput";
import CircleButton from "../../UI/buttons/CircleButton/CircleButton";
import IconButton from "../../UI/buttons/IconButton/IconButton";
import { addTaskPopupStyles } from "./styles";
import { AddTaskPopupPropType } from "./types";
import { repeat } from "../../../../assets/icons/repeat";

const AddTaskPopup: FC<AddTaskPopupPropType> = ({
  visible,
  title,
  handleKeyboard,
  openCalendar,
  openReminderModal,
  setDefaultsFlag,
}) => {
  const language = useSelector(getLanguage);
  const { taskToEdit, newTaskData, calendarChoosedDate } =
    useSelector(taskStateSelector);
  const dispatch: AppDispatch = useDispatch();
  const [task, setTask] = useState<string>("");
  const [choosedFolder, setChoosedFolder] = useState<number | undefined>(
    undefined
  );
  const [circleButtonDisabled, setCircleButtonDisabled] =
    useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const taskInput = useRef<TextInput | null>(null);

  const setDefaults = () => {
    setTask("");
    setDescription("");
    setChoosedFolder(undefined);
  };

  const onSubmit = () => {
    const time =
      newTaskData.time || new Date().setHours(23, 59, 59, 999).valueOf();
    const timeType = newTaskData.timeType || "day";
    const remindTime = newTaskData.remindTime;
    const isExpired = new Date(time) <= new Date();
    if (task.length > 0) {
      dispatch(
        !!taskToEdit
          ? editTaskAction(
              {
                id: taskToEdit.id,
                isCompleted: taskToEdit.isCompleted,
                task,
                description,
                completionTime: taskToEdit.completionTime,
                folderId: choosedFolder,
                time,
                timeType,
                isExpired: isExpired ? 1 : 0,
                remindTime,
                isRegular: newTaskData.isRegular ? 1 : 0,
              },
              taskToEdit
            )
          : addTaskAction(
              {
                id: new Date().valueOf(),
                isCompleted: 0,
                task,
                description,
                folderId: choosedFolder,
                time,
                isExpired: isExpired ? 1 : 0,
                timeType,
                remindTime,
                isRegular: newTaskData.isRegular ? 1 : 0,
              }
            )
      );
      setDefaults();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const updateFolder = (id: number | undefined) => {
    setChoosedFolder(choosedFolder === id ? undefined : id);
  };

  const openReminderHandler = () => {
    if (newTaskData.time && newTaskData.timeType) {
      openReminderModal();
    } else {
      Alert.alert(
        languageTexts[language].alerts.taskTimeIsNotChoosen.title,
        "",
        [
          {
            text: languageTexts[language].words.ok,
            style: "default",
          },
        ]
      );
    }
  };

  const toggleIsTaskRegular = () => {
    updateFolder(newTaskData.isRegular ? undefined : 2);
    dispatch(setIsNewTaskRegularAction(!newTaskData.isRegular));
  };

  useEffect(() => {
    if (visible && !taskToEdit) {
      taskInput.current?.focus();
      if (!newTaskData.time)
        dispatch(
          updateNewTaskTimeAction(new Date().setHours(23, 59, 59, 999), "day")
        );
    }
    if (!visible && setDefaultsFlag.current) {
      setDefaults();
      if (!calendarChoosedDate) dispatch(setDefaultNewTaskDataAction());
    }
  }, [visible]);

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit?.task || "");
      setDescription(taskToEdit?.description || "");
      setChoosedFolder(taskToEdit?.folderId || undefined);
    }
  }, [taskToEdit]);

  useEffect(() => {
    if (!!taskToEdit) {
      const isTaskIsNotEdited =
        task === taskToEdit.task &&
        description === taskToEdit.description &&
        newTaskData?.time === taskToEdit.time &&
        newTaskData?.remindTime === taskToEdit.remindTime &&
        newTaskData?.isRegular === Boolean(taskToEdit.isRegular);

      if (isTaskIsNotEdited || task.length === 0) {
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
  }, [task, description, choosedFolder, newTaskData, newTaskData.isRegular]);

  return (
    <BottomPopup
      title={title}
      visible={visible}
      handleKeyboard={handleKeyboard}
    >
      <ThemeInput
        value={task}
        onChangeText={(text) => setTask(text)}
        multiline
        maxLength={150}
        reference={taskInput}
        placeholder={languageTexts[language].words.task}
        style={[text17Input, textSemiBold, addTaskPopupStyles.input]}
      />
      <ThemeInput
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
        maxLength={500}
        placeholder={languageTexts[language].words.description}
        style={[text16Input, addTaskPopupStyles.input]}
      />
      {/* <ScrollView
        style={[addTaskPopupStyles.foldersContainer]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {folders.map((folder, index) => (
          <ChooseFolderButton
            key={folder.id}
            title={folder.title}
            isFirst={index === 0}
            isLast={index === folders.length - 1}
            isActive={choosedFolder === folder.id}
            onPress={() => updateFolder(folder.id)}
          />
        ))}
      </ScrollView> */}
      <View style={[addTaskPopupStyles.buttonsContainer]}>
        <View style={[addTaskPopupStyles.buttonsGroup]}>
          <IconButton
            xml={clock(
              (newTaskData.time && newTaskData.timeType) ||
                (taskToEdit && taskToEdit.time)
                ? textColors.blue
                : textColors.grey
            )}
            iconWidth={20}
            iconHeight={20}
            style={addTaskPopupStyles.iconButton}
            onClick={openCalendar}
          />
          <IconButton
            xml={bell(
              newTaskData.remindTime ? textColors.blue : textColors.grey
            )}
            iconWidth={20}
            iconHeight={20}
            style={addTaskPopupStyles.iconButton}
            onClick={openReminderHandler}
          />
          <IconButton
            xml={repeat(
              newTaskData.isRegular ? textColors.blue : textColors.grey
            )}
            iconWidth={20}
            iconHeight={20}
            style={addTaskPopupStyles.iconButton}
            onClick={toggleIsTaskRegular}
          />
        </View>
        <View style={[addTaskPopupStyles.buttonsGroup]}>
          <CircleButton
            xml={
              !!taskToEdit
                ? penFill(themeColors.dark.colors.text)
                : arrowUp(themeColors.dark.colors.text)
            }
            size="small"
            disabled={circleButtonDisabled}
            onClick={onSubmit}
          />
        </View>
      </View>
    </BottomPopup>
  );
};

export default AddTaskPopup;
