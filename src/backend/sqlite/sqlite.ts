import { TaskType } from "../../redux/types/task";
import * as SQLite from "expo-sqlite";
import { SQLError, SQLResultSet, SQLTransaction } from "expo-sqlite";
import { COMPLETION_TIME, DESCRIPTION, ID, IS_COMPLETED, IS_EXPIRED, NOTIFICATION_ID, REMIND_TIME, TASK, TIME, TIME_TYPE } from "./constants/taskProps";

export const db = SQLite.openDatabase("database.db");

export class LocalDB {
  static initTasks() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS tasks (${ID} INTEGER PRIMARY KEY NOT NULL, ${TASK} TEXT NOT NULL, description TEXT, ${TIME} INTEGER NOT NULL, ${TIME_TYPE} TEXT NOT NULL, ${IS_COMPLETED} INT NOT NULL, ${IS_EXPIRED} INT NOT NULL, ${COMPLETION_TIME} INTEGER, ${REMIND_TIME} INTEGER, ${NOTIFICATION_ID} TEXT)`,
          [],
          (_: SQLTransaction, result: SQLResultSet) => resolve(result),
          (_: SQLTransaction, error: SQLError) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  static getTasksTableColumns(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "PRAGMA table_info(tasks)",
          [],
          (_: SQLTransaction, result: SQLResultSet) =>
            resolve(result.rows._array),
          (_: SQLTransaction, error: SQLError) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  static addColumn(table: string, columnName: string, notNull: boolean) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `ALTER TABLE ${table} ADD ${columnName} ${notNull ? 'NOT NULL' : ''}`,
          [],
          resolve,
          (_: SQLTransaction, error: SQLError) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  static getTasks(): Promise<Array<TaskType>> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM tasks`,
          [],
          (_: SQLTransaction, result: SQLResultSet) =>
            resolve(result.rows._array),
          (_: SQLTransaction, error: SQLError) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  static addTask(addedTask: TaskType): Promise<number> {
    const {
      task,
      description,
      time,
      timeType,
      isCompleted,
      isExpired,
      completionTime,
      remindTime,
      notificationId,
    } = addedTask;

    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO tasks (${TASK}, ${DESCRIPTION}, ${TIME}, ${TIME_TYPE}, ${IS_COMPLETED}, ${IS_EXPIRED}, ${COMPLETION_TIME}, ${REMIND_TIME}, ${NOTIFICATION_ID}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            task,
            description || "",
            time,
            timeType,
            isCompleted ? 1 : 0,
            isExpired ? 1 : 0,
            completionTime || null,
            remindTime || null,
            notificationId || null,
          ],
          (_: SQLTransaction, result: SQLResultSet) =>
            resolve(result.insertId || 0),
          (_: SQLTransaction, error: SQLError) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  static deleteTask(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM tasks WHERE ${ID} = ?`,
          [id],
          (_: SQLTransaction, result: SQLResultSet) =>
            resolve(result.rowsAffected),
          (_: SQLTransaction, error: SQLError) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  static deleteAllTasks(): Promise<Array<TaskType>> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM tasks`,
          [],
          (_: SQLTransaction, result: SQLResultSet) =>
            resolve(result.rows._array),
          (_: SQLTransaction, error: SQLError) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  static editTask(editedTask: TaskType) {
    const {
      id,
      task,
      description,
      time,
      timeType,
      isCompleted,
      isExpired,
      completionTime,
      remindTime,
      notificationId
    } = editedTask;

    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE tasks SET ${TASK} = ?, ${DESCRIPTION} = ?, ${TIME} = ?, ${TIME_TYPE} = ?, ${IS_COMPLETED} = ?, ${IS_EXPIRED} = ?, ${COMPLETION_TIME} = ?, ${REMIND_TIME} = ?, ${NOTIFICATION_ID} = ? WHERE id = ?`,
          [
            task,
            description || "",
            time,
            timeType,
            isCompleted ? 1 : 0,
            isExpired ? 1 : 0,
            completionTime || null,
            remindTime || null,
            notificationId || null,
            id,
          ],
          resolve,
          (_: SQLTransaction, error: SQLError) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  static setTaskExpiration(id: number) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE tasks SET ${IS_EXPIRED} = 1 WHERE id = ?`,
          [id],
          resolve,
          (_: SQLTransaction, error: SQLError) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  static completeTask(
    id: number,
    isCompleted: number,
    isExpired: number,
    completionTime: number | null
  ) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE tasks SET ${IS_COMPLETED} = ?, ${COMPLETION_TIME} = ?, ${IS_EXPIRED} = ? WHERE id = ?`,
          [isCompleted, completionTime, isExpired, id],
          resolve,
          (_: SQLTransaction, error: SQLError) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }
}
