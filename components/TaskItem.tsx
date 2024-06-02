import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

export default function TaskItem({ task }) {
  const [done, setDone] = useState(task.isDone);
  const db = useSQLiteContext();

  // do updation when leaving all tasks screen
  async function updateTask() {
    await db.runAsync("UPDATE Tasks SET isDone = ? WHERE id = ?", [
      done,
      task.id,
    ]);
  }

  function deleteTask() {
    db.runSync("DELETE FROM Tasks WHERE id = ?", [task.id]);
  }

  function toggle() {
    // add functionality to update database
    setDone(!done);
  }
  let icon = <Feather name="square" size={30} color="black" />;

  if (done) {
    icon = <AntDesign name="checksquareo" size={30} color="black" />;
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.itemContainer, pressed && styles.pressed]}
      onPress={toggle}
    >
      <View className="mx-2">{icon}</View>

      <View className="flex-1 flex-row justify-between  ml-2 text-left">
        <Text className=" font-bold">
          {task.content} - {task.category}
        </Text>
      </View>
    </Pressable>
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
    opacity: 0.7,
  },
});

/* <View>
        <Pressable
          onPress={deleteTask}
          style={({ pressed }) => [pressed && styles.pressed]}
          className="rounded-lg bg-red-600  py-2 px-4 mx-4"
        >
          <Text className="text-white text-xl">Delete</Text>
        </Pressable>
      </View> */
