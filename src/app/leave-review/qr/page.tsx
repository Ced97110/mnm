"use client";

import { Star, Printer, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/constants";
import Image from "next/image";

export default function ReviewQRPage() {
  // QR Code API - generates QR code for the review page
  const reviewPageUrl = "https://mobile-notary-management.com/leave-review";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(reviewPageUrl)}`;

  return (
    <>
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          header, footer, nav, .no-print {
            display: none !important;
          }
          .print-container {
            padding: 0;
            margin: 0;
            max-width: 100%;
          }
        }
      `}</style>

      <section className="py-12 md:py-16 print-container">
        <div className="container mx-auto max-w-4xl px-4">
          {/* Action Buttons (hidden when printing) */}
          <div className="no-print flex gap-3 justify-center mb-8">
            <Button
              onClick={() => window.print()}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <Printer className="h-5 w-5" />
              Print QR Code
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <a href={qrCodeUrl} download="review-qr-code.png">
                <Download className="h-5 w-5" />
                Download QR Code
              </a>
            </Button>
          </div>

          {/* Printable Card */}
          <div className="bg-white border-4 border-gold rounded-2xl p-12 text-center shadow-2xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-navy mb-3">
                Love Our Service?
              </h1>
              <div className="flex justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-8 w-8 text-gold fill-gold"
                  />
                ))}
              </div>
              <p className="text-xl text-muted-foreground">
                Scan to leave a Google review
              </p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center mb-8">
              <div className="relative w-80 h-80 bg-white p-6 rounded-2xl border-4 border-navy/10">
                <Image
                  src={qrCodeUrl}
                  alt="QR Code for leaving a review"
                  width={400}
                  height={400}
                  className="w-full h-full object-contain"
                  unoptimized // External API image
                />
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-3 mb-8">
              <p className="text-lg font-semibold text-navy">
                How to scan:
              </p>
              <ol className="text-left max-w-md mx-auto space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gold">1.</span>
                  <span>Open your phone's camera app</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gold">2.</span>
                  <span>Point it at the QR code above</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gold">3.</span>
                  <span>Tap the notification to open the review page</span>
                </li>
              </ol>
            </div>

            {/* Business Info */}
            <div className="pt-8 border-t border-border">
              <p className="text-2xl font-bold text-navy mb-2">
                {BUSINESS.name}
              </p>
              <p className="text-lg text-muted-foreground mb-1">
                {BUSINESS.phone}
              </p>
              <p className="text-sm text-muted-foreground">
                Serving the San Francisco Bay Area
              </p>
            </div>
          </div>

          {/* Manual Link (hidden when printing) */}
          <div className="no-print mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Or share this link directly:
            </p>
            <code className="bg-muted px-4 py-2 rounded-lg text-sm">
              {reviewPageUrl}
            </code>
          </div>

          {/* Usage Tips (hidden when printing) */}
          <div className="no-print mt-12 bg-cream rounded-xl p-6">
            <h2 className="font-bold text-navy mb-4">💡 Tips for Using This QR Code:</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-gold">✓</span>
                <span><strong>Print and laminate:</strong> Keep in your notary bag to show after appointments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold">✓</span>
                <span><strong>Save to phone:</strong> Pull up on your mobile device for easy sharing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold">✓</span>
                <span><strong>Include in emails:</strong> Download and attach to thank-you emails</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold">✓</span>
                <span><strong>Text the link:</strong> Copy the link above and text to clients</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold">✓</span>
                <span><strong>Business cards:</strong> Print QR code on the back of cards</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
