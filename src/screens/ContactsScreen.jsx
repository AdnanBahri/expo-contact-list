import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  SectionList,
  ActivityIndicator,
} from "react-native";
import { Contact, Text, Toolbar } from "../components";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { COLORS } from "../utils/colors";
import { Client } from "../api/Client";
import { sortContacts } from "../utils/util";

const ContactsScreen = ({ route: { params } }) => {
  const { path } = params;
  const [query, setQuery] = useState("");
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getAllContacts = async (page) => {
      try {
        const query = `contacts?page=${page}`;
        const response = await Client.get(query);
        const data = await response?.data?.data;
        setContacts(sortContacts([...data]));
      } catch (error) {
        console.log("useEffect Error: ", error);
      }
    };
    getAllContacts(1);
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
      {contacts.length === 0 ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <SectionList
          keyExtractor={(_, index) => index.toString()}
          stickySectionHeadersEnabled={true}
          sections={contacts}
          renderItem={({ item, index, section }) => <Contact {...item} />}
          renderSectionHeader={({ section }) => (
            <View style={styles.header}>
              <Text>{section.title}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 2,
                backgroundColor: "#a8a5a4",
              }}
            />
          )}
        />
      )}
      <StatusBar style="light" />
    </SafeAreaView>
  );
};
export default ContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a8a5a4",
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
  header: {
    backgroundColor: "#a8a5a4",
    paddingVertical: 4,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
});
