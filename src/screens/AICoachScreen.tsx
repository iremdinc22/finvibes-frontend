import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import ScreenBackground from "../components/ScreenBackground";
import { colors } from "../theme/colors";

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
};

const quickPrompts = ["Save more", "Analyze spending", "Goal status"];

export default function AICoachScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text:
        "Hi İrem, I’m your FinVibes AI Coach. I can help you understand your spending, improve your budget and stay on track with your savings goals.",
    },
  ]);

  const generateAiResponse = (question: string) => {
    const lower = question.toLowerCase();

    if (lower.includes("phone") || lower.includes("goal") || lower.includes("track")) {
      return "You need 45,000 TL more for your phone goal. If you save 7,500 TL monthly, you can reach it in about 6 months.";
    }

    if (lower.includes("save") || lower.includes("saving")) {
      return "A good first step is reducing food and shopping expenses by 10%. That could free up around 1,200 TL this month.";
    }

    if (lower.includes("spend") || lower.includes("expense") || lower.includes("analyze")) {
      return "Your largest spending areas are shopping, food and bills. Shopping appears to be increasing the fastest this month.";
    }

    if (lower.includes("budget")) {
      return "A simple split could be 50% needs, 30% lifestyle and 20% savings. For 30,000 TL income, that means around 6,000 TL for savings.";
    }

    return "I can help you analyze your spending, savings goals and monthly budget. Try asking: “How can I save more this month?”";
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: text.trim(),
    };

    const aiMessage: Message = {
      id: `${Date.now()}-ai`,
      sender: "ai",
      text: generateAiResponse(text),
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setInput("");
  };

  return (
    <ScreenBackground>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.kicker}>AI Finance</Text>
              <Text style={styles.title}>AI Coach</Text>
            </View>

            <LinearGradient colors={[colors.cyan, colors.blue]} style={styles.headerIcon}>
              <Ionicons name="sparkles" size={22} color="#FFFFFF" />
            </LinearGradient>
          </View>

          <LinearGradient
            colors={["rgba(255,255,255,0.095)", "rgba(255,255,255,0.035)"]}
            style={styles.statusCard}
          >
            <View style={styles.statusTop}>
              <View style={{ flex: 1 }}>
                <Text style={styles.statusLabel}>Smart summary</Text>
                <Text style={styles.statusTitle}>Spending pattern detected</Text>
              </View>

              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>Ready</Text>
              </View>
            </View>

            <Text style={styles.statusText}>
              Shopping and food are trending up this month. Ask me how to optimize your budget.
            </Text>

            <View style={styles.miniStatsRow}>
              <MiniStat label="Spent" value="12,450 TL" />
              <View style={styles.statDivider} />
              <MiniStat label="Saved" value="7,500 TL" />
            </View>
          </LinearGradient>

          <View style={styles.promptRow}>
            {quickPrompts.map((item) => (
              <TouchableOpacity
                key={item}
                activeOpacity={0.85}
                style={styles.promptChip}
                onPress={() => sendMessage(item)}
              >
                <Text style={styles.promptText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <FlatList
            style={styles.chatList}
            data={messages}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messageList}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageRow,
                  item.sender === "user" ? styles.userRow : styles.aiRow,
                ]}
              >
                {item.sender === "ai" && (
                  <View style={styles.aiAvatar}>
                    <Ionicons name="sparkles-outline" size={17} color={colors.cyan} />
                  </View>
                )}

                <View
                  style={[
                    styles.messageBubble,
                    item.sender === "user" ? styles.userBubble : styles.aiBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      item.sender === "user" ? styles.userText : styles.aiText,
                    ]}
                  >
                    {item.text}
                  </Text>
                </View>
              </View>
            )}
          />

          <View style={styles.inputDock}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Ask anything about your money..."
                placeholderTextColor="#64748B"
                value={input}
                onChangeText={setInput}
                multiline
              />

              <TouchableOpacity activeOpacity={0.85} onPress={() => sendMessage(input)}>
                <LinearGradient colors={[colors.cyan, colors.blue]} style={styles.sendButton}>
                  <Ionicons name="send" size={18} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.miniStat}>
      <Text style={styles.miniStatLabel}>{label}</Text>
      <Text style={styles.miniStatValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 58,
    paddingBottom: 88,
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
    alignItems: "center",
    justifyContent: "center",
  },

  statusCard: {
    marginTop: 16,
    borderRadius: 28,
    padding: 17,
    borderWidth: 1,
    borderColor: colors.border,
  },

  statusTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },

  statusLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 6,
  },

  statusTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 21,
  },

  liveBadge: {
    backgroundColor: "rgba(34,197,94,0.12)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.30)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 99,
    backgroundColor: colors.green,
  },

  liveText: {
    color: colors.green,
    fontSize: 11,
    fontWeight: "900",
  },

  statusText: {
    color: colors.soft,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 20,
    marginTop: 11,
  },

  miniStatsRow: {
    marginTop: 14,
    backgroundColor: "rgba(3,7,18,0.28)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: 13,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  miniStat: {
    flex: 1,
  },

  miniStatLabel: {
    color: "#7C8BA5",
    fontSize: 11,
    fontWeight: "900",
    marginBottom: 5,
  },

  miniStatValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
  },

  statDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.10)",
    marginHorizontal: 10,
  },

  promptRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
    marginBottom: 12,
  },

  promptChip: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 999,
  },

  promptText: {
    color: colors.soft,
    fontSize: 11,
    fontWeight: "900",
  },

  chatList: {
    flex: 1,
  },

  messageList: {
    paddingTop: 4,
    paddingBottom: 16,
    flexGrow: 1,
  },

  messageRow: {
    flexDirection: "row",
    marginBottom: 13,
    width: "100%",
  },

  aiRow: {
    alignSelf: "flex-start",
    paddingRight: 4,
  },

  userRow: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    paddingLeft: 48,
  },

  aiAvatar: {
    width: 34,
    height: 34,
    borderRadius: 13,
    backgroundColor: "rgba(56,189,248,0.12)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.22)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 2,
  },

  messageBubble: {
    padding: 15,
    borderRadius: 22,
    flexShrink: 1,
  },

  aiBubble: {
    flex: 1,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopLeftRadius: 8,
  },

  userBubble: {
    backgroundColor: "rgba(56,189,248,0.22)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.26)",
    borderTopRightRadius: 8,
  },

  messageText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
  },

  aiText: {
    color: colors.soft,
  },

  userText: {
    color: "#FFFFFF",
  },

  inputDock: {
    paddingTop: 8,
  },

  inputWrapper: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    backgroundColor: "rgba(15,23,42,0.92)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.13)",
    borderRadius: 28,
    padding: 8,
  },

  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 104,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    fontWeight: "700",
    fontSize: 14,
  },

  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});