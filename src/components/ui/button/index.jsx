import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("screen");
const Button = () => {
  return (
    <View style={styles.container}>
      <Text>Button</Text>
    </View>
  );
};
export default Button;
const styles = StyleSheet.create({});
