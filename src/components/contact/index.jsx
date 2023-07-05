import { Image, StyleSheet, View } from "react-native";
import React from "react";
import Text from "../ui/text";

const Contact = ({
  nom,
  prenom,
  entreprise,
  statut_label,
  statut_couleur,
  cle,
}) => {
  return (
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
            statut_label === "Client"
              ? "#f3ff99"
              : statut_label.includes("traiter")
              ? "#cccccc"
              : "#ffbfb3",
        }}
      >
        <Text
          size={11}
          color={
            statut_label === "Client"
              ? "#879900"
              : statut_label.includes("traiter")
              ? "#fff"
              : "#cc2200"
          }
        >
          {statut_label}
        </Text>
      </View>
    </View>
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
