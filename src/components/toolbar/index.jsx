import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../utils/colors";
const Toolbar = ({ children }) => {
  return (
    <LinearGradient
      // colors={[COLORS.primary.primary600, COLORS.primary.primary900]}
      colors={["#b6dfe2", "#286267"]}
      start={{ x: -1, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
};
export default Toolbar;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    color: "#fff",
  },
  background: {
    height: "100%",
    width: "100%",
  },
});
