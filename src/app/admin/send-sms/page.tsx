"use client";

import { useState } from "react";
import { Send, CheckCircle, XCircle, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BulkResult {
  to: string;
  success: boolean;
  messageSid?: string;
  error?: string;
  demo?: boolean;
}

interface BulkResponse {
  success: boolean;
  results: BulkResult[];
  summary: { total: number; sent: number; failed: number };
  demo?: boolean;
}

function parseContacts(text: string): { phoneNumber: string; clientName?: string }[] {
  return text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => {
      const commaIndex = line.indexOf(",");
      if (commaIndex !== -1) {
        return {
          phoneNumber: line.slice(0, commaIndex).trim(),
          clientName: line.slice(commaIndex + 1).trim() || undefined,
        };
      }
      return { phoneNumber: line };
    });
}

export default function SendReviewSMS() {
  const [bulkText, setBulkText] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<BulkResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parsedContacts = parseContacts(bulkText);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedContacts.length === 0) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const adminSecret = sessionStorage.getItem("admin_secret") || "";
      const response = await fetch("/api/send-review-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminSecret,
        },
        body: JSON.stringify({ contacts: parsedContacts }),
      });

      const data: BulkResponse = await response.json();

      if (response.ok) {
        setResults(data);
        if (data.summary.failed === 0) {
          setBulkText("");
        }
      } else {
        setError((data as any).error || "Failed to send messages");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            <CardTitle className="text-2xl">Send Review Link</CardTitle>
            <CardDescription className="text-base">
              Enter one or more phone numbers — one per line. Add a name after a comma for personalization.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="phoneNumbers" className="text-base font-semibold">
                  Phone Number(s) *
                </Label>
                <Textarea
                  id="phoneNumbers"
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                  placeholder={"(510) 555-1234, John\n(925) 123-4567, Sarah\n(415) 987-6543"}
                  rows={4}
                  className="text-base font-mono"
                  autoFocus
                />
                <p className="text-xs text-muted-foreground">
                  Format: phone number, optional name. US numbers only. One per line.
                </p>
              </div>

              {/* Parsed preview */}
              {parsedContacts.length > 0 && (
                <div className="p-3 bg-navy/5 rounded-lg border border-navy/10">
                  <p className="text-xs font-semibold text-navy mb-2">
                    {parsedContacts.length} contact{parsedContacts.length !== 1 ? "s" : ""} detected:
                  </p>
                  <div className="space-y-1">
                    {parsedContacts.slice(0, 5).map((c, i) => (
                      <p key={i} className="text-xs text-muted-foreground font-mono">
                        {c.phoneNumber}{c.clientName ? ` → ${c.clientName}` : ""}
                      </p>
                    ))}
                    {parsedContacts.length > 5 && (
                      <p className="text-xs text-muted-foreground">
                        ...and {parsedContacts.length - 5} more
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Send Button */}
              <Button
                type="submit"
                disabled={loading || parsedContacts.length === 0}
                size="lg"
                className="w-full bg-navy hover:bg-navy-light text-lg h-16 font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-6 w-6 mr-2 animate-spin" />
                    Sending {parsedContacts.length} Message{parsedContacts.length !== 1 ? "s" : ""}...
                  </>
                ) : (
                  <>
                    <Send className="h-6 w-6 mr-2" />
                    Send {parsedContacts.length || ""} Message{parsedContacts.length !== 1 ? "s" : ""}
                  </>
                )}
              </Button>
            </form>

            {/* Error */}
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

            {/* Results */}
            {results && (
              <div className="mt-6 space-y-4">
                {/* Summary */}
                <div className={`p-4 rounded-lg border-2 ${
                  results.summary.failed === 0
                    ? "bg-green-50 border-green-200"
                    : "bg-yellow-50 border-yellow-200"
                }`}>
                  <p className={`font-semibold text-lg ${
                    results.summary.failed === 0 ? "text-green-900" : "text-yellow-900"
                  }`}>
                    {results.summary.failed === 0
                      ? results.summary.sent === 1
                        ? "SMS Sent! 🎉"
                        : `All ${results.summary.sent} messages sent! 🎉`
                      : `${results.summary.sent}/${results.summary.total} sent successfully`}
                  </p>
                  {results.demo && (
                    <p className="text-xs text-yellow-800 font-medium mt-2">
                      ⚠️ Demo Mode: Configure Twilio to actually send SMS
                    </p>
                  )}
                </div>

                {/* Per-number results */}
                <div className="space-y-2">
                  {results.results.map((r, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-3 rounded-lg text-sm ${
                        r.success
                          ? "bg-green-50 border border-green-100"
                          : "bg-red-50 border border-red-100"
                      }`}
                    >
                      {r.success ? (
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      )}
                      <span className="font-mono text-sm">{r.to || "—"}</span>
                      {r.error && (
                        <span className="text-red-600 text-xs ml-auto">{r.error}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid gap-4 mt-6 sm:grid-cols-2">
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
            <strong className="text-gold">💡 Pro Tip:</strong>{" "}
            Copy-paste numbers from your Snapdocs appointments at end of day. Works with one number or many!
          </p>
        </div>
      </div>
    </section>
  );
}
