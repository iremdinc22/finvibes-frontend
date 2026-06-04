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
          <Ionicons name="arrow-back" size={20} color={colors.soft} />
        </TouchableOpacity>

        <Image
          source={require("../../assets/finvibes-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.kicker}>Account Recovery</Text>
        <Text style={styles.title}>Reset your password</Text>
        <Text style={styles.subtitle}>
          Enter your email and we’ll send you instructions to get back into your account.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>

          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={19} color={colors.muted} />

            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor={colors.faint}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleSendResetLink}
            style={styles.buttonWrapper}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Send Reset Link</Text>
              <Ionicons name="send-outline" size={18} color={colors.text} />
            </View>
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
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  logo: {
    width: 170,
    height: 58,
    marginBottom: 40,
    alignSelf: "center",
  },

  kicker: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 8,
  },

  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 39,
    letterSpacing: -1.1,
  },

  subtitle: {
    color: colors.muted,
    marginTop: 10,
    marginBottom: 26,
    lineHeight: 22,
    fontWeight: "600",
  },

  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 28,
    padding: 20,
  },

  label: {
    color: colors.soft,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 9,
  },

  inputBox: {
    height: 56,
    borderRadius: 20,
    backgroundColor: "rgba(2,6,23,0.36)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
  },

  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
  },

  buttonWrapper: {
    marginTop: 24,
  },

  button: {
    height: 58,
    borderRadius: 20,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.28)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },

  buttonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
});