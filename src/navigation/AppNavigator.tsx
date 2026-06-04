import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import HomeScreen from "../screens/HomeScreen";
import TransactionsScreen from "../screens/TransactionsScreen";
import GoalsScreen from "../screens/GoalsScreen";
import InsightsScreen from "../screens/InsightsScreen";
import AICoachScreen from "../screens/AICoachScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#070A13" />

      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarActiveTintColor: "#38BDF8",
          tabBarInactiveTintColor: "#64748B",

          tabBarStyle: {
            backgroundColor: "#070A13",
            borderTopWidth: 0,
            height: 72,
            paddingBottom: 10,
            paddingTop: 8,
            position: "absolute",
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
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
        <Tab.Screen name="History" component={TransactionsScreen} options={{ title: "History" }} />
        <Tab.Screen name="Goals" component={GoalsScreen} options={{ title: "Goals" }} />
        <Tab.Screen name="Insights" component={InsightsScreen} options={{ title: "Insights" }} />
        <Tab.Screen name="Coach" component={AICoachScreen} options={{ title: "Coach" }} />
      </Tab.Navigator>
    </>
  );
}