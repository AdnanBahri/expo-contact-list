import { createStackNavigator } from "@react-navigation/stack";
import {
  ContactsScreen,
  HomeScreen,
  InfosScreen,
  NotesScreen,
  OthersScreen,
  TasksScreen,
} from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Text } from "../components";

const MainStack = createStackNavigator();

const BottomTabs = createBottomTabNavigator();

const Tabs = ({ route: { params } }) => {
  return (
    <BottomTabs.Navigator
      initialRouteName="Infos"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#827f7d",
          paddingBottom: 4,
        },
        tabBarLabel: ({ focused, children }) => (
          <Text size={12} color={focused ? "#000" : "#fff"}>
            {children}
          </Text>
        ),
      }}
      backBehavior="history"
    >
      <BottomTabs.Screen
        name="Infos"
        component={InfosScreen}
        initialParams={params}
        options={{
          tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons
              name={
                focused
                  ? "ios-information-circle"
                  : "ios-information-circle-outline"
              }
              size={25}
              color={focused ? "#000" : "#fff"}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          tabBarIcon: ({ focused, tintColor }) => (
            <MaterialCommunityIcons
              name={focused ? "pencil" : "pencil-outline"}
              size={25}
              color={focused ? "#000" : "#fff"}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Taches"
        component={TasksScreen}
        options={{
          tabBarIcon: ({ focused, tintColor }) => (
            <FontAwesome5
              name={"calendar-plus"}
              size={20}
              color={focused ? "#000" : "#fff"}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Autres"
        component={OthersScreen}
        options={{
          tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons
              name={focused ? "menu" : "menu-outline"}
              size={32}
              color={focused ? "#000" : "#fff"}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerStyle: { elevation: 0 },
      }}
    >
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Contacts" component={ContactsScreen} />
      <MainStack.Screen name="Details" component={Tabs} />
    </MainStack.Navigator>
  );
};
export default AppNavigator;
