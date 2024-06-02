import { FlatList, View, Text, StyleSheet, Pressable } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { Task } from "../models/tasks";
import { AntDesign } from "@expo/vector-icons";

export default function TaskList({ cat }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDisplayed, setIsDisplayed] = useState(false);

  const db = useSQLiteContext();

  useEffect(() => {
    async function fetchTasks() {
      const catTasks = await db.getAllAsync<Task>(
        "SELECT * FROM Tasks WHERE category = ?",
        [cat.category]
      );
      setTasks(catTasks);
    }

    fetchTasks();
  }, [db]);

  function toggle() {
    setIsDisplayed(!isDisplayed);
  }

  function onDelete(id) {
    setTasks((curState) => {
      const taskItemIndex = curState.findIndex((item) => item.id === id);

      if (taskItemIndex != -1) curState.splice(taskItemIndex, 1);

      return curState;
    });

    function deleteTask() {
      db.runAsync("DELETE FROM Tasks WHERE id = ?", [id])
        .then((result) => {
          console.log(result);
        })
        .catch((err) => console.log("Error:", err));
    }

    deleteTask();
  }

  if (!isDisplayed) {
    return (
      <Pressable
        onPress={toggle}
        style={({ pressed }) => [pressed && styles.pressed]}
        className="flex-row justify-start"
      >
        <View className="pt-3 ml-7">
          <AntDesign name="folderopen" size={24} color="black" />
        </View>
        <View style={styles.listContainer}>
          <Text className="font-bold text-xl px-4 py-2">{cat.category}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View className="">
      <Pressable
        onPress={toggle}
        style={({ pressed }) => [pressed && styles.pressed]}
        className="flex-row justify-start"
      >
        <View className="pt-3 ml-7">
          <AntDesign name="folderopen" size={24} color="black" />
        </View>
        <View style={styles.listContainer}>
          <Text className="font-bold text-xl px-4 py-2">{cat.category}</Text>
        </View>
      </Pressable>

      <View className="ml-4" style={styles.listContainer}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem task={item} onDelete={onDelete} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
});
