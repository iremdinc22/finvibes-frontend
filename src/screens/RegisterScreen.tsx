import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  Image,
  KeyboardTypeOptions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ScreenBackground from "../components/ScreenBackground";
import { colors } from "../theme/colors";

type Props = {
  onRegister: () => void;
  onLogin: () => void;
};

type InputFieldProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

export default function RegisterScreen({ onRegister, onLogin }: Props) {
  const [fullName, setFullName] = useState("İrem Dinç");
  const [email, setEmail] = useState("demo@finvibes.com");
  const [password, setPassword] = useState("123456");

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Image
          source={require("../../assets/finvibes-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.kicker}>Start Smart</Text>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Set up your profile and start tracking your money flow.</Text>

        <View style={styles.card}>
          <InputField
            label="Full name"
            icon="person-outline"
            value={fullName}
            onChangeText={setFullName}
          />

          <InputField
            label="Email"
            icon="mail-outline"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <InputField
            label="Password"
            icon="lock-closed-outline"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity activeOpacity={0.88} onPress={onRegister} style={styles.buttonWrapper}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Create Account</Text>
              <Ionicons name="arrow-forward" size={19} color={colors.text} />
            </View>
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

function InputField({
  label,
  icon,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
}: InputFieldProps) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputBox}>
        <Ionicons name={icon} size={19} color={colors.muted} />

        <TextInput
          style={styles.input}
          placeholderTextColor={colors.faint}
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
    width: 170,
    height: 58,
    marginBottom: 42,
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
    marginTop: 14,
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

  bottomLink: {
    alignItems: "center",
    marginTop: 24,
  },

  bottomText: {
    color: colors.muted,
    fontWeight: "600",
  },

  link: {
    color: colors.accent,
    fontWeight: "800",
  },
});