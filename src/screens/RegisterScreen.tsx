import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import ScreenBackground from "../components/ScreenBackground";
import { colors } from "../theme/colors";

type Props = {
  onRegister: () => void;
  onLogin: () => void;
};

export default function RegisterScreen({ onRegister, onLogin }: Props) {
  const [fullName, setFullName] = useState("İrem Dinç");
  const [email, setEmail] = useState("demo@finvibes.com");
  const [password, setPassword] = useState("123456");

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Image source={require("../../assets/finvibes-logo.png")} style={styles.logo} resizeMode="contain" />

        <Text style={styles.kicker}>Start Smart</Text>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Set up your profile and start tracking your money flow.</Text>

        <View style={styles.card}>
          <InputField label="Full name" icon="person-outline" value={fullName} onChangeText={setFullName} />
          <InputField label="Email" icon="mail-outline" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <InputField label="Password" icon="lock-closed-outline" value={password} onChangeText={setPassword} secureTextEntry />

          <TouchableOpacity activeOpacity={0.88} onPress={onRegister} style={styles.buttonWrapper}>
            <LinearGradient colors={[colors.cyan, colors.blue, colors.purple]} style={styles.button}>
              <Text style={styles.buttonText}>Create Account</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.bottomLink} onPress={onLogin} activeOpacity={0.8}>
          <Text style={styles.bottomText}>
            Already have an account? <Text style={styles.link}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenBackground>
  );
}

function InputField({ label, icon, value, onChangeText, secureTextEntry = false, keyboardType = "default" }: any) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputBox}>
        <Ionicons name={icon} size={20} color={colors.muted} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#64748B"
          autoCapitalize="none"
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 72,
    paddingBottom: 80,
  },
  logo: {
    width: 180,
    height: 60,
    marginBottom: 44,
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
    marginTop: 14,
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
  bottomLink: {
    alignItems: "center",
    marginTop: 24,
  },
  bottomText: {
    color: colors.muted,
    fontWeight: "700",
  },
  link: {
    color: colors.cyan,
    fontWeight: "900",
  },
});