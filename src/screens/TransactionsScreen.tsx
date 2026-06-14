import { useMemo, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ScreenBackground from "../components/ScreenBackground";
import { colors } from "../theme/colors";
import { Expense, ExpenseCategory } from "../types/finance";

type FilterType = "Today" | "Week" | "Month";

const monthlyIncome = 30000;

const transactionsByFilter: Record<FilterType, Expense[]> = {
  Today: [
    { id: "1", title: "Grocery Store", amount: 850, category: "Shopping", date: "Today • 5:40 PM" },
    { id: "2", title: "Coffee", amount: 120, category: "Coffee", date: "Today • 2:20 PM" },
    { id: "3", title: "Metro", amount: 35, category: "Transport", date: "Today • 9:10 AM" },
  ],
  Week: [
    { id: "1", title: "Grocery Store", amount: 850, category: "Shopping", date: "Today • 5:40 PM" },
    { id: "2", title: "Coffee", amount: 120, category: "Coffee", date: "Today • 2:20 PM" },
    { id: "3", title: "Metro", amount: 35, category: "Transport", date: "Yesterday • 9:10 AM" },
    { id: "4", title: "Electricity Bill", amount: 920, category: "Bills", date: "Monday • 8:00 PM" },
    { id: "5", title: "Dinner", amount: 420, category: "Food", date: "Sunday • 8:15 PM" },
  ],
  Month: [
    { id: "1", title: "Grocery Store", amount: 850, category: "Shopping", date: "Today • 5:40 PM" },
    { id: "2", title: "Coffee", amount: 120, category: "Coffee", date: "Today • 2:20 PM" },
    { id: "3", title: "Metro", amount: 35, category: "Transport", date: "Yesterday • 9:10 AM" },
    { id: "4", title: "Electricity Bill", amount: 920, category: "Bills", date: "Monday • 8:00 PM" },
    { id: "5", title: "Dinner", amount: 420, category: "Food", date: "Sunday • 8:15 PM" },
    { id: "6", title: "Internet Bill", amount: 480, category: "Bills", date: "June 18 • 7:30 PM" },
    { id: "7", title: "Online Course", amount: 650, category: "Education", date: "June 14 • 1:10 PM" },
    { id: "8", title: "Gym", amount: 900, category: "Fitness", date: "June 10 • 6:20 PM" },
    { id: "9", title: "Pharmacy", amount: 310, category: "Health", date: "June 7 • 4:00 PM" },
    { id: "10", title: "Subscription", amount: 199, category: "Subscription", date: "June 2 • 11:00 AM" },
  ],
};

const iconMap: Record<ExpenseCategory, keyof typeof Ionicons.glyphMap> = {
  Food: "fast-food-outline",
  Coffee: "cafe-outline",
  Groceries: "basket-outline",
  Shopping: "cart-outline",
  Transport: "bus-outline",
  Bills: "flash-outline",
  Health: "medkit-outline",
  Fitness: "barbell-outline",
  Education: "school-outline",
  Entertainment: "game-controller-outline",
  Travel: "airplane-outline",
  Subscription: "repeat-outline",
  Investment: "trending-up-outline",
  Savings: "wallet-outline",
  Insurance: "shield-checkmark-outline",
  Salary: "cash-outline",
  Gift: "gift-outline",
  Other: "card-outline",
};

const formatMoney = (value: number) => `${value.toLocaleString("en-US")} TL`;

export default function TransactionsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("Today");

  const expenses = transactionsByFilter[selectedFilter];

  const totalSpent = useMemo(
    () => expenses.reduce((total, item) => total + item.amount, 0),
    [expenses]
  );

  const remaining = monthlyIncome - totalSpent;
  const spentRate = Math.round((totalSpent / monthlyIncome) * 100);

  return (
    <ScreenBackground>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <Text style={styles.kicker}>Money Flow</Text>
                <Text style={styles.title}>Transactions</Text>
              </View>

              <TouchableOpacity style={styles.headerButton} activeOpacity={0.85}>
                <Ionicons name="search-outline" size={20} color={colors.soft} />
              </TouchableOpacity>
            </View>

            <View style={styles.filterShell}>
              {(["Today", "Week", "Month"] as FilterType[]).map((item) => (
                <FilterChip
                  key={item}
                  label={item}
                  active={selectedFilter === item}
                  onPress={() => setSelectedFilter(item)}
                />
              ))}
            </View>

            <View style={styles.summaryCard}>
              <View>
                <Text style={styles.summaryLabel}>Total spent</Text>
                <Text style={styles.summaryAmount}>{formatMoney(totalSpent)}</Text>
                <Text style={styles.summaryHint}>
                  {spentRate}% of monthly income used
                </Text>
              </View>

              <View style={styles.summaryIcon}>
                <Ionicons name="analytics-outline" size={23} color={colors.accent} />
              </View>
            </View>

            <View style={styles.metricsRow}>
              <Metric label="Income" value={formatMoney(monthlyIncome)} />
              <View style={styles.metricDivider} />
              <Metric label="Remaining" value={formatMoney(remaining)} />
            </View>

            <View style={styles.listHeader}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <Text style={styles.exportText}>Export</Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.86} style={styles.transactionCard}>
            <View style={styles.left}>
              <View style={styles.iconBox}>
                <Ionicons name={iconMap[item.category]} size={20} color={colors.accent} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.transactionTitle}>{item.title}</Text>
                <Text style={styles.transactionMeta}>
                  {item.category} • {item.date}
                </Text>
              </View>
            </View>

            <Text style={styles.amount}>-{formatMoney(item.amount)}</Text>
          </TouchableOpacity>
        )}
      />
    </ScreenBackground>
  );
}

function FilterChip({
  label,
  active = false,
  onPress,
}: {
  label: FilterType;
  active?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.filterChip, active && styles.filterChipActive]}
      onPress={onPress}
    >
      <Text style={[styles.filterText, active && styles.filterTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 22,
    paddingTop: 58,
    paddingBottom: 140,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

  headerButton: {
    width: 46,
    height: 46,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  filterShell: {
    marginTop: 22,
    marginBottom: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    padding: 5,
    flexDirection: "row",
    gap: 6,
  },

  filterChip: {
    flex: 1,
    height: 39,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  filterChipActive: {
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.22)",
  },

  filterText: {
    color: colors.muted,
    fontWeight: "700",
    fontSize: 13,
  },

  filterTextActive: {
    color: colors.text,
  },

  summaryCard: {
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 28,
    padding: 20,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  summaryLabel: {
    color: colors.muted,
    fontWeight: "700",
    marginBottom: 8,
    fontSize: 13,
  },

  summaryAmount: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -1,
  },

  summaryHint: {
    color: colors.faint,
    marginTop: 7,
    fontWeight: "600",
    fontSize: 13,
  },

  summaryIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  metricsRow: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 15,
    flexDirection: "row",
    marginBottom: 22,
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

  metricDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginHorizontal: 12,
  },

  listHeader: {
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

  exportText: {
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

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    flex: 1,
  },

  iconBox: {
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

  transactionMeta: {
    color: colors.faint,
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
  },

  amount: {
    color: colors.soft,
    fontWeight: "800",
    fontSize: 15,
  },
});

