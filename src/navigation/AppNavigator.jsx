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

const MainStack = createStackNavigator();

const BottomTabs = createBottomTabNavigator();

const Tabs = ({ route: { params } }) => {
  return (
    <BottomTabs.Navigator
      initialRouteName="Infos"
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTabs.Screen
        name="Infos"
        component={InfosScreen}
        initialParams={params}
      />
      <BottomTabs.Screen name="Notes" component={NotesScreen} />
      <BottomTabs.Screen name="Taches" component={TasksScreen} />
      <BottomTabs.Screen name="Autres" component={OthersScreen} />
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
