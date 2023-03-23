import { TaskType } from "./../types/task";
import {
  COMPLETE_TASK,
  DELETE_TASK,
  EDIT_TASK,
  SET_TASK_EXPIRATION,
  UPDATE_TASKS,
  UPDATE_POSITIONS,
} from "./../constants/task";
import { Dispatch } from "@reduxjs/toolkit";
import { ADD_TASK } from "../constants/task";
import { LocalDB } from "../../backend/sqlite/sqlite";
import {
  deleteAllNotifications,
  deleteNotification,
  presentNotification,
  setNotification,
} from "../../native/notifications";
import { store } from "../store";
import { getNextDate, toLocaleStateString } from "../../utils/date";
import { ListObject } from "../../types/global/ListObject";
import { getPositionsFromAS } from "../../backend/asyncStorage/positions";
import { languageTexts } from "../../utils/languageTexts";
import { getAutoReminderSetting } from "./prefsActions";

export const scheduleTaskExpiration = (
  task: TaskType,
  dispatch: Dispatch,
  isInit?: boolean
) => {
  try {
    if (!task.isExpired) {
      const currTime = new Date().valueOf();
      const isCompletedInTime =
        task.isCompleted &&
        task.completionTime &&
        task.completionTime < task.time;

      if (!isCompletedInTime && task.time <= currTime) {
        LocalDB.setTaskExpiration(task.id);
        if (task.isRegular && !task.completionTime) {
          addRegularTask(dispatch, task);
        }
        if (isInit) {
          return 1;
        } else {
          dispatch({ type: SET_TASK_EXPIRATION, id: task.id });
        }
      } else {
        const timeDiff = task.time - currTime;
        setTimeout(() => {
          const currentTask = store.getState().tasks.tasks.find((item) => {
            return item.id === task.id;
          });
          if (currentTask) {
            const isCurrTaskCompletedInTime =
              currentTask.isCompleted &&
              currentTask.completionTime &&
              currentTask.completionTime < currentTask.time;
            const isExpired =
              !currentTask.isExpired &&
              task.time === currentTask.time &&
              !isCurrTaskCompletedInTime;
            const isTaskNotUpdated =
              currentTask.task === task.task &&
              currentTask.description === task.description &&
              currentTask.remindTime === task.remindTime &&
              currentTask.time === task.time &&
              currentTask.timeType === task.timeType &&
              currentTask.folderId === task.folderId;

            if (
              currentTask.isRegular &&
              isTaskNotUpdated &&
              !currentTask.completionTime
            ) {
              addRegularTask(dispatch, currentTask);
            }
            if (isExpired) {
              LocalDB.setTaskExpiration(currentTask?.id);
              dispatch({ type: SET_TASK_EXPIRATION, id: currentTask.id });
            }
          }
        }, timeDiff);
      }
    }
    return 0;
  } catch (error) {
    console.log("scheduleTaskExpiration", error);
  }
};

export const loadTasksFromLocalDB = () => async (dispatch: Dispatch) => {
  try {
    const lowerBoundOfDate = new Date().setDate(1);
    const tasks = await LocalDB.getTasks(lowerBoundOfDate);
    await deleteAllNotifications();
    const notificationsUpdatedTasks = await Promise.all(
      tasks.map(async (task) => {
        const isExpired =
          task.isExpired || scheduleTaskExpiration(task, dispatch, true);
        if (task.isCompleted) {
          return task;
        }
        const notificationId = await scheduleReminder(
          task,
          task.notificationId
        );
        return {
          ...task,
          notificationId,
          isExpired,
        };
      })
    );
    notificationsUpdatedTasks.reverse();
    dispatch({ type: UPDATE_TASKS, tasks: notificationsUpdatedTasks });
  } catch (error) {
    console.log("getTasksFromLocalDB", error);
  }
};

export const scheduleReminder = async (
  task: TaskType,
  oldNotificationId?: string
): Promise<string | undefined> => {
  try {
    if (oldNotificationId) {
      await deleteNotification(oldNotificationId);
    }
    if (task.remindTime) {
      const currentDate = new Date().valueOf();
      const notificationTime = Math.round(
        (task.remindTime - currentDate) / 1000
      );
      const { language } = store.getState().prefs;
      if (notificationTime > 0) {
        const notificationId = await setNotification(
          task.task,
          "",
          `${toLocaleStateString({
            defaultDate: task.remindTime,
            dateValue: task.time,
            timeType: task.timeType,
            language,
          })}`,
          notificationTime
        );
        return notificationId;
      }
    }
  } catch (error) {
    console.log("scheduleReminder", error);
  }
};

export const addRegularTask = async (
  dipatch: Dispatch,
  task: TaskType,
  isTaskAddingAnimated?: boolean
) => {
  try {
    const time = getNextDate(task.time);
    const remindTime = task.remindTime
      ? getNextDate(task.remindTime)
      : undefined;
    const regularTask: TaskType = {
      ...task,
      time,
      remindTime,
      isRegular: 1,
      completionTime: undefined,
      isCompleted: 0,
      isExpired: time > new Date().valueOf() ? 0 : 1,
    };
    await addTask(dipatch, regularTask, !!isTaskAddingAnimated);
  } catch (error) {
    console.log("addRegularTask");
  }
};

