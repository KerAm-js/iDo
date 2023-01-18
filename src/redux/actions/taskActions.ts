import { HabitType, TaskType, TimeType } from "./../types/task";
import {
  CHOOSE_TASK_TO_EDIT,
  COMPLETE_TASK,
  DELETE_TASK,
  EDIT_TASK,
  UPDATE_TASK_TIME,
  UPDATE_TASK_REMIND_TIME,
  SET_TASK_EXPIRATION,
  UPDATE_TASKS,
  SET_DEFAULT_NEW_TASK_DATA,
  CALENDAR_CHOOSED_DATE,
  CLEAR_REMINDER,
  UPDATE_POSITIONS,
  SET_IS_NEW_TASK_HABIT,
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
import {
  getNextDate,
  toFullTimeString,
  toLocaleStateString,
} from "../../utils/date";
import { ListObject } from "../../types/global/ListObject";
import { getPositionsFromAS } from "../../backend/asyncStorage/positions";

export const scheduleTaskExpiration = async (
  task: TaskType,
  dispatch: Dispatch
) => {
  try {
    if (!task.isExpired) {
      const currTime = new Date().valueOf();
      const isCompletedInTime =
        task.isCompleted &&
        task.completionTime &&
        task.completionTime < task.time;

      if (!isCompletedInTime && !task.isExpired && task.time <= currTime) {
        await LocalDB.setTaskExpiration(task.id);
        dispatch({ type: SET_TASK_EXPIRATION, id: task.id });
        if (task.habitId) {
          const habit = store.getState().tasks.habits[task.habitId];
          console.log(1)
          if (habit) addTask(dispatch, getTaskFromHabit(habit))
        }
      } else {
        const timeDiff = task.time - currTime;
        setTimeout(async () => {
          const expiredTask = store.getState().tasks.tasks.find((item) => {
            const isItemCompletedInTime =
              item.completionTime && item.completionTime < item.time;
            return (
              item.id === task.id &&
              !item.isExpired &&
              !isItemCompletedInTime &&
              task.time === item.time
            );
          });
          if (expiredTask) {
            await LocalDB.setTaskExpiration(expiredTask?.id);
            dispatch({ type: SET_TASK_EXPIRATION, id: expiredTask.id });
            if (expiredTask.habitId) {
              const habit = store.getState().tasks.habits[expiredTask.habitId];
              console.log(2)
              if (habit) addTask(dispatch, getTaskFromHabit(habit))
            }
          }
        }, timeDiff);
      }
    }
  } catch (error) {
    console.log("scheduleTaskExpiration", error);
  }
};

export const loadTasksFromLocalDB = () => async (dispatch: Dispatch) => {
  try {
    const currDate = new Date().setHours(0, 0, 0, 0);
    const tasks = await LocalDB.getTasks();
    const habits = await LocalDB.getHabits();
    const habitsObj: { [key: number]: HabitType } = {}
    habits.forEach(habit => {
      habitsObj[habit.id] = habit;
    })

    await deleteAllNotifications();
    const notificationsUpdatedTasks = await Promise.all(
      tasks.map(async (task) => {
        await scheduleTaskExpiration(task, dispatch);
        const notificationId = await scheduleReminder(
          task,
          dispatch,
          task.notificationId
        );
        return {
          ...task,
          notificationId,
        };
      })
    );

    const filteredTasks = notificationsUpdatedTasks.filter(
      (task) => task.time >= currDate || !task.isCompleted
    );
    filteredTasks.reverse();
    dispatch({ type: UPDATE_TASKS, tasks: filteredTasks, habitsObj, });
  } catch (error) {
    console.log("getTasksFromLocalDB", error);
  }
};

export const scheduleReminder = async (
  task: TaskType,
  dispatch: Dispatch,
  oldNotificationId?: string
): Promise<string | undefined> => {
  if (oldNotificationId) {
    await deleteNotification(oldNotificationId);
  }
  if (task.remindTime) {
    const currentDate = new Date().valueOf();
    const notificationTime = Math.round((task.remindTime - currentDate) / 1000);
    const { language } = store.getState().prefs;
    if (notificationTime > 0) {
      const notificationId = await setNotification(
        task.task,
        `${toLocaleStateString({
          dateValue: task.time,
          timeType: task.timeType,
          language,
        })}`,
        notificationTime
      );
      setTimeout(() => {
        dispatch({
          type: CLEAR_REMINDER,
          id: task.id,
          remindTime: task.remindTime,
        });
      }, notificationTime * 1000);
      return notificationId;
    } else {
      await LocalDB.clearTaskReminder(task.id);
      dispatch({
        type: CLEAR_REMINDER,
        id: task.id,
        remindTime: task.remindTime,
      });
      return undefined;
    }
  }
};

export const addTask = async (dispath: Dispatch, addedTask: TaskType, habit?: HabitType | undefined) => {
  const taskId = await LocalDB.addTask(addedTask);

  if (taskId) {
    addedTask.id = taskId;
    await scheduleTaskExpiration(addedTask, dispath);
    const notificationId = await scheduleReminder(addedTask, dispath);
    addedTask.notificationId = notificationId;
    dispath({
      type: ADD_TASK,
      task: addedTask,
      habit: habit ? { ...habit, id: addedTask.habitId } : undefined,
    });
  }
}

export const addTaskAction =
  (task: TaskType, isHabit?: boolean) => async (dispath: Dispatch) => {
    try {
      const addedTask: TaskType = { ...task };
      const habit = isHabit ? getHabitFromTask(addedTask) : undefined;
      if (habit) {
        const habitId = await LocalDB.addHabit(habit);
        addedTask.habitId = habitId;
      }
      addTask(dispath, addedTask, habit);
    } catch (error) {
      console.log("addTaskAction", error);
    }
  };

export const editTaskAction =
  (task: TaskType, isHabit?: boolean, oldNotificationId?: string) =>
  async (dispatch: Dispatch) => {
    try {
      const habit = isHabit ? getHabitFromTask(task, task.habitId) : undefined;
      if (task.habitId && habit) { 
        await LocalDB.editHabit(habit);
      } else if (!task.habitId && habit) {
        const habitId = await LocalDB.addHabit(habit);
        if (habitId) habit.id = habitId;
      }
      const editedTask: TaskType = {...task, habitId: habit ? habit.id : undefined };
      await LocalDB.editTask(editedTask);
      await scheduleTaskExpiration(editedTask, dispatch);
      const notificationId = await scheduleReminder(
        editedTask,
        dispatch,
        oldNotificationId
      );
      dispatch({ type: EDIT_TASK, task: { ...editedTask, notificationId }, habit, oldHabitId: task.habitId });
    } catch (error) {
      console.log("editTaskAction", error);
    }
  };

export const deleteTaskAction =
  (task: TaskType) => async (dispatch: Dispatch) => {
    try {
      await LocalDB.deleteTask(task.id);
      if (task.habitId) {
        await LocalDB.deleteHabit(task.habitId)
      }
      if (task.notificationId) {
        await deleteNotification(task.notificationId);
      }
      dispatch({ type: DELETE_TASK, task, habitId: task.habitId });
    } catch (error) {
      console.log("deleteTaskAction", error);
    }
  };

export const getTaskFromHabit = (habit: HabitType) => {
  const nextTimeDate = getNextDate(Number(habit.time || 0));
  const nextReminderDate = getNextDate(Number(habit.remindTime || 0));
  const timeData = habit.time.split(':').map(str => Number(str) || 0);
  const time =
    habit.timeType === "day" 
      ? nextTimeDate.setHours(23, 59, 59, 999)
      : nextTimeDate.setHours(timeData[0] || 23, timeData[1] || 59, timeData[2] || 59, timeData[3] || 999);
  const remindTimeData = habit?.remindTime?.split(':');
  const remindTime = remindTimeData?.length === 4
    ? nextReminderDate.setHours(timeData[0], timeData[1], timeData[2], timeData[3])
    : undefined;

  const task: TaskType = {
    id: 0,
    task: habit.task,
    description: habit.description,
    time,
    timeType: habit.timeType,
    remindTime,
    isCompleted: 0,
    isExpired: 0,
    habitId: habit.id,
  };
  return task;
};

export const getHabitFromTask = (task: TaskType, id?: number): HabitType => {
  const time = toFullTimeString(new Date(task.time));
  const remindTime = task.remindTime
    ? toFullTimeString(new Date(task.remindTime))
    : undefined;
  return {
    id: id || 0,
    task: task.task,
    description: task.description,
    time: time,
    timeType: task.timeType,
    remindTime,
    repeatingPeriod: "daily",
    repeatingFrequency: 1,
    repeatingWeekDays: undefined,
  };
};

export const updateNewTaskTimeAction =
  (time: number, timeType: TimeType) => (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_TASK_TIME, time, timeType });
  };

