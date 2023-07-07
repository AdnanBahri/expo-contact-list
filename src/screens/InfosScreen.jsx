import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Linking,
  View,
} from "react-native";
import { Button, Switch, Text, Toolbar } from "../components";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Client } from "../api/Client";
import { useQuery } from "react-query";
import { getDetails } from "../utils/util";

const InfosScreen = ({ route: { params }, navigation }) => {
  const { nom, prenom, cle, statut_label } = params;
  const [nomValue, setNomValue] = useState(nom);
  const [prenomValue, setPrenomValue] = useState(prenom);
  const [mailValue, setMailValue] = useState(null);
  const [phoneValue, setPhoneValue] = useState("");
  const [fixeValue, setFixeValue] = useState("");
  const [entrepriseValue, setEntrepriseValue] = useState(null);

  const [mailOption, setMailOption] = useState(true);
  const [smsOption, setSmsOption] = useState(true);

  const toggleMailOption = () => setMailOption((prev) => !prev);
  const toggleSmsOption = () => setSmsOption((prev) => !prev);

  const { isLoading, isError, data, error } = useQuery("details", () =>
    getDetails(cle)
  );

  const makePhoneCall = () => {
    if (Platform.OS === "android") Linking.openURL(`tel: ${phoneValue}`);
    else Linking.openURL(`telprompt: ${phoneValue}`);
  };

  const sendMail = () => Linking.openURL(`mailto: ${mailValue}`);

  useEffect(() => {
    if (data) {
      setMailValue(data.e_mail);
      setPhoneValue(data.telephone_mobile);
      setFixeValue(data.telephone_fixe);
      setEntrepriseValue(data.entreprise);
    }
  }, [data]);

  if (isLoading)
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#dcdbdb",
        }}
      >
        <ActivityIndicator size={"large"} color={"#879900"} />
      </View>
    );

  if (isError)
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#dcdbdb",
        }}
      >
        <Text h3>Something Went Wrong</Text>
        <Text p color={"#cc2200"}>
          {error}
        </Text>
      </View>
    );
  return (
    <SafeAreaView style={styles.container}>
      <Toolbar>
        <View style={styles.toolbarContainer}>
          <View style={styles.top}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="ios-chevron-back" size={24} color={"#fff"} />
              <Text p color={"#fff"}>
                Contacts
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text p color={"#fff"}>
                Modifier
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            <View style={styles.details}>
              <Image
                source={{
                  uri: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=1380&t=st=1688473213~exp=1688473813~hmac=b6bb79684a27760c36d6eb5516adfaa445054c080df4ce03dc8e9d1e227e419f",
                }}
                style={styles.avatar}
              />
              <View style={styles.infos}>
                <Text h4 color={"#fff"}>
                  {prenom} {nom}
                </Text>
                <Text weight={"300"} size={14} color={"#dcdbdb"}>
                  {entrepriseValue}
                </Text>
                <Text weight={"300"} size={14} color={"#dcdbdb"}>
                  {mailValue}
                </Text>
                <Text weight={"300"} size={14} color={"#dcdbdb"}>
                  {phoneValue}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={{ marginEnd: 4 }} onPress={sendMail}>
              <MaterialCommunityIcons
                name="email-outline"
                size={40}
                color={"#fff"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginStart: 4 }}
              onPress={makePhoneCall}
            >
              <Ionicons name="ios-call-outline" size={40} color={"#fff"} />
            </TouchableOpacity>
          </View>
        </View>
      </Toolbar>
      {mailValue && (
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View>
            <Text p color={"#2b506e"}>
              Nom
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Nom"
                placeholderTextColor={"#dcdbdb"}
                value={nomValue}
                onChangeText={(text) => setNomValue(text)}
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#686664",
                }}
              />
            </View>
          </View>

          <View style={{ marginTop: 16 }}>
            <Text p color={"#2b506e"}>
              Prenom
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Prenom"
                placeholderTextColor={"#dcdbdb"}
                value={prenomValue}
                onChangeText={(text) => setPrenomValue(text)}
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#686664",
                }}
              />
            </View>
          </View>

          <View style={{ marginTop: 16 }}>
            <Text p color={"#2b506e"}>
              Adresse email
            </Text>
            <View style={styles.optionContainer}>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <TextInput
                  placeholder="example@gmail.xyz"
                  placeholderTextColor={"#dcdbdb"}
                  value={mailValue}
                  onChangeText={(text) => setMailValue(text)}
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "#686664",
                  }}
                />
                <View style={styles.box}>
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={24}
                    color={"#fff"}
                  />
                </View>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 4,
                }}
              >
                <Text size={12} color={"#2b506e"}>
                  Option Mail
                </Text>
                <Switch />
              </View>
            </View>
          </View>

          <View style={{ marginTop: 16 }}>
            <Text p color={"#2b506e"}>
              Telephone mobile
            </Text>
            <View style={styles.optionContainer}>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <TextInput
                  placeholder="telephone mobile"
                  placeholderTextColor={"#dcdbdb"}
                  value={phoneValue}
                  onChangeText={(text) => setPhoneValue(text)}
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "#686664",
                  }}
                />
                <View style={styles.box}>
                  <Ionicons name="ios-call-outline" size={24} color={"#fff"} />
                </View>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 4,
                }}
              >
                <Text size={12} color={"#2b506e"}>
                  Option SMS
                </Text>
                <Switch />
              </View>
            </View>
          </View>

          <View style={{ marginTop: 16 }}>
            <Text p color={"#2b506e"}>
              Telephone fixe
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="telephone"
                placeholderTextColor={"#dcdbdb"}
                value={fixeValue}
                onChangeText={(text) => setFixeValue(text)}
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#686664",
                }}
              />
              <View style={styles.box}>
                <Ionicons name="ios-call-outline" size={24} color={"#fff"} />
              </View>
            </View>
          </View>

          <View style={{ marginTop: 16 }}>
            <Text p color={"#2b506e"}>
              Statut
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Button active={statut_label === "Prospect"}>Prospect</Button>
              <Button
                active={statut_label === "Client"}
                style={{ marginStart: 8 }}
              >
                Client
              </Button>
              <Button
                active={statut_label === "Partenaire"}
                style={{ marginStart: 8 }}
              >
                Partenaire
              </Button>
            </View>
          </View>
        </View>
      )}
      <StatusBar style="light" />
    </SafeAreaView>
  );
};
export default InfosScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dcdbdb",
  },
  toolbarContainer: {
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? 22 : 0,
    paddingHorizontal: 12,
  },
  top: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  details: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 70,
  },
  infos: {
    flex: 1,
    alignItems: "flex-start",
    paddingHorizontal: 8,
  },
  inputContainer: {
    marginTop: 4,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#cccccc",
    backgroundColor: "#fff",
    position: "relative",
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    backgroundColor: "#abc200",
    borderTopEndRadius: 4,
    borderBottomEndRadius: 4,
    position: "absolute",
    right: -1,
    top: 0,
    bottom: 0,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
