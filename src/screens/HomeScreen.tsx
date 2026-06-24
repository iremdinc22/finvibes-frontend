import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";

import ScreenBackground from "../components/ScreenBackground";
import { colors } from "../theme/colors";

type Props = {
  onProfilePress?: () => void;
  onSettingsPress?: () => void;
  onAddExpensePress?: () => void;
  onInsightsPress?: () => void;
  onBudgetPress?: () => void;
};

const monthlyIncome = 30000;
const totalSpent = 12450;
const savingGoal = 8000;

const remaining = monthlyIncome - totalSpent;
const budgetUsed = Math.round((totalSpent / monthlyIncome) * 100);

const spendingBreakdown = [
  { label: "Lifestyle", value: 42, color: colors.accent },
  { label: "Savings", value: 28, color: colors.purple },
  { label: "Bills", value: 18, color: "#60A5FA" },
  { label: "Other", value: 12, color: "#475569" },
];

const transactions = [
  { icon: "fast-food-outline", title: "Food & Dining", time: "Today, 2:20 PM", amount: "-420 TL" },
  { icon: "cart-outline", title: "Shopping", time: "Yesterday, 6:45 PM", amount: "-1,250 TL" },
  { icon: "bus-outline", title: "Transport", time: "Monday, 9:15 AM", amount: "-95 TL" },
] as const;

const formatMoney = (value: number) => `${value.toLocaleString("en-US")} TL`;

export default function HomeScreen({
  onProfilePress,
  onSettingsPress,
  onAddExpensePress,
  onInsightsPress,
  onBudgetPress,
}: Props) {
  return (
    <ScreenBackground>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.profile} activeOpacity={0.85} onPress={onProfilePress}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>İD</Text>
            </View>

            <View style={styles.profileText}>
              <Text style={styles.eyebrow}>Good evening</Text>
              <Text style={styles.userName}>İrem Dinç</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.headerActions}>
            <IconButton icon="notifications-outline" />
            <IconButton icon="settings-outline" onPress={onSettingsPress} />
          </View>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.cardLabel}>Available balance</Text>
              <Text style={styles.balance}>{formatMoney(remaining)}</Text>
            </View>

            <View style={styles.healthBadge}>
              <Ionicons name="trending-up" size={14} color={colors.green} />
              <Text style={styles.healthText}>Healthy</Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${budgetUsed}%` }]} />
          </View>

          <View style={styles.heroStats}>
            <Metric label="Income" value={formatMoney(monthlyIncome)} />
            <Metric label="Spent" value={formatMoney(totalSpent)} align="right" />
          </View>
        </View>

        <View style={styles.actions}>
          <Action icon="add-outline" label="Add" active onPress={onAddExpensePress} />
          <Action icon="sparkles-outline" label="Insights" onPress={onInsightsPress} />
          <Action icon="pie-chart-outline" label="Budget" onPress={onBudgetPress} />
        </View>

        <View style={styles.sectionTitleRow}>
          <View>
            <Text style={styles.sectionTitle}>Monthly overview</Text>
            <Text style={styles.sectionHint}>{budgetUsed}% of income used</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.monthButton}>
            <Text style={styles.monthText}>June</Text>
            <Ionicons name="chevron-down" size={14} color={colors.soft} />
          </TouchableOpacity>
        </View>

        <View style={styles.overview}>
          <View style={styles.chartWrap}>
            <DonutChart />
            <View style={styles.chartCenter}>
              <Text style={styles.chartPercent}>{budgetUsed}%</Text>
              <Text style={styles.chartLabel}>used</Text>
            </View>
          </View>

          <View style={styles.categoryList}>
            {spendingBreakdown.map((item) => (
              <View key={item.label} style={styles.categoryItem}>
                <View style={[styles.categoryDot, { backgroundColor: item.color }]} />
                <Text style={styles.categoryLabel}>{item.label}</Text>
                <Text style={styles.categoryValue}>{item.value}%</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.insightCard} activeOpacity={0.85} onPress={onInsightsPress}>
          <View style={styles.insightIcon}>
            <Ionicons name="sparkles-outline" size={18} color={colors.accent} />
          </View>

          <View style={styles.insightBody}>
            <Text style={styles.insightTitle}>Shopping is rising</Text>
            <Text style={styles.insightText}>
              Small purchase frequency increased this week. Try setting a daily cap to protect your {formatMoney(savingGoal)} goal.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={18} color={colors.faint} />
        </TouchableOpacity>

        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>Recent activity</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.linkText}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionList}>
          {transactions.map((transaction) => (
            <Transaction key={`${transaction.title}-${transaction.time}`} {...transaction} />
          ))}
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}

function IconButton({
  icon,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.iconButton} activeOpacity={0.8} onPress={onPress}>
      <Ionicons name={icon} size={19} color={colors.soft} />
    </TouchableOpacity>
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

function DonutChart() {
  const size = 154;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const gap = 7;
  let accumulated = 0;

  return (
    <Svg width={size} height={size}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgba(255,255,255,0.075)"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {spendingBreakdown.map((item) => {
        const segmentLength = Math.max((item.value / 100) * circumference - gap, 0);
        const offset = -((accumulated / 100) * circumference);
        accumulated += item.value;

        return (
          <Circle
            key={item.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={item.color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${segmentLength} ${circumference}`}
            strokeDashoffset={offset}
            rotation="-100"
            originX={size / 2}
            originY={size / 2}
          />
        );
      })}
    </Svg>
  );
}

