import { useMemo, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ScreenBackground from "../components/ScreenBackground";
import { colors } from "../theme/colors";
import { Expense, ExpenseCategory } from "../types/finance";

type FilterType = "Today" | "Week" | "Month";

type Props = {
  onTransactionPress?: () => void;
};

const monthlyIncome = 30000;

const transactionsByFilter: Record<FilterType, Expense[]> = {
  Today: [
    { id: "1", title: "Grocery Store", amount: 850, category: "Shopping", date: "Today, 5:40 PM" },
    { id: "2", title: "Coffee", amount: 120, category: "Coffee", date: "Today, 2:20 PM" },
    { id: "3", title: "Metro", amount: 35, category: "Transport", date: "Today, 9:10 AM" },
  ],
  Week: [
    { id: "1", title: "Grocery Store", amount: 850, category: "Shopping", date: "Today, 5:40 PM" },
    { id: "2", title: "Coffee", amount: 120, category: "Coffee", date: "Today, 2:20 PM" },
    { id: "3", title: "Metro", amount: 35, category: "Transport", date: "Yesterday, 9:10 AM" },
    { id: "4", title: "Electricity Bill", amount: 920, category: "Bills", date: "Monday, 8:00 PM" },
    { id: "5", title: "Dinner", amount: 420, category: "Food", date: "Sunday, 8:15 PM" },
  ],
  Month: [
    { id: "1", title: "Grocery Store", amount: 850, category: "Shopping", date: "Today, 5:40 PM" },
    { id: "2", title: "Coffee", amount: 120, category: "Coffee", date: "Today, 2:20 PM" },
    { id: "3", title: "Metro", amount: 35, category: "Transport", date: "Yesterday, 9:10 AM" },
    { id: "4", title: "Electricity Bill", amount: 920, category: "Bills", date: "Monday, 8:00 PM" },
    { id: "5", title: "Dinner", amount: 420, category: "Food", date: "Sunday, 8:15 PM" },
    { id: "6", title: "Internet Bill", amount: 480, category: "Bills", date: "June 18, 7:30 PM" },
    { id: "7", title: "Online Course", amount: 650, category: "Education", date: "June 14, 1:10 PM" },
    { id: "8", title: "Gym", amount: 900, category: "Fitness", date: "June 10, 6:20 PM" },
    { id: "9", title: "Pharmacy", amount: 310, category: "Health", date: "June 7, 4:00 PM" },
    { id: "10", title: "Subscription", amount: 199, category: "Subscription", date: "June 2, 11:00 AM" },
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

export default function TransactionsScreen({ onTransactionPress }: Props) {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("Today");

  const expenses = transactionsByFilter[selectedFilter];

  const totalSpent = useMemo(
    () => expenses.reduce((total, item) => total + item.amount, 0),
    [expenses]
  );

  const topCategory = useMemo(() => {
    const totals = expenses.reduce<Record<string, number>>((result, item) => {
      result[item.category] = (result[item.category] ?? 0) + item.amount;
      return result;
    }, {});

    return Object.entries(totals).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "None";
  }, [expenses]);

  const remaining = monthlyIncome - totalSpent;
  const spentRate = Math.round((totalSpent / monthlyIncome) * 100);

  return (
    <ScreenBackground>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View style={styles.headerCopy}>
                <Text style={styles.kicker}>Transactions</Text>
                <Text style={styles.title}>Money flow</Text>
              </View>

              <View style={styles.headerActions}>
                <IconButton icon="search-outline" />
                <IconButton icon="download-outline" />
              </View>
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
              <View style={styles.summaryTop}>
                <View>
                  <Text style={styles.summaryLabel}>Spent in {selectedFilter.toLowerCase()}</Text>
                  <Text style={styles.summaryAmount}>{formatMoney(totalSpent)}</Text>
                </View>

                <View style={styles.rateBadge}>
                  <Text style={styles.rateText}>{spentRate}%</Text>
                </View>
              </View>

              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${Math.min(spentRate, 100)}%` }]} />
              </View>

              <View style={styles.summaryStats}>
                <SummaryMetric label="Remaining" value={formatMoney(remaining)} />
                <SummaryMetric label="Top category" value={topCategory} align="right" />
              </View>
            </View>

            <View style={styles.listHeader}>
              <View>
                <Text style={styles.sectionTitle}>Recent activity</Text>
                <Text style={styles.sectionHint}>{expenses.length} transactions</Text>
              </View>

              <TouchableOpacity activeOpacity={0.8} style={styles.sortButton}>
                <Ionicons name="swap-vertical-outline" size={16} color={colors.accent} />
                <Text style={styles.sortText}>Sort</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={({ item }) => <TransactionRow item={item} onPress={onTransactionPress} />}
      />
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
    <TouchableOpacity style={styles.iconButton} activeOpacity={0.85} onPress={onPress}>
      <Ionicons name={icon} size={19} color={colors.soft} />
    </TouchableOpacity>
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

function SummaryMetric({
  label,
  value,
  align = "left",
}: {
  label: string;
  value: string;
  align?: "left" | "right";
}) {
  return (
    <View style={[styles.summaryMetric, align === "right" && styles.summaryMetricRight]}>
      <Text style={styles.summaryMetricLabel}>{label}</Text>
      <Text style={styles.summaryMetricValue}>{value}</Text>
    </View>
  );
}

function TransactionRow({
  item,
  onPress,
}: {
  item: Expense;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity activeOpacity={0.86} style={styles.transactionCard} onPress={onPress}>
      <View style={styles.iconBox}>
        <Ionicons name={iconMap[item.category]} size={19} color={colors.accent} />
      </View>

      <View style={styles.transactionBody}>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text style={styles.transactionMeta}>
          {item.category} · {item.date}
        </Text>
      </View>

      <View style={styles.amountWrap}>
        <Text style={styles.amount}>-{formatMoney(item.amount)}</Text>
        <Ionicons name="chevron-forward" size={16} color={colors.faint} />
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  headerCopy: {
    flex: 1,
    paddingRight: 14,
  },

  kicker: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 7,
  },

  title: {
    color: colors.text,
    fontSize: 31,
    fontWeight: "800",
    lineHeight: 37,
  },

  headerActions: {
    flexDirection: "row",
    gap: 9,
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

  filterShell: {
    marginBottom: 14,
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 4,
    flexDirection: "row",
    gap: 5,
  },

  filterChip: {
    flex: 1,
    height: 38,
    borderRadius: 14,
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
    fontWeight: "800",
    fontSize: 13,
  },

  filterTextActive: {
    color: colors.text,
  },

  summaryCard: {
    backgroundColor: "rgba(15,23,42,0.78)",
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 24,
    padding: 20,
    marginBottom: 22,
  },

  summaryTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 14,
  },

  summaryLabel: {
    color: colors.muted,
    fontWeight: "800",
    marginBottom: 8,
    fontSize: 13,
  },

  summaryAmount: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "800",
  },

  rateBadge: {
    minWidth: 48,
    height: 34,
    borderRadius: 999,
    backgroundColor: "rgba(139,92,246,0.16)",
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.32)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  rateText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "900",
  },

  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
    marginTop: 20,
    marginBottom: 16,
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.accent,
  },

  summaryStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  summaryMetric: {
    flex: 1,
  },

  summaryMetricRight: {
    alignItems: "flex-end",
  },

  summaryMetricLabel: {
    color: colors.faint,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 5,
  },

  summaryMetricValue: {
    color: colors.soft,
    fontSize: 14,
    fontWeight: "800",
  },

  listHeader: {
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

  sortButton: {
    height: 36,
    paddingHorizontal: 11,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  sortText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "800",
  },

  transactionCard: {
    minHeight: 72,
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconBox: {
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
    fontWeight: "800",
    fontSize: 14,
  },

  transactionMeta: {
    color: colors.faint,
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
  },

  amountWrap: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 4,
  },

  amount: {
    color: colors.soft,
    fontWeight: "800",
    fontSize: 14,
  },
});
