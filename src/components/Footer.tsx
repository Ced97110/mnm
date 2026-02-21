"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Star } from "lucide-react";
import { BUSINESS, SERVICES } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const dictionaries = {
  en: () => import("@/lib/i18n/dictionaries/en/common.json").then((m) => m.default),
  es: () => import("@/lib/i18n/dictionaries/es/common.json").then((m) => m.default),
};

export function Footer() {
  const pathname = usePathname();
  const locale = pathname?.startsWith('/es') ? 'es' : 'en';
  const localePrefix = locale === 'es' ? '/es' : '';
  const [dict, setDict] = useState<Dictionary | null>(null);

  useEffect(() => {
    dictionaries[locale]().then(setDict);
  }, [locale]);

  if (!dict) return null;

  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Business Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold p-2">
                <Image
                  src="/quil.png"
                  alt="Mobile Notary Management"
                  width={32}
                  height={32}
                  className="h-8 w-8 brightness-0"
                />
              </div>
              <div>
                <span className="font-semibold">Mobile Notary</span>
                <span className="block text-sm text-white/70 leading-tight">
                  Management
                </span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              {dict.footer.description}
            </p>
            <div className="flex gap-4">
              <a
                href={BUSINESS.social.yelp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-gold transition-colors"
                aria-label="Yelp"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.14 11.34l-2.22 1.52c-.22.15-.52.04-.58-.23l-.78-3.3c-.1-.4.28-.76.68-.64l2.35.67c.4.12.64.54.55.98zm-2.11 4.05l2.12-1.65c.21-.16.5-.07.58.18l1.02 3.22c.12.39-.2.78-.58.73l-2.35-.31c-.39-.05-.67-.44-.59-.82l.2-.35zm4.66-2.51l.51 2.45c.08.4-.23.77-.62.73l-2.35-.24c-.4-.04-.69-.43-.62-.82l.37-2.05c.07-.4.45-.66.84-.59l1.87.52zm2.77-3.92l-2.2 1.44c-.22.14-.51.02-.58-.24l-.9-3.26c-.11-.4.26-.77.66-.66l2.39.64c.4.11.66.52.63.92v1.16zm-5.32-4.87L11 7.52c-.19.19-.49.16-.61-.06l-1.54-2.85c-.18-.35.08-.77.47-.77h2.74c.38 0 .66.38.52.74l-.64 1.51z"/>
                </svg>
              </a>
              <a
                href={BUSINESS.social.google}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-gold transition-colors"
                aria-label="Google"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gold">{dict.footer.contactMe}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={BUSINESS.phoneLink}
                  className="flex items-start gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{BUSINESS.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="flex items-start gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{BUSINESS.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/80">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{dict.footer.servingArea}</span>
              </li>
              <li className="flex items-start gap-3 text-white/80">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <p>{dict.footer.hoursWeekdays}: {BUSINESS.hours.weekdays}</p>
                  <p>{dict.footer.hoursWeekends}: {BUSINESS.hours.weekends}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gold">{dict.footer.services}</h3>
            <ul className="space-y-2 text-sm">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`${localePrefix}/services/${service.slug}`}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`${localePrefix}/services`}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {dict.footer.allServices}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gold">{dict.footer.resources}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`${localePrefix}/blog`}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href={`${localePrefix}/#pricing`}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {dict.nav.pricing}
                </Link>
              </li>
              <li>
                <Link
                  href={`${localePrefix}/#faq`}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {dict.nav.faq}
                </Link>
              </li>
              <li>
                <Link
                  href={`${localePrefix}/booking`}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {dict.footer.bookAppointment}
                </Link>
              </li>
              <li>
                <Link
                  href={`${localePrefix}/privacy`}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {dict.footer.privacyPolicy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Certifications and Rating */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
            <Image
              src="/certificate.png"
              alt="Notary Certificate"
              width={56}
              height={56}
              className="h-14 w-14"
            />
            <a
              href={BUSINESS.social.signingAgent}
              target="_blank"
              rel="noopener noreferrer"
              title="Verify Digital Credentials"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/certificate1.png"
                alt="Professional Certification - Click to verify"
                width={56}
                height={56}
                className="h-14 w-14"
              />
            </a>
            <a
              href={BUSINESS.social.googleReview}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-lg hover:bg-gold/20 transition-colors"
            >
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-gold fill-gold" />
                ))}
              </div>
              <span className="text-sm font-semibold text-gold">5.0 Rating</span>
            </a>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
            <p>{dict.footer.certified}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
