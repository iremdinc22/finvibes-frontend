import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import ScreenBackground from "../components/ScreenBackground";
import { colors } from "../theme/colors";
import { Expense, ExpenseCategory } from "../types/finance";

const monthlyIncome = 30000;
const totalSpent = 12450;
const remaining = monthlyIncome - totalSpent;

const expenses: Expense[] = [
  {
    id: "1",
    title: "Grocery Store",
    amount: 850,
    category: "Shopping",
    date: "Today • 5:40 PM",
  },
  {
    id: "2",
    title: "Coffee",
    amount: 120,
    category: "Coffee",
    date: "Today • 2:20 PM",
  },
  {
    id: "3",
    title: "Metro",
    amount: 35,
    category: "Transport",
    date: "Yesterday • 9:10 AM",
  },
  {
    id: "4",
    title: "Electricity Bill",
    amount: 920,
    category: "Bills",
    date: "Monday • 8:00 PM",
  },
  {
    id: "5",
    title: "Dinner",
    amount: 420,
    category: "Food",
    date: "Sunday • 8:15 PM",
  },
];

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

const categoryColorMap: Record<ExpenseCategory, string> = {
  Food: "#F97316",
  Coffee: "#A78BFA",
  Groceries: "#22C55E",
  Shopping: "#A855F7",
  Transport: "#38BDF8",
  Bills: "#6366F1",
  Health: "#FB7185",
  Fitness: "#34D399",
  Education: "#60A5FA",
  Entertainment: "#E879F9",
  Travel: "#2DD4BF",
  Subscription: "#818CF8",
  Investment: "#22C55E",
  Savings: "#38BDF8",
  Insurance: "#93C5FD",
  Salary: "#4ADE80",
  Gift: "#F472B6",
  Other: "#94A3B8",
};

const formatMoney = (value: number) => `${value.toLocaleString("en-US")} TL`;

export default function TransactionsScreen() {
  return (
    <ScreenBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.kicker}>Money Flow</Text>
            <Text style={styles.title}>Transactions</Text>
          </View>

          <TouchableOpacity style={styles.headerButton} activeOpacity={0.85}>
            <Ionicons name="search-outline" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.filterShell}>
          <FilterChip label="Today" active />
          <FilterChip label="Week" />
          <FilterChip label="Month" />
        </View>

        <LinearGradient
          colors={["rgba(255,255,255,0.10)", "rgba(255,255,255,0.035)"]}
          style={styles.summaryCard}
        >
          <View style={styles.summaryTop}>
            <View>
              <Text style={styles.summaryLabel}>Total spent</Text>
              <Text style={styles.summaryAmount}>{formatMoney(totalSpent)}</Text>
            </View>

            <View style={styles.summaryIcon}>
              <Ionicons name="analytics-outline" size={25} color={colors.cyan} />
            </View>
          </View>

          <Text style={styles.summaryHint}>42% of your monthly income used this month</Text>

          <View style={styles.metricsRow}>
            <Metric label="Income" value={formatMoney(monthlyIncome)} />
            <View style={styles.metricDivider} />
            <Metric label="Remaining" value={formatMoney(remaining)} />
          </View>
        </LinearGradient>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity activeOpacity={0.85}>
            <Text style={styles.exportText}>Export</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.86} style={styles.transactionCard}>
              <View style={styles.left}>
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: `${categoryColorMap[item.category]}24` },
                  ]}
                >
                  <Ionicons
                    name={iconMap[item.category]}
                    size={21}
                    color={categoryColorMap[item.category]}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.transactionTitle}>{item.title}</Text>

                  <View style={styles.metaRow}>
                    <Text style={styles.transactionMeta}>{item.date}</Text>
                    <View style={styles.metaDot} />
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.amountBlock}>
                <Text style={styles.amount}>-{formatMoney(item.amount)}</Text>
                <Text style={styles.statusText}>Completed</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScreenBackground>
  );
}

function FilterChip({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.filterItem}>
      {active ? (
        <LinearGradient colors={[colors.cyan, colors.blue]} style={styles.filterChipActive}>
          <Text style={styles.filterTextActive}>{label}</Text>
        </LinearGradient>
      ) : (
        <View style={styles.filterChip}>
          <Text style={styles.filterText}>{label}</Text>
        </View>
      )}
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
    flex: 1,
    padding: 22,
    paddingTop: 58,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  kicker: {
    color: colors.cyan,
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 8,
  },

  title: {
    color: colors.text,
    fontSize: 38,
    fontWeight: "900",
    letterSpacing: -1.5,
  },

  headerButton: {
    width: 46,
    height: 46,
    borderRadius: 17,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  filterShell: {
    marginTop: 22,
    marginBottom: 18,
    backgroundColor: "rgba(15,23,42,0.70)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    borderRadius: 999,
    padding: 5,
    flexDirection: "row",
    gap: 6,
  },

  filterItem: {
    flex: 1,
  },

  filterChip: {
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  filterChipActive: {
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  filterText: {
    color: colors.muted,
    fontWeight: "900",
    fontSize: 13,
  },

  filterTextActive: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 13,
  },

  summaryCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 32,
    padding: 22,
    marginBottom: 22,
  },

  summaryTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  summaryLabel: {
    color: colors.muted,
    fontWeight: "900",
    marginBottom: 8,
    fontSize: 14,
  },

  summaryAmount: {
    color: colors.text,
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: -1.2,
  },

  summaryHint: {
    color: colors.soft,
    marginTop: 8,
    fontWeight: "700",
    fontSize: 13,
  },

  summaryIcon: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: "rgba(56,189,248,0.13)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.20)",
    alignItems: "center",
    justifyContent: "center",
  },

  metricsRow: {
    marginTop: 18,
    backgroundColor: "rgba(3,7,18,0.28)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 22,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  metric: {
    flex: 1,
  },

  metricLabel: {
    color: "#7C8BA5",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 5,
  },

  metricValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
  },

  metricDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.10)",
    marginHorizontal: 10,
  },

  listHeader: {
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

  exportText: {
    color: colors.cyan,
    fontWeight: "900",
    fontSize: 13,
  },

  transactionCard: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 25,
    padding: 16,
    marginBottom: 13,
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
    width: 50,
    height: 50,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  transactionTitle: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 15,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    flexWrap: "wrap",
  },

  transactionMeta: {
    color: "#7C8BA5",
    fontSize: 12,
    fontWeight: "700",
  },

  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 99,
    backgroundColor: "#64748B",
    marginHorizontal: 7,
  },

  categoryText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800",
  },

  amountBlock: {
    alignItems: "flex-end",
    marginLeft: 10,
  },

  amount: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 15,
  },

  statusText: {
    color: colors.green,
    fontSize: 11,
    fontWeight: "900",
    marginTop: 5,
  },
});