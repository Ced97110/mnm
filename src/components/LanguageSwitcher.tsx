"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { locales, localeNames, localeFlags, type Locale } from "@/lib/i18n/config";
import { setPreferredLanguage, hasConsentedToCookies } from "@/lib/cookies";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  // Detect current locale from pathname
  const currentLocale: Locale = pathname?.startsWith('/es') ? 'es' : 'en';

  // Generate alternate path for the other language
  const getAlternatePath = (targetLocale: Locale) => {
    if (targetLocale === 'en') {
      // Remove /es prefix for English
      return pathname?.replace(/^\/es/, '') || '/';
    } else {
      // Add /es prefix for Spanish
      if (pathname?.startsWith('/es')) {
        return pathname;
      }
      return `/es${pathname}`;
    }
  };

  // Handle language switch
  const handleLanguageSwitch = (locale: Locale) => {
    // Save preference if cookies are consented
    if (hasConsentedToCookies()) {
      setPreferredLanguage(locale);
    }

    // Navigate to the new path
    const newPath = getAlternatePath(locale);
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {localeFlags[currentLocale]} {localeNames[currentLocale]}
          </span>
          <span className="sm:hidden">{localeFlags[currentLocale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLanguageSwitch(locale)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span>{localeFlags[locale]}</span>
            <span>{localeNames[locale]}</span>
            {locale === currentLocale && (
              <span className="ml-auto text-xs text-muted-foreground">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
