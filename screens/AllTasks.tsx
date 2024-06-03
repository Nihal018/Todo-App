import React, { useContext, useEffect, useState } from "react";
import { Text, Button, View, FlatList } from "react-native";
import TaskList from "../components/TaskList";
import { useSQLiteContext } from "expo-sqlite";
import { Task } from "../models/tasks";
import { TasksContext } from "../store/tasks-context";

interface Cat {
  category: string;
}

export default function AllTasks() {
  const [categs, setCategs] = useState<Cat[]>([]);
  const TaskCxt = useContext(TasksContext);

  const db = useSQLiteContext();

  useEffect(() => {
    TaskCxt.fetchTasks();

    async function fetchCats() {
      const allCategs = await db.getAllAsync<Cat>(
        "SELECT category FROM Tasks GROUP BY category"
      );
      setCategs(allCategs);
    }

    fetchCats();
  }, [TaskCxt, db]);

  console.log(categs);

  return (
    <View>
      <View className="my-10 w-full h-5 bg-black" />

      <FlatList
        data={categs}
        keyExtractor={(item) => item.category}
        renderItem={({ item }) => {
          return <TaskList cat={item} />;
        }}
      />
    </View>
  );
}
