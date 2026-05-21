import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Message } from "../../domain/entities/Message";

interface Props {
  message: Message;
}

const parseMarkdown = (text: string): React.ReactNode[] => {
  const lines = text.split("\n");
  const result: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    if (line.startsWith("### ")) {
      result.push(
        <Text key={`h3-${index}`} style={markdownStyles.heading3}>
          {line.replace("### ", "")}
        </Text>,
      );
    } else if (line.startsWith("## ")) {
      result.push(
        <Text key={`h2-${index}`} style={markdownStyles.heading2}>
          {line.replace("## ", "")}
        </Text>,
      );
    } else if (line.startsWith("# ")) {
      result.push(
        <Text key={`h1-${index}`} style={markdownStyles.heading1}>
          {line.replace("# ", "")}
        </Text>,
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      result.push(
        <Text key={`li-${index}`} style={markdownStyles.listItem}>
          {"  • " + line.replace(/^[*-] /, "")}
        </Text>,
      );
    } else if (line.startsWith("```")) {
      // Skip code block markers
    } else {
      // Parse inline markdown with simple replacement
      let processedLine = line;

      // Replace **bold** with styled text
      const parts: React.ReactNode[] = [];
      const boldRegex = /\*\*(.+?)\*\*/g;
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(processedLine)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          parts.push(processedLine.substring(lastIndex, match.index));
        }
        // Add bold text
        parts.push(
          <Text
            key={`bold-${index}-${parts.length}`}
            style={markdownStyles.strong}
          >
            {match[1]}
          </Text>,
        );
        lastIndex = match.index + match[0].length;
      }

      // Add remaining text
      if (lastIndex < processedLine.length) {
        parts.push(processedLine.substring(lastIndex));
      }

      // If no bold found, just add the line
      if (parts.length === 0) {
        result.push(<Text key={`line-${index}`}>{line}</Text>);
      } else {
        result.push(<Text key={`line-${index}`}>{parts}</Text>);
      }
    }
  });

  return result;
};

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
          <Text style={markdownStyles.body}>
            {parseMarkdown(message.content)}
          </Text>
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
  list_item: { flexDirection: "row" as const, marginBottom: 4 },
  listItem: { color: "#1E293B" },
  bullet: { marginRight: 8, color: "#1E293B" },
};
