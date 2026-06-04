import { View, Text, StyleSheet, ScrollView } from "react-native";
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

        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.heroLabel}>Active goal</Text>
              <Text style={styles.goalName}>{goalName}</Text>
            </View>

            <View style={styles.iconCircle}>
              <Ionicons name="phone-portrait-outline" size={23} color={colors.accent} />
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
            <Metric label="Saved" value={formatMoney(currentSaving)} />
            <View style={styles.panelDivider} />
            <Metric label="Target" value={formatMoney(targetAmount)} />
          </View>
        </View>

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
            <Ionicons name="sparkles-outline" size={20} color={colors.accent} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.aiTitle}>Smart suggestion</Text>
            <Text style={styles.aiText}>
              Saving {formatMoney(monthlySaving)} monthly keeps this goal on track. You can reach it in about {monthsLeft} months.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}

function GoalProgress() {
  const size = 184;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

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
      <Text style={styles.panelLabel}>{label}</Text>
      <Text style={styles.panelValue}>{value}</Text>
    </View>
  );
}

function InfoCard({ icon, label, value }: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoCard}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={20} color={colors.accent} />
      </View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function Milestone({ label, value, active = false, last = false }: {
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
  container: { padding: 22, paddingTop: 58, paddingBottom: 130 },
  kicker: { color: colors.accent, fontSize: 13, fontWeight: "800", marginBottom: 8 },
  title: { color: colors.text, fontSize: 34, fontWeight: "800", letterSpacing: -1.1 },
  subtitle: { color: colors.muted, marginTop: 8, marginBottom: 22, lineHeight: 22, fontWeight: "600" },
  heroCard: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: 28,
    padding: 22,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  heroTop: { flexDirection: "row", justifyContent: "space-between" },
  heroLabel: { color: colors.muted, fontWeight: "700", marginBottom: 8 },
  goalName: { color: colors.text, fontSize: 30, fontWeight: "800", letterSpacing: -0.8 },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  progressArea: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 18,
  },
  progressCenter: { position: "absolute", alignItems: "center" },
  progressPercent: { color: colors.text, fontSize: 38, fontWeight: "800", letterSpacing: -1.2 },
  progressLabel: { color: colors.muted, fontSize: 13, fontWeight: "600", marginTop: 2 },
  amountPanel: {
    backgroundColor: "rgba(2,6,23,0.35)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
  },
  metric: { flex: 1 },
  panelLabel: { color: colors.faint, fontSize: 12, fontWeight: "700", marginBottom: 5 },
  panelValue: { color: colors.text, fontSize: 14, fontWeight: "800" },
  panelDivider: { width: 1, backgroundColor: "rgba(255,255,255,0.08)", marginHorizontal: 12 },
  grid: { flexDirection: "row", gap: 12, marginBottom: 16 },
  infoCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 16,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  infoLabel: { color: colors.muted, fontSize: 12, fontWeight: "700" },
  infoValue: { color: colors.text, fontSize: 15, fontWeight: "800", marginTop: 6 },
  milestoneCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: "800" },
  sectionBadge: { color: colors.accent, fontSize: 12, fontWeight: "700" },
  milestone: { flexDirection: "row", gap: 13 },
  timeline: { alignItems: "center" },
  milestoneDot: {
    width: 13,
    height: 13,
    borderRadius: 99,
    backgroundColor: "rgba(148,163,184,0.35)",
  },
  milestoneDotActive: { backgroundColor: colors.accent },
  timelineLine: {
    width: 2,
    height: 36,
    backgroundColor: "rgba(148,163,184,0.18)",
    marginVertical: 4,
  },
  milestoneContent: { flex: 1, paddingBottom: 16 },
  milestoneLabel: { color: colors.soft, fontWeight: "700", fontSize: 13 },
  milestoneValue: { color: colors.text, fontWeight: "800", marginTop: 3 },
  aiPanel: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  aiIcon: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  aiTitle: { color: colors.text, fontWeight: "800", fontSize: 15 },
  aiText: { color: colors.muted, lineHeight: 20, marginTop: 5, fontSize: 13, fontWeight: "600" },
});