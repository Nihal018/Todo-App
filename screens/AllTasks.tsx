import React, { useEffect, useState } from "react";
import { Text, Button, View } from "react-native";
import TaskList from "../components/TaskList";
import { useSQLiteContext } from "expo-sqlite";
import { Task } from "../models/tasks";

export default function AllTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const db = useSQLiteContext();

  useEffect(() => {
    async function fetchTasks() {
      const allRows = await db.getAllAsync<Task>("SELECT * FROM tasks ");

      setTasks(allRows);
    }

    fetchTasks();
  }, []);

  return (
    <View>
      <View className="my-10 w-full h-5 bg-black" />
      <TaskList tasks={tasks} />
    </View>
  );
}