export const addTask = async (
  dispath: Dispatch,
  addedTask: TaskType,
  isTaskAddingAnimated?: boolean
) => {
  try {
    const taskId = await LocalDB.addTask(addedTask);
    if (taskId) {
      addedTask.id = taskId;
      scheduleTaskExpiration(addedTask, dispath);
      const notificationId = await scheduleReminder(addedTask);
      addedTask.notificationId = notificationId;
      dispath({
        type: ADD_TASK,
        task: addedTask,
        isTaskAddingAnimated,
        autoReminder: getAutoReminderSetting(),
      });
    }
  } catch (error) {
    console.log('addTask', error)
  }
};

export const addTaskAction = (task: TaskType) => async (dispath: Dispatch) => {
  try {
    const addedTask: TaskType = { ...task };
    await addTask(dispath, addedTask, true);
    if (addedTask.isRegular) {
      if (addedTask.isExpired) {
        setTimeout(() => addRegularTask(dispath, addedTask), 500);
      }
      const { language } = store.getState().prefs;
      const { title, body } = languageTexts.notifications.regularTaskIsAdded;
      presentNotification(
        title[language],
        `"${addedTask.task}"`,
        body[language]
      );
    }
  } catch (error) {
    console.log("addTaskAction", error);
  }
};

export const editTaskAction =
  (editedTask: TaskType, prevTask: TaskType) => async (dispatch: Dispatch) => {
    try {
      await LocalDB.editTask(editedTask);
      const { language } = store.getState().prefs;
      if (editedTask.isRegular && !prevTask.isRegular) {
        const { title, body } = languageTexts.notifications.regularTaskIsAdded;
        presentNotification(
          title[language],
          `"${editedTask.task}"`,
          body[language]
        );
      } else if (
        !editedTask.isRegular &&
        prevTask.isRegular &&
        !prevTask.isExpired
      ) {
        const { title } = languageTexts.notifications.regularTaskRemoved;
        presentNotification(title[language], `"${editedTask.task}"`, "");
      }
      scheduleTaskExpiration(editedTask, dispatch);
      const notificationId = await scheduleReminder(
        editedTask,
        prevTask.notificationId
      );
      dispatch({
        type: EDIT_TASK,
        task: { ...editedTask, notificationId },
        autoReminder: getAutoReminderSetting(),
      });
    } catch (error) {
      console.log("editTaskAction", error);
    }
  };

export const deleteTaskAction =
  (task: TaskType) => async (dispatch: Dispatch) => {
    try {
      await LocalDB.deleteTask(task.id);
      const { language } = store.getState().prefs;
      if (task.notificationId) {
        await deleteNotification(task.notificationId);
      }
      if (task.isRegular && !task.isExpired && !task.completionTime) {
        const { title } = languageTexts.notifications.regularTaskRemoved;
        presentNotification(title[language], "", `"${task.task}"`);
      }
      dispatch({ type: DELETE_TASK, task });
    } catch (error) {
      console.log("deleteTaskAction", error);
    }
  };

export const checkNotificationDisabling = async (
  task: TaskType,
  isCompleted: number
): Promise<string | undefined> => {
  let notificationId: string | undefined = undefined;
  const hasReminder = task.remindTime && task.remindTime > new Date().valueOf();
  if (isCompleted) {
    if (hasReminder && task.notificationId) {
      deleteNotification(task.notificationId);
    }
    notificationId = undefined;
  } else if (hasReminder) {
    const newNotificationId = await scheduleReminder(task, task.notificationId);
    notificationId = newNotificationId;
  }
  return notificationId;
};

export const completeTaskAction =
  (task: TaskType) => async (dispatch: Dispatch) => {
    try {
      const isCompleted = task.isCompleted ? 0 : 1;
      const completionTime = isCompleted
        ? new Date().valueOf()
        : task.completionTime || null;
      const isExpired = isCompleted
        ? task.isExpired
        : new Date().valueOf() > task.time
        ? 1
        : 0;
      const notificationId = await checkNotificationDisabling(
        task,
        isCompleted
      );
      dispatch({
        type: COMPLETE_TASK,
        id: task.id,
        notificationId,
        isCompleted,
        isExpired,
        completionTime,
      });
      LocalDB.completeTask(task.id, isCompleted, isExpired, completionTime);
      if (
        isCompleted &&
        task.isRegular &&
        !task.completionTime &&
        !task.isExpired
      ) {
        addRegularTask(dispatch, task);
      }
    } catch (error) {
      console.log("completeTaskAction", error);
    }
  };

export const updatePositionsAction =
  (positions: ListObject) => (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_POSITIONS, positions });
  };

export const loadPositionsFromASAction = () => async (dispatch: Dispatch) => {
  const positions = await getPositionsFromAS();
  if (positions) {
    dispatch({ type: UPDATE_POSITIONS, positions });
  }
};
