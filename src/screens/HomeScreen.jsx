import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { CategoryItem, Text, Toolbar } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Client } from "../api/Client";

const HomeScreen = ({ navigation }) => {
  const [collection, setCollection] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resp = await Client.get(
          "https://api-v2.hopcrm.com/api/mobile/infos/volumetrie"
        );
        const data = await resp?.data;
        setCollection(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const handleClick = (path) =>
    navigation.navigate("Contacts", {
      path,
    });

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
        <View style={styles.grid}>
          {Object.entries(collection).map((item, index) => (
            <CategoryItem
              item={item}
              position={index}
              key={index}
              handler={() => handleClick(item[0])}
            />
          ))}
        </View>
      </ScrollView>
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
});
