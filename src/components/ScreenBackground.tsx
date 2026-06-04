import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";

type Props = {
  children: ReactNode;
};

export default function ScreenBackground({ children }: Props) {
  return (
    <LinearGradient
      colors={[colors.bg1, colors.bg2, colors.bg3]}
      style={styles.screen}
    >
      <View style={styles.topGlow} />
      <View style={styles.bottomGlow} />

      <View style={styles.lineOne} />
      <View style={styles.lineTwo} />

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
    width: 320,
    height: 320,
    borderRadius: 999,
    backgroundColor: colors.glowBlue,
    top: -180,
    right: -150,
  },

  bottomGlow: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 999,
    backgroundColor: colors.glowPurple,
    bottom: -180,
    left: -150,
  },

  lineOne: {
    position: "absolute",
    top: 180,
    right: -80,
    width: 280,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.03)",
    transform: [{ rotate: "-25deg" }],
  },

  lineTwo: {
    position: "absolute",
    bottom: 220,
    left: -80,
    width: 220,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.03)",
    transform: [{ rotate: "25deg" }],
  },
});