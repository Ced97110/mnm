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
      className={`fixed bottom-20 right-4 z-40 h-14 w-14 rounded-full shadow-lg transition-all duration-300 md:bottom-6 ${
        isOpen
          ? "bg-muted hover:bg-muted/80 text-foreground"
          : "bg-navy hover:bg-navy-light text-white"
      }`}
      aria-label={isOpen ? "Close chat" : "Open chat assistant"}
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <MessageCircle className="h-6 w-6" />
      )}
    </Button>
  );
}
