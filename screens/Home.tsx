import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import { Text, TextInput, StyleSheet, View, Pressable } from "react-native";

export default function Home({ navigation }) {
  const db = useSQLiteContext();
  const [inputText, setInputText] = useState("");

  async function insertTask(task) {
    const result = await db.runAsync(
      "INSERT INTO tasks (content,isDone) VALUES (?,?)",
      [task.content, task.isDone]
    );
  }

  async function addHandler() {
    const task = {
      content: inputText,
      isDone: false,
    };
    await insertTask(task);

    navigation.navigate("AllTasks");
  }

  function changeTextHandler(input: string) {
    setInputText(input);
  }

  return (
    <View className="">
      <View className="my-10 w-full h-5 bg-black" />

      <View className="mb-20">
        <Text className="text-center text-2xl font-bold">
          Minimalistic Todo
        </Text>
      </View>

      <View className="mt-32 flex-1 flex-row justify-center align-middle">
        <View className="">
          <TextInput
            className="mx-2 w-52 h-12 px-4 py-2 border-2 border-black"
            style={styles.input}
            placeholder="Enter Task"
            onChangeText={changeTextHandler}
            multiline={true}
            numberOfLines={10}
            value={inputText}
          />
        </View>

        <View className="">
          <Pressable
            style={({ pressed }) => [pressed && styles.pressed]}
            onPress={addHandler}
          >
            <View style={styles.button} className="bg-blue-400 w-20 h-12">
              <Text className="text-white text-center font-bold mt-1">Add</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
  },
  input: {
    borderRadius: 4,
    borderColor: "black",
  },
  pressed: {
    opacity: 0.5,
    borderRadius: 4,
  },
  textInput: {
    borderWidth: 2,
    borderColor: "blue",
  },
});
