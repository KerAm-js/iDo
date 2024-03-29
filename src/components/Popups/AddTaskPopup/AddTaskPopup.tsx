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
import { AppDispatch } from "../../../redux/types/appDispatch";
import { textColors, themeColors } from "../../../styles/global/colors";
import { languageTexts } from "../../../utils/languageTexts";
import BottomPopup from "../../Layouts/BottomPopup/BottomPopup";
import ThemeInput from "../../Layouts/Theme/Input/ThemeInput";
import CircleButton from "../../UI/buttons/CircleButton/CircleButton";
import IconButton from "../../UI/buttons/IconButton/IconButton";
import { addTaskPopupStyles } from "./styles";
import { repeat } from "../../../../assets/icons/repeat";
import ModalLayout from "../../Layouts/Modal/ModalLayout";
import {
  addTaskPopupVisibilitiesSelector,
  taskDataSelector,
  taskToEditSelector,
} from "../../../redux/selectors/popupsSelector";
import {
  toggleIsTaskRegularAction,
  setTaskPopupVisibleAction,
  setTimePopupVisibleAction,
  setReminderPopupVisibleAction,
  setDefaultTaskDataAction,
  setMessageAction,
} from "../../../redux/actions/popupsActions";
import { useKeyboard } from "../../../hooks/useKeyboard";
import { AddTaskPopupVisibleType } from "../../../redux/types/popups";
import { checkIsTaskEdited } from "../../../utils/utils";

const AddTaskPopup = () => {
  const addTaskPopupVisibilities = useSelector(
    addTaskPopupVisibilitiesSelector
  );
  const keyboardHeight = useKeyboard();
  const dispatch: AppDispatch = useDispatch();
  const visible = !!addTaskPopupVisibilities?.task;

  const close = () => {
    dispatch(setTaskPopupVisibleAction(false));
  };

  return (
    <ModalLayout visible={visible} close={close}>
      <BottomPopup visible={visible} keyboardHeight={keyboardHeight}>
        <Content addTaskPopupVisibilities={addTaskPopupVisibilities} />
      </BottomPopup>
    </ModalLayout>
  );
};

const Content: FC<{ addTaskPopupVisibilities?: AddTaskPopupVisibleType }> = ({
  addTaskPopupVisibilities,
}) => {
  const taskData = useSelector(taskDataSelector);
  const taskToEdit = useSelector(taskToEditSelector);
  const visible = !!addTaskPopupVisibilities?.task;
  const dispatch: AppDispatch = useDispatch();
  const [task, setTask] = useState<string>("");
  const [submitButtonDisabled, setSubmitButtonDisabled] =
    useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [submitButtonXml, setSubmitButtonXml] = useState(
    arrowUp(themeColors.dark.colors.text)
  );
  const taskInput = useRef<TextInput | null>(null);

  const updateTask = useCallback((text: string) => setTask(text), []);
  const updateDescription = useCallback(
    (text: string) => setDescription(text),
    []
  );

  const setDefaults = () => {
    setTask("");
    setDescription("");
    setSubmitButtonXml("");
  };

  const onSubmit = () => {
    if (task.length > 0) {
      const time =
        taskData?.time || new Date().setHours(23, 59, 59, 999).valueOf();
      const timeType = taskData?.timeType || "day";
      const remindTime = taskData?.remindTime;
      const isExpired = new Date(time) <= new Date();
      let message;
      if (taskToEdit) {
        dispatch(
          editTaskAction(
            {
              id: taskToEdit.id,
              isCompleted: taskToEdit.isCompleted,
              task,
              description,
              completionTime: taskToEdit.completionTime,
              time,
              timeType,
              isExpired: isExpired ? 1 : 0,
              remindTime,
              isRegular: taskData?.isRegular ? 1 : 0,
            },
            taskToEdit
          )
        );
        if (taskData.isRegular && !taskToEdit.isRegular) {
          message = languageTexts.notifications.regularTaskIsAdded;
        } else if (
          !taskData.isRegular &&
          taskToEdit.isRegular &&
          !taskToEdit.isExpired
        ) {
          message = languageTexts.notifications.regularTaskRemoved;
        }
      } else {
        if (taskData.isRegular) {
          message = languageTexts.notifications.regularTaskIsAdded;
        }
        dispatch(
          addTaskAction({
            id: new Date().valueOf(),
            isCompleted: 0,
            task,
            description,
            time,
            isExpired: isExpired ? 1 : 0,
            timeType,
            remindTime,
            isRegular: taskData.isRegular ? 1 : 0,
          })
        );
      }
      if (message) dispatch(setMessageAction(message));
      dispatch(setDefaultTaskDataAction());
      if (taskToEdit) {
        dispatch(setTaskPopupVisibleAction(false));
      }
      setDefaults();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const toggleIsTaskRegular = () => {
    dispatch(toggleIsTaskRegularAction());
  };

  useEffect(() => {
    if (!addTaskPopupVisibilities) {
      setTimeout(() => {
        setDefaults();
      }, 320);
    }
    if (!taskToEdit && visible) taskInput.current?.focus();
    if (submitButtonXml) {
      return;
    }
    setSubmitButtonXml(
      taskToEdit
        ? penFill(themeColors.dark.colors.text)
        : arrowUp(themeColors.dark.colors.text)
    );
  }, [addTaskPopupVisibilities]);

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit?.task || "");
      setDescription(taskToEdit?.description || "");
    }
  }, [taskToEdit]);

  useEffect(() => {
    if (!visible) return;
    if (taskToEdit) {
      const isTaskIsNotEdited = checkIsTaskEdited(taskToEdit, {
        task,
        description,
        taskData,
      });
      if (isTaskIsNotEdited || task.length === 0) {
        setSubmitButtonDisabled(true);
      } else {
        setSubmitButtonDisabled(false);
      }
    } else {
      if (task.length > 0) {
        setSubmitButtonDisabled(false);
      } else {
        setSubmitButtonDisabled(true);
      }
    }
  }, [task, description, taskData, taskData?.isRegular]);

  return (
    <React.Fragment>
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
            xml={bell(taskData?.remindTime ? textColors.blue : textColors.grey)}
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
            xml={submitButtonXml || arrowUp(themeColors.dark.colors.text)}
            size="small"
            disabled={submitButtonDisabled}
            onClick={onSubmit}
          />
        </View>
      </View>
    </React.Fragment>
  );
};

export default AddTaskPopup;
