import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import HomeScreen from "../screens/HomeScreen";
import TransactionsScreen from "../screens/TransactionsScreen";
import GoalsScreen from "../screens/GoalsScreen";
import InsightsScreen from "../screens/InsightsScreen";
import AICoachScreen from "../screens/AICoachScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs({ navigation }: any) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#38BDF8",
        tabBarInactiveTintColor: "#64748B",
        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          backgroundColor: "#070A13",
          borderTopWidth: 0,
          height: 85,
          paddingBottom: 20,
          paddingTop: 8,
          elevation: 0,
          shadowOpacity: 0,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "800",
        },

        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Home") iconName = "home";
          if (route.name === "History") iconName = "list";
          if (route.name === "Goals") iconName = "flag";
          if (route.name === "Insights") iconName = "analytics";
          if (route.name === "Coach") iconName = "sparkles";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home">
        {() => (
          <HomeScreen
            onProfilePress={() => navigation.navigate("Profile")}
            onSettingsPress={() => navigation.navigate("Settings")}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="History" component={TransactionsScreen} />
      <Tab.Screen name="Goals" component={GoalsScreen} />
      <Tab.Screen name="Insights" component={InsightsScreen} />
      <Tab.Screen name="Coach" component={AICoachScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#070A13" />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={BottomTabs} />

        <Stack.Screen name="Profile">
          {(props) => (
            <ProfileScreen
              onBackPress={() => props.navigation.goBack()}
              onSettingsPress={() => props.navigation.navigate("Settings")}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Settings">
          {(props) => (
            <SettingsScreen
              onBackPress={() => props.navigation.goBack()}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </>
  );
}