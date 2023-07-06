import { StyleSheet, TextInput, View } from "react-native";

const Input = ({ value, textHandler, hasIcon, icon, style, ...rest }) => {
  const container = StyleSheet.flatten([
    {
      flexDirection: "row",
      paddingVertical: 4,
      backgroundColor: "#fff",
      borderRadius: 12,
      borderColor: "#dcdbdb",
      borderWidth: 1,
    },
    hasIcon && icon !== undefined && { borderRight: "transparent" },
  ]);
  return (
    <View style={container}>
      <TextInput
        placeholderTextColor={"#dcdbdb"}
        value={value}
        onChangeText={textHandler}
        style={styles.input}
      />
    </View>
  );
};
export default Input;
const styles = StyleSheet.create({
  container: {},
});
