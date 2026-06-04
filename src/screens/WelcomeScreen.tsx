import { Image, Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import ScreenBackground from "../components/ScreenBackground";
import { colors } from "../theme/colors";

type Props = {
  onLogin: () => void;
  onRegister: () => void;
};

export default function WelcomeScreen({ onLogin, onRegister }: Props) {
  return (
    <ScreenBackground>
      <View style={styles.container}>
        <View>
          <Image
            source={require("../../assets/finvibes-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.heroBadge}>
            <Ionicons name="sparkles-outline" size={16} color={colors.cyan} />
            <Text style={styles.heroBadgeText}>AI-powered finance coach</Text>
          </View>

          <Text style={styles.title}>Spend smarter. Save better.</Text>

          <Text style={styles.subtitle}>
            Track your money flow, build better habits and reach your financial goals with smarter insights.
          </Text>
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity activeOpacity={0.88} onPress={onRegister}>
            <LinearGradient colors={[colors.cyan, colors.blue, colors.purple]} style={styles.primaryButton}>
              <Text style={styles.primaryText}>Create Account</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8} onPress={onLogin}>
            <Text style={styles.secondaryText}>I already have an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 112,
    paddingBottom: 48,
    justifyContent: "space-between",
  },
  logo: {
    width: "82%",
    height: 90,
    alignSelf: "center",
    marginBottom: 70,
  },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 18,
  },
  heroBadgeText: {
    color: colors.soft,
    fontSize: 12,
    fontWeight: "900",
  },
  title: {
    color: colors.text,
    fontSize: 46,
    fontWeight: "900",
    lineHeight: 51,
    letterSpacing: -2,
  },
  subtitle: {
    color: colors.soft,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 18,
    maxWidth: 335,
    fontWeight: "600",
  },
  bottom: {
    gap: 12,
  },
  primaryButton: {
    height: 60,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
  secondaryButton: {
    height: 54,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: {
    color: "#93C5FD",
    fontSize: 14,
    fontWeight: "900",
  },
});