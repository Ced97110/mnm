"use client";

import { Phone, MessageSquare, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/constants";

interface LeadCTAProps {
  onCtaClick?: (type: "call" | "text" | "book") => void;
}

export function LeadCTA({ onCtaClick }: LeadCTAProps) {
  const handleClick = (type: "call" | "text" | "book") => {
    onCtaClick?.(type);
  };

  return (
    <div className="rounded-xl bg-gold/10 border border-gold/20 p-4 space-y-3">
      <p className="text-sm font-medium text-navy">
        Ready to schedule? Reach out now!
      </p>
      <div className="flex flex-col gap-2">
        <Button
          size="sm"
          asChild
          className="bg-navy hover:bg-navy-light gap-2 h-10"
          onClick={() => handleClick("call")}
        >
          <a href={BUSINESS.phoneLink}>
            <Phone className="h-4 w-4" />
            Call {BUSINESS.phone}
          </a>
        </Button>
        <Button
          size="sm"
          variant="outline"
          asChild
          className="gap-2 h-10"
          onClick={() => handleClick("text")}
        >
          <a href={BUSINESS.textLink}>
            <MessageSquare className="h-4 w-4" />
            Text Us (Fastest!)
          </a>
        </Button>
        <Button
          size="sm"
          variant="outline"
          asChild
          className="gap-2 h-10"
          onClick={() => handleClick("book")}
        >
          <a href="/booking">
            <Calendar className="h-4 w-4" />
            Book Online
          </a>
        </Button>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Same-day appointments often available
      </p>
    </div>
  );
}
