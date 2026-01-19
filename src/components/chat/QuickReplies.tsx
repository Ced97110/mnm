"use client";

import { Button } from "@/components/ui/button";

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
    <div className="flex flex-wrap gap-2">
      {quickReplies.map((reply) => (
        <Button
          key={reply.label}
          variant="outline"
          size="sm"
          onClick={() => onSelect(reply.message)}
          disabled={disabled}
          className="text-xs h-8 rounded-full border-border/60 hover:bg-gold/10 hover:border-gold/40 hover:text-navy"
        >
          {reply.label}
        </Button>
      ))}
    </div>
  );
}
