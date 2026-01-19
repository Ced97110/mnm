"use client";

import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-navy text-white rounded-br-md"
            : "bg-muted text-foreground rounded-bl-md"
        )}
      >
        {content}
        {isStreaming && (
          <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-current" />
        )}
      </div>
    </div>
  );
}
