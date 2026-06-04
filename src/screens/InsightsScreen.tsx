import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";

import ScreenBackground from "../components/ScreenBackground";
import { colors } from "../theme/colors";

const healthScore = 78;

const insights = [
  {
    type: "Risk",
    icon: "alert-circle-outline",
    title: "Shopping increased",
    text: "Your shopping expenses are 18% higher than last month.",
    color: "#FB7185",
  },
  {
    type: "Saving",
    icon: "wallet-outline",
    title: "Saving opportunity",
    text: "Reducing food spending by 10% could save around 850 TL this month.",
    color: "#38BDF8",
  },
  {
    type: "Goal",
    icon: "flag-outline",
    title: "Goal is on track",
    text: "Your current saving pace keeps your phone goal stable.",
    color: "#A855F7",
  },
  {
    type: "Habit",
    icon: "repeat-outline",
    title: "Small purchases add up",
    text: "Coffee and snacks are creating a visible impact on your monthly budget.",
    color: "#6366F1",
  },
];

export default function InsightsScreen() {
  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.kicker}>Smart Analysis</Text>
        <Text style={styles.title}>Insights</Text>
        <Text style={styles.subtitle}>
          Understand your spending patterns and discover better financial decisions.
        </Text>

        <LinearGradient colors={["#111827", "#172554", "#34216D"]} style={styles.healthCard}>
          <View style={styles.healthTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.healthLabel}>Monthly health score</Text>
              <Text style={styles.healthTitle}>Your budget looks stable</Text>
              <Text style={styles.healthText}>
                Shopping and food categories need attention this month.
              </Text>
            </View>

            <View style={styles.scoreArea}>
              <ScoreCircle />
              <View style={styles.scoreCenter}>
                <Text style={styles.scoreValue}>{healthScore}</Text>
                <Text style={styles.scoreLabel}>score</Text>
              </View>
            </View>
          </View>

          <View style={styles.healthMetrics}>
            <Metric label="Risk level" value="Medium" />
            <View style={styles.metricDivider} />
            <Metric label="Savings trend" value="Stable" />
          </View>
        </LinearGradient>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today’s Insights</Text>
          <Text style={styles.sectionHint}>4 alerts</Text>
        </View>

        {insights.map((item) => (
          <View style={styles.card} key={item.title}>
            <LinearGradient
              colors={[`${item.color}28`, "rgba(255,255,255,0.035)"]}
              style={styles.cardGlow}
            />

            <View style={[styles.iconBox, { backgroundColor: `${item.color}20` }]}>
              <Ionicons
                name={item.icon as keyof typeof Ionicons.glyphMap}
                size={22}
                color={item.color}
              />
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.cardTop}>
                <Text style={styles.cardTitle}>{item.title}</Text>

                <View style={[styles.badgeBox, { borderColor: `${item.color}55` }]}>
                  <Text style={[styles.badge, { color: item.color }]}>{item.type}</Text>
                </View>
              </View>

              <Text style={styles.cardText}>{item.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </ScreenBackground>
  );
}

function ScoreCircle() {
  const size = 92;
  const strokeWidth = 9;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (healthScore / 100) * circumference;

  return (
    <Svg width={size} height={size}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgba(255,255,255,0.13)"
        strokeWidth={strokeWidth}
        fill="none"
      />

      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={colors.cyan}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        rotation="-90"
        originX={size / 2}
        originY={size / 2}
      />
    </Svg>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 22,
    paddingTop: 58,
    paddingBottom: 130,
  },

  kicker: {
    color: colors.cyan,
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 8,
  },

  title: {
    color: colors.text,
    fontSize: 38,
    fontWeight: "900",
    letterSpacing: -1.5,
  },

  subtitle: {
    color: colors.muted,
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 22,
  },

  healthCard: {
    borderRadius: 34,
    padding: 22,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(147,197,253,0.18)",
  },

  healthTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },

  healthLabel: {
    color: "#CBD5E1",
    fontWeight: "900",
    fontSize: 13,
    marginBottom: 8,
  },

  healthTitle: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 22,
    letterSpacing: -0.5,
    lineHeight: 27,
  },

  healthText: {
    color: colors.soft,
    marginTop: 9,
    lineHeight: 20,
    fontSize: 13,
    fontWeight: "700",
  },

  scoreArea: {
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
  },

  scoreCenter: {
    position: "absolute",
    alignItems: "center",
  },

  scoreValue: {
    color: colors.text,
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: -0.5,
  },

  scoreLabel: {
    color: "#CBD5E1",
    fontSize: 10,
    fontWeight: "900",
    marginTop: -1,
  },

  healthMetrics: {
    marginTop: 20,
    backgroundColor: "rgba(3,7,18,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 22,
    padding: 15,
    flexDirection: "row",
  },

  metric: {
    flex: 1,
  },

  metricLabel: {
    color: "#8EA4C8",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 5,
  },

  metricValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
  },

  metricDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.10)",
    marginHorizontal: 12,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.5,
  },

  sectionHint: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: "900",
  },

  card: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 26,
    padding: 16,
    marginBottom: 13,
    flexDirection: "row",
    gap: 14,
  },

  cardGlow: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.55,
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "center",
  },

  cardTitle: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 15,
    flex: 1,
  },

  badgeBox: {
    backgroundColor: "rgba(3,7,18,0.24)",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  badge: {
    fontSize: 10,
    fontWeight: "900",
  },

  cardText: {
    color: colors.soft,
    marginTop: 7,
    lineHeight: 20,
    fontSize: 13,
    fontWeight: "700",
  },
});