import { StyleSheet, View } from "react-native";
import { Text } from "../components";
const NotesScreen = () => {
  return (
    <View style={styles.container}>
      <Text h4>Notes Screen</Text>
    </View>
  );
};
export default NotesScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
