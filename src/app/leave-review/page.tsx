import type { Metadata } from "next";
import { Star, ExternalLink, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Leave a Review",
  description: `Thank you for choosing ${BUSINESS.name}! Please share your experience with others.`,
  robots: {
    index: false, // Don't index review request pages
    follow: false,
  },
};

export default function LeaveReviewPage() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-cream to-white">
      <div className="container mx-auto max-w-3xl px-4">
        {/* Thank You Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 mb-6">
            <Heart className="h-10 w-10 text-gold fill-gold" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-navy mb-4">
            Thank You!
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trust in our notary services means everything. Would you take a moment to share your experience?
          </p>
        </div>

        {/* Main Review Card */}
        <Card className="border-gold ring-2 ring-gold/20 shadow-warm mb-8">
          <CardContent className="p-8 md:p-12">
            {/* Star Rating Visual */}
            <div className="flex justify-center mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-8 w-8 text-gold fill-gold mx-1"
                />
              ))}
            </div>

            <h2 className="text-2xl font-bold text-center text-navy mb-4">
              Leave a Google Review
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Your review helps other Bay Area residents find trusted notary services.
              It only takes 60 seconds!
            </p>

            {/* Primary CTA */}
            <Button
              asChild
              size="lg"
              className="w-full bg-gold hover:bg-gold/90 text-navy font-semibold text-lg h-14"
            >
              <a
                href={BUSINESS.social.googleReview}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Star className="h-5 w-5 mr-2 fill-current" />
                Write a Google Review
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>

            {/* Why Reviews Matter */}
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="font-semibold text-navy mb-3 text-center">
                Why Your Review Matters
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-gold font-bold">•</span>
                  <span>Helps families find reliable notary services in emergencies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold font-bold">•</span>
                  <span>Supports a small, local Bay Area business</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold font-bold">•</span>
                  <span>Guides others making important legal decisions</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Alternative Review Platforms */}
        <div className="space-y-4">
          <p className="text-center text-sm text-muted-foreground mb-4">
            Prefer a different platform?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Yelp */}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2"
            >
              <a
                href={BUSINESS.social.yelp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Review on Yelp
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>

            {/* Signing Agent */}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2"
            >
              <a
                href={BUSINESS.social.signingAgent}
                target="_blank"
                rel="noopener noreferrer"
              >
                Review on Signing Agent
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>

        {/* Feedback Section */}
        <Card className="mt-12 bg-muted/50 border-0">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-navy mb-2">
              Have Private Feedback?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              I always want to improve. Feel free to reach out directly:
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                variant="outline"
                size="sm"
              >
                <a href={BUSINESS.phoneLink}>Call {BUSINESS.phone}</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
              >
                <a href={`mailto:${BUSINESS.email}`}>Email Me</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Social Proof Note */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          Join {BUSINESS.notarizationsCompleted} satisfied clients who have trusted Mobile Notary Management
        </p>
      </div>
    </section>
  );
}
