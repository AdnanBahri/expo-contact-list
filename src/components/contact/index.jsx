import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Text from "../ui/text";
import { useNavigation } from "@react-navigation/native";

const Contact = ({
  nom,
  prenom,
  entreprise,
  statut_label,
  statut_couleur,
  cle,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Details", { nom, prenom, cle })}
    >
      <View style={styles.container}>
        <View style={styles.details}>
          <Image
            source={{
              uri: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=1380&t=st=1688473213~exp=1688473813~hmac=b6bb79684a27760c36d6eb5516adfaa445054c080df4ce03dc8e9d1e227e419f",
            }}
            style={styles.avatar}
          />
          <View
            style={{
              flex: 1,
              alignItems: "flex-start",
              justifyContent: "center",
              marginStart: 10,
            }}
          >
            <Text h4>
              {prenom} {nom}
            </Text>
            <Text size={12}>@{entreprise}</Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 4,
            paddingVertical: 2,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              statut_couleur === "success"
                ? "#f3ff99"
                : statut_couleur === "inverse"
                ? "#dad9d8"
                : statut_couleur === "warning"
                ? "#ffc999"
                : statut_couleur === "danger"
                ? "#ffbfb3"
                : "#caecf2",
          }}
        >
          <Text
            size={11}
            color={
              statut_couleur === "success"
                ? "#879900"
                : statut_couleur === "inverse"
                ? "#343332"
                : statut_couleur === "warning"
                ? "#e66b00"
                : statut_couleur === "danger"
                ? "#cc2200"
                : "#3fbccf"
            }
          >
            {statut_couleur}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#fff",
  },
  details: {
    flexDirection: "row",
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
});
