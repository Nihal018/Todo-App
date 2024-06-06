import * as SQLite from "expo-sqlite";

import { useReducer, createContext, useEffect } from "react";

import { Task } from "../models/tasks";
import { useSQLiteContext } from "expo-sqlite";

export const TasksContext = createContext({
  tasks: [] as Task[],
  addTask: (isDone: boolean, content: string, category: string) => {},
  updateTask: (task: Task) => {},
  deleteTask: (taskId: number) => {},
});

// Discriminated union
type TaskAction =
  | {
      type: "UPDATE";
      payload: {
        task: Task;
      };
    }
  | {
      type: "ADD";
      payload: {
        task: Task;
      };
    }
  | {
      type: "DELETE";
      payload: {
        taskId: number;
      };
    }
  | {
      type: "INIT";
      payload: {
        tasks: Task[];
      };
    };

function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload.task];

    case "UPDATE":
      const updatedTaskIndex = state.findIndex(
        (task: Task) => task.id === action.payload.task.id
      );
      const updatableTasks = [...state];
      updatableTasks[updatedTaskIndex] = action.payload.task;

      return updatableTasks;

    case "DELETE":
      const newState = [...state];
      return newState.filter((task: Task) => task.id !== action.payload.taskId);

    case "INIT":
      const allTasks = action.payload.tasks;
      return allTasks;

    default:
      return state;
  }
}

function TasksContextProvider({ children }: { children: React.ReactNode }) {
  const [tasksState, dispatch] = useReducer(taskReducer, [] as Task[]);
  const db = useSQLiteContext();

  useEffect(() => {
    async function fetchAllTasks() {
      const temp = await db.getAllAsync<Task>("SELECT * FROM Tasks ");
      dispatch({
        type: "INIT",
        payload: {
          tasks: temp,
        },
      });
    }
    fetchAllTasks();
  }, []);

  async function addTask(isDone: boolean, content: string, category: string) {
    const result = await db.runAsync(
      "INSERT INTO Tasks (content,isDone,category) VALUES (?,?,?)",
      [content, isDone, category]
    );
    console.log(result);
    if (result.changes > 0) {
      dispatch({
        type: "ADD",
        payload: {
          task: {
            isDone: isDone,
            content: content,
            category: category,
            id: result.lastInsertRowId,
          },
        },
      });
    }
  }

  const updateTask = async (task: Task) => {
    const pending = db.runAsync(
      "UPDATE Tasks SET isDone = ? category = ? content = ? WHERE id = ?",
      [task.isDone, task.category, task.content, task.id]
    );
    const result = await pending;
    console.log(result);
    if (result.changes > 0) {
      dispatch({
        type: "UPDATE",
        payload: { task: task },
      });
    }
  };

  async function deleteTask(taskId: number) {
    const result = await db.runAsync("DELETE FROM Tasks WHERE id = ?", [
      taskId,
    ]);
    console.log(result);

    if (result.changes > 0)
      dispatch({ type: "DELETE", payload: { taskId: taskId } });
  }

  const value = {
    tasks: tasksState,
    addTask: addTask,
    updateTask: updateTask,
    deleteTask: deleteTask,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export default TasksContextProvider;
