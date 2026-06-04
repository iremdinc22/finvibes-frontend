import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ScreenBackground from "../components/ScreenBackground";
import { colors } from "../theme/colors";

const categories = [
  { label: "Food", icon: "fast-food-outline" },
  { label: "Coffee", icon: "cafe-outline" },
  { label: "Shopping", icon: "cart-outline" },
  { label: "Transport", icon: "bus-outline" },
  { label: "Bills", icon: "flash-outline" },
  { label: "Health", icon: "medkit-outline" },
] as const;

export default function AddExpenseScreen() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Food");

  const handleAddExpense = () => {
    console.log({ title, amount, category: selectedCategory });
    setTitle("");
    setAmount("");
  };

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.kicker}>Quick Add</Text>
            <Text style={styles.title}>New expense</Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons name="receipt-outline" size={21} color={colors.accent} />
          </View>
        </View>

        <Text style={styles.subtitle}>Capture your spending in seconds.</Text>

        <View style={styles.amountCard}>
          <View style={styles.amountTop}>
            <Text style={styles.amountLabel}>Amount</Text>

            <View style={styles.currencyPill}>
              <Text style={styles.currencyPillText}>TRY</Text>
            </View>
          </View>

          <View style={styles.amountRow}>
            <Text style={styles.currency}>₺</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0"
              placeholderTextColor={colors.faint}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <View style={styles.amountFooter}>
            <Ionicons name="information-circle-outline" size={16} color={colors.faint} />
            <Text style={styles.amountHint}>This will be added to your monthly spending.</Text>
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Expense name</Text>

          <View style={styles.inputBox}>
            <Ionicons name="create-outline" size={20} color={colors.muted} />
            <TextInput
              style={styles.input}
              placeholder="Coffee, grocery, taxi..."
              placeholderTextColor={colors.faint}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.rowFields}>
            <InfoPill icon="calendar-outline" label="Today" />
            <InfoPill icon="card-outline" label="Card" />
          </View>

          <Text style={styles.label}>Category</Text>

          <View style={styles.categoryGrid}>
            {categories.map((item) => {
              const isSelected = selectedCategory === item.label;

              return (
                <TouchableOpacity
                  key={item.label}
                  activeOpacity={0.85}
                  onPress={() => setSelectedCategory(item.label)}
                  style={[styles.categoryCard, isSelected && styles.categoryCardActive]}
                >
                  <View style={[styles.categoryIcon, isSelected && styles.categoryIconActive]}>
                    <Ionicons
                      name={item.icon}
                      size={18}
                      color={isSelected ? colors.accent : colors.muted}
                    />
                  </View>

                  <Text style={[styles.categoryText, isSelected && styles.categoryTextActive]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity activeOpacity={0.88} onPress={handleAddExpense}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Save Expense</Text>
              <Ionicons name="arrow-forward" size={19} color={colors.text} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}

function InfoPill({
  icon,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}) {
  return (
    <TouchableOpacity style={styles.infoPill} activeOpacity={0.85}>
      <Ionicons name={icon} size={18} color={colors.accent} />
      <Text style={styles.infoPillText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 22,
    paddingTop: 58,
    paddingBottom: 130,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  kicker: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 8,
  },

  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -1.2,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 17,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  subtitle: {
    color: colors.muted,
    marginTop: 8,
    marginBottom: 22,
    lineHeight: 22,
    fontWeight: "600",
  },

  amountCard: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },

  amountTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  amountLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
  },

  currencyPill: {
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
  },

  currencyPillText: {
    color: colors.soft,
    fontSize: 12,
    fontWeight: "700",
  },

  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  currency: {
    color: colors.accent,
    fontSize: 40,
    fontWeight: "300",
    marginRight: 10,
  },

  amountInput: {
    flex: 1,
    color: colors.text,
    fontSize: 54,
    fontWeight: "300",
    letterSpacing: -2,
    paddingVertical: 4,
  },

  amountFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 4,
  },

  amountHint: {
    color: colors.faint,
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
  },

  formCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 28,
    padding: 20,
  },

  label: {
    color: colors.soft,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 9,
    marginTop: 14,
  },

  inputBox: {
    height: 56,
    borderRadius: 20,
    backgroundColor: "rgba(2,6,23,0.36)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.065)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
  },

  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
  },

  rowFields: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
  },

  infoPill: {
    flex: 1,
    height: 48,
    borderRadius: 18,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  infoPillText: {
    color: colors.soft,
    fontWeight: "700",
    fontSize: 13,
  },

  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },

  categoryCard: {
    width: "48%",
    backgroundColor: "rgba(2,6,23,0.28)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.065)",
    borderRadius: 20,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  categoryCardActive: {
    backgroundColor: colors.accentSoft,
    borderColor: "rgba(56,189,248,0.22)",
  },

  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 13,
    backgroundColor: colors.surfaceStrong,
    alignItems: "center",
    justifyContent: "center",
  },

  categoryIconActive: {
    backgroundColor: "rgba(56,189,248,0.12)",
  },

  categoryText: {
    color: colors.muted,
    fontWeight: "700",
    fontSize: 13,
  },

  categoryTextActive: {
    color: colors.text,
  },

  button: {
    height: 58,
    borderRadius: 20,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.25)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },

  buttonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
});