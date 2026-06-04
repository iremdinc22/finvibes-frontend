import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import ScreenBackground from "../components/ScreenBackground";
import { colors } from "../theme/colors";

type Props = {
  onBackToLogin: () => void;
};

export default function ForgotPasswordScreen({ onBackToLogin }: Props) {
  const [email, setEmail] = useState("demo@finvibes.com");

  const handleSendResetLink = () => {
    if (!email.trim()) {
      Alert.alert("Email required", "Please enter your email address.");
      return;
    }

    Alert.alert("Reset link sent", "Password reset instructions were sent to your email.");
    onBackToLogin();
  };

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={onBackToLogin} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={20} color="#DDE7FF" />
        </TouchableOpacity>

        <Image source={require("../../assets/finvibes-logo.png")} style={styles.logo} resizeMode="contain" />

        <Text style={styles.kicker}>Account Recovery</Text>
        <Text style={styles.title}>Reset your password</Text>
        <Text style={styles.subtitle}>
          Enter your email and we’ll send you instructions to get back into your account.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>

          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={20} color={colors.muted} />
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor="#64748B"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <TouchableOpacity activeOpacity={0.88} onPress={handleSendResetLink} style={styles.buttonWrapper}>
            <LinearGradient colors={[colors.cyan, colors.blue, colors.purple]} style={styles.button}>
              <Text style={styles.buttonText}>Send Reset Link</Text>
              <Ionicons name="send-outline" size={19} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 66,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  logo: {
    width: 180,
    height: 60,
    marginBottom: 42,
    alignSelf: "center",
  },
  kicker: {
    color: colors.cyan,
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 8,
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "900",
    lineHeight: 39,
    letterSpacing: -1,
  },
  subtitle: {
    color: colors.muted,
    marginTop: 10,
    marginBottom: 28,
    lineHeight: 22,
    fontWeight: "600",
  },
  card: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 30,
    padding: 20,
  },
  label: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 9,
  },
  inputBox: {
    height: 56,
    borderRadius: 20,
    backgroundColor: "rgba(3,7,18,0.48)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.16)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
  },
  buttonWrapper: {
    marginTop: 24,
  },
  button: {
    height: 58,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
});