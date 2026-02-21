"use client";

import { useState, useEffect, useCallback } from "react";
import { Lock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STORAGE_KEY = "admin_secret";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  // Check sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!inputValue.trim()) {
      setError("Please enter the admin password");
      return;
    }

    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": inputValue.trim(),
        },
      });

      if (res.ok) {
        sessionStorage.setItem(STORAGE_KEY, inputValue.trim());
        setAuthenticated(true);
        setInputValue("");
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Connection error. Please try again.");
    }
  }, [inputValue]);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthenticated(false);
  }, []);

  if (checking) return null;

  if (!authenticated) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-cream to-white flex items-center justify-center px-4">
        <Card className="w-full max-w-sm border-gold/20 shadow-warm">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-navy/10 mx-auto mb-3">
              <Lock className="h-7 w-7 text-navy" />
            </div>
            <CardTitle className="text-2xl text-navy">Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter admin password"
                className="text-lg h-12"
                autoFocus
              />
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              <Button
                type="submit"
                className="w-full bg-navy hover:bg-navy-light h-12 text-base"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <div className="relative">
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur text-navy border-gold/30 hover:bg-gold/10"
        >
          <LogOut className="h-4 w-4 mr-1.5" />
          Logout
        </Button>
      </div>
      {children}
    </div>
  );
}
