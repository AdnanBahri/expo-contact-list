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
import { getAllContacts, sortContacts } from "../utils/util";
import { QueryClient, useInfiniteQuery, useQueryClient } from "react-query";

const ContactsScreen = ({ route: { params }, ...rest }) => {
  const { path } = params;
  const [query, setQuery] = useState("");
  const [contacts, setContacts] = useState([]);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery("contacts", getAllContacts, {
    getNextPageParam: (lastPage, pages) => {
      // console.log(pages.length < pages[0].last_page);
      if (pages.length < pages[0].last_page) return pages.length + 1;
      return false;
    },
    enabled: true,
  });

  const loadData = () => {
    if (!isLoading && hasNextPage) {
      console.log("hasNextPage", hasNextPage);
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Toolbar>
        <View style={styles.toolbarContainer}>
          <View style={styles.searchview}>
            <TextInput
              value={query}
              onChangeText={(text) => setQuery(text)}
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

      {isError && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text h2>Something Went Wrong</Text>
          <Text h4 color={"red"}>
            {error}
          </Text>
        </View>
      )}
      {!isLoading && !isError && (
        <>
          <SectionList
            keyExtractor={(_, index) => index.toString()}
            stickySectionHeadersEnabled={true}
            sections={sortContacts([
              ...data.pages.flatMap((page) => page.data),
            ])}
            onEndReached={loadData}
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
        </>
      )}
      {(isLoading || isFetching) && (
        <View
          style={{
            position: "absolute",
            left: 0,
            bottom: 10,
            right: 0,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <ActivityIndicator size="large" color={"#cc2200"} />
        </View>
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
    position: "relative",
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
