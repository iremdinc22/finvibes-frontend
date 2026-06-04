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

            <View style={styles.headerIcon}>
              <Ionicons name="sparkles-outline" size={21} color={colors.accent} />
            </View>
          </View>

          <Text style={styles.subtitle}>
            Ask questions and get instant guidance based on your financial habits.
          </Text>

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
                    <Ionicons name="sparkles-outline" size={16} color={colors.accent} />
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
                placeholderTextColor={colors.faint}
                value={input}
                onChangeText={setInput}
                multiline
              />

              <TouchableOpacity activeOpacity={0.85} onPress={() => sendMessage(input)}>
                <View style={styles.sendButton}>
                  <Ionicons name="send" size={17} color={colors.text} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenBackground>
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
    color: colors.accent,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 8,
  },

  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -1.1,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 17,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },

  subtitle: {
    color: colors.muted,
    marginTop: 8,
    marginBottom: 16,
    lineHeight: 22,
    fontWeight: "600",
  },

  promptRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
  },

  promptChip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },

  promptText: {
    color: colors.soft,
    fontSize: 12,
    fontWeight: "700",
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
    paddingLeft: 54,
  },

  aiAvatar: {
    width: 34,
    height: 34,
    borderRadius: 13,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 2,
  },

  messageBubble: {
    padding: 15,
    borderRadius: 21,
    flexShrink: 1,
  },

  aiBubble: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopLeftRadius: 8,
  },

  userBubble: {
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.22)",
    borderTopRightRadius: 8,
  },

  messageText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },

  aiText: {
    color: colors.soft,
  },

  userText: {
    color: colors.text,
  },

  inputDock: {
    paddingTop: 8,
  },

  inputWrapper: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 26,
    padding: 8,
  },

  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 104,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    fontWeight: "600",
    fontSize: 14,
  },

  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
});