import { FlatList, View, StyleSheet } from "react-native";
import Task from "./Task";

export default function TaskList({ tasks }) {
  return (
    <View style={styles.listContainer}>
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
    borderWidth: 2,
    borderColor: "black",
    marginTop: 12,
    marginHorizontal: 12,
  },
});
