import React, { useEffect, useState } from "react";
import { Text, Button, View, FlatList } from "react-native";
import TaskList from "../components/TaskList";
import { useSQLiteContext } from "expo-sqlite";
import { Task } from "../models/tasks";

interface Cat {
  category: string;
}

export default function AllTasks() {
  const [categs, setCategs] = useState<Cat[]>([]);

  const db = useSQLiteContext();

  useEffect(() => {
    async function fetchCats() {
      const allCategs = await db.getAllAsync<Cat>(
        "SELECT category FROM Tasks GROUP BY category"
      );
      setCategs(allCategs);

      // for(const cat of allCategs){
      //   const categTasks =await db.getAllAsync<Task>("SELECT * FROM Tasks WHERE category = ? ",[cat.category]);

      //   setCategs((curState)=>{return(     )    })
      // }
    }

    fetchCats();
  }, []);

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
