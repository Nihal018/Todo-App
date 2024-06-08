import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { TasksContext } from "../store/tasks-context";
import { Task } from "../models/tasks";

type deleteParam = (id: number) => void;

export default function TaskItem({
  task,
  onDelete,
}: {
  task: Task;
  onDelete: deleteParam;
}) {
  const [done, setDone] = useState(task.isDone);
  const TaskCxt = useContext(TasksContext);

  // do updation when leaving all tasks screen
  function toggle() {
    // add functionality to update database
    TaskCxt.updateTask({
      id: task.id,
      category: task.category,
      content: task.content,
      isDone: !done,
    });
    setDone(!done);
  }

  let icon = done ? (
    <AntDesign name="checksquareo" size={30} color="black" />
  ) : (
    <Feather name="square" size={30} color="black" />
  );

  return (
    <View className="flex-1 flex-row justify-between">
      <Pressable
        style={({ pressed }) => [
          styles.itemContainer,
          pressed && styles.pressed,
        ]}
        onPress={toggle}
      >
        <View className="mx-2">{icon}</View>

        <Text className="mb-1 ml-2 font-bold " style={styles.text}>
          {task.content}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onDelete(task.id)}
        style={({ pressed }) => [pressed && styles.pressed]}
        className="rounded-lg bg-red-600  mt-4 py-1 px-4 mx-4 h-8"
      >
        <Text className="text-white" style={styles.text}>
          Delete
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    marginBottom: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  pressed: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
  },
});
