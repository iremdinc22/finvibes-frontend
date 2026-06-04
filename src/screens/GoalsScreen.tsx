import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";

import ScreenBackground from "../components/ScreenBackground";
import { colors } from "../theme/colors";

const goalName = "New Phone";
const targetAmount = 60000;
const currentSaving = 15000;
const monthlySaving = 7500;

const remaining = targetAmount - currentSaving;
const monthsLeft = Math.ceil(remaining / monthlySaving);
const progress = Math.round((currentSaving / targetAmount) * 100);

const formatMoney = (value: number) => `${value.toLocaleString("en-US")} TL`;

export default function GoalsScreen() {
  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.kicker}>Goal Mode</Text>
        <Text style={styles.title}>Savings Goal</Text>
        <Text style={styles.subtitle}>Turn your goal into a clear monthly plan.</Text>

        <LinearGradient colors={["#111827", "#172554", "#4C1D95"]} style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.heroLabel}>Active goal</Text>
              <Text style={styles.goalName}>{goalName}</Text>
            </View>

            <View style={styles.iconCircle}>
              <Ionicons name="phone-portrait-outline" size={24} color="#DDE7FF" />
            </View>
          </View>

          <View style={styles.progressArea}>
            <GoalProgress />

            <View style={styles.progressCenter}>
              <Text style={styles.progressPercent}>{progress}%</Text>
              <Text style={styles.progressLabel}>completed</Text>
            </View>
          </View>

          <View style={styles.amountPanel}>
            <View>
              <Text style={styles.panelLabel}>Saved</Text>
              <Text style={styles.panelValue}>{formatMoney(currentSaving)}</Text>
            </View>

            <View style={styles.panelDivider} />

            <View>
              <Text style={styles.panelLabel}>Target</Text>
              <Text style={styles.panelValue}>{formatMoney(targetAmount)}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.grid}>
          <InfoCard icon="calendar-outline" label="Estimated time" value={`${monthsLeft} months`} />
          <InfoCard icon="wallet-outline" label="Monthly saving" value={formatMoney(monthlySaving)} />
        </View>

        <View style={styles.milestoneCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Milestone plan</Text>
            <Text style={styles.sectionBadge}>{formatMoney(remaining)} left</Text>
          </View>

          <Milestone label="Current saving" value={formatMoney(currentSaving)} active />
          <Milestone label="Halfway target" value={formatMoney(targetAmount / 2)} />
          <Milestone label="Final goal" value={formatMoney(targetAmount)} last />
        </View>

        <View style={styles.aiPanel}>
          <View style={styles.aiIcon}>
            <Ionicons name="sparkles-outline" size={22} color={colors.cyan} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.aiTitle}>Smart suggestion</Text>
            <Text style={styles.aiText}>
              Saving {formatMoney(monthlySaving)} monthly keeps this goal on track. You can reach it in about {monthsLeft} months.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color={colors.muted} />
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}

function GoalProgress() {
  const size = 210;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <View style={styles.progressShadow}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.12)"
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

        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius - 19}
          stroke="rgba(168,85,247,0.25)"
          strokeWidth={2}
          fill="none"
        />
      </Svg>
    </View>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoCard}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={21} color={colors.cyan} />
      </View>

      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function Milestone({
  label,
  value,
  active = false,
  last = false,
}: {
  label: string;
  value: string;
  active?: boolean;
  last?: boolean;
}) {
  return (
    <View style={styles.milestone}>
      <View style={styles.timeline}>
        <View style={[styles.milestoneDot, active && styles.milestoneDotActive]} />
        {!last && <View style={styles.timelineLine} />}
      </View>

      <View style={styles.milestoneContent}>
        <Text style={styles.milestoneLabel}>{label}</Text>
        <Text style={styles.milestoneValue}>{value}</Text>
      </View>
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

  heroCard: {
    borderRadius: 34,
    padding: 22,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(147,197,253,0.18)",
  },

  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  heroLabel: {
    color: "#CBD5E1",
    fontWeight: "800",
    marginBottom: 8,
  },

  goalName: {
    color: colors.text,
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: -0.8,
  },

  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },

  progressArea: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
    marginBottom: 18,
  },

  progressShadow: {
    shadowColor: colors.cyan,
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },

  progressCenter: {
    position: "absolute",
    alignItems: "center",
  },

  progressPercent: {
    color: colors.text,
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: -1.4,
  },

  progressLabel: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "800",
    marginTop: 2,
  },

  amountPanel: {
    backgroundColor: "rgba(3,7,18,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 22,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  panelLabel: {
    color: "#8EA4C8",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 5,
  },

  panelValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "900",
  },

  panelDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.10)",
    marginHorizontal: 10,
  },

  grid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  infoCard: {
    flex: 1,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 25,
    padding: 16,
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: "rgba(56,189,248,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  infoLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800",
  },

  infoValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 6,
  },

  milestoneCard: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 28,
    padding: 18,
    marginBottom: 16,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900",
  },

  sectionBadge: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: "900",
  },

  milestone: {
    flexDirection: "row",
    gap: 13,
  },

  timeline: {
    alignItems: "center",
  },

  milestoneDot: {
    width: 14,
    height: 14,
    borderRadius: 99,
    backgroundColor: "rgba(148,163,184,0.35)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.12)",
  },

  milestoneDotActive: {
    backgroundColor: colors.cyan,
    borderColor: "rgba(56,189,248,0.45)",
  },

  timelineLine: {
    width: 2,
    height: 36,
    backgroundColor: "rgba(148,163,184,0.18)",
    marginVertical: 4,
  },

  milestoneContent: {
    flex: 1,
    paddingBottom: 16,
  },

  milestoneLabel: {
    color: colors.soft,
    fontWeight: "800",
    fontSize: 13,
  },

  milestoneValue: {
    color: colors.text,
    fontWeight: "900",
    marginTop: 3,
  },

  aiPanel: {
    backgroundColor: "rgba(14,165,233,0.09)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.22)",
    borderRadius: 28,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  aiIcon: {
    width: 46,
    height: 46,
    borderRadius: 17,
    backgroundColor: "rgba(56,189,248,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },

  aiTitle: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 16,
  },

  aiText: {
    color: colors.soft,
    lineHeight: 20,
    marginTop: 5,
    fontSize: 13,
  },
});