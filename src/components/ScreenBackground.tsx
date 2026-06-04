import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";

type Props = {
  children: ReactNode;
};

export default function ScreenBackground({ children }: Props) {
  return (
    <LinearGradient colors={[colors.bg1, colors.bg2, colors.bg3]} style={styles.screen}>
      <View style={styles.topGlow} />
      <View style={styles.centerGlow} />
      <View style={styles.bottomGlow} />
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    overflow: "hidden",
  },

  topGlow: {
    position: "absolute",
    width: 420,
    height: 420,
    borderRadius: 999,
    backgroundColor: colors.glowBlue,
    top: -260,
    right: -180,
  },

  centerGlow: {
    position: "absolute",
    width: 360,
    height: 360,
    borderRadius: 999,
    backgroundColor: "rgba(56,189,248,0.025)",
    top: 250,
    left: -220,
  },

  bottomGlow: {
    position: "absolute",
    width: 380,
    height: 380,
    borderRadius: 999,
    backgroundColor: colors.glowPurple,
    bottom: -260,
    right: -220,
  },
});