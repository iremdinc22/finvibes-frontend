import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
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
    text: "Shopping is 18% higher than last month. Review non-essential purchases this week.",
  },
  {
    type: "Saving",
    icon: "wallet-outline",
    title: "Food budget opportunity",
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
] as const;

export default function InsightsScreen() {
  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text style={styles.kicker}>Smart analysis</Text>
            <Text style={styles.title}>Insights</Text>
          </View>

          <TouchableOpacity activeOpacity={0.85} style={styles.headerButton}>
            <Ionicons name="options-outline" size={19} color={colors.soft} />
          </TouchableOpacity>
        </View>

        <View style={styles.healthCard}>
          <View style={styles.healthTop}>
            <View style={styles.healthCopy}>
              <Text style={styles.cardLabel}>Monthly health score</Text>
              <Text style={styles.healthTitle}>Your budget looks stable</Text>
              <Text style={styles.healthText}>
                Shopping and food need light attention this month.
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

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${healthScore}%` }]} />
          </View>

          <View style={styles.healthStats}>
            <Metric label="Risk level" value="Medium" />
            <Metric label="Savings trend" value="Stable" align="right" />
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.86} style={styles.actionCard}>
          <View style={styles.actionIcon}>
            <Ionicons name="sparkles-outline" size={18} color={colors.accent} />
          </View>

          <View style={styles.actionBody}>
            <Text style={styles.actionTitle}>Best next action</Text>
            <Text style={styles.actionText}>
              Set a weekly shopping cap to protect your monthly balance.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={18} color={colors.faint} />
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Today’s insights</Text>
            <Text style={styles.sectionHint}>{insights.length} recommendations</Text>
          </View>

          <TouchableOpacity activeOpacity={0.85} style={styles.filterButton}>
            <Ionicons name="funnel-outline" size={15} color={colors.accent} />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.insightList}>
          {insights.map((item) => (
            <InsightCard key={item.title} item={item} />
          ))}
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}

function ScoreCircle() {
  const size = 94;
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

function Metric({
  label,
  value,
  align = "left",
}: {
  label: string;
  value: string;
  align?: "left" | "right";
}) {
  return (
    <View style={[styles.metric, align === "right" && styles.metricRight]}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function InsightCard({ item }: { item: (typeof insights)[number] }) {
  return (
    <TouchableOpacity activeOpacity={0.86} style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name={item.icon} size={19} color={colors.accent} />
      </View>

      <View style={styles.cardBody}>
        <View style={styles.cardTop}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.type}</Text>
          </View>
        </View>

        <Text style={styles.cardText}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 58,
    paddingBottom: 120,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  headerCopy: {
    flex: 1,
    paddingRight: 14,
  },

  kicker: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 7,
  },

  title: {
    color: colors.text,
    fontSize: 31,
    fontWeight: "800",
    lineHeight: 37,
  },

  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  healthCard: {
    backgroundColor: "rgba(15,23,42,0.82)",
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 24,
    padding: 20,
    marginBottom: 14,
  },

  healthTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  healthCopy: {
    flex: 1,
  },

  cardLabel: {
    color: colors.muted,
    fontWeight: "800",
    fontSize: 13,
    marginBottom: 8,
  },

  healthTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 21,
    lineHeight: 26,
  },

  healthText: {
    color: colors.muted,
    marginTop: 8,
    lineHeight: 19,
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
  },

  scoreLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "800",
    marginTop: -1,
  },

  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
    marginTop: 20,
    marginBottom: 16,
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.accent,
  },

  healthStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  metric: {
    flex: 1,
  },

  metricRight: {
    alignItems: "flex-end",
  },

  metricLabel: {
    color: colors.faint,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 5,
  },

  metricValue: {
    color: colors.soft,
    fontSize: 14,
    fontWeight: "800",
  },

  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 22,
    padding: 15,
    backgroundColor: "rgba(56,189,248,0.075)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.16)",
    marginBottom: 24,
  },

  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  actionBody: {
    flex: 1,
  },

  actionTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 4,
  },

  actionText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 13,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
  },

  sectionHint: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
  },

  filterButton: {
    height: 36,
    paddingHorizontal: 11,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  filterText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "800",
  },

  insightList: {
    gap: 10,
  },

  card: {
    minHeight: 92,
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 14,
    flexDirection: "row",
    gap: 12,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  cardBody: {
    flex: 1,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  cardTitle: {
    flex: 1,
    color: colors.text,
    fontWeight: "800",
    fontSize: 14,
  },

  badge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "rgba(139,92,246,0.14)",
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.24)",
  },

  badgeText: {
    color: colors.soft,
    fontSize: 10,
    fontWeight: "800",
  },

  cardText: {
    color: colors.muted,
    marginTop: 7,
    lineHeight: 19,
    fontSize: 12,
    fontWeight: "600",
  },
});
