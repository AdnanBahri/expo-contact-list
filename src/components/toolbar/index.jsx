import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../utils/colors";
const Toolbar = ({ children }) => {
  return (
    <LinearGradient
      colors={[COLORS.primary.primary600, COLORS.primary.primary900]}
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
