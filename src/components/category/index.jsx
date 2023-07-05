import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "../ui/text";
import { capitalize } from "../../utils/util";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const CategoryItem = ({ item, position, handler }) => {
  const itemStyle = StyleSheet.flatten([
    {
      width: (width - 36) / 2,
      height: (width - 36) / 2,
      borderRadius: 8,
      backgroundColor: "#86afd0",
      marginBottom: 12,
      position: "relative",
    },
    position % 2 === 0 && { marginEnd: 12 },
  ]);
  return (
    <TouchableOpacity style={itemStyle} onPress={handler}>
      <View style={styles.layout}>
        <AntDesign name="user" size={160} style={styles.img} color="#b4b2b1" />
        <Text color={"#fff"} h4 style={{ alignSelf: "flex-end" }}>
          59
        </Text>
        <Text color={"#fff"} h4 style={{ alignSelf: "flex-start" }}>
          {capitalize(item[0])}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default CategoryItem;

const styles = StyleSheet.create({
  layout: {
    justifyContent: "space-between",
    padding: 8,
    height: "100%",
    overflow: "hidden",
  },
  img: {
    position: "absolute",
    bottom: -15,
    left: -40,
  },
});
