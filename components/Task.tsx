import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function Task({ task }) {
  let icon = <Feather name="square" size={24} color="black" />;

  if (task.isDone) {
    icon = <AntDesign name="checksquareo" size={24} color="black" />;
  }

  return (
    <View
      style={styles.itemContainer}
      className="flex-row justify-center align-middle"
    >
      <View className="">{icon}</View>
      <View>
        <Text className="font-bold">{task.content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 2,
    borderColor: "black",
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
});
