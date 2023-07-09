import { StyleSheet, View } from "react-native";
import { Text } from "../components";
const TasksScreen = () => {
  return (
    <View style={styles.container}>
      <Text h4>Tasks Screen</Text>
    </View>
  );
};
export default TasksScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
