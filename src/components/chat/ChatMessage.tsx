"use client";

// This component is kept for backward compatibility
// The ChatPanel now uses AI Elements Message components directly

import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <Message from={role}>
      <MessageContent
        className={
          role === "user"
            ? "bg-navy text-white"
            : "bg-muted"
        }
      >
        <MessageResponse>{content}</MessageResponse>
      </MessageContent>
    </Message>
  );
}
