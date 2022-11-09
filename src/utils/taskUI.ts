import { ListObject } from "./../types/global/ListObject";
import { TaskType } from "../components/UI/Task/types";
import { GesturePositionsType } from "../types/global/GesturePositions";

export const sortTasksByTime = (list: Array<TaskType>): Array<TaskType> => {
  const listCopy = [...list];
  listCopy.sort((prev, curr) => {
    if (!prev.time && curr.time) {
      return 1;
    } else if (prev.time && !curr.time) {
      return -1;
    } else if (prev.time && curr.time) {
      const prevTime = new Date(prev.time).valueOf();
      const currTime = new Date(curr.time).valueOf();
      return prevTime - currTime;
    }
    return 0;
  });
  return listCopy;
};

export const sortListObjectByTime = (listObject: ListObject): ListObject => {
  const object: ListObject = {};
  const keys = Object.keys(listObject).sort((prev, curr) => listObject[prev].position - listObject[curr].position);
  keys.sort((prev, curr) => {
    if (!listObject[prev].time && listObject[curr].time) {
      return 1;
    } else if (listObject[prev].time && !listObject[curr].time) {
      return -1;
    } else if (listObject[prev].time && listObject[curr].time) {
      const prevTime = new Date(listObject[prev].time || '').valueOf();
      const currTime = new Date(listObject[curr].time || '').valueOf();
      return prevTime - currTime;
    }
    return 0;
  })
  keys.forEach((key, index) => {
    object[key] = listObject[key]
    object[key].position = index
  })
  return object;
}

export const taskListToObject = (list: Array<TaskType>): ListObject => {
  const completedList: Array<TaskType> = [];
  const unCompletedList: Array<TaskType> = [];
  list.forEach((task) =>
    task.isCompleted ? completedList.push(task) : unCompletedList.push(task)
  );

  const newList = unCompletedList.concat(completedList);

  const object: ListObject = {};
  newList.forEach((task: TaskType, index: number) => {
    object[task.id] = {
      position: index,
      isCompleted: task.isCompleted,
      time: task?.time?.toString(),
    };
  });
  return object;
};

export const updateListObjectAfterTaskAdding = (
  listObject: ListObject,
  newTask: TaskType
): ListObject => {
  "worklet";
  const newListObject: ListObject = {};
  for (let key in listObject) {
    newListObject[key] = {
      ...listObject[key],
      position: listObject[key].position + 1,
    };
  }
  newListObject[newTask.id] = {
    position: 0,
    isCompleted: newTask.isCompleted,
    time: newTask?.time?.toString(),
  };
  return newListObject;
};

export const updateListObjectAfterTaskDeleting = (
  listObject: ListObject,
  id: string
): ListObject => {
  "worklet";
  const deletedPosition: number = listObject[id].position;
  const newListObject: ListObject = {};
  for (let key in listObject) {
    newListObject[key] = { ...listObject[key] };
    if (listObject[key].position > deletedPosition) {
      newListObject[key].position -= 1;
    }
  }
  delete newListObject[id];
  return newListObject;
};

export const updatePositionsObjectAfterTaskAdding = (
  positionsObject: GesturePositionsType,
  newTask: TaskType
): GesturePositionsType => {
  const newPositionsObject: GesturePositionsType = {};
  for (let key in positionsObject) {
    newPositionsObject[key] = positionsObject[key] + 1;
  }
  newPositionsObject[newTask.id] = 0;
  return newPositionsObject;
};

export const updatePositionsObjectAfterTaskDeleting = (
  positionsObject: GesturePositionsType,
  id: string
): GesturePositionsType => {
  const deletedPosition: number = positionsObject[id];
  const newPositionsObject: GesturePositionsType = {};
  for (let key in positionsObject) {
    if (positionsObject[key] > deletedPosition) {
      newPositionsObject[key] = positionsObject[key] - 1;
    } else {
      newPositionsObject[key] = positionsObject[key];
    }
  }
  delete newPositionsObject[id];
  return newPositionsObject;
};

export const taskListToPositionsObject = (
  list: Array<TaskType>
): GesturePositionsType => {
  const completedList: Array<TaskType> = [];
  const unCompletedList: Array<TaskType> = [];
  list.forEach((task) =>
    task.isCompleted ? completedList.push(task) : unCompletedList.push(task)
  );
  const newList = unCompletedList.concat(completedList);

  const object: GesturePositionsType = {};
  newList.forEach((task: TaskType, index: number) => {
    object[task.id] = index;
  });
  return object;
};

export const listObjectToPositionsObject = (
  list: ListObject
): GesturePositionsType => {
  "worklet";
  const newPositionState: GesturePositionsType = {};
  for (let id in list) {
    newPositionState[id] = list[id].position;
  }
  return newPositionState;
};

