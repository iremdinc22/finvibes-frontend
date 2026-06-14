import { useState, useRef } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";
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
      text: "Hi İrem, I’m your FinVibes AI Coach. I can help you understand your spending, improve your budget and stay on track with your savings goals.",
    },
  ]);

  const flatListRef = useRef<FlatList>(null);

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

    // Yeni mesaj geldiğinde otomatik olarak en aşağı kaydırır
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.screen}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
          {/* Sabit Üst Alan */}
          <View style={styles.headerContainer}>
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
          </View>

          {/* Chat Listesi ve Hızlı Butonlar */}
          <FlatList
            ref={flatListRef}
            style={styles.chatList}
            data={messages}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messageList}
            // Hızlı butonları listenin en tepesine (Header olarak) koyuyoruz ki kaydırılabilsin
            ListHeaderComponent={
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
            }
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageRow,
                  item.sender === "user" ? styles.userRow : styles.aiRow,
                ]}
              >
                {item.sender === "ai" && (
                  <View style={styles.aiAvatar}>
                    <Ionicons name="sparkles-outline" size={14} color={colors.accent} />
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

          {/* En Alta Sabitlenmiş Giriş Alanı */}
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
                  <Ionicons name="send" size={16} color={colors.text} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 40 : 16,
    paddingBottom: 8,
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
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.8,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    color: colors.muted,
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  promptRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 24,
    marginTop: 12,
    marginBottom: 20,
  },
  promptChip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  promptText: {
    color: colors.soft,
    fontSize: 13,
    fontWeight: "600",
  },
  chatList: {
    flex: 1,
  },
  messageList: {
    paddingBottom: 24,
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 16,
    paddingHorizontal: 24,
    maxWidth: "100%",
  },
  aiRow: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    paddingRight: 64, // Yapay zeka mesajının sağdan taşmasını önler
  },
  userRow: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    paddingLeft: 64, // Kullanıcı mesajının soldan taşmasını önler
  },
  aiAvatar: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 4,
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  aiBubble: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.22)",
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500",
  },
  aiText: {
    color: colors.text, // Okunabilirlik için soft yerine düz text rengi daha iyi gidebilir
  },
  userText: {
    color: colors.text,
  },
  inputDock: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === "ios" ? 8 : 16,
    paddingTop: 8,
    backgroundColor: "transparent",
  },
  inputWrapper: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 24,
    paddingHorizontal: 6,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: colors.text,
    fontSize: 15,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
});