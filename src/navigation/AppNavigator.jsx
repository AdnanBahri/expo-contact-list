import { createStackNavigator } from "@react-navigation/stack";
import { ContactsScreen, DetailsScreen, HomeScreen } from "../screens";

const MainStack = createStackNavigator();

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
      <MainStack.Screen name="Details" component={DetailsScreen} />
    </MainStack.Navigator>
  );
};
export default AppNavigator;
