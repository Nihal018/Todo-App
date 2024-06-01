import { FlatList, View, StyleSheet } from "react-native";
import Task from "./Task";

export default function TaskList({ tasks }) {
  return (
    <View className="" style={styles.listContainer}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Task task={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 12,
  },
});
