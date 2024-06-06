import { FlatList, View, Text, StyleSheet, Pressable } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useContext, useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { Task } from "../models/tasks";
import { AntDesign } from "@expo/vector-icons";
import { TasksContext } from "../store/tasks-context";

type Cat = {
  category: string;
};

export default function TaskList({ cat }) {
  const TaskCxt = useContext(TasksContext);
  const [isDisplayed, setIsDisplayed] = useState(false);

  const tasks = TaskCxt.tasks;

  const catTasks = tasks.filter((item) => {
    return item.category === cat.category;
  });

  function toggle() {
    setIsDisplayed(!isDisplayed);
  }

  function onDelete(id: number) {
    TaskCxt.deleteTask(id);
  }

  if (!isDisplayed) {
    return (
      <Pressable
        onPress={toggle}
        style={({ pressed }) => [
          styles.pressableContainer,
          pressed && styles.pressed,
        ]}
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
          data={catTasks}
          keyExtractor={(item) => item.id.toString()}
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
  pressableContainer: {
    marginTop: 10,
  },
  pressed: {
    opacity: 0.7,
  },
});
