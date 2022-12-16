import { TaskType } from "./../redux/types/task";
import * as SQLite from "expo-sqlite";
import { SQLError, SQLResultSet, SQLTransaction } from "expo-sqlite";

export const db = SQLite.openDatabase("database.db");

export class LocalDB {
  static initTasks() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, task TEXT NOT NULL, description TEXT, time INTEGER NOT NULL, timeType TEXT NOT NULL, isCompleted INT NOT NULL, isExpired INT NOT NULL, completionTime INTEGER, remindTime INTEGER )",
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
    } = addedTask;

    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO tasks (task, description, time, timeType, isCompleted, isExpired, completionTime, remindTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            task,
            description || "",
            time,
            timeType,
            isCompleted ? 1 : 0,
            isExpired ? 1 : 0,
            completionTime || null,
            remindTime || null,
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
          "DELETE FROM tasks WHERE id = ?",
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
    } = editedTask;

    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE tasks SET task = ?, description = ?, time = ?, timeType = ?, isCompleted = ?, isExpired = ?, completionTime = ?, remindTime = ? WHERE id = ?",
          [
            task,
            description || "",
            time,
            timeType,
            isCompleted ? 1 : 0,
            isExpired ? 1 : 0,
            completionTime || null,
            remindTime || null,
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
          "UPDATE tasks SET isExpired = 1 WHERE id = ?",
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
          "UPDATE tasks SET isCompleted = ?, completionTime = ?, isExpired = ? WHERE id = ?",
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
