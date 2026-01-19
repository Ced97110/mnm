"use client";

import { useEffect, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { AlertCircle, Sparkles } from "lucide-react";
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
      if (m.role !== "user" || !m.parts) return false;
      const content = m.parts
        .filter((p) => p.type === "text")
        .map((p) => (p as { type: "text"; text: string }).text)
        .join("")
        .toLowerCase();
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
        className="w-full sm:max-w-md p-0 flex flex-col h-full border-l border-border/50"
      >
        {/* Header - Navy with gold accent */}
        <SheetHeader className="px-4 py-4 border-b bg-navy text-white shrink-0">
          <SheetTitle className="text-white flex items-center gap-2.5 text-base">
            <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-gold" />
            </div>
            <div>
              <span className="font-semibold">{BUSINESS.name}</span>
              <span className="block text-xs text-white/60 font-normal">AI Assistant</span>
            </div>
          </SheetTitle>
        </SheetHeader>

        {/* Messages - Following AI Elements pattern */}
        <Conversation className="flex-1 bg-cream">
          <ConversationContent className="gap-4 p-4">
            {/* Welcome message */}
            {messages.length === 0 && (
              <>
                <Message from="assistant">
                  <MessageContent className="bg-white border border-border/50 shadow-warm rounded-2xl rounded-tl-md px-4 py-3">
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
                      className="text-xs h-9 bg-white border-border/60 hover:bg-gold/10 hover:border-gold/40 hover:text-navy shadow-sm transition-all"
                    >
                      {reply.label}
                    </Suggestion>
                  ))}
                </Suggestions>
              </>
            )}

            {/* Chat messages - Following AI Elements usage pattern */}
            {messages.map(({ id, role, parts }) => (
              <Message from={role} key={id}>
                <MessageContent
                  className={
                    role === "user"
                      ? "bg-navy text-white rounded-2xl rounded-tr-md shadow-warm px-4 py-3"
                      : "bg-white border border-border/50 shadow-warm rounded-2xl rounded-tl-md px-4 py-3"
                  }
                >
                  {parts?.map((part, partIndex) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <MessageResponse key={`${role}-${partIndex}`}>
                            {part.text}
                          </MessageResponse>
                        );
                      default:
                        return null;
                    }
                  })}
                </MessageContent>
              </Message>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <Message from="assistant">
                <MessageContent className="bg-white border border-border/50 shadow-warm rounded-2xl rounded-tl-md px-4 py-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader size={14} className="text-gold" />
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
                      className="text-xs h-9 bg-white border-border/60 hover:bg-gold/10 hover:border-gold/40 hover:text-navy shadow-sm transition-all"
                    >
                      {reply.label}
                    </Suggestion>
                  ))}
                </Suggestions>
              )}
          </ConversationContent>
          <ConversationScrollButton className="bg-white border-border shadow-warm hover:bg-gold/10" />
        </Conversation>

        {/* Disclaimer */}
        <div className="px-4 py-2 bg-cream border-t border-border/50 shrink-0">
          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Not legal advice. For legal questions, consult an attorney.
          </p>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border/50 bg-white shrink-0">
          <PromptInput
            onSubmit={({ text }) => handleSendMessage(text)}
            className="rounded-xl border border-border bg-cream shadow-sm focus-within:border-gold/50 focus-within:ring-2 focus-within:ring-gold/20 transition-all"
          >
            <PromptInputTextarea
              placeholder="Type your message..."
              disabled={isLoading}
              className="min-h-12 max-h-32 resize-none border-0 bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground/60"
            />
            <PromptInputFooter className="p-2 pt-0">
              <div /> {/* Spacer */}
              <PromptInputSubmit
                status={status}
                disabled={isLoading}
                className="bg-navy hover:bg-navy-light text-white rounded-lg shadow-sm"
              />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </SheetContent>
    </Sheet>
  );
}
