import React, { useContext, useEffect, useState } from "react";
import { Text, TextInput, StyleSheet, View, Pressable } from "react-native";
import { TasksContext } from "../store/tasks-context";

export default function Home({ navigation }) {
  const TaskCxt = useContext(TasksContext);

  const [inputText, setInputText] = useState("");

  useEffect(() => {
    TaskCxt.fetchTasks();
  }, [TaskCxt]);

  function addHandler() {
    const arr = inputText.split("/");
    let cat = "";
    let content = "";
    if (arr.length == 2) {
      cat = arr[0].trim();
      content = arr[1].trim();
    } else {
      content = arr[0].trim();
    }

    TaskCxt.addTask(false, content, cat);

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
            <View style={styles.button} className="bg-blue-500 w-20 h-12">
              <Text className="text-white text-center font-bold mt-1">Add</Text>
            </View>
          </Pressable>
        </View>
      </View>

      <View className="mx-auto my-40">
        <Pressable
          style={({ pressed }) => [pressed && styles.pressed]}
          onPress={() => {
            navigation.navigate("AllTasks");
          }}
        >
          <View style={styles.button} className="bg-gray-600 w-20 h-12">
            <Text className="text-white text-center font-bold mt-1">
              All Tasks
            </Text>
          </View>
        </Pressable>
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
