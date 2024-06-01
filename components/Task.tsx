import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

export default function Task({ task }) {
  const [done, setDone] = useState(task.isDone);
  const db = useSQLiteContext();

  // do updation when leaving all tasks screen
  async function updateTask() {
    await db.runAsync("UPDATE tasks SET isDone = ? WHERE id = ?", [
      done,
      task.id,
    ]);
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

      <View className="flex-1 flex-row ml-2 text-left">
        <Text className=" font-bold">{task.content}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    height: 60,
    marginBottom: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  pressed: {
    opacity: 0.7,
  },
});