export const taskObjectToPositionsList = (list: ListObject): Array<string> => {
  const arr = [];
  for (let id in list) {
    arr[list[id]?.position] = id;
  }
  return arr;
};

export const positionsObjectToList = (
  list: GesturePositionsType
): Array<string> => {
  const arr = [];
  for (let id in list) {
    arr[list[id]] = id;
  }
  return arr;
};

export const getNewTaskPosition = (
  translateY: number,
  lowerBound: number,
  upperBound: number,
  itemHeight: number
) => {
  "worklet";
  const newPosition = Math.round(translateY / itemHeight);
  return Math.max(lowerBound, Math.min(newPosition, upperBound));
};

export const getInsideLayoutTranslationY = (
  translateY: number,
  lowerBound: number,
  upperBound: number,
  itemHeight: number
) => {
  "worklet";
  const newLowerBound = lowerBound * itemHeight - 15;
  const newUpperBound = upperBound * itemHeight + 5;
  return Math.max(newLowerBound, Math.min(translateY, newUpperBound));
};

export const moveTask = (
  listObject: ListObject,
  from: number,
  to: number
): ListObject => {
  "worklet";
  const newObject: ListObject = {};
  const fromItem: ListObject = {};
  const toItem: ListObject = {};
  let fromKey = Object.keys(fromItem)[0];
  let toKey = Object.keys(toItem)[0];

  for (let id in listObject) {
    newObject[id] = { ...listObject[id] };
    if (listObject[id].position === from) {
      fromItem[id] = newObject[id];
      fromKey = id;
    } else if (listObject[id].position === to) {
      toItem[id] = newObject[id];
      toKey = id;
    }
  }

  if (!fromItem[fromKey].time && !toItem[toKey].time) {
    const fromPosition = fromItem[fromKey].position;
    const toPosition = toItem[toKey].position;
    fromItem[fromKey].position = toPosition;
    toItem[toKey].position = fromPosition;
  }

  return newObject;
};

export const moveCompletedTask = (
  listObject: ListObject,
  id: string,
  from: number,
  upperBound: number
): ListObject => {
  "worklet";
  const keys: Array<string> = taskObjectToPositionsList(listObject);
  for (let i = from; i < upperBound; i++) {
    const curr = keys[i];
    const next = keys[i + 1];
    keys[i] = next;
    keys[i + 1] = curr;
  }
  const obj: ListObject = {};
  for (let i = 0; i < keys.length; i++) {
    obj[keys[i]] = { ...listObject[keys[i]], position: i };
  }
  obj[id].isCompleted = true;
  return obj;
};

export const moveUncompletedTask = (
  listObject: ListObject,
  positionsState: GesturePositionsType,
  id: string
): ListObject => {
  "worklet";

  const timedUncompletedlist: Array<string> = [];
  const uncompletedList: Array<string> = [];
  const completedList: Array<string> = [];

  Object.keys(listObject).forEach((key) => {
    if (key === id && listObject[id].time) {
      timedUncompletedlist.push(key);
    } else if (listObject[key].time && !listObject[key].isCompleted) {
      timedUncompletedlist.push(key);
    } else if (key === id && !listObject[id].time) {
      uncompletedList.push(key);
    } else if (listObject[key].isCompleted) {
      completedList.push(key);
    } else {
      uncompletedList.push(key);
    }
  });

  timedUncompletedlist.sort((prev, curr) => {
    const prevDateString = listObject[prev]?.time;
    const currDateString = listObject[curr]?.time;
    if (prevDateString && currDateString) {
      return (
        new Date(prevDateString).valueOf() - new Date(currDateString).valueOf()
      );
    }
    return 0;
  });

  uncompletedList.sort(
    (prev, curr) => positionsState[prev] - positionsState[curr]
  );

  const obj: ListObject = {};
  for (let i = 0; i < timedUncompletedlist.length; i++) {
    const key = timedUncompletedlist[i];
    obj[key] = {
      position: 0 + i,
      isCompleted: false,
      time: listObject[key].time,
    };
  }

  let length = timedUncompletedlist.length;
  for (let i = 0; i < uncompletedList.length; i++) {
    const key = uncompletedList[i];
    obj[key] = {
      position: length + i,
      isCompleted: false,
      time: listObject[key].time,
    };
  }

  length = length + uncompletedList.length;
  for (let i = 0; i < completedList.length; i++) {
    const key = completedList[i];
    obj[key] = {
      position: length + i,
      isCompleted: true,
      time: listObject[key].time,
    };
  }

  return obj;
};
