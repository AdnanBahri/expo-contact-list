import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { CategoryItem, Text, Toolbar } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { Client } from "../api/Client";
import { useState } from "react";

const HomeScreen = ({ navigation }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { data, isLoading, isError, error } = useQuery(
    "categories",
    async () => {
      const resp = await Client.get(
        "https://api-v2.hopcrm.com/api/mobile/infos/volumetrie"
      );
      return resp?.data;
    }
  );

  const handleClick = (path) => {
    if (path === "contact")
      navigation.navigate("Contacts", {
        path,
      });
    else setModalIsOpen(true);
  };

  return (
    <SafeAreaView style={styles.layout}>
      <Toolbar>
        <View style={styles.toolbarContainer}>
          <View style={styles.container}>
            <Image
              source={{
                uri: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=1380&t=st=1688473213~exp=1688473813~hmac=b6bb79684a27760c36d6eb5516adfaa445054c080df4ce03dc8e9d1e227e419f",
              }}
              style={styles.avatar}
            />
            <View
              style={{
                alignItems: "flex-start",
                justifyContent: "center",
                paddingHorizontal: 12,
                flex: 1,
              }}
            >
              <Text h4 color="#fff">
                Bonjour, Adnan
              </Text>
              <Text weight={"300"} size={12} color="#fff">
                HOP ONLINE
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
              <Ionicons
                name="ios-notifications-outline"
                size={24}
                color="white"
                style={{ marginHorizontal: 12 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="ios-menu-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Toolbar>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 12 }}>
        {isLoading && <ActivityIndicator size={"large"} color={"#cc2200"} />}
        {isError && !isLoading && <Text h3>{JSON.stringify(error)}</Text>}
        {!isLoading && !isError && (
          <View style={styles.grid}>
            {Object.entries(data).map((item, index) => (
              <CategoryItem
                item={item}
                position={index}
                key={index}
                handler={() => handleClick(item[0])}
              />
            ))}
          </View>
        )}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            {/* <TouchableOpacity
              onPress={() => setModalIsOpen(false)}
              style={{ alignSelf: "flex-end" }}
            >
              <Ionicons name="ios-close" size={24} />
            </TouchableOpacity> */}
            <View
              style={{
                height: 100,
                width: 250,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text h4>Coming Soon</Text>
            </View>
            <TouchableOpacity
              style={{ alignSelf: "flex-end", marginBottom: 8 }}
              onPress={() => setModalIsOpen(false)}
            >
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  backgroundColor: "#111827",
                  borderRadius: 4,
                }}
              >
                <Text size={14} color={"#fff"}>
                  Okay
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  toolbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 22 : 0,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 30,
  },
  heading: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
});
