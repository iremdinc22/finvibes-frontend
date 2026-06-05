import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ScreenBackground from "../components/ScreenBackground";
import { colors } from "../theme/colors";

type Props = {
  onBackPress?: () => void;
  onSettingsPress?: () => void;
};

const formatMoney = (value: number) => `${value.toLocaleString("en-US")} TL`;

export default function ProfileScreen({ onBackPress, onSettingsPress }: Props) {
  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={onBackPress} activeOpacity={0.85}>
            <Ionicons name="arrow-back" size={20} color={colors.soft} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Profile</Text>

          <TouchableOpacity style={styles.iconButton} onPress={onSettingsPress} activeOpacity={0.85}>
            <Ionicons name="settings-outline" size={20} color={colors.soft} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>İD</Text>
          </View>

          <Text style={styles.name}>İrem Dinç</Text>
          <Text style={styles.role}>FinVibes user</Text>

          <View style={styles.statsRow}>
            <Stat label="Balance" value={formatMoney(17550)} />
            <View style={styles.divider} />
            <Stat label="Goal" value={formatMoney(60000)} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Overview</Text>

        <View style={styles.grid}>
          <InfoCard icon="wallet-outline" label="Monthly income" value={formatMoney(30000)} />
          <InfoCard icon="trending-up-outline" label="Saved this month" value={formatMoney(7500)} />
        </View>

        <View style={styles.menuCard}>
          <MenuItem icon="person-outline" title="Personal information" />
          <MenuItem icon="card-outline" title="Payment methods" />
          <MenuItem icon="notifications-outline" title="Notifications" />
          <MenuItem icon="shield-checkmark-outline" title="Privacy & security" />
        </View>

        <TouchableOpacity activeOpacity={0.85} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={19} color={colors.red} />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenBackground>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoCard}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={20} color={colors.accent} />
      </View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function MenuItem({
  icon,
  title,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
}) {
  return (
    <TouchableOpacity style={styles.menuItem} activeOpacity={0.85}>
      <View style={styles.menuIcon}>
        <Ionicons name={icon} size={19} color={colors.accent} />
      </View>

      <Text style={styles.menuTitle}>{title}</Text>

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
  headerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  profileCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 30,
    padding: 22,
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 28,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.24)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "800",
  },
  name: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "800",
  },
  role: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "600",
    marginTop: 6,
  },
  statsRow: {
    width: "100%",
    backgroundColor: "rgba(2,6,23,0.35)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    marginTop: 20,
  },
  stat: {
    flex: 1,
  },
  statLabel: {
    color: colors.faint,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 5,
  },
  statValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
  },
  divider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginHorizontal: 12,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 14,
  },
  grid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  infoCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 16,
  },
  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  infoLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600",
  },
  infoValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 6,
  },
  menuCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 26,
    padding: 8,
  },
  menuItem: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 10,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  menuTitle: {
    flex: 1,
    color: colors.soft,
    fontSize: 14,
    fontWeight: "700",
  },
  logoutButton: {
    height: 56,
    borderRadius: 20,
    marginTop: 16,
    backgroundColor: "rgba(251,113,133,0.09)",
    borderWidth: 1,
    borderColor: "rgba(251,113,133,0.20)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 9,
  },
  logoutText: {
    color: colors.red,
    fontWeight: "800",
    fontSize: 14,
  },
});