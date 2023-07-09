import { StyleSheet, View } from "react-native";
import { Text } from "../components";
const OthersScreen = () => {
  return (
    <View style={styles.container}>
      <Text h4>Others Screen</Text>
    </View>
  );
};
export default OthersScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
