import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCTA } from "@/components/MobileCTA";
import { ChatWidget } from "@/components/chat";
import { generateLocalBusinessSchema } from "@/lib/schema";
import { BUSINESS } from "@/lib/constants";
import { GA_TRACKING_ID } from "@/lib/gtag";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mobile-notary-management.com"),
  title: {
    default: `${BUSINESS.name} | Mobile Notary & Loan Signing Services`,
    template: `%s | ${BUSINESS.name}`,
  },
  description:
    "Owner-operated mobile notary serving the San Francisco Bay Area. I come to you 7 days a week—you work directly with me. Same-day appointments, loan signings, apostille services. Call now!",
  keywords: [
    "mobile notary",
    "notary public",
    "Bay Area notary",
    "San Francisco notary",
    "Oakland notary",
    "loan signing agent",
    "apostille service",
    "mobile notary near me",
    "traveling notary",
    "24 hour notary",
  ],
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mobile-notary-management.com",
    siteName: BUSINESS.name,
    title: `${BUSINESS.name} | Mobile Notary & Loan Signing Services`,
    description:
      "Owner-operated mobile notary serving the San Francisco Bay Area. I come to you 7 days a week—you work directly with me. Same-day appointments available.",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: `${BUSINESS.name} - Professional Mobile Notary Services in San Francisco Bay Area`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS.name} | Mobile Notary & Loan Signing Services`,
    description:
      "Owner-operated mobile notary serving the San Francisco Bay Area. I come to you 7 days a week.",
    images: ["/favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Add Google Search Console verification code here when available
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = generateLocalBusinessSchema();

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <Header />
        <main className="pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileCTA />
        <ChatWidget />
      </body>
    </html>
  );
}
