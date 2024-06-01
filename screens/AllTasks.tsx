import React, { useEffect } from "react";
import { Text, Button, View } from "react-native";
import TaskList from "../components/TaskList";
import { useSQLiteContext } from "expo-sqlite";

export default function AllTasks() {
  async function fetchTasks() {
    const db = useSQLiteContext();

    const allRows = await db.getAllAsync("SELECT * FROM tasks ");
    console.log(allRows);
    return allRows;
  }

  const tasks = fetchTasks();

  return (
    <View>
      <View className="my-10 w-full h-5 bg-black" />
      <TaskList tasks={tasks} />
    </View>
  );
}
