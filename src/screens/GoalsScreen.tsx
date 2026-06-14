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
          <View style={styles.heroTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroLabel}>Active goal</Text>
              <Text style={styles.goalName}>{goalName}</Text>
              <Text style={styles.goalDescription}>Save for your next upgrade.</Text>
            </View>

            <View style={styles.iconCircle}>
              <Ionicons name="phone-portrait-outline" size={23} color={colors.accent} />
            </View>
          </View>

          <View style={styles.progressInfoRow}>
            <View>
              <Text style={styles.progressPercent}>{progress}%</Text>
              <Text style={styles.progressCaption}>completed</Text>
            </View>

            <View style={styles.remainingBox}>
              <Text style={styles.remainingValue}>{formatMoney(remaining)}</Text>
              <Text style={styles.remainingLabel}>left</Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>

          <View style={styles.progressFooter}>
            <Text style={styles.progressFooterText}>{formatMoney(currentSaving)} saved</Text>
            <Text style={styles.progressFooterText}>{formatMoney(targetAmount)} target</Text>
          </View>
        </View>

        <View style={styles.grid}>
          <InfoCard icon="calendar-outline" value={`${monthsLeft} months`} label="Estimated time" />
          <InfoCard icon="wallet-outline" value={formatMoney(monthlySaving)} label="Monthly saving" />
        </View>

        <View style={styles.milestoneCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Milestone plan</Text>
            <Text style={styles.sectionBadge}>{formatMoney(remaining)} left</Text>
          </View>

          <Milestone
            label="Current saving"
            value={formatMoney(currentSaving)}
            icon="checkmark"
            active
          />
          <Milestone label="Halfway target" value={formatMoney(targetAmount / 2)} icon="ellipse" />
          <Milestone label="Final goal" value={formatMoney(targetAmount)} icon="ellipse" last />
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

function InfoCard({
  icon,
  value,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.infoCard}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={20} color={colors.accent} />
      </View>

      <Text style={styles.infoValue}>{value}</Text>
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
  );
}

function Milestone({
  label,
  value,
  icon,
  active = false,
  last = false,
}: {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  active?: boolean;
  last?: boolean;
}) {
  return (
    <View style={[styles.milestoneItem, last && styles.milestoneItemLast]}>
      <View style={[styles.milestoneIcon, active && styles.milestoneIconActive]}>
        <Ionicons
          name={icon}
          size={active ? 15 : 9}
          color={active ? colors.text : colors.faint}
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={[styles.milestoneLabel, active && styles.milestoneLabelActive]}>
          {label}
        </Text>
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
    marginBottom: 16,
  },

  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 14,
  },

  heroLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },

  goalName: {
    color: colors.text,
    fontSize: 31,
    fontWeight: "800",
    letterSpacing: -1,
  },

  goalDescription: {
    color: colors.faint,
    fontSize: 13,
    fontWeight: "600",
    marginTop: 7,
  },

  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.20)",
    alignItems: "center",
    justifyContent: "center",
  },

  progressInfoRow: {
    marginTop: 26,
    marginBottom: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  progressPercent: {
    color: colors.text,
    fontSize: 40,
    fontWeight: "800",
    letterSpacing: -1.4,
  },

  progressCaption: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "600",
    marginTop: -2,
  },

  remainingBox: {
    alignItems: "flex-end",
  },

  remainingValue: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: "800",
  },

  remainingLabel: {
    color: colors.faint,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },

  progressTrack: {
    height: 13,
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

  progressFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 11,
  },

  progressFooterText: {
    color: colors.faint,
    fontSize: 12,
    fontWeight: "600",
  },

  grid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  infoCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    padding: 16,
  },

  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  infoValue: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 5,
  },

  infoLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600",
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
    marginBottom: 16,
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
    gap: 13,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  milestoneItemLast: {
    borderBottomWidth: 0,
  },

  milestoneIcon: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },

  milestoneIconActive: {
    backgroundColor: colors.accentSoft,
    borderColor: "rgba(56,189,248,0.25)",
  },

  milestoneLabel: {
    color: colors.muted,
    fontWeight: "700",
    fontSize: 13,
  },

  milestoneLabelActive: {
    color: colors.text,
  },

  milestoneValue: {
    color: colors.text,
    fontWeight: "800",
    marginTop: 4,
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