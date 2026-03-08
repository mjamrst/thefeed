"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { LogoFull } from "@/components/ui/Logo";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/portal";

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      router.push(redirectTo);
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback?redirectTo=${redirectTo}`,
        },
      });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setSignupSuccess(true);
      setLoading(false);
    }
  }

  if (signupSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="max-w-md w-full text-center">
          <LogoFull showTagline className="mb-8" />
          <div className="bg-terracotta/10 border border-terracotta/30 rounded-2xl p-8">
            <h1 className="font-serif text-2xl text-charcoal mb-3">
              Check your email
            </h1>
            <p className="text-warm-gray">
              We&rsquo;ve sent a confirmation link to <strong>{email}</strong>.
              Click the link to activate your account and access the client
              portal.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24">
      <div className="max-w-md w-full">
        <LogoFull showTagline className="mb-10" />

        <div className="bg-brand-white border border-sand rounded-2xl p-8">
          <h1 className="font-serif text-2xl text-charcoal mb-2 text-center">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-warm-gray text-sm text-center mb-8">
            {mode === "login"
              ? "Sign in to access your client portal."
              : "Create an account to manage your appointments."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-charcoal mb-1.5"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-sand bg-cream px-4 py-3 text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
                  placeholder="Your full name"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-charcoal mb-1.5"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-sand bg-cream px-4 py-3 text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
                placeholder="you@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-charcoal mb-1.5"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-xl border border-sand bg-cream px-4 py-3 text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
                placeholder="At least 6 characters"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-terracotta px-6 py-3.5 text-base font-medium text-white transition-colors hover:bg-terracotta/90 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError("");
              }}
              className="text-sm text-terracotta hover:text-terracotta/80 transition-colors"
            >
              {mode === "login"
                ? "Don\u2019t have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-warm-gray mt-6">
          <Link href="/" className="hover:text-charcoal transition-colors">
            &larr; Back to The Feed
          </Link>
        </p>
      </div>
    </div>
  );
}
