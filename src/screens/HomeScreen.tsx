import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";

import ScreenBackground from "../components/ScreenBackground";
import { colors } from "../theme/colors";

const monthlyIncome = 30000;
const totalSpent = 12450;
const savingGoal = 8000;

const remaining = monthlyIncome - totalSpent;
const budgetUsed = Math.round((totalSpent / monthlyIncome) * 100);

const spendingBreakdown = [
  { label: "Lifestyle", value: 42, color: "#6D28D9" },
  { label: "Savings", value: 28, color: "#A78BFA" },
  { label: "Bills", value: 18, color: "#1D4ED8" },
  { label: "Other", value: 12, color: "#0F172A" },
];

const formatMoney = (value: number) => `${value.toLocaleString("en-US")} TL`;

export default function HomeScreen() {
  const handleProfilePress = () => {
    console.log("Navigate to profile edit screen");
  };

  return (
    <ScreenBackground>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <View style={styles.profileHeader}>
          <TouchableOpacity
            style={styles.profileArea}
            activeOpacity={0.85}
            onPress={handleProfilePress}
          >
            <LinearGradient colors={[colors.cyan, colors.blue, colors.purple]} style={styles.avatarRing}>
              <View style={styles.avatarInner}>
                <Text style={styles.avatarText}>İD</Text>
              </View>
            </LinearGradient>

            <View>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.userName}>İrem Dinç</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.headerActions}>
            <HeaderButton icon="notifications-outline" />
            <HeaderButton icon="settings-outline" />
          </View>
        </View>

        <LinearGradient
          colors={["rgba(255,255,255,0.10)", "rgba(255,255,255,0.035)"]}
          style={styles.balanceCard}
        >
          <View style={styles.balanceTop}>
            <View>
              <Text style={styles.balanceLabel}>Available Balance</Text>
              <Text style={styles.balance}>{formatMoney(remaining)}</Text>
            </View>

            <View style={styles.growthBadge}>
              <Ionicons name="trending-up" size={15} color={colors.green} />
              <Text style={styles.growthText}>12.4%</Text>
            </View>
          </View>

          <View style={styles.balanceMetaRow}>
            <View>
              <Text style={styles.metaLabel}>Income</Text>
              <Text style={styles.metaValue}>{formatMoney(monthlyIncome)}</Text>
            </View>

            <View style={styles.metaDivider} />

            <View>
              <Text style={styles.metaLabel}>Spent</Text>
              <Text style={styles.metaValue}>{formatMoney(totalSpent)}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.quickMenu}>
          <Action icon="arrow-up-outline" label="Send" active />
          <Action icon="add-outline" label="Add" />
          <Action icon="scan-outline" label="Scan" />
          <Action icon="wallet-outline" label="Wallet" />
        </View>

        <LinearGradient colors={["#111827", "#172554", "#34216D"]} style={styles.spendingCard}>
          <View style={styles.spendingTop}>
            <View>
              <Text style={styles.cardLabel}>Monthly Overview</Text>
              <Text style={styles.cardSub}>{budgetUsed}% of monthly income used</Text>
            </View>

            <View style={styles.monthBadge}>
              <Text style={styles.monthBadgeText}>Month</Text>
              <Ionicons name="chevron-down" size={14} color="#DDE7FF" />
            </View>
          </View>

          <View style={styles.chartArea}>
            <DonutChart />

            <View style={styles.chartCenter}>
              <Text style={styles.chartPercent}>{budgetUsed}%</Text>
              <Text style={styles.chartLabel}>budget used</Text>
            </View>
          </View>

          <View style={styles.spendingSummary}>
            <View>
              <Text style={styles.summaryLabel}>Spent</Text>
              <Text style={styles.summaryValue}>{formatMoney(totalSpent)}</Text>
            </View>

            <View>
              <Text style={styles.summaryLabel}>Savings goal</Text>
              <Text style={styles.summaryValue}>{formatMoney(savingGoal)}</Text>
            </View>
          </View>

          <View style={styles.chartFooter}>
            {spendingBreakdown.slice(0, 3).map((item) => (
              <View style={styles.footerItem} key={item.label}>
                <View style={[styles.dot, { backgroundColor: item.color }]} />
                <Text style={styles.footerText}>{item.label}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        <View style={styles.aiPanel}>
          <View style={styles.aiIcon}>
            <Ionicons name="sparkles-outline" size={22} color={colors.cyan} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.aiTitle}>AI detected a trend</Text>
            <Text style={styles.aiText}>
              Shopping is trending upward. Reducing small purchases this week can help you protect your savings goal.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color={colors.muted} />
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

function HeaderButton({ icon }: { icon: keyof typeof Ionicons.glyphMap }) {
  return (
    <TouchableOpacity style={styles.circleButton} activeOpacity={0.8}>
      <Ionicons name={icon} size={20} color="#DDE7FF" />
    </TouchableOpacity>
  );
}

function DonutChart() {
  const size = 220;
  const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const gap = 10;

  let accumulated = 0;

  return (
    <View style={styles.donutShadow}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.10)"
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
    </View>
  );
}

function Action({
  icon,
  label,
  active = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.actionItem} activeOpacity={0.85}>
      {active ? (
        <LinearGradient colors={[colors.cyan, colors.blue]} style={styles.actionIconActive}>
          <Ionicons name={icon} size={22} color="#FFFFFF" />
        </LinearGradient>
      ) : (
        <View style={styles.actionIcon}>
          <Ionicons name={icon} size={22} color="#DDE7FF" />
        </View>
      )}

      <Text style={[styles.actionLabel, active && styles.actionLabelActive]}>{label}</Text>
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
          <Ionicons name={icon} size={21} color="#93C5FD" />
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

  avatarRing: {
    width: 54,
    height: 54,
    borderRadius: 19,
    padding: 2,
  },

  avatarInner: {
    flex: 1,
    borderRadius: 17,
    backgroundColor: "#07111F",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 16,
  },

  welcomeText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 4,
  },

  userName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900",
  },

  headerActions: {
    flexDirection: "row",
    gap: 10,
  },

  circleButton: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  balanceCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 32,
    padding: 22,
    marginBottom: 16,
  },

  balanceTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  balanceLabel: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 10,
  },

  balance: {
    color: colors.text,
    fontSize: 44,
    fontWeight: "300",
    letterSpacing: -2,
  },

  growthBadge: {
    backgroundColor: "rgba(34,197,94,0.12)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.35)",
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  growthText: {
    color: colors.green,
    fontSize: 13,
    fontWeight: "900",
  },

  balanceMetaRow: {
    marginTop: 18,
    backgroundColor: "rgba(3,7,18,0.28)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 22,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  metaLabel: {
    color: "#7C8BA5",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 5,
  },

  metaValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
  },

  metaDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.10)",
    marginHorizontal: 8,
  },

  quickMenu: {
    backgroundColor: colors.darkGlass,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    borderRadius: 28,
    paddingVertical: 16,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  actionItem: {
    alignItems: "center",
    width: "24%",
  },

  actionIcon: {
    width: 54,
    height: 54,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
  },

  actionIconActive: {
    width: 54,
    height: 54,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
  },

  actionLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800",
  },

  actionLabelActive: {
    color: colors.text,
  },

  spendingCard: {
    borderRadius: 32,
    padding: 22,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(147,197,253,0.18)",
  },

  spendingTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  cardLabel: {
    color: "#CBD5E1",
    fontWeight: "900",
    fontSize: 16,
  },

  cardSub: {
    color: "#AFC2E8",
    marginTop: 6,
    fontWeight: "700",
    fontSize: 13,
  },

  monthBadge: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  monthBadgeText: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 12,
  },

  chartArea: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 14,
  },

  donutShadow: {
    shadowColor: "#7C3AED",
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },

  chartCenter: {
    position: "absolute",
    alignItems: "center",
  },

  chartPercent: {
    color: colors.text,
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: -1.5,
  },

  chartLabel: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "800",
    marginTop: 2,
  },

  spendingSummary: {
    backgroundColor: "rgba(3,7,18,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 22,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  summaryLabel: {
    color: "#8EA4C8",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 5,
  },

  summaryValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "900",
  },

  chartFooter: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
  },

  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  dot: {
    width: 9,
    height: 9,
    borderRadius: 99,
  },

  footerText: {
    color: "#CBD5E1",
    fontSize: 12,
    fontWeight: "800",
  },

  aiPanel: {
    marginBottom: 24,
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

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.5,
  },

  viewAll: {
    color: colors.cyan,
    fontWeight: "900",
    fontSize: 13,
  },

  transactionCard: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    padding: 15,
    marginBottom: 12,
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
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "rgba(59,130,246,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  transactionTitle: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 15,
  },

  transactionTime: {
    color: "#7C8BA5",
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
  },

  transactionAmount: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 15,
  },
});