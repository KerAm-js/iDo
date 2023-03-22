import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import * as Haptics from "expo-haptics";
import { TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { arrowUp } from "../../../../assets/icons/arrowUp";
import { bell } from "../../../../assets/icons/bell";
import { clock } from "../../../../assets/icons/clock";
import { penFill } from "../../../../assets/icons/penFill";
import {
  addTaskAction,
  editTaskAction,
} from "../../../redux/actions/taskActions";
import { taskStateSelector } from "../../../redux/selectors/taskSelector";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { textColors, themeColors } from "../../../styles/global/colors";
import { languageTexts } from "../../../utils/languageTexts";
import BottomPopup from "../../Layouts/BottomPopup/BottomPopup";
import ThemeInput from "../../Layouts/Theme/Input/ThemeInput";
import CircleButton from "../../UI/buttons/CircleButton/CircleButton";
import IconButton from "../../UI/buttons/IconButton/IconButton";
import { addTaskPopupStyles } from "./styles";
import { AddTaskPopupPropType } from "./types";
import { repeat } from "../../../../assets/icons/repeat";
import ModalLayout from "../../Layouts/Modal/ModalLayout";
import { popupsSelector } from "../../../redux/selectors/popupsSelector";
import {
  setDefaultTaskDataAction,
  toggleIsTaskRegularAction,
  setTaskPopupVisibleAction,
  setTimePopupVisibleAction,
  setReminderPopupVisibleAction,
} from "../../../redux/actions/popupsActions";

const AddTaskPopup: FC<AddTaskPopupPropType> = () => {
  const { calendarChoosedDate } = useSelector(taskStateSelector);
  const { addTaskPopupVisibilities, taskToEdit, taskData } =
    useSelector(popupsSelector);
  const visible = !!addTaskPopupVisibilities?.task;
  const dispatch: AppDispatch = useDispatch();
  const [task, setTask] = useState<string>("");
  const [choosedFolder, setChoosedFolder] = useState<number | undefined>(
    undefined
  );
  const [circleButtonDisabled, setCircleButtonDisabled] =
    useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const taskInput = useRef<TextInput | null>(null);

  const updateTask = useCallback((text: string) => setTask(text), []);
  const updateDescription = useCallback(
    (text: string) => setDescription(text),
    []
  );

  const setDefaults = () => {
    setTask("");
    setDescription("");
    setChoosedFolder(undefined);
  };

  const onSubmit = () => {
    const time =
      taskData?.time || new Date().setHours(23, 59, 59, 999).valueOf();
    const timeType = taskData?.timeType || "day";
    const remindTime = taskData?.remindTime;
    const isExpired = new Date(time) <= new Date();
    if (task.length > 0) {
      dispatch(
        taskToEdit
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
                isRegular: taskData?.isRegular ? 1 : 0,
              },
              taskToEdit
            )
          : addTaskAction({
              id: new Date().valueOf(),
              isCompleted: 0,
              task,
              description,
              folderId: choosedFolder,
              time,
              isExpired: isExpired ? 1 : 0,
              timeType,
              remindTime,
              isRegular: taskData?.isRegular ? 1 : 0,
            })
      );
      setDefaults();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const updateFolder = (id: number | undefined) => {
    setChoosedFolder(choosedFolder === id ? undefined : id);
  };

  const toggleIsTaskRegular = () => {
    updateFolder(taskData?.isRegular ? undefined : 2);
    dispatch(toggleIsTaskRegularAction());
  };

  useEffect(() => {
    if (visible && !taskToEdit) {
      taskInput.current?.focus();
      console.log("ok");
    }
    if (!visible && !addTaskPopupVisibilities) {
      setDefaults();
      if (!calendarChoosedDate) dispatch(setDefaultTaskDataAction());
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
    if (taskToEdit) {
      const isTaskIsNotEdited =
        task === taskToEdit.task &&
        description === taskToEdit.description &&
        taskData?.time === taskToEdit.time &&
        taskData?.remindTime === taskToEdit.remindTime &&
        taskData?.isRegular === !!taskToEdit.isRegular;

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
  }, [task, description, choosedFolder, taskData, taskData?.isRegular]);

  const close = () => dispatch(setTaskPopupVisibleAction(false));

  return (
    <ModalLayout visible={visible} close={close}>
      <BottomPopup visible={visible} handleKeyboard={true}>
        <ThemeInput
          value={task}
          onChangeText={updateTask}
          multiline
          maxLength={150}
          reference={taskInput}
          langPlaceholder={languageTexts.words.task}
          style={addTaskPopupStyles.taskInput}
        />
        <ThemeInput
          value={description}
          onChangeText={updateDescription}
          multiline
          maxLength={500}
          langPlaceholder={languageTexts.words.description}
          style={addTaskPopupStyles.input}
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
                (taskData?.time && taskData?.timeType) || taskToEdit
                  ? textColors.blue
                  : textColors.grey
              )}
              iconWidth={20}
              iconHeight={20}
              style={addTaskPopupStyles.iconButton}
              onClick={() => dispatch(setTimePopupVisibleAction(true))}
            />
            <IconButton
              xml={bell(
                taskData?.remindTime ? textColors.blue : textColors.grey
              )}
              iconWidth={20}
              iconHeight={20}
              style={addTaskPopupStyles.iconButton}
              onClick={() => dispatch(setReminderPopupVisibleAction(true))}
            />
            <IconButton
              xml={repeat(
                taskData?.isRegular ? textColors.blue : textColors.grey
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
    </ModalLayout>
  );
};

export default AddTaskPopup;
