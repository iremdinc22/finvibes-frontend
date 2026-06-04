import { View, Text, StyleSheet, ScrollView } from "react-native";
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
  },
  {
    type: "Saving",
    icon: "wallet-outline",
    title: "Saving opportunity",
    text: "Reducing food spending by 10% could save around 850 TL this month.",
  },
  {
    type: "Goal",
    icon: "flag-outline",
    title: "Goal is on track",
    text: "Your current saving pace keeps your phone goal stable.",
  },
  {
    type: "Habit",
    icon: "repeat-outline",
    title: "Small purchases add up",
    text: "Coffee and snacks are creating a visible impact on your monthly budget.",
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

        <View style={styles.healthCard}>
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
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today’s Insights</Text>
          <Text style={styles.sectionHint}>4 alerts</Text>
        </View>

        {insights.map((item) => (
          <View style={styles.card} key={item.title}>
            <View style={styles.iconBox}>
              <Ionicons
                name={item.icon as keyof typeof Ionicons.glyphMap}
                size={20}
                color={colors.accent}
              />
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.cardTop}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.badge}>{item.type}</Text>
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
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={strokeWidth}
        fill="none"
      />

      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={colors.accent}
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
    color: colors.accent,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 8,
  },

  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -1.1,
  },

  subtitle: {
    color: colors.muted,
    marginTop: 8,
    marginBottom: 22,
    lineHeight: 22,
    fontWeight: "600",
  },

  healthCard: {
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 28,
    padding: 22,
    marginBottom: 24,
  },

  healthTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },

  healthLabel: {
    color: colors.muted,
    fontWeight: "700",
    fontSize: 13,
    marginBottom: 8,
  },

  healthTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 21,
    letterSpacing: -0.5,
    lineHeight: 26,
  },

  healthText: {
    color: colors.muted,
    marginTop: 9,
    lineHeight: 20,
    fontSize: 13,
    fontWeight: "600",
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
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  scoreLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "700",
    marginTop: -1,
  },

  healthMetrics: {
    marginTop: 20,
    backgroundColor: "rgba(2,6,23,0.35)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
  },

  metric: {
    flex: 1,
  },

  metricLabel: {
    color: colors.faint,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 5,
  },

  metricValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
  },

  metricDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
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
    fontSize: 19,
    fontWeight: "800",
  },

  sectionHint: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
  },

  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 15,
    marginBottom: 11,
    flexDirection: "row",
    gap: 13,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: colors.accentSoft,
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
    fontWeight: "700",
    fontSize: 15,
    flex: 1,
  },

  badge: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: "700",
  },

  cardText: {
    color: colors.muted,
    marginTop: 6,
    lineHeight: 20,
    fontSize: 13,
    fontWeight: "600",
  },
});