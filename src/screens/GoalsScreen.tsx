import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
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
const halfwayRemaining = Math.max(targetAmount / 2 - currentSaving, 0);

const formatMoney = (value: number) => `${value.toLocaleString("en-US")} TL`;

export default function GoalsScreen() {
  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text style={styles.title}>Goal overview</Text>
          </View>

          <TouchableOpacity activeOpacity={0.85} style={styles.headerButton}>
            <Ionicons name="create-outline" size={19} color={colors.soft} />
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.goalHeader}>
            <View>
              <Text style={styles.goalLabel}>Goal</Text>
              <Text style={styles.goalName}>{goalName}</Text>
            </View>

            <View style={styles.progressBadge}>
              <Text style={styles.progressBadgeText}>{progress}%</Text>
            </View>
          </View>

          <View style={styles.savedBlock}>
            <Text style={styles.cardLabel}>Saved so far</Text>
            <Text style={styles.savedAmount}>{formatMoney(currentSaving)}</Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>

          <View style={styles.amountRow}>
            <Text style={styles.amountCaption}>{formatMoney(targetAmount)} target</Text>
            <Text style={styles.amountCaption}>{formatMoney(remaining)} left</Text>
          </View>
        </View>

        <View style={styles.metricGrid}>
          <MetricCard icon="calendar-outline" label="Time left" value={`${monthsLeft} months`} />
          <MetricCard icon="wallet-outline" label="Monthly plan" value={formatMoney(monthlySaving)} />
        </View>

        <View style={styles.nextStepCard}>
          <View style={styles.nextIcon}>
            <Ionicons name="flag-outline" size={18} color={colors.accent} />
          </View>

          <View style={styles.nextBody}>
            <Text style={styles.nextTitle}>Next milestone</Text>
            <Text style={styles.nextText}>
              Reach halfway by saving {formatMoney(halfwayRemaining)} more.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={18} color={colors.faint} />
        </View>

        <View style={styles.planCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Milestone plan</Text>
              <Text style={styles.sectionHint}>Simple steps toward your goal</Text>
            </View>

            <Text style={styles.sectionBadge}>{progress}% done</Text>
          </View>

          <Milestone label="Start saving" value={formatMoney(currentSaving)} status="done" />
          <Milestone
            label="Halfway target"
            value={halfwayRemaining > 0 ? `${formatMoney(halfwayRemaining)} left` : "Reached"}
            status={halfwayRemaining > 0 ? "current" : "done"}
          />
          <Milestone label="Final goal" value={`${formatMoney(remaining)} left`} status="upcoming" last />
        </View>

        <View style={styles.insightCard}>
          <View style={styles.insightIcon}>
            <Ionicons name="sparkles-outline" size={19} color={colors.accent} />
          </View>

          <View style={styles.insightBody}>
            <Text style={styles.insightTitle}>Smart suggestion</Text>
            <Text style={styles.insightText}>
              Keeping {formatMoney(monthlySaving)} aside each month makes this goal realistic without squeezing daily spending.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricIcon}>
        <Ionicons name={icon} size={17} color={colors.accent} />
      </View>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function Milestone({
  label,
  value,
  status,
  last = false,
}: {
  label: string;
  value: string;
  status: "done" | "current" | "upcoming";
  last?: boolean;
}) {
  const isDone = status === "done";
  const isCurrent = status === "current";

  return (
    <View style={[styles.milestoneItem, last && styles.milestoneItemLast]}>
      <View style={styles.timeline}>
        <View style={[styles.statusDot, isDone && styles.statusDotDone, isCurrent && styles.statusDotCurrent]}>
          {isDone ? <Ionicons name="checkmark" size={13} color={colors.text} /> : null}
        </View>
        {!last ? <View style={styles.timelineLine} /> : null}
      </View>

      <View style={styles.milestoneBody}>
        <Text style={[styles.milestoneLabel, (isDone || isCurrent) && styles.milestoneLabelActive]}>
          {label}
        </Text>
        <Text style={styles.milestoneValue}>{value}</Text>
      </View>
    </View>
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

  heroCard: {
    backgroundColor: "rgba(15,23,42,0.82)",
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 24,
    padding: 20,
    marginBottom: 14,
  },

  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 14,
    marginBottom: 24,
  },

  goalLabel: {
    color: colors.faint,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 6,
  },

  goalName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
  },

  progressBadge: {
    minWidth: 50,
    height: 34,
    borderRadius: 999,
    backgroundColor: "rgba(139,92,246,0.18)",
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.32)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  progressBadgeText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "900",
  },

  savedBlock: {
    marginBottom: 22,
  },

  cardLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 8,
  },

  savedAmount: {
    color: colors.text,
    fontSize: 35,
    fontWeight: "800",
  },

  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
    marginBottom: 12,
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.accent,
  },

  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  amountCaption: {
    color: colors.faint,
    fontSize: 12,
    fontWeight: "700",
  },

  metricGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },

  metricCard: {
    flex: 1,
    minHeight: 108,
    borderRadius: 22,
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: colors.border,
  },

  metricIcon: {
    width: 34,
    height: 34,
    borderRadius: 13,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  metricLabel: {
    color: colors.faint,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 5,
  },

  metricValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },

  nextStepCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 22,
    padding: 15,
    backgroundColor: "rgba(56,189,248,0.075)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.16)",
    marginBottom: 16,
  },

  nextIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  nextBody: {
    flex: 1,
  },

  nextTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 4,
  },

  nextText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
  },

  planCard: {
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 14,
    marginBottom: 14,
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

  sectionBadge: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 3,
  },

  milestoneItem: {
    flexDirection: "row",
    minHeight: 58,
  },

  milestoneItemLast: {
    minHeight: 38,
  },

  timeline: {
    width: 34,
    alignItems: "center",
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
  },

  statusDotDone: {
    backgroundColor: colors.accentSoft,
    borderColor: "rgba(56,189,248,0.25)",
  },

  statusDotCurrent: {
    backgroundColor: "rgba(139,92,246,0.18)",
    borderColor: "rgba(139,92,246,0.32)",
  },

  timelineLine: {
    flex: 1,
    width: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  milestoneBody: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 18,
  },

  milestoneLabel: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 4,
  },

  milestoneLabelActive: {
    color: colors.text,
  },

  milestoneValue: {
    color: colors.faint,
    fontSize: 12,
    fontWeight: "700",
  },

  insightCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 15,
  },

  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  insightBody: {
    flex: 1,
  },

  insightTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 4,
  },

  insightText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
  },
});