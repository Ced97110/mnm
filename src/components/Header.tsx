"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, MessageSquare, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { BUSINESS } from "@/lib/constants";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy p-2">
            <Image
              src="/quil.png"
              alt="Mobile Notary Management"
              width={32}
              height={32}
              className="h-8 w-8 brightness-0 invert"
            />
          </div>
          <div>
            <span className="font-semibold text-navy text-sm sm:text-base">Mobile Notary</span>
            <span className="block text-xs sm:text-sm text-muted-foreground leading-tight">
              Management
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <a href={BUSINESS.phoneLink} className="gap-2">
              <Phone className="h-4 w-4" />
              {BUSINESS.phone}
            </a>
          </Button>
          <Button size="sm" asChild className="bg-navy hover:bg-navy-light">
            <a href="/booking">Book Now</a>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] p-0 bg-background">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            
            {/* Menu Header with Logo */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy p-2">
                <Image
                  src="/quil.png"
                  alt="Mobile Notary Management"
                  width={28}
                  height={28}
                  className="h-7 w-7 brightness-0 invert"
                />
              </div>
              <div>
                <span className="font-semibold text-navy text-sm">Mobile Notary</span>
                <span className="block text-xs text-muted-foreground leading-tight">
                  Management
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="px-4 py-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center h-12 px-3 rounded-lg text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-navy active:bg-muted/80"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA Section */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-muted/30">
              <p className="text-xs text-muted-foreground mb-3 px-1">Get in touch</p>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <Button variant="default" asChild className="h-11 bg-navy hover:bg-navy-light gap-2">
                  <a href={BUSINESS.phoneLink}>
                    <Phone className="h-4 w-4" />
                    Call
                  </a>
                </Button>
                <Button variant="outline" asChild className="h-11 gap-2">
                  <a href={BUSINESS.textLink}>
                    <MessageSquare className="h-4 w-4" />
                    Text
                  </a>
                </Button>
              </div>
              <Button asChild className="w-full h-12 bg-gold hover:bg-gold-light text-navy gap-2 font-semibold">
                <a href="/booking" onClick={() => setIsOpen(false)}>
                  <Calendar className="h-5 w-5" />
                  Book Appointment
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
