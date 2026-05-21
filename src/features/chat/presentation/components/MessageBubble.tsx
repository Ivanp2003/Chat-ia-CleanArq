import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { Message } from "../../domain/entities/Message";

interface Props {
  message: Message;
}

export const MessageBubble: React.FC<Props> = ({ message }) => {
  const isUser = message.role === "user";
  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.aiContainer,
      ]}
    >
      <View
        style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}
      >
        {isUser ? (
          <Text style={[styles.text, styles.userText]}>{message.content}</Text>
        ) : (
          <Markdown style={markdownStyles}>{message.content}</Markdown>
        )}
      </View>
      <Text style={styles.timestamp}>
        {message.timestamp.toLocaleTimeString("es-EC", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 4, marginHorizontal: 12, maxWidth: "80%" },
  userContainer: { alignSelf: "flex-end", alignItems: "flex-end" },
  aiContainer: { alignSelf: "flex-start", alignItems: "flex-start" },
  bubble: { borderRadius: 18, paddingHorizontal: 14, paddingVertical: 10 },
  userBubble: { backgroundColor: "#2563EB", borderBottomRightRadius: 4 },
  aiBubble: { backgroundColor: "#F1F5F9", borderBottomLeftRadius: 4 },
  text: { fontSize: 15, lineHeight: 21 },
  userText: { color: "#FFFFFF" },
  aiText: { color: "#1E293B" },
  timestamp: { fontSize: 10, color: "#94A3B8", marginTop: 2 },
});

const markdownStyles = {
  body: { fontSize: 15, lineHeight: 21, color: "#1E293B" },
  heading1: {
    fontSize: 20,
    fontWeight: "bold" as const,
    marginBottom: 8,
    color: "#1E293B",
  },
  heading2: {
    fontSize: 18,
    fontWeight: "bold" as const,
    marginBottom: 6,
    color: "#1E293B",
  },
  heading3: {
    fontSize: 16,
    fontWeight: "bold" as const,
    marginBottom: 4,
    color: "#1E293B",
  },
  strong: { fontWeight: "bold" as const, color: "#1E293B" },
  em: { fontStyle: "italic" as const, color: "#1E293B" },
  link: { color: "#2563EB", textDecorationLine: "underline" as const },
  code_inline: {
    backgroundColor: "#E2E8F0",
    padding: 2,
    borderRadius: 4,
    fontFamily: "monospace" as const,
  },
  code_block: {
    backgroundColor: "#E2E8F0",
    padding: 10,
    borderRadius: 8,
    fontFamily: "monospace" as const,
    marginVertical: 8,
  },
  bullet_list: { marginBottom: 8 },
  list_item: { marginBottom: 4 },
  bullet: { marginRight: 8, color: "#1E293B" },
};
