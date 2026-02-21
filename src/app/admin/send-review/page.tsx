"use client";

import { useState } from "react";
import { Send, CheckCircle, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function SendReviewPage() {
  // Pre-fill with today's date for faster entry
  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    appointmentDate: new Date().toISOString().split("T")[0], // Today by default
    serviceType: "Mobile Notary", // Most common service
  });

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
      const response = await fetch("/api/send-review-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminSecret,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
        // Reset form
        setFormData({
          clientName: "",
          clientPhone: "",
          appointmentDate: new Date().toISOString().split("T")[0],
          serviceType: "",
        });
      } else {
        setError(data.error || "Failed to schedule review request");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-cream to-white">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-navy mb-3">
            Send Review Request
          </h1>
          <p className="text-muted-foreground">
            Mark appointment as complete and automatically send review request to client
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>
                Enter client information to send automated review request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Client Name */}
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="clientPhone">
                    <MessageSquare className="inline h-4 w-4 mr-1" />
                    Phone (SMS) *
                  </Label>
                  <Input
                    id="clientPhone"
                    type="tel"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                    placeholder="(510) 555-1234"
                    required
                  />
                </div>

                {/* Appointment Date */}
                <div className="space-y-2">
                  <Label htmlFor="appointmentDate">Appointment Date *</Label>
                  <Input
                    id="appointmentDate"
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                    required
                  />
                </div>

                {/* Service Type */}
                <div className="space-y-2">
                  <Label htmlFor="serviceType">Service Type (Optional)</Label>
                  <Input
                    id="serviceType"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    placeholder="e.g., Real Estate Documents, Power of Attorney"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="w-full bg-navy hover:bg-navy-light"
                >
                  {loading ? (
                    <>
                      <Clock className="h-5 w-5 mr-2 animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Schedule Review Request
                    </>
                  )}
                </Button>
              </form>

              {/* Error Display */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {/* Success Display */}
              {result && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-green-900 mb-2">
                        Review Request Scheduled!
                      </p>
                      {result.data.sms && (
                        <p className="text-sm text-green-800 mb-1">
                          ✓ SMS will be sent to: {result.data.sms.to}
                        </p>
                      )}
                      <p className="text-xs text-green-700 mt-2">
                        Scheduled for: {new Date(result.data.scheduledFor).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Sidebar */}
          <div className="space-y-4">
            {/* How It Works */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">1</Badge>
                  <p className="text-muted-foreground">
                    Enter client info after completing appointment
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">2</Badge>
                  <p className="text-muted-foreground">
                    System schedules SMS for 24 hours later
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">3</Badge>
                  <p className="text-muted-foreground">
                    Client receives review request automatically
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">4</Badge>
                  <p className="text-muted-foreground">
                    Client clicks link to leave Google review
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card className="bg-gold/5 border-gold/20">
              <CardHeader>
                <CardTitle className="text-lg">💡 Best Practices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Submit form immediately after appointment</p>
                <p>• Send SMS right after the appointment</p>
                <p>• Include service type for personalized message</p>
                <p>• Only request from satisfied clients</p>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-navy text-white">
              <CardHeader>
                <CardTitle className="text-lg">🎯 Goal</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-cream/90">
                  2-3 review requests per week = 100+ reviews in 6 months
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </section>
  );
}
