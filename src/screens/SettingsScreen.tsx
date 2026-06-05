import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import ScreenBackground from "../components/ScreenBackground";
import { colors } from "../theme/colors";

type Props = {
  onBackPress?: () => void;
};

export default function SettingsScreen({ onBackPress }: Props) {
  const [notifications, setNotifications] = useState(true);
  const [aiTips, setAiTips] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={onBackPress} activeOpacity={0.85}>
            <Ionicons name="arrow-back" size={20} color={colors.soft} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Ionicons name="settings-outline" size={22} color={colors.accent} />
          </View>

          <View style={styles.heroTextArea}>
            <Text style={styles.heroTitle}>FinVibes preferences</Text>
            <Text style={styles.heroText}>
              Manage your app experience and smart finance settings.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.card}>
          <ToggleItem
            icon="notifications-outline"
            title="Notifications"
            subtitle="Spending alerts and reminders"
            value={notifications}
            onValueChange={setNotifications}
          />

          <ToggleItem
            icon="sparkles-outline"
            title="AI tips"
            subtitle="Personalized saving suggestions"
            value={aiTips}
            onValueChange={setAiTips}
          />

          <ToggleItem
            icon="calendar-outline"
            title="Weekly report"
            subtitle="Weekly financial summary"
            value={weeklyReport}
            onValueChange={setWeeklyReport}
            last
          />
        </View>

        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.card}>
          <MenuItem icon="cash-outline" title="Currency" value="TRY" />
          <MenuItem icon="shield-checkmark-outline" title="Privacy" />
          <MenuItem icon="document-text-outline" title="Terms & policies" />
          <MenuItem icon="help-circle-outline" title="Help center" last />
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}

function ToggleItem({
  icon,
  title,
  subtitle,
  value,
  onValueChange,
  last = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  last?: boolean;
}) {
  return (
    <View style={[styles.toggleItem, last && styles.lastItem]}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={19} color={colors.accent} />
      </View>

      <View style={styles.textArea}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>

      <View style={styles.switchArea}>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{
            false: "rgba(148,163,184,0.25)",
            true: "rgba(56,189,248,0.30)",
          }}
          thumbColor={value ? colors.accent : "#F8FAFC"}
        />
      </View>
    </View>
  );
}

function MenuItem({
  icon,
  title,
  value,
  last = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value?: string;
  last?: boolean;
}) {
  return (
    <TouchableOpacity style={[styles.menuItem, last && styles.lastItem]} activeOpacity={0.85}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={19} color={colors.accent} />
      </View>

      <Text style={styles.menuTitle}>{title}</Text>

      {value && <Text style={styles.menuValue}>{value}</Text>}
      <Ionicons name="chevron-forward" size={18} color={colors.faint} />
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
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  placeholder: {
    width: 42,
  },

  headerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
  },

  heroCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 26,
    padding: 18,
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
    marginBottom: 24,
  },

  heroIcon: {
    width: 46,
    height: 46,
    borderRadius: 17,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  heroTextArea: {
    flex: 1,
  },

  heroTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
  },

  heroText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "600",
    marginTop: 5,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 14,
  },

  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 26,
    paddingHorizontal: 8,
    marginBottom: 24,
  },

  toggleItem: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  menuItem: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  lastItem: {
    borderBottomWidth: 0,
  },

  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  textArea: {
    flex: 1,
    minWidth: 0,
  },

  settingTitle: {
    color: colors.soft,
    fontSize: 14,
    fontWeight: "800",
  },

  settingSubtitle: {
    color: colors.faint,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 5,
    lineHeight: 16,
  },

  switchArea: {
    width: 58,
    alignItems: "flex-end",
  },

  menuTitle: {
    flex: 1,
    color: colors.soft,
    fontSize: 14,
    fontWeight: "700",
  },

  menuValue: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
  },
});