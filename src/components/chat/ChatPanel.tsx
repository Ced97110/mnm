"use client";

import { useEffect, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { AlertCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Suggestions, Suggestion } from "@/components/ai-elements/suggestion";
import { Loader } from "@/components/ai-elements/loader";
import { LeadCTA } from "./LeadCTA";
import { BUSINESS } from "@/lib/constants";

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Quick reply suggestions
const quickReplies = [
  { label: "💰 Pricing", message: "How much does a mobile notary cost?" },
  { label: "📋 What to bring", message: "What do I need to bring for notarization?" },
  { label: "📍 Service area", message: "Do you travel to my city?" },
  { label: "🏠 Loan signing", message: "Can you do a loan signing?" },
  { label: "📞 Book now", message: "I'd like to book an appointment" },
];

// Analytics placeholder
function trackEvent(event: string, data?: Record<string, unknown>) {
  console.log("[Analytics]", event, data);
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const transport = useMemo(
    () => new TextStreamChatTransport({ api: "/api/chat" }),
    []
  );

  const { messages, sendMessage, status } = useChat({
    transport,
  });

  const isLoading = status === "streaming" || status === "submitted";

  // Track chat opened
  useEffect(() => {
    if (isOpen) {
      trackEvent("chat_opened");
    }
  }, [isOpen]);

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

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    trackEvent("message_sent", { message: text });
    await sendMessage({ text });
  };

  const handleQuickReply = (message: string) => {
    trackEvent("quick_reply_clicked", { message });
    handleSendMessage(message);
  };

  const handleCtaClick = (type: "call" | "text" | "book") => {
    trackEvent("cta_clicked", { type });
    if (type === "book") {
      onClose();
    }
  };

  // Check if we should show the lead CTA
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
        <SheetHeader className="px-4 py-3 border-b bg-navy text-white shrink-0">
          <SheetTitle className="text-white flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            {BUSINESS.name} Assistant
          </SheetTitle>
        </SheetHeader>

        {/* Messages using AI Elements Conversation */}
        <Conversation className="flex-1">
          <ConversationContent className="gap-4 p-4">
            {/* Welcome message */}
            {messages.length === 0 && (
              <>
                <Message from="assistant">
                  <MessageContent>
                    <MessageResponse>
                      Hi! 👋 I&apos;m here to help you with notary services in the Bay Area. How can I assist you today?
                    </MessageResponse>
                  </MessageContent>
                </Message>
                <Suggestions className="gap-2 flex-wrap">
                  {quickReplies.map((reply) => (
                    <Suggestion
                      key={reply.label}
                      suggestion={reply.message}
                      onClick={handleQuickReply}
                      disabled={isLoading}
                      className="text-xs h-8 border-border/60 hover:bg-gold/10 hover:border-gold/40 hover:text-navy"
                    >
                      {reply.label}
                    </Suggestion>
                  ))}
                </Suggestions>
              </>
            )}

            {/* Chat messages */}
            {messages.map((message) => (
              <Message key={message.id} from={message.role}>
                <MessageContent
                  className={
                    message.role === "user"
                      ? "bg-navy text-white"
                      : "bg-muted"
                  }
                >
                  <MessageResponse>
                    {getMessageContent(message)}
                  </MessageResponse>
                </MessageContent>
              </Message>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <Message from="assistant">
                <MessageContent className="bg-muted">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader size={14} />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </MessageContent>
              </Message>
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
                <Suggestions className="gap-2 flex-wrap">
                  {quickReplies.map((reply) => (
                    <Suggestion
                      key={reply.label}
                      suggestion={reply.message}
                      onClick={handleQuickReply}
                      disabled={isLoading}
                      className="text-xs h-8 border-border/60 hover:bg-gold/10 hover:border-gold/40 hover:text-navy"
                    >
                      {reply.label}
                    </Suggestion>
                  ))}
                </Suggestions>
              )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        {/* Disclaimer */}
        <div className="px-4 py-2 bg-muted/50 border-t shrink-0">
          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Not legal advice. For legal questions, consult an attorney.
          </p>
        </div>

        {/* Input using AI Elements PromptInput */}
        <div className="p-4 border-t bg-background shrink-0">
          <PromptInput
            onSubmit={({ text }) => handleSendMessage(text)}
            className="rounded-lg border border-input bg-background shadow-sm"
          >
            <PromptInputTextarea
              placeholder="Type your message..."
              disabled={isLoading}
              className="min-h-12 max-h-32 resize-none border-0 focus-visible:ring-0"
            />
            <PromptInputFooter className="p-2 pt-0">
              <div /> {/* Spacer */}
              <PromptInputSubmit
                status={status}
                disabled={isLoading}
                className="bg-navy hover:bg-navy-light"
              />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </SheetContent>
    </Sheet>
  );
}
