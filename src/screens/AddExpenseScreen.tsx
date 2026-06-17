import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ScreenBackground from "../components/ScreenBackground";
import { colors } from "../theme/colors";

type Props = {
  onBackPress?: () => void;
};

type PaymentMethod = "Card" | "Cash";

const categories = [
  { label: "Food", icon: "fast-food-outline" },
  { label: "Coffee", icon: "cafe-outline" },
  { label: "Shopping", icon: "cart-outline" },
  { label: "Transport", icon: "bus-outline" },
  { label: "Bills", icon: "flash-outline" },
  { label: "Health", icon: "medkit-outline" },
] as const;

const presets = ["120", "250", "500", "1000"];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const formatDisplayDate = (date: Date) =>
  date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

const formatMonthTitle = (date: Date) =>
  date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

export default function AddExpenseScreen({ onBackPress }: Props) {
  const today = useMemo(() => new Date(), []);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Food");
  const [selectedDate, setSelectedDate] = useState(today);
  const [visibleMonth, setVisibleMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Card");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const normalizedAmount = Number(amount.replace(",", "."));
  const canSave = useMemo(
    () => normalizedAmount > 0 && title.trim().length > 0,
    [normalizedAmount, title]
  );

  const handleAmountChange = (value: string) => {
    setAmount(value.replace(/[^0-9.,]/g, ""));
  };

  const handleAddExpense = () => {
    if (!canSave) return;

    console.log({
      title: title.trim(),
      amount: normalizedAmount,
      category: selectedCategory,
      date: selectedDate.toISOString(),
      paymentMethod,
    });

    setTitle("");
    setAmount("");
    setSelectedCategory("Food");
    setSelectedDate(today);
    setVisibleMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setPaymentMethod("Card");
  };

  return (
    <ScreenBackground>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <View style={styles.header}>
            <TouchableOpacity activeOpacity={0.85} style={styles.backButton} onPress={onBackPress}>
              <Ionicons name="chevron-back" size={22} color={colors.soft} />
            </TouchableOpacity>

            <View style={styles.headerCopy}>
              <Text style={styles.kicker}>Add expense</Text>
              <Text style={styles.title}>New payment</Text>
            </View>

            <View style={styles.headerIcon}>
              <Ionicons name="receipt-outline" size={21} color={colors.accent} />
            </View>
          </View>

          <View style={styles.amountCard}>
            <View style={styles.amountTop}>
              <Text style={styles.sectionLabel}>Amount</Text>
              <View style={styles.currencyPill}>
                <Text style={styles.currencyText}>TRY</Text>
              </View>
            </View>

            <View style={styles.amountRow}>
              <Text style={styles.currencySymbol}>₺</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0"
                placeholderTextColor={colors.faint}
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={handleAmountChange}
                maxLength={9}
                autoFocus
              />
            </View>

            <View style={styles.presetRow}>
              {presets.map((preset) => {
                const isSelected = amount === preset;

                return (
                  <TouchableOpacity
                    key={preset}
                    activeOpacity={0.82}
                    style={[styles.presetChip, isSelected && styles.presetChipActive]}
                    onPress={() => setAmount(preset)}
                  >
                    <Text style={[styles.presetText, isSelected && styles.presetTextActive]}>
                      ₺{preset}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.formCard}>
            <FieldLabel label="Expense name" />
            <View style={styles.inputBox}>
              <Ionicons name="create-outline" size={19} color={colors.muted} />
              <TextInput
                style={styles.input}
                placeholder="Coffee, grocery, taxi..."
                placeholderTextColor={colors.faint}
                value={title}
                onChangeText={setTitle}
                returnKeyType="done"
              />
            </View>

            <View style={styles.detailRow}>
              <TouchableOpacity
                style={styles.detailPill}
                activeOpacity={0.85}
                onPress={() => setIsCalendarOpen(true)}
              >
                <Ionicons name="calendar-outline" size={17} color={colors.accent} />
                <Text numberOfLines={1} style={styles.detailText}>
                  {formatDisplayDate(selectedDate)}
                </Text>
                <Ionicons name="chevron-down" size={14} color={colors.faint} />
              </TouchableOpacity>

              <View style={styles.paymentSwitch}>
                {(["Card", "Cash"] as PaymentMethod[]).map((method) => {
                  const isSelected = paymentMethod === method;

                  return (
                    <TouchableOpacity
                      key={method}
                      activeOpacity={0.85}
                      style={[styles.paymentOption, isSelected && styles.paymentOptionActive]}
                      onPress={() => setPaymentMethod(method)}
                    >
                      <Ionicons
                        name={method === "Card" ? "card-outline" : "cash-outline"}
                        size={16}
                        color={isSelected ? colors.text : colors.muted}
                      />
                      <Text style={[styles.paymentText, isSelected && styles.paymentTextActive]}>
                        {method}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.categoryHeader}>
              <FieldLabel label="Category" />
              <Text style={styles.selectedCategory}>{selectedCategory}</Text>
            </View>

            <View style={styles.categoryGrid}>
              {categories.map((item) => {
                const isSelected = selectedCategory === item.label;

                return (
                  <TouchableOpacity
                    key={item.label}
                    activeOpacity={0.85}
                    onPress={() => setSelectedCategory(item.label)}
                    style={[styles.categoryItem, isSelected && styles.categoryItemActive]}
                  >
                    <View style={[styles.categoryIcon, isSelected && styles.categoryIconActive]}>
                      <Ionicons
                        name={item.icon}
                        size={18}
                        color={isSelected ? colors.text : colors.muted}
                      />
                    </View>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={[styles.categoryText, isSelected && styles.categoryTextActive]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={canSave ? 0.88 : 1}
            disabled={!canSave}
            onPress={handleAddExpense}
            style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
          >
            <Text style={[styles.saveButtonText, !canSave && styles.saveButtonTextDisabled]}>
              Save expense
            </Text>
            <Ionicons name="checkmark" size={20} color={canSave ? colors.text : colors.faint} />
          </TouchableOpacity>
        </View>

        <CalendarModal
          visible={isCalendarOpen}
          selectedDate={selectedDate}
          visibleMonth={visibleMonth}
          onVisibleMonthChange={setVisibleMonth}
          onClose={() => setIsCalendarOpen(false)}
          onSelect={(date) => {
            setSelectedDate(date);
            setIsCalendarOpen(false);
          }}
        />
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}

function CalendarModal({
  visible,
  selectedDate,
  visibleMonth,
  onVisibleMonthChange,
  onClose,
  onSelect,
}: {
  visible: boolean;
  selectedDate: Date;
  visibleMonth: Date;
  onVisibleMonthChange: (date: Date) => void;
  onClose: () => void;
  onSelect: (date: Date) => void;
}) {
  const calendarDays = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const mondayBasedOffset = (firstDay.getDay() + 6) % 7;

    return [
      ...Array.from({ length: mondayBasedOffset }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) => new Date(year, month, index + 1)),
    ];
  }, [visibleMonth]);

  const changeMonth = (direction: -1 | 1) => {
    onVisibleMonthChange(
      new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + direction, 1)
    );
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.calendarSheet}>
          <View style={styles.sheetHeader}>
            <TouchableOpacity activeOpacity={0.85} style={styles.monthButton} onPress={() => changeMonth(-1)}>
              <Ionicons name="chevron-back" size={19} color={colors.soft} />
            </TouchableOpacity>

            <View style={styles.monthTitleWrap}>
              <Text style={styles.sheetTitle}>{formatMonthTitle(visibleMonth)}</Text>
              <Text style={styles.sheetHint}>Select expense date</Text>
            </View>

            <TouchableOpacity activeOpacity={0.85} style={styles.monthButton} onPress={() => changeMonth(1)}>
              <Ionicons name="chevron-forward" size={19} color={colors.soft} />
            </TouchableOpacity>
          </View>

          <View style={styles.weekRow}>
            {weekDays.map((day) => (
              <Text key={day} style={styles.weekDay}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {calendarDays.map((date, index) => {
              const isSelected =
                date?.getFullYear() === selectedDate.getFullYear() &&
                date?.getMonth() === selectedDate.getMonth() &&
                date?.getDate() === selectedDate.getDate();

              return (
                <TouchableOpacity
                  key={date?.toISOString() ?? `empty-${index}`}
                  activeOpacity={date ? 0.85 : 1}
                  disabled={!date}
                  style={[styles.dayCell, isSelected && styles.dayCellActive]}
                  onPress={() => date && onSelect(date)}
                >
                  {date ? (
                    <Text style={[styles.dayText, isSelected && styles.dayTextActive]}>
                      {date.getDate()}
                    </Text>
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity activeOpacity={0.85} style={styles.closeFullButton} onPress={onClose}>
            <Text style={styles.closeFullButtonText}>Cancel</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function FieldLabel({ label }: { label: string }) {
  return <Text style={styles.sectionLabel}>{label}</Text>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 58,
    paddingBottom: 112,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    gap: 12,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  headerCopy: {
    flex: 1,
  },

  kicker: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 6,
  },

  title: {
    color: colors.text,
    fontSize: 29,
    fontWeight: "800",
    lineHeight: 35,
  },

  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  amountCard: {
    backgroundColor: "rgba(15,23,42,0.82)",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    marginBottom: 14,
  },

  amountTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionLabel: {
    color: colors.soft,
    fontSize: 13,
    fontWeight: "800",
  },

  currencyPill: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: colors.border,
  },

  currencyText: {
    color: colors.soft,
    fontSize: 12,
    fontWeight: "800",
  },

  amountRow: {
    height: 78,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  currencySymbol: {
    width: 34,
    color: colors.accent,
    fontSize: 34,
    fontWeight: "700",
  },

  amountInput: {
    flex: 1,
    height: 78,
    color: colors.text,
    fontSize: 48,
    fontWeight: "800",
    paddingVertical: 0,
  },

  presetRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },

  presetChip: {
    flex: 1,
    height: 38,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  presetChipActive: {
    backgroundColor: colors.accentSoft,
    borderColor: "rgba(56,189,248,0.26)",
  },

  presetText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800",
  },

  presetTextActive: {
    color: colors.text,
  },

  formCard: {
    backgroundColor: "rgba(255,255,255,0.055)",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },

  inputBox: {
    height: 54,
    borderRadius: 18,
    backgroundColor: "rgba(2,6,23,0.34)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.065)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 10,
    marginTop: 10,
  },

  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
  },

  detailRow: {
    gap: 10,
    marginTop: 12,
    marginBottom: 20,
  },

  detailPill: {
    height: 48,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
  },

  detailText: {
    flex: 1,
    color: colors.soft,
    fontSize: 13,
    fontWeight: "800",
  },

  paymentSwitch: {
    height: 48,
    flexDirection: "row",
    gap: 6,
    padding: 4,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.045)",
    borderWidth: 1,
    borderColor: colors.border,
  },

  paymentOption: {
    flex: 1,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  paymentOptionActive: {
    backgroundColor: "rgba(139,92,246,0.18)",
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.28)",
  },

  paymentText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800",
  },

  paymentTextActive: {
    color: colors.text,
  },

  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  selectedCategory: {
    color: colors.faint,
    fontSize: 12,
    fontWeight: "800",
  },

  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },

  categoryItem: {
    width: "48.5%",
    height: 58,
    borderRadius: 18,
    backgroundColor: "rgba(2,6,23,0.28)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.065)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 10,
  },

  categoryItemActive: {
    backgroundColor: "rgba(139,92,246,0.17)",
    borderColor: "rgba(139,92,246,0.34)",
  },

  categoryIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },

  categoryIconActive: {
    backgroundColor: "rgba(139,92,246,0.22)",
  },

  categoryText: {
    flex: 1,
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800",
  },

  categoryTextActive: {
    color: colors.text,
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
  },

  saveButton: {
    height: 58,
    borderRadius: 20,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.28)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },

  saveButtonDisabled: {
    backgroundColor: "rgba(255,255,255,0.045)",
    borderColor: colors.border,
  },

  saveButtonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },

  saveButtonTextDisabled: {
    color: colors.faint,
  },

  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(2,6,23,0.68)",
  },

  calendarSheet: {
    margin: 14,
    borderRadius: 26,
    padding: 18,
    backgroundColor: "#0B1220",
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },

  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
  },

  monthButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },

  monthTitleWrap: {
    flex: 1,
    alignItems: "center",
  },

  sheetTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
  },

  sheetHint: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
  },

  weekRow: {
    flexDirection: "row",
    marginBottom: 8,
  },

  weekDay: {
    width: `${100 / 7}%`,
    textAlign: "center",
    color: colors.faint,
    fontSize: 11,
    fontWeight: "800",
  },

  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 6,
  },

  dayCell: {
    width: `${100 / 7}%`,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },

  dayCellActive: {
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.32)",
  },

  dayText: {
    color: colors.soft,
    fontSize: 13,
    fontWeight: "800",
  },

  dayTextActive: {
    color: colors.text,
  },

  closeFullButton: {
    height: 46,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },

  closeFullButtonText: {
    color: colors.soft,
    fontSize: 13,
    fontWeight: "800",
  },
});
