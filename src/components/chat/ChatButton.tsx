"use client";

import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ChatButton({ isOpen, onClick }: ChatButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className={`fixed bottom-6 right-4 z-[60] h-14 w-14 rounded-full shadow-warm-lg transition-all duration-300 hidden md:flex ${
        isOpen
          ? "bg-muted hover:bg-muted/80 text-foreground border border-border"
          : "bg-navy hover:bg-navy-light text-white ring-2 ring-gold/20"
      }`}
      aria-label={isOpen ? "Close chat" : "Open chat assistant"}
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <>
          <MessageCircle className="h-6 w-6" />
          {/* Pulse indicator */}
          <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-gold animate-pulse" />
        </>
      )}
    </Button>
  );
}
