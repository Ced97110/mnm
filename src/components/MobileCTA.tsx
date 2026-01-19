"use client";

import { Phone, MessageSquare, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/constants";

export function MobileCTA() {
  return (
    <div className="mobile-cta-bar fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 md:hidden">
      <div className="flex items-center justify-around px-2 py-2 gap-2">
        <Button
          variant="default"
          size="sm"
          asChild
          className="flex-1 bg-navy hover:bg-navy-light gap-1.5 h-11"
        >
          <a href={BUSINESS.phoneLink}>
            <Phone className="h-4 w-4" />
            <span className="text-xs font-medium">Call</span>
          </a>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          asChild
          className="flex-1 gap-1.5 h-11"
        >
          <a href={BUSINESS.textLink}>
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs font-medium">Text</span>
          </a>
        </Button>
        
        <Button
          variant="default"
          size="sm"
          asChild
          className="flex-1 bg-gold hover:bg-gold-light text-navy gap-1.5 h-11"
        >
          <a href="/booking">
            <Calendar className="h-4 w-4" />
            <span className="text-xs font-medium">Book</span>
          </a>
        </Button>
      </div>
      {/* Safe area padding for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </div>
  );
}
