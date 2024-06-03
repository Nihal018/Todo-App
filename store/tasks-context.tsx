import * as SQLite from "expo-sqlite";

import { useReducer, createContext } from "react";

import { Task } from "../models/tasks";

const db = await SQLite.openDatabaseAsync("Tasks.db");

async function init() {
  await db.execAsync(`
  CREATE TABLE IF NOT EXISTS Tasks(
      id INTEGER PRIMARY KEY NOT NULL,
      content TEXT NOT NULL,
      isDone BOOLEAN NOT NULL,
      category TEXT
  )`);
}

export const TasksContext = createContext({
  tasks: [] as Task[],
  addTask: (isDone: boolean, content: string, category: string) => {},
  updateTask: (task: Task) => {},
  deleteTask: (taskId: number) => {},
  fetchTasks: () => {},
});

function taskReducer(state, action) {
  switch (action.type) {
    case "ADD":
      let id: number = -1;
      db.runAsync(
        "INSERT INTO Tasks (content,isDone,category) VALUES (?,?,?)",
        [action.payload.content, action.payload.isDone, action.payload.category]
      )
        .then((result) => {
          console.log(result);
          id = result.lastInsertRowId;
        })
        .catch((err) => console.log(err));

      return [{ ...action.payload, id: id }, ...state];

    case "UPDATE":
      db.runAsync(
        "UPDATE Tasks SET isDone = ? category = ? content = ? WHERE id = ?",
        [
          action.payload.isDone,
          action.payload.category,
          action.payload.content,
          action.payload.id,
        ]
      )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => console.log(err));

      const updatedTaskIndex = state.findIndex(
        (task: Task) => task.id === action.payload.id
      );
      const updatableTasks = [...state];
      updatableTasks[updatedTaskIndex] = action.payload;
      return updatableTasks;

    case "DELETE":
      db.runAsync("DELETE FROM Tasks WHERE id = ?", [action.payload])
        .then((result) => {
          console.log(result);
        })
        .catch((err) => console.log("Error:", err));

      return state.filter((task: Task) => task.id !== action.payload);

    case "FETCH":
      db.getAllAsync<Task>("SELECT * FROM Tasks ")
        .then((result) => {
          state = result;
        })
        .catch((err) => console.log("Error:", err));

      return state;
  }
}

function TasksContextProvider({ children }) {
  const [tasksState, dispatch] = useReducer(taskReducer, []);

  function addTask(isDone: boolean, content: string, category: string) {
    dispatch({
      type: "ADD",
      payload: { isDone: isDone, content: content, category: category },
    });
  }

  function updateTask(task: Task) {
    dispatch({ type: "UPDATE", payload: task });
  }

  function deleteTask(taskId: number) {
    dispatch({ type: "DELETE", payload: taskId });
  }

  function fetchTasks() {
    dispatch({ type: "FETCH", payload: {} });
  }

  const value = {
    tasks: tasksState,
    addTask: addTask,
    updateTask: updateTask,
    deleteTask: deleteTask,
    fetchTasks: fetchTasks,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export default TasksContextProvider;
