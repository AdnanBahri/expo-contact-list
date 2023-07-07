import { TouchableOpacity, StyleSheet } from "react-native";
import Text from "../text";

const Button = ({ children, active, color, style, ...rest }) => {
  const btnStyles = StyleSheet.flatten([
    {
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: active ? "#879900" : "#fff",
      borderRadius: 2,
    },
    style,
  ]);
  return (
    <TouchableOpacity style={btnStyles}>
      <Text weight={"600"} color={active ? "#fff" : "#5b5957"}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;
