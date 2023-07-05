import { StyleSheet, Text as RNText } from "react-native";

const Text = ({
  children,
  h1,
  h2,
  h3,
  h4,
  p,
  size,
  weight,
  color,
  style,
  ...rest
}) => {
  const styles = StyleSheet.flatten([
    { fontSize: 16, fontWeight: "400" },
    h1 !== undefined && { fontSize: 36, fontWeight: "800" },
    h2 !== undefined && { fontSize: 28, fontWeight: "700" },
    h3 !== undefined && { fontSize: 24, fontWeight: "600" },
    h4 !== undefined && { fontSize: 22, fontWeight: "500" },
    p !== undefined && { fontSize: 18 },
    size !== undefined && { fontSize: size },
    weight !== undefined && { fontWeight: weight },
    color !== undefined && { color: color },
    style,
  ]);
  return (
    <RNText style={styles} {...rest}>
      {children}
    </RNText>
  );
};

export default Text;
