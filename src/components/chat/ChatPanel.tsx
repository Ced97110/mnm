"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ChatMessage } from "./ChatMessage";
import { QuickReplies } from "./QuickReplies";
import { LeadCTA } from "./LeadCTA";
import { BUSINESS } from "@/lib/constants";

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Analytics placeholder functions
function trackEvent(event: string, data?: Record<string, unknown>) {
  // Placeholder for analytics integration
  console.log("[Analytics]", event, data);
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  const transport = useMemo(
    () => new TextStreamChatTransport({ api: "/api/chat" }),
    []
  );

  const { messages, sendMessage, status } = useChat({
    transport,
  });

  const isLoading = status === "streaming" || status === "submitted";

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Track chat opened
  useEffect(() => {
    if (isOpen) {
      trackEvent("chat_opened");
    }
  }, [isOpen]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;
    trackEvent("message_sent", { message });
    setInputValue("");
    await sendMessage({ text: message });
  };

  const handleQuickReply = (message: string) => {
    trackEvent("quick_reply_clicked", { message });
    handleSendMessage(message);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleCtaClick = (type: "call" | "text" | "book") => {
    trackEvent("cta_clicked", { type });
    if (type === "book") {
      onClose();
    }
  };

  // Get message content as string from parts
  const getMessageContent = (message: typeof messages[number]): string => {
    if (!message.parts) return "";
    return message.parts
      .map((part) => {
        if (part.type === "text") return part.text;
        return "";
      })
      .join("");
  };

  // Check if we should show the lead CTA (after 2+ messages or booking intent)
  const shouldShowLeadCTA =
    messages.length >= 4 ||
    messages.some((m) => {
      if (m.role !== "user") return false;
      const content = getMessageContent(m).toLowerCase();
      return (
        content.includes("book") ||
        content.includes("appointment") ||
        content.includes("schedule") ||
        content.includes("contact")
      );
    });

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col h-full"
      >
        {/* Header */}
        <SheetHeader className="px-4 py-3 border-b bg-navy text-white">
          <SheetTitle className="text-white flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            {BUSINESS.name} Assistant
          </SheetTitle>
        </SheetHeader>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="space-y-4">
                <ChatMessage
                  role="assistant"
                  content="Hi! 👋 I'm here to help you with notary services in the Bay Area. How can I assist you today?"
                />
                <QuickReplies onSelect={handleQuickReply} disabled={isLoading} />
              </div>
            )}

            {/* Chat messages */}
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role as "user" | "assistant"}
                content={getMessageContent(message)}
              />
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0.1s]" />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              </div>
            )}

            {/* Lead CTA */}
            {shouldShowLeadCTA && !isLoading && (
              <LeadCTA onCtaClick={handleCtaClick} />
            )}

            {/* Quick replies after assistant message */}
            {messages.length > 0 &&
              messages[messages.length - 1].role === "assistant" &&
              !isLoading &&
              !shouldShowLeadCTA && (
                <QuickReplies onSelect={handleQuickReply} disabled={isLoading} />
              )}
          </div>
        </ScrollArea>

        {/* Disclaimer */}
        <div className="px-4 py-2 bg-muted/50 border-t">
          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Not legal advice. For legal questions, consult an attorney.
          </p>
        </div>

        {/* Input */}
        <form
          onSubmit={handleFormSubmit}
          className="p-4 border-t bg-background"
        >
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
              aria-label="Chat message"
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !inputValue.trim()}
              className="bg-navy hover:bg-navy-light shrink-0"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
