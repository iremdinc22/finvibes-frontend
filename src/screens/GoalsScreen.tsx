import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
          <View style={styles.goalHeader}>
            <Text style={styles.goalName}>{goalName}</Text>

            <View style={styles.progressPill}>
              <Text style={styles.progressPillText}>{progress}%</Text>
            </View>
          </View>

          <View style={styles.amountBlock}>
            <Text style={styles.remainingAmount}>{formatMoney(remaining)}</Text>
            <Text style={styles.remainingLabel}>left</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>

          <Text style={styles.savedText}>
            {formatMoney(currentSaving)} / {formatMoney(targetAmount)}
          </Text>

          <View style={styles.statRow}>
            <InlineStat icon="calendar-outline" value={`${monthsLeft} months left`} />
            <InlineStat icon="wallet-outline" value={`${formatMoney(monthlySaving)}/month`} />
          </View>
        </View>

        <View style={styles.nextMilestone}>
          <View style={styles.nextIcon}>
            <Ionicons name="flag-outline" size={16} color={colors.accent} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.nextTitle}>Next milestone</Text>
            <Text style={styles.nextText}>
              Halfway target • {formatMoney(targetAmount / 2 - currentSaving)} to go
            </Text>
          </View>
        </View>

        <View style={styles.milestoneCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Milestone plan</Text>
            <Text style={styles.sectionBadge}>{progress}% done</Text>
          </View>

          <Milestone label="Current saving" value="Completed" active />
          <Milestone label="Halfway target" value={`${formatMoney(targetAmount / 2 - currentSaving)} to go`} />
          <Milestone label="Final goal" value={`${formatMoney(remaining)} to go`} last />
        </View>

        <View style={styles.aiPanel}>
          <View style={styles.aiIcon}>
            <Ionicons name="sparkles-outline" size={20} color={colors.accent} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.aiTitle}>Smart suggestion</Text>
            <Text style={styles.aiText}>
              Focus on your halfway target first. Saving {formatMoney(monthlySaving)} monthly keeps your plan realistic and steady.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}

function InlineStat({
  icon,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
}) {
  return (
    <View style={styles.inlineStat}>
      <Ionicons name={icon} size={16} color={colors.accent} />
      <Text style={styles.inlineStatText}>{value}</Text>
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
    <View style={[styles.milestoneItem, last && styles.milestoneItemLast]}>
      <View style={[styles.statusDot, active && styles.statusDotActive]}>
        {active && <Ionicons name="checkmark" size={13} color={colors.text} />}
      </View>

      <Text style={[styles.milestoneLabel, active && styles.milestoneLabelActive]}>
        {label}
      </Text>

      <Text style={[styles.milestoneValue, active && styles.milestoneValueActive]}>
        {value}
      </Text>
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

  heroCard: {
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 30,
    padding: 22,
    marginBottom: 14,
  },

  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  goalName: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.6,
  },

  progressPill: {
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.22)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  progressPillText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800",
  },

  amountBlock: {
    marginTop: 26,
    flexDirection: "row",
    alignItems: "baseline",
    gap: 7,
  },

  remainingAmount: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "700",
    letterSpacing: -1.2,
  },

  remainingLabel: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "600",
  },

  separator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginTop: 18,
    marginBottom: 18,
  },

  progressTrack: {
    height: 12,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.accent,
  },

  savedText: {
    color: colors.faint,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 11,
  },

  statRow: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  inlineStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  inlineStatText: {
    color: colors.soft,
    fontSize: 12,
    fontWeight: "700",
  },

  nextMilestone: {
    backgroundColor: "rgba(56,189,248,0.075)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.16)",
    borderRadius: 22,
    padding: 15,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  nextIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  nextTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
  },

  nextText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },

  milestoneCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 26,
    padding: 18,
    marginBottom: 16,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
  },

  sectionBadge: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
  },

  milestoneItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  milestoneItemLast: {
    borderBottomWidth: 0,
  },

  statusDot: {
    width: 28,
    height: 28,
    borderRadius: 11,
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  statusDotActive: {
    backgroundColor: colors.accentSoft,
    borderColor: "rgba(56,189,248,0.25)",
  },

  milestoneLabel: {
    flex: 1,
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700",
  },

  milestoneLabelActive: {
    color: colors.text,
  },

  milestoneValue: {
    color: colors.soft,
    fontSize: 13,
    fontWeight: "700",
  },

  milestoneValueActive: {
    color: colors.accent,
  },

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

  aiTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 15,
  },

  aiText: {
    color: colors.muted,
    lineHeight: 20,
    marginTop: 5,
    fontSize: 13,
    fontWeight: "600",
  },
});
