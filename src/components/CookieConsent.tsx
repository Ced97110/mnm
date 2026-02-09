"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hasConsentedToCookies, setConsentToCookies } from "@/lib/cookies";

// Import dictionaries directly in client component
const dictionaries = {
  en: () => import("@/lib/i18n/dictionaries/en/common.json").then((m) => m.default),
  es: () => import("@/lib/i18n/dictionaries/es/common.json").then((m) => m.default),
};

export function CookieConsent() {
  const pathname = usePathname();
  const [showBanner, setShowBanner] = useState(false);
  const [dict, setDict] = useState<any>(null);

  // Detect locale from pathname
  const locale = pathname?.startsWith('/es') ? 'es' : 'en';

  useEffect(() => {
    dictionaries[locale]().then(setDict);
  }, [locale]);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = hasConsentedToCookies();
    if (!hasConsented) {
      // Show banner after a short delay
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setConsentToCookies(true);
    setShowBanner(false);

    // Initialize analytics if consent given
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
  };

  const handleDecline = () => {
    setConsentToCookies(false);
    setShowBanner(false);
  };

  if (!showBanner || !dict) return null;

  const text = locale === 'es' ? {
    title: "🍪 Aviso de Cookies",
    message: "Este sitio web utiliza cookies y tecnologías similares para mejorar su experiencia, recordar sus preferencias de idioma y analizar el uso del sitio de acuerdo con nuestra Política de Privacidad. Al hacer clic en 'Aceptar Todas las Cookies', usted acepta nuestro uso de cookies. Las cookies esenciales siempre están habilitadas. Sus datos personales nunca se venden a terceros.",
    accept: "Aceptar Todas las Cookies",
    decline: "Solo Cookies Esenciales",
    privacy: "Ver Política de Privacidad"
  } : {
    title: "🍪 Cookie Notice",
    message: "This website uses cookies and similar technologies to enhance your experience, remember your language preferences, and analyze site usage in accordance with our Privacy Policy. By clicking 'Accept All Cookies', you consent to our use of cookies. Essential cookies are always enabled. Your personal data is never sold to third parties.",
    accept: "Accept All Cookies",
    decline: "Essential Cookies Only",
    privacy: "View Privacy Policy"
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t-2 border-gold shadow-2xl animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="h-5 w-5 text-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-navy text-sm mb-1">
                {text.title}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {text.message}
              </p>
              <a
                href={`${locale === 'es' ? '/es' : ''}/privacy`}
                className="text-xs text-blue-600 hover:underline mt-1 inline-block"
              >
                {text.privacy}
              </a>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              onClick={handleDecline}
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none"
            >
              {text.decline}
            </Button>
            <Button
              onClick={handleAccept}
              size="sm"
              className="flex-1 sm:flex-none bg-gold hover:bg-gold/90 text-navy font-semibold"
            >
              {text.accept}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
