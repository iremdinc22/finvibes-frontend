import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ScreenBackground from "../components/ScreenBackground";
import { colors } from "../theme/colors";

type Props = {
  onBackPress?: () => void;
};

const transaction = {
  title: "Coffee",
  amount: 120,
  category: "Coffee",
  date: "June 24, 2026",
  time: "2:20 PM",
  paymentMethod: "Card",
  note: "Starbucks after interview practice.",
  icon: "cafe-outline" as keyof typeof Ionicons.glyphMap,
};

const formatMoney = (value: number) => `${value.toLocaleString("en-US")} TL`;

export default function TransactionDetailScreen({ onBackPress }: Props) {
  return (
    <ScreenBackground>
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity activeOpacity={0.85} style={styles.iconButton} onPress={onBackPress}>
              <Ionicons name="chevron-back" size={22} color={colors.soft} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Transaction detail</Text>

            <TouchableOpacity activeOpacity={0.85} style={styles.iconButton}>
              <Ionicons name="create-outline" size={19} color={colors.soft} />
            </TouchableOpacity>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryTop}>
              <View style={styles.transactionIcon}>
                <Ionicons name={transaction.icon} size={22} color={colors.accent} />
              </View>

              <View style={styles.summaryText}>
                <View style={styles.titleRow}>
                  <Text style={styles.transactionTitle}>{transaction.title}</Text>

                  <View style={styles.statusDotRow}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusSmallText}>Completed</Text>
                  </View>
                </View>

                <Text style={styles.transactionMeta}>
                  {transaction.category} · {transaction.paymentMethod}
                </Text>
              </View>
            </View>

            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Amount</Text>
              <Text style={styles.amount}>-{formatMoney(transaction.amount)}</Text>
            </View>

            <View style={styles.metaRow}>
              <Ionicons name="calendar-outline" size={14} color={colors.faint} />
              <Text style={styles.dateText}>
                {transaction.date} · {transaction.time}
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <Ionicons name="sparkles-outline" size={17} color={colors.accent} />
            </View>

            <View style={styles.insightBody}>
              <Text style={styles.insightTitle}>Small purchase</Text>
              <Text style={styles.insightText}>
                Coffee spending is under control, but frequent small payments can affect your monthly budget.
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Details</Text>

          <View style={styles.detailCard}>
            <DetailItem label="Date" value={transaction.date} />
            <DetailItem label="Time" value={transaction.time} />
            <DetailItem label="Payment" value={transaction.paymentMethod} />
            <DetailItem label="Category" value={transaction.category} last />
          </View>

          <Text style={styles.sectionTitle}>Note</Text>

          <View style={styles.noteCard}>
            <Text style={styles.noteText}>{transaction.note}</Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity activeOpacity={0.86} style={styles.editButton}>
            <Ionicons name="create-outline" size={18} color={colors.text} />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.86} style={styles.deleteButton}>
            <Ionicons name="trash-outline" size={18} color={colors.red} />
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenBackground>
  );
}

function DetailItem({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.detailItem, last && styles.detailItemLast]}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 58,
    paddingBottom: 140,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
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
    fontSize: 17,
    fontWeight: "800",
  },

  summaryCard: {
    backgroundColor: "rgba(15,23,42,0.82)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.14)",
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
  },

  summaryTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },

  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 17,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },

  summaryText: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  transactionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
  },

  transactionMeta: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 5,
  },

  statusDotRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 99,
    backgroundColor: colors.green,
  },

  statusSmallText: {
    color: colors.green,
    fontSize: 11,
    fontWeight: "800",
  },

  amountRow: {
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.045)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    padding: 14,
    marginBottom: 12,
  },

  amountLabel: {
    color: colors.faint,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 6,
  },

  amount: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900",
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  dateText: {
    color: colors.faint,
    fontSize: 12,
    fontWeight: "700",
  },

  insightCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "rgba(56,189,248,0.075)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.16)",
    borderRadius: 20,
    padding: 14,
    marginBottom: 22,
  },

  insightIcon: {
    width: 38,
    height: 38,
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

  sectionTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 12,
  },

  detailCard: {
    backgroundColor: "rgba(15,23,42,0.66)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.13)",
    borderRadius: 24,
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  detailItem: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  detailItemLast: {
    borderBottomWidth: 0,
  },

  detailLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
  },

  detailValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800",
  },

  noteCard: {
    backgroundColor: "rgba(15,23,42,0.54)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.12)",
    borderRadius: 20,
    padding: 15,
    marginBottom: 18,
  },

  noteText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 20,
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    backgroundColor: "rgba(3,7,18,0.92)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    gap: 10,
  },

  editButton: {
    flex: 1,
    height: 54,
    borderRadius: 19,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.28)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  editText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
  },

  deleteButton: {
    flex: 1,
    height: 54,
    borderRadius: 19,
    backgroundColor: "rgba(251,113,133,0.09)",
    borderWidth: 1,
    borderColor: "rgba(251,113,133,0.20)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  deleteText: {
    color: colors.red,
    fontSize: 14,
    fontWeight: "800",
  },
});