import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, Toolbar } from "../components";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { COLORS } from "../utils/colors";
import { Client } from "../api/Client";

const ContactsScreen = ({ route: { params } }) => {
  const { path } = params;
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getAllContacts = async (page) => {
      const query = `contacts?page=${page}`;
      const response = await Client.get(query);
      const data = await response?.data?.data;
      // console.log(data);

      if (data.length > page) {
        return data.concat(await getAllContacts(page + 1));
      } else {
        return data;
      }
    };
    const data = getAllContacts(1);
    console.log(data.length);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Toolbar>
        <View style={styles.toolbarContainer}>
          <View style={styles.searchview}>
            <TextInput
              value={query}
              onChange={(e) => console.log(e)}
              placeholder="Rechercher"
              style={styles.input}
            />
            <TouchableOpacity style={styles.search}>
              <Ionicons name="search" size={20} color="white" />
            </TouchableOpacity>
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
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
export default ContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 22 : 0,
  },
  searchview: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    // paddingVertical: 4,
    fontSize: 16,
    fontWeight: "600",
  },
  search: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary.primary600,
    borderRadius: 50,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
});
