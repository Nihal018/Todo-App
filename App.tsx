import * as SQLite from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { SQLiteProvider } from "expo-sqlite";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import AllTasks from "./screens/AllTasks";
import { useEffect, useState } from "react";
import TasksContextProvider from "./store/tasks-context";

const Stack = createNativeStackNavigator();

export default function App() {
  async function init() {
    const db = await SQLite.openDatabaseAsync("Tasks.db");
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Tasks(
        id INTEGER PRIMARY KEY NOT NULL,
        content TEXT NOT NULL,
        isDone BOOLEAN NOT NULL,
        category TEXT
    )`);
  }

  return (
    <TasksContextProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <SQLiteProvider databaseName="Tasks.db" onInit={init}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AllTasks"
              component={AllTasks}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </SQLiteProvider>
      </NavigationContainer>
    </TasksContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
