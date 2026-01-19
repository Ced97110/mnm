import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${BUSINESS.name}. Learn how I collect, use, and protect your personal information.`,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://mobile-notary-management.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border/50 bg-white">
        <div className="container mx-auto max-w-4xl px-4 py-3">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-navy transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-navy font-medium">Privacy Policy</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        <article className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-navy mb-8">Privacy Policy</h1>
          
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8 mb-4">
            1. Information I Collect
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            When you use my services or contact me, I may collect the following information:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Name and contact information (phone number, email address)</li>
            <li>Service location and appointment details</li>
            <li>Information necessary to perform notarization services</li>
            <li>Payment information</li>
          </ul>

          <h2 className="text-xl font-semibold text-navy mt-8 mb-4">
            2. How I Use Your Information
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I use the information I collect to:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Schedule and perform notarization services</li>
            <li>Communicate with you about appointments</li>
            <li>Process payments</li>
            <li>Maintain records as required by California law</li>
            <li>Improve my services</li>
          </ul>

          <h2 className="text-xl font-semibold text-navy mt-8 mb-4">
            3. Information Sharing
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            I do not sell or rent your personal information. I may share information
            only as required by law, to process payments, or with your explicit consent.
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8 mb-4">
            4. Data Security
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            I implement appropriate security measures to protect your personal
            information. However, no method of transmission over the internet is
            completely secure.
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8 mb-4">
            5. Notary Journal Records
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            As required by California law, I maintain a journal of all notarial acts.
            This journal includes information about documents notarized and the identity
            of signers. These records are maintained as required by state law.
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8 mb-4">
            6. Contact Us
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            If you have questions about this privacy policy, please contact us:
          </p>
          <ul className="list-none text-muted-foreground space-y-2 mb-6">
            <li>Phone: {BUSINESS.phone}</li>
            <li>Email: {BUSINESS.email}</li>
          </ul>

          <h2 className="text-xl font-semibold text-navy mt-8 mb-4">
            7. Changes to This Policy
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            I may update this privacy policy from time to time. Changes will be
            posted on this page with an updated revision date.
          </p>
        </article>
      </div>
    </div>
  );
}
