"use client";

import { useState } from "react";
import { Send, CheckCircle, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SendReviewSMS() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const adminSecret = sessionStorage.getItem("admin_secret") || "";
      const response = await fetch("/api/send-review-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminSecret,
        },
        body: JSON.stringify({
          phoneNumber,
          clientName: clientName || undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
        // Reset form
        setPhoneNumber("");
        setClientName("");
      } else {
        setError(data.error || "Failed to send SMS");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Format phone number as user types (US format)
  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return !match[2] ? match[1] : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ''}`;
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(formatPhone(e.target.value));
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-cream to-white min-h-screen">
      <div className="container mx-auto max-w-2xl px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-4">
            <MessageSquare className="h-8 w-8 text-gold" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-navy mb-3">
            Send Review SMS
          </h1>
          <p className="text-muted-foreground text-lg">
            Instant text with review link - right after appointment
          </p>
        </div>

        {/* Main Card */}
        <Card className="border-gold/20 shadow-warm">
          <CardHeader>
            <CardTitle className="text-2xl">Quick Send</CardTitle>
            <CardDescription className="text-base">
              Client gets instant text with review link. Takes 10 seconds!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Phone Number (Required) */}
              <div className="space-y-3">
                <Label htmlFor="phoneNumber" className="text-base font-semibold">
                  Client's Phone Number *
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="(510) 555-1234"
                  required
                  className="text-lg h-14"
                  autoFocus
                />
                <p className="text-xs text-muted-foreground">
                  US numbers only. Will be formatted automatically.
                </p>
              </div>

              {/* Client Name (Optional) */}
              <div className="space-y-3">
                <Label htmlFor="clientName" className="text-base">
                  Client's First Name (Optional)
                </Label>
                <Input
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="John"
                  className="text-lg h-12"
                />
                <p className="text-xs text-muted-foreground">
                  Makes message more personal: "Hi John!"
                </p>
              </div>

              {/* Send Button */}
              <Button
                type="submit"
                disabled={loading || !phoneNumber}
                size="lg"
                className="w-full bg-navy hover:bg-navy-light text-lg h-16 font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-6 w-6 mr-2 animate-spin" />
                    Sending SMS...
                  </>
                ) : (
                  <>
                    <Send className="h-6 w-6 mr-2" />
                    Send Review Link Now
                  </>
                )}
              </Button>
            </form>

            {/* Error Display */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
                <Button
                  onClick={() => setError(null)}
                  variant="outline"
                  size="sm"
                  className="mt-3"
                >
                  Try Again
                </Button>
              </div>
            )}

            {/* Success Display */}
            {result && (
              <div className="mt-6 p-6 bg-green-50 border-2 border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-green-900 text-lg mb-2">
                      SMS Sent! 🎉
                    </p>
                    <p className="text-sm text-green-800">
                      Client will receive text message with review link in a few seconds.
                    </p>
                    {result.demo && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-xs text-yellow-800 font-medium">
                          ⚠️ Demo Mode: Configure Twilio to actually send SMS
                        </p>
                      </div>
                    )}
                    {result.data?.message && (
                      <div className="mt-4 p-3 bg-white/50 rounded border border-green-200">
                        <p className="text-xs font-semibold text-green-900 mb-1">
                          Preview of message sent:
                        </p>
                        <p className="text-xs text-green-800 whitespace-pre-wrap">
                          {result.data.message}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid gap-4 mt-6 sm:grid-cols-2">
          {/* When to Use */}
          <Card className="bg-gold/5 border-gold/20">
            <CardHeader>
              <CardTitle className="text-lg">⏰ When to Send</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2 text-muted-foreground">
              <p>✓ Right after appointment (while client is there)</p>
              <p>✓ Before client leaves your location</p>
              <p>✓ While experience is fresh in their mind</p>
              <p>✗ Not during appointment</p>
            </CardContent>
          </Card>

          {/* What Happens */}
          <Card className="bg-navy/5 border-navy/20">
            <CardHeader>
              <CardTitle className="text-lg">📱 What They Get</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2 text-muted-foreground">
              <p>✓ Instant text message</p>
              <p>✓ Direct link to review page</p>
              <p>✓ One tap → Leave review</p>
              <p>✓ Super easy, no hassle</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-navy">98%</p>
                <p className="text-xs text-muted-foreground">SMS Open Rate</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-navy">10s</p>
                <p className="text-xs text-muted-foreground">Time to Send</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-navy">40%</p>
                <p className="text-xs text-muted-foreground">Conversion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pro Tip */}
        <div className="mt-6 p-4 bg-cream rounded-lg border border-gold/20">
          <p className="text-sm text-navy">
            <strong className="text-gold">💡 Pro Tip:</strong> Bookmark this page on your phone's home screen.
            After each appointment, pull it up and send SMS while packing up. Takes 10 seconds!
          </p>
        </div>
      </div>
    </section>
  );
}
