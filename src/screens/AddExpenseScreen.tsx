import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
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
            <Ionicons name="receipt-outline" size={22} color={colors.cyan} />
          </View>
        </View>

        <Text style={styles.subtitle}>Capture your spending in seconds.</Text>

        <LinearGradient
          colors={["rgba(255,255,255,0.11)", "rgba(255,255,255,0.035)"]}
          style={styles.amountCard}
        >
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
              placeholderTextColor="#64748B"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <View style={styles.amountFooter}>
            <Ionicons name="information-circle-outline" size={16} color={colors.muted} />
            <Text style={styles.amountHint}>This will be added to your monthly spending.</Text>
          </View>
        </LinearGradient>

        <View style={styles.formCard}>
          <Text style={styles.label}>Expense name</Text>

          <View style={styles.inputBox}>
            <Ionicons name="create-outline" size={20} color={colors.muted} />
            <TextInput
              style={styles.input}
              placeholder="Coffee, grocery, taxi..."
              placeholderTextColor="#64748B"
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
                  {isSelected ? (
                    <LinearGradient colors={[colors.cyan, colors.blue]} style={styles.categoryIconActive}>
                      <Ionicons name={item.icon} size={19} color="#FFFFFF" />
                    </LinearGradient>
                  ) : (
                    <View style={styles.categoryIcon}>
                      <Ionicons name={item.icon} size={19} color={colors.muted} />
                    </View>
                  )}

                  <Text style={[styles.categoryText, isSelected && styles.categoryTextActive]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity activeOpacity={0.88} onPress={handleAddExpense}>
            <LinearGradient colors={[colors.cyan, colors.blue, colors.purple]} style={styles.button}>
              <Text style={styles.buttonText}>Save Expense</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </LinearGradient>
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
      <Ionicons name={icon} size={18} color={colors.cyan} />
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

  headerIcon: {
    width: 52,
    height: 52,
    borderRadius: 19,
    backgroundColor: "rgba(56,189,248,0.12)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.24)",
    alignItems: "center",
    justifyContent: "center",
  },

  subtitle: {
    color: colors.muted,
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 22,
  },

  amountCard: {
    borderRadius: 34,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 18,
  },

  amountTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  amountLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "900",
  },

  currencyPill: {
    backgroundColor: "rgba(56,189,248,0.12)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.25)",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },

  currencyPillText: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: "900",
  },

  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  currency: {
    color: colors.cyan,
    fontSize: 42,
    fontWeight: "300",
    marginRight: 10,
  },

  amountInput: {
    flex: 1,
    color: colors.text,
    fontSize: 58,
    fontWeight: "300",
    letterSpacing: -2.5,
    paddingVertical: 4,
  },

  amountFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 6,
  },

  amountHint: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
    flex: 1,
  },

  formCard: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 30,
    padding: 20,
  },

  label: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 9,
    marginTop: 14,
  },

  inputBox: {
    height: 58,
    borderRadius: 21,
    backgroundColor: "rgba(3,7,18,0.48)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.16)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
  },

  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
  },

  rowFields: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
  },

  infoPill: {
    flex: 1,
    height: 50,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  infoPillText: {
    color: colors.soft,
    fontWeight: "900",
    fontSize: 13,
  },

  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },

  categoryCard: {
    width: "47%",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    borderRadius: 22,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  categoryCardActive: {
    backgroundColor: "rgba(56,189,248,0.12)",
    borderColor: "rgba(56,189,248,0.45)",
  },

  categoryIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },

  categoryIconActive: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  categoryText: {
    color: colors.muted,
    fontWeight: "900",
    fontSize: 13,
  },

  categoryTextActive: {
    color: colors.text,
  },

  button: {
    height: 60,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
});