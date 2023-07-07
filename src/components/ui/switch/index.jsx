import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Switch = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen((prev) => !prev);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.outter,
          isOpen
            ? {
                justifyContent: "flex-end",
                backgroundColor: "#89d6e1",
              }
            : {
                justifyContent: "flex-start",
              },
        ]}
        activeOpacity={1}
        onPress={toggle}
      >
        <View style={styles.inner} />
      </TouchableOpacity>
    </View>
  );
};
export default Switch;
const styles = StyleSheet.create({
  inner: {
    width: 24,
    height: 24,
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  outter: {
    width: 60,
    height: 30,
    backgroundColor: "gray",
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 2,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
