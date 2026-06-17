import { useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import ScreenBackground from "../components/ScreenBackground";
import { colors } from "../theme/colors";

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
};

const quickPrompts = [
  "Where can I spend less?",
  "How is my goal going?",
  "Create a budget plan",
];

export default function AICoachScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hi İrem. I can help you understand your spending, protect your budget, and keep your goals on track.",
    },
  ]);

  const flatListRef = useRef<FlatList<Message>>(null);

  const generateAiResponse = (question: string) => {
    const lower = question.toLowerCase();

    if (lower.includes("phone") || lower.includes("goal") || lower.includes("track")) {
      return "Your phone goal is on track. You need 45,000 TL more, and saving 7,500 TL monthly gets you there in about 6 months.";
    }

    if (lower.includes("save") || lower.includes("less") || lower.includes("saving")) {
      return "The best place to start is shopping and food. A 10% cut in those categories could free up around 1,200 TL this month.";
    }

    if (lower.includes("spend") || lower.includes("expense") || lower.includes("analyze") || lower.includes("month")) {
      return "Your biggest spending areas are shopping, food, and bills. Shopping is rising fastest, so I would review that category first.";
    }

    if (lower.includes("budget") || lower.includes("plan")) {
      return "For 30,000 TL income, try 15,000 TL needs, 9,000 TL lifestyle, and 6,000 TL savings. It keeps the plan simple and realistic.";
    }

    return "Ask me about saving more, spending patterns, monthly budget, or goal progress. I’ll keep the answer practical.";
  };

  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 80);
  };

  const sendMessage = (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    const id = Date.now().toString();
    const userMessage: Message = {
      id,
      sender: "user",
      text: trimmedText,
    };

    const aiMessage: Message = {
      id: `${id}-ai`,
      sender: "ai",
      text: generateAiResponse(trimmedText),
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setInput("");
    scrollToEnd();
  };

  const canSend = input.trim().length > 0;

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.screen}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.kicker}>AI Finance</Text>
              <Text style={styles.title}>Coach</Text>
            </View>

            <TouchableOpacity activeOpacity={0.85} style={styles.headerButton}>
              <Ionicons name="sparkles-outline" size={21} color={colors.accent} />
            </TouchableOpacity>
          </View>

          <FlatList
            ref={flatListRef}
            style={styles.chatList}
            data={messages}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.messageList}
            ListHeaderComponent={
              <View style={styles.starterArea}>
                <Text style={styles.starterTitle}>What do you want to improve?</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.promptRow}
                >
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
                </ScrollView>
              </View>
            }
            renderItem={({ item }) => <MessageBubble item={item} />}
            onContentSizeChange={scrollToEnd}
          />

          <View style={styles.inputDock}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Ask about your money..."
                placeholderTextColor={colors.faint}
                value={input}
                onChangeText={setInput}
                multiline
                maxLength={280}
              />

              <TouchableOpacity
                activeOpacity={canSend ? 0.85 : 1}
                disabled={!canSend}
                onPress={() => sendMessage(input)}
                style={[styles.sendButton, !canSend && styles.sendButtonDisabled]}
              >
                <Ionicons name="arrow-up" size={19} color={canSend ? colors.text : colors.faint} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

function MessageBubble({ item }: { item: Message }) {
  const isUser = item.sender === "user";

  return (
    <View style={[styles.messageRow, isUser && styles.userRow]}>
      {!isUser ? (
        <View style={styles.aiAvatar}>
          <Ionicons name="sparkles-outline" size={14} color={colors.accent} />
        </View>
      ) : null}

      <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.aiBubble]}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  screen: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  kicker: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 4,
  },

  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "800",
  },

  headerButton: {
    width: 54,
    height: 54,
    borderRadius: 20,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  chatList: {
    flex: 1,
  },

  messageList: {
    paddingHorizontal: 28,
    paddingTop: 2,
    paddingBottom: 18,
  },

  starterArea: {
    marginBottom: 20,
  },

  starterTitle: {
    color: colors.soft,
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 12,
  },

  promptRow: {
    gap: 9,
    paddingRight: 28,
  },

  promptChip: {
    minHeight: 40,
    paddingHorizontal: 15,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  promptText: {
    color: colors.soft,
    fontSize: 13,
    fontWeight: "800",
  },

  messageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 18,
    paddingRight: 42,
  },

  userRow: {
    justifyContent: "flex-end",
    paddingRight: 0,
    paddingLeft: 72,
  },

  aiAvatar: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 5,
  },

  messageBubble: {
    maxWidth: "100%",
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 19,
  },

  aiBubble: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: colors.border,
    borderTopLeftRadius: 7,
  },

  userBubble: {
    backgroundColor: "rgba(56,189,248,0.15)",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.3)",
    borderTopRightRadius: 7,
  },

  messageText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 23,
    fontWeight: "700",
  },

  inputDock: {
    paddingHorizontal: 28,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 10 : 18,
    backgroundColor: "rgba(3,7,18,0.92)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.07)",
  },

  inputWrapper: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "rgba(255,255,255,0.075)",
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 7,
    paddingVertical: 7,
    gap: 8,
  },

  input: {
    flex: 1,
    maxHeight: 104,
    paddingTop: 9,
    paddingBottom: 9,
    color: colors.text,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "600",
  },

  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 17,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },

  sendButtonDisabled: {
    backgroundColor: "rgba(255,255,255,0.045)",
    borderColor: colors.border,
  },
});
