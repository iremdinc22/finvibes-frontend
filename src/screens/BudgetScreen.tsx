import { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ScreenBackground from "../components/ScreenBackground";
import { colors } from "../theme/colors";

type Props = {
  onBackPress?: () => void;
  onHomePress?: () => void;
};

type Period = "Week" | "Month";

const monthlyBudget = 22000;

const categories = [
  { name: "Food", spent: 4200, limit: 6000, icon: "fast-food-outline" },
  { name: "Shopping", spent: 3500, limit: 4000, icon: "cart-outline" },
  { name: "Bills", spent: 2100, limit: 3000, icon: "flash-outline" },
  { name: "Transport", spent: 950, limit: 1500, icon: "bus-outline" },
  { name: "Coffee", spent: 780, limit: 1000, icon: "cafe-outline" },
] as const;

const weekUsage = [
  { day: "M", value: 42 },
  { day: "T", value: 58 },
  { day: "W", value: 76 },
  { day: "T", value: 34 },
  { day: "F", value: 64 },
  { day: "S", value: 48 },
  { day: "S", value: 29 },
];

const formatMoney = (value: number) => `${value.toLocaleString("en-US")} TL`;

export default function BudgetScreen({ onBackPress }: Props) {
  const [period, setPeriod] = useState<Period>("Month");

  const totalSpent = useMemo(
    () => categories.reduce((sum, item) => sum + item.spent, 0),
    []
  );

  const remaining = monthlyBudget - totalSpent;
  const usedRate = Math.round((totalSpent / monthlyBudget) * 100);

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.85} style={styles.iconButton} onPress={onBackPress}>
            <Ionicons name="chevron-back" size={22} color={colors.soft} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Budget</Text>

          <TouchableOpacity activeOpacity={0.85} style={styles.iconButton}>
            <Ionicons name="options-outline" size={20} color={colors.soft} />
          </TouchableOpacity>
        </View>

        <View style={styles.segment}>
          {(["Week", "Month"] as Period[]).map((item) => (
            <TouchableOpacity
              key={item}
              activeOpacity={0.85}
              onPress={() => setPeriod(item)}
              style={[styles.segmentItem, period === item && styles.segmentItemActive]}
            >
              <Text style={[styles.segmentText, period === item && styles.segmentTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.planCard}>
          <View style={styles.planTop}>
            <View>
              <Text style={styles.planLabel}>Budget left</Text>
              <Text style={styles.planAmount}>{formatMoney(remaining)}</Text>
            </View>

            <View style={styles.planBadge}>
              <Text style={styles.planBadgeText}>{usedRate}%</Text>
            </View>
          </View>

          <Text style={styles.planText}>
            You have used {formatMoney(totalSpent)} of your {formatMoney(monthlyBudget)} monthly limit.
          </Text>

          <View style={styles.limitLine}>
            <View style={[styles.limitFill, { width: `${Math.min(usedRate, 100)}%` }]} />
          </View>

          <View style={styles.planFooter}>
            <Text style={styles.footerText}>Spent</Text>
            <Text style={styles.footerText}>Monthly limit</Text>
          </View>
        </View>

        <View style={styles.rhythmCard}>
          <View style={styles.rhythmHeader}>
            <View>
              <Text style={styles.sectionTitle}>Spending rhythm</Text>
              <Text style={styles.sectionHint}>This week usage pattern</Text>
            </View>

            <View style={styles.rhythmBadge}>
              <Ionicons name="pulse-outline" size={14} color={colors.accent} />
              <Text style={styles.rhythmBadgeText}>Live</Text>
            </View>
          </View>

          <View style={styles.barChart}>
            {weekUsage.map((item, index) => (
              <View key={`${item.day}-${index}`} style={styles.barItem}>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { height: `${item.value}%` }]} />
                </View>
                <Text style={styles.barLabel}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Limits by category</Text>
            <Text style={styles.sectionHint}>Adjust your spending caps</Text>
          </View>

          <TouchableOpacity activeOpacity={0.85} style={styles.addLimitButton}>
            <Text style={styles.addLimitText}>Add limit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.limitList}>
          {categories.map((item) => (
            <CategoryLimit key={item.name} item={item} />
          ))}
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}

function CategoryLimit({ item }: { item: (typeof categories)[number] }) {
  const rate = Math.round((item.spent / item.limit) * 100);
  const isHigh = rate >= 85;

  return (
    <TouchableOpacity activeOpacity={0.86} style={styles.limitItem}>
      <View style={[styles.categoryIcon, isHigh && styles.categoryIconDanger]}>
        <Ionicons name={item.icon} size={18} color={isHigh ? colors.red : colors.accent} />
      </View>

      <View style={styles.limitBody}>
        <View style={styles.limitTop}>
          <Text style={styles.limitTitle}>{item.name}</Text>
          <Text style={[styles.limitPercent, isHigh && styles.dangerText]}>{rate}%</Text>
        </View>

        <Text style={styles.limitMeta}>
          {formatMoney(item.spent)} / {formatMoney(item.limit)}
        </Text>

        <View style={styles.categoryTrack}>
          <View
            style={[
              styles.categoryFill,
              isHigh && styles.categoryFillDanger,
              { width: `${Math.min(rate, 100)}%` },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 58,
    paddingBottom: 130,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
  },

  segment: {
    alignSelf: "center",
    width: 210,
    height: 44,
    flexDirection: "row",
    gap: 5,
    padding: 5,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },

  segmentItem: {
    flex: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  segmentItemActive: {
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.22)",
  },

  segmentText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800",
  },

  segmentTextActive: {
    color: colors.text,
  },

  planCard: {
    backgroundColor: "rgba(15,23,42,0.82)",
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 28,
    padding: 20,
    marginBottom: 14,
  },

  planTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
  },

  planLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 8,
  },

  planAmount: {
    color: colors.text,
    fontSize: 35,
    fontWeight: "800",
  },

  planBadge: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },

  planBadgeText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
  },

  planText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "600",
    marginTop: 12,
  },

  limitLine: {
    height: 9,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
    marginTop: 18,
    marginBottom: 10,
  },

  limitFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.accent,
  },

  planFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  footerText: {
    color: colors.faint,
    fontSize: 12,
    fontWeight: "700",
  },

  rhythmCard: {
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 26,
    padding: 18,
    marginBottom: 24,
  },

  rhythmHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 18,
  },

  rhythmBadge: {
    height: 32,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.18)",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  rhythmBadgeText: {
    color: colors.soft,
    fontSize: 11,
    fontWeight: "800",
  },

  barChart: {
    height: 132,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },

  barItem: {
    alignItems: "center",
    gap: 8,
  },

  barTrack: {
    width: 28,
    height: 104,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "flex-end",
    overflow: "hidden",
  },

  barFill: {
    width: "100%",
    borderRadius: 999,
    backgroundColor: colors.accent,
  },

  barLabel: {
    color: colors.faint,
    fontSize: 11,
    fontWeight: "800",
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

  addLimitButton: {
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
  },

  addLimitText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "800",
  },

  limitList: {
    gap: 10,
  },

  limitItem: {
    minHeight: 86,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
  },

  categoryIcon: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  categoryIconDanger: {
    backgroundColor: "rgba(251,113,133,0.10)",
  },

  limitBody: {
    flex: 1,
  },

  limitTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  limitTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
  },

  limitPercent: {
    color: colors.soft,
    fontSize: 13,
    fontWeight: "900",
  },

  dangerText: {
    color: colors.red,
  },

  limitMeta: {
    color: colors.faint,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 9,
  },

  categoryTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },

  categoryFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.accent,
  },

  categoryFillDanger: {
    backgroundColor: colors.red,
  },
});

