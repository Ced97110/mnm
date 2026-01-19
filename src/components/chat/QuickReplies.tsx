"use client";

// This component is kept for backward compatibility
// The ChatPanel now uses AI Elements Suggestions components directly

import { Suggestions, Suggestion } from "@/components/ai-elements/suggestion";

interface QuickRepliesProps {
  onSelect: (message: string) => void;
  disabled?: boolean;
}

const quickReplies = [
  { label: "💰 Pricing", message: "How much does a mobile notary cost?" },
  { label: "📋 What to bring", message: "What do I need to bring for notarization?" },
  { label: "📍 Service area", message: "Do you travel to my city?" },
  { label: "🏠 Loan signing", message: "Can you do a loan signing?" },
  { label: "📞 Contact now", message: "I'd like to book an appointment" },
];

export function QuickReplies({ onSelect, disabled }: QuickRepliesProps) {
  return (
    <Suggestions className="gap-2 flex-wrap">
      {quickReplies.map((reply) => (
        <Suggestion
          key={reply.label}
          suggestion={reply.message}
          onClick={onSelect}
          disabled={disabled}
          className="text-xs h-8 border-border/60 hover:bg-gold/10 hover:border-gold/40 hover:text-navy"
        >
          {reply.label}
        </Suggestion>
      ))}
    </Suggestions>
  );
}