function Action({
  icon,
  label,
  active = false,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={[styles.action, active && styles.actionActive]} activeOpacity={0.85} onPress={onPress}>
      <Ionicons name={icon} size={19} color={active ? colors.text : colors.soft} />
      <Text style={[styles.actionText, active && styles.actionTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

function Transaction({
  icon,
  title,
  time,
  amount,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  time: string;
  amount: string;
}) {
  return (
    <TouchableOpacity style={styles.transaction} activeOpacity={0.82}>
      <View style={styles.transactionIcon}>
        <Ionicons name={icon} size={19} color={colors.accent} />
      </View>

      <View style={styles.transactionBody}>
        <Text style={styles.transactionTitle}>{title}</Text>
        <Text style={styles.transactionTime}>{time}</Text>
      </View>

      <Text style={styles.transactionAmount}>{amount}</Text>
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

  profile: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  profileText: {
    flex: 1,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },

  eyebrow: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
  },

  userName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
  },

  headerActions: {
    flexDirection: "row",
    gap: 9,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.065)",
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  heroCard: {
    backgroundColor: "rgba(15,23,42,0.78)",
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 24,
    padding: 20,
    marginBottom: 14,
  },

  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 14,
  },

  cardLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 9,
  },

  balance: {
    color: colors.text,
    fontSize: 36,
    fontWeight: "700",
  },

  healthBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "rgba(34,197,94,0.1)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.2)",
  },

  healthText: {
    color: colors.green,
    fontSize: 12,
    fontWeight: "800",
  },

  progressTrack: {
    height: 8,
    overflow: "hidden",
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginTop: 22,
    marginBottom: 17,
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.accent,
  },

  heroStats: {
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
    fontWeight: "700",
    marginBottom: 5,
  },

  metricValue: {
    color: colors.soft,
    fontSize: 14,
    fontWeight: "800",
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },

  action: {
    flex: 1,
    minHeight: 50,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  actionActive: {
    backgroundColor: colors.accentSoft,
    borderColor: "rgba(56,189,248,0.24)",
  },

  actionText: {
    color: colors.soft,
    fontSize: 13,
    fontWeight: "800",
  },

  actionTextActive: {
    color: colors.text,
  },

  sectionTitleRow: {
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

  monthButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: colors.border,
  },

  monthText: {
    color: colors.soft,
    fontSize: 12,
    fontWeight: "800",
  },

  overview: {
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
  },

  chartWrap: {
    width: 154,
    height: 154,
    alignItems: "center",
    justifyContent: "center",
  },

  chartCenter: {
    position: "absolute",
    alignItems: "center",
  },

  chartPercent: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "800",
  },

  chartLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 1,
  },

  categoryList: {
    flex: 1,
    gap: 11,
  },

  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  categoryDot: {
    width: 9,
    height: 9,
    borderRadius: 99,
    marginRight: 8,
  },

  categoryLabel: {
    flex: 1,
    color: colors.soft,
    fontSize: 13,
    fontWeight: "700",
  },

  categoryValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800",
  },

  insightCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(56,189,248,0.075)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.16)",
    borderRadius: 22,
    padding: 15,
    marginBottom: 24,
  },

  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(56,189,248,0.12)",
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

  linkText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: "800",
  },

  transactionList: {
    gap: 10,
  },

  transaction: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 14,
  },

  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  transactionBody: {
    flex: 1,
  },

  transactionTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
  },

  transactionTime: {
    color: colors.faint,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },

  transactionAmount: {
    color: colors.soft,
    fontSize: 14,
    fontWeight: "800",
  },
});
