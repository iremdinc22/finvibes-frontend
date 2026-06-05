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
};

const monthlyIncome = 30000;
const totalSpent = 12450;
const savingGoal = 8000;

const remaining = monthlyIncome - totalSpent;
const budgetUsed = Math.round((totalSpent / monthlyIncome) * 100);

const spendingBreakdown = [
  { label: "Lifestyle", value: 42, color: colors.accent },
  { label: "Savings", value: 28, color: colors.purple },
  { label: "Bills", value: 18, color: "#334155" },
  { label: "Other", value: 12, color: "#1E293B" },
];

const formatMoney = (value: number) => `${value.toLocaleString("en-US")} TL`;

export default function HomeScreen({
  onProfilePress,
  onSettingsPress,
  onAddExpensePress,
  onInsightsPress,
}: Props) {
  return (
    <ScreenBackground>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <View style={styles.profileHeader}>
          <TouchableOpacity style={styles.profileArea} activeOpacity={0.85} onPress={onProfilePress}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>İD</Text>
            </View>

            <View>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.userName}>İrem Dinç</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.headerActions}>
            <HeaderButton icon="notifications-outline" />
            <HeaderButton icon="settings-outline" onPress={onSettingsPress} />
          </View>
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.balanceTop}>
            <View>
              <Text style={styles.cardLabel}>Available Balance</Text>
              <Text style={styles.balance}>{formatMoney(remaining)}</Text>
            </View>

            <View style={styles.growthBadge}>
              <Ionicons name="trending-up" size={14} color={colors.green} />
              <Text style={styles.growthText}>12.4%</Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <MiniMetric label="Income" value={formatMoney(monthlyIncome)} />
            <View style={styles.divider} />
            <MiniMetric label="Spent" value={formatMoney(totalSpent)} />
          </View>
        </View>

        <View style={styles.quickMenu}>
          <Action icon="add-outline" label="Add Expense" active onPress={onAddExpensePress} />
          <Action icon="sparkles-outline" label="Insights" onPress={onInsightsPress} />
        </View>

        <View style={styles.overviewCard}>
          <View style={styles.cardTop}>
            <View>
              <Text style={styles.cardTitle}>Monthly Overview</Text>
              <Text style={styles.cardSub}>{budgetUsed}% of monthly income used</Text>
            </View>

            <View style={styles.monthBadge}>
              <Text style={styles.monthText}>Month</Text>
            </View>
          </View>

          <View style={styles.chartArea}>
            <DonutChart />

            <View style={styles.chartCenter}>
              <Text style={styles.chartPercent}>{budgetUsed}%</Text>
              <Text style={styles.chartLabel}>budget used</Text>
            </View>
          </View>

          <View style={styles.summaryPanel}>
            <MiniMetric label="Spent" value={formatMoney(totalSpent)} />
            <View style={styles.divider} />
            <MiniMetric label="Savings goal" value={formatMoney(savingGoal)} />
          </View>

          <View style={styles.legendRow}>
            {spendingBreakdown.slice(0, 3).map((item) => (
              <View style={styles.legendItem} key={item.label}>
                <View style={[styles.dot, { backgroundColor: item.color }]} />
                <Text style={styles.legendText}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.aiPanel}>
          <View style={styles.aiIcon}>
            <Ionicons name="sparkles-outline" size={20} color={colors.accent} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.aiTitle}>AI detected a trend</Text>
            <Text style={styles.aiText}>
              Shopping is trending upward. Reducing small purchases this week can help protect your savings goal.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest Transactions</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>

        <Transaction icon="fast-food-outline" title="Food & Dining" time="Today • 2:20 PM" amount="-420 TL" />
        <Transaction icon="cart-outline" title="Shopping" time="Yesterday • 6:45 PM" amount="-1,250 TL" />
        <Transaction icon="bus-outline" title="Transport" time="Monday • 9:15 AM" amount="-95 TL" />
      </ScrollView>
    </ScreenBackground>
  );
}

function HeaderButton({
  icon,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.circleButton} activeOpacity={0.8} onPress={onPress}>
      <Ionicons name={icon} size={19} color={colors.soft} />
    </TouchableOpacity>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function DonutChart() {
  const size = 204;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const gap = 8;
  let accumulated = 0;

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

      {spendingBreakdown.map((item) => {
        const segmentLength = (item.value / 100) * circumference - gap;
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
    <TouchableOpacity
      style={[styles.actionButton, active && styles.actionButtonActive]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Ionicons name={icon} size={20} color={active ? colors.text : colors.muted} />
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
    <View style={styles.transactionCard}>
      <View style={styles.transactionLeft}>
        <View style={styles.transactionIcon}>
          <Ionicons name={icon} size={20} color={colors.accent} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.transactionTitle}>{title}</Text>
          <Text style={styles.transactionTime}>{time}</Text>
        </View>
      </View>

      <Text style={styles.transactionAmount}>{amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 22,
    paddingTop: 58,
    paddingBottom: 130,
  },

  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  profileArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    flex: 1,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 16,
  },

  welcomeText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },

  userName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
  },

  headerActions: {
    flexDirection: "row",
    gap: 10,
  },

  circleButton: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  balanceCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 28,
    padding: 22,
    marginBottom: 16,
  },

  balanceTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  cardLabel: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
  },

  balance: {
    color: colors.text,
    fontSize: 42,
    fontWeight: "300",
    letterSpacing: -1.8,
  },

  growthBadge: {
    backgroundColor: "rgba(34,197,94,0.10)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.22)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  growthText: {
    color: colors.green,
    fontSize: 12,
    fontWeight: "800",
  },

  metaRow: {
    marginTop: 18,
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

  divider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginHorizontal: 12,
  },

  quickMenu: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  actionButton: {
    flex: 1,
    height: 54,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  actionButtonActive: {
    backgroundColor: colors.accentSoft,
    borderColor: "rgba(56,189,248,0.24)",
  },

  actionText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
  },

  actionTextActive: {
    color: colors.text,
  },

  overviewCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 28,
    padding: 22,
    marginBottom: 16,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  cardTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 17,
  },

  cardSub: {
    color: colors.muted,
    marginTop: 6,
    fontWeight: "600",
    fontSize: 13,
  },

  monthBadge: {
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },

  monthText: {
    color: colors.soft,
    fontWeight: "700",
    fontSize: 12,
  },

  chartArea: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 14,
  },

  chartCenter: {
    position: "absolute",
    alignItems: "center",
  },

  chartPercent: {
    color: colors.text,
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: -1.2,
  },

  chartLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "600",
    marginTop: 2,
  },

  summaryPanel: {
    backgroundColor: "rgba(2,6,23,0.35)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    marginBottom: 14,
  },

  legendRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 99,
  },

  legendText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600",
  },

  aiPanel: {
    marginBottom: 24,
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

  viewAll: {
    color: colors.accent,
    fontWeight: "700",
    fontSize: 13,
  },

  transactionCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 15,
    marginBottom: 11,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    flex: 1,
  },

  transactionIcon: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  transactionTitle: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 15,
  },

  transactionTime: {
    color: colors.faint,
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
  },

  transactionAmount: {
    color: colors.soft,
    fontWeight: "800",
    fontSize: 15,
  },
});