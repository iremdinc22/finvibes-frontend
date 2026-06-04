import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./src/navigation/AppNavigator";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";

type AuthScreen = "welcome" | "login" | "register" | "forgot";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authScreen, setAuthScreen] = useState<AuthScreen>("welcome");

  if (!isLoggedIn) {
    if (authScreen === "welcome") {
      return (
        <WelcomeScreen
          onLogin={() => setAuthScreen("login")}
          onRegister={() => setAuthScreen("register")}
        />
      );
    }

    if (authScreen === "register") {
      return (
        <RegisterScreen
          onRegister={() => setIsLoggedIn(true)}
          onLogin={() => setAuthScreen("login")}
        />
      );
    }

    if (authScreen === "forgot") {
      return <ForgotPasswordScreen onBackToLogin={() => setAuthScreen("login")} />;
    }

    return (
      <LoginScreen
        onLogin={() => setIsLoggedIn(true)}
        onRegister={() => setAuthScreen("register")}
        onForgotPassword={() => setAuthScreen("forgot")}
      />
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}