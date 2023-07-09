import { StyleSheet, View } from "react-native";
import { Text } from "../components";
const BusinessScreen = () => {
  return (
    <View style={styles.container}>
      <Text h4>Business Screen</Text>
    </View>
  );
};
export default BusinessScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
