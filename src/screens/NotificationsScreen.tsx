import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ScreenBackground from "../components/ScreenBackground";
import { colors } from "../theme/colors";

type Props = {
  onBackPress?: () => void;
};

type Filter = "All" | "Unread";

const notifications = [
  {
    id: "1",
    title: "Shopping budget is close",
    text: "You used 88% of your shopping limit this month.",
    time: "10 min ago",
    icon: "alert-circle-outline",
    type: "Budget",
    unread: true,
  },
  {
    id: "2",
    title: "Goal reminder",
    text: "Set aside 7,500 TL this month to stay on track for your phone goal.",
    time: "Today",
    icon: "flag-outline",
    type: "Goal",
    unread: true,
  },
  {
    id: "3",
    title: "Weekly report ready",
    text: "Your spending was 12% lower than last week.",
    time: "Yesterday",
    icon: "document-text-outline",
    type: "Report",
    unread: false,
  },
  {
    id: "4",
    title: "Small purchases increased",
    text: "Coffee and snacks are creating a visible impact on your budget.",
    time: "Jun 22",
    icon: "cafe-outline",
    type: "Insight",
    unread: false,
  },
] as const;

export default function NotificationsScreen({ onBackPress }: Props) {
  const [filter, setFilter] = useState<Filter>("All");

  const filteredNotifications =
    filter === "Unread"
      ? notifications.filter((item) => item.unread)
      : notifications;

  const unreadCount = notifications.filter((item) => item.unread).length;

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.85} style={styles.iconButton} onPress={onBackPress}>
            <Ionicons name="chevron-back" size={22} color={colors.soft} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Notifications</Text>

          <TouchableOpacity activeOpacity={0.85} style={styles.iconButton}>
            <Ionicons name="checkmark-done-outline" size={20} color={colors.soft} />
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Ionicons name="notifications-outline" size={22} color={colors.accent} />
          </View>

          <View style={styles.heroBody}>
            <Text style={styles.heroTitle}>{unreadCount} unread alerts</Text>
            <Text style={styles.heroText}>
              Stay updated about your budget, goals and spending habits.
            </Text>
          </View>
        </View>

        <View style={styles.segment}>
          {(["All", "Unread"] as Filter[]).map((item) => (
            <TouchableOpacity
              key={item}
              activeOpacity={0.85}
              onPress={() => setFilter(item)}
              style={[styles.segmentItem, filter === item && styles.segmentItemActive]}
            >
              <Text style={[styles.segmentText, filter === item && styles.segmentTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent alerts</Text>
          <Text style={styles.sectionHint}>{filteredNotifications.length} items</Text>
        </View>

        <View style={styles.list}>
          {filteredNotifications.map((item) => (
            <NotificationCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}

function NotificationCard({ item }: { item: (typeof notifications)[number] }) {
  return (
    <TouchableOpacity activeOpacity={0.86} style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.iconWrap}>
          <Ionicons name={item.icon} size={19} color={colors.accent} />
        </View>

        <View style={styles.cardBody}>
          <View style={styles.titleRow}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            {item.unread ? <View style={styles.unreadDot} /> : null}
          </View>

          <Text style={styles.cardText}>{item.text}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.typeText}>{item.type}</Text>
            <View style={styles.metaDot} />
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        </View>
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
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
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
    fontSize: 18,
    fontWeight: "800",
  },

  heroCard: {
    flexDirection: "row",
    gap: 14,
    backgroundColor: "rgba(15,23,42,0.82)",
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 26,
    padding: 18,
    marginBottom: 16,
  },

  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: 17,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },

  heroBody: {
    flex: 1,
  },

  heroTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },

  heroText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "600",
  },

  segment: {
    height: 44,
    flexDirection: "row",
    gap: 5,
    padding: 5,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 22,
  },

  segmentItem: {
    flex: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  segmentItemActive: {
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.22)",
  },

  segmentText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800",
  },

  segmentTextActive: {
    color: colors.text,
  },

  sectionHeader: {
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
    color: colors.faint,
    fontSize: 12,
    fontWeight: "800",
  },

  list: {
    gap: 10,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 14,
  },

  cardTop: {
    flexDirection: "row",
    gap: 12,
  },

  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  cardBody: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  cardTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    backgroundColor: colors.accent,
  },

  cardText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
    marginTop: 6,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 10,
  },

  typeText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: "800",
  },

  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 99,
    backgroundColor: colors.faint,
  },

  timeText: {
    color: colors.faint,
    fontSize: 11,
    fontWeight: "700",
  },
});