export const setIsNewTaskHabitAction =
  (isHabit: boolean) => (dispatch: Dispatch) => {
    dispatch({ type: SET_IS_NEW_TASK_HABIT, isHabit });
  };

export const updateNewTaskRemindTimeAction =
  (remindTime: number | undefined) => (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_TASK_REMIND_TIME, remindTime });
  };

export const setDefaultNewTaskDataAction = () => (dispatch: Dispatch) => {
  dispatch({ type: SET_DEFAULT_NEW_TASK_DATA });
};

export const chooseCalendarDate =
  (value: number | undefined) => (dispatch: Dispatch) => {
    dispatch({ type: CALENDAR_CHOOSED_DATE, calendarChoosedDate: value });
  };

export const chooseTaskToEditAction =
  (task: TaskType | undefined) => (dispatch: Dispatch) => {
    dispatch({ type: CHOOSE_TASK_TO_EDIT, task });
  };

export const completeTaskAction =
  (task: TaskType) => async (dispatch: Dispatch) => {
    try {
      const isCompleted = task.isCompleted ? 0 : 1;
      const completionTime = isCompleted ? new Date().valueOf() : null;
      const isExpired = isCompleted
        ? task.isExpired
        : new Date().valueOf() > task.time
        ? 1
        : 0;
      await LocalDB.completeTask(
        task.id,
        isCompleted,
        isExpired,
        completionTime
      );
      dispatch({
        type: COMPLETE_TASK,
        id: task.id,
        isCompleted,
        isExpired,
        completionTime,
      });
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
