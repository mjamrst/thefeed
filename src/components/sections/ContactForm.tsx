"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || null,
      due_date: (formData.get("due_date") as string) || null,
      message: (formData.get("message") as string) || null,
    };

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("contact_submissions")
        .insert([data]);

      if (error) throw error;

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please email us at hello@thefeedwellness.com instead."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="bg-terracotta/10 border border-terracotta/30 rounded-2xl p-8 text-center">
        <svg
          className="h-12 w-12 text-terracotta mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="font-serif text-xl text-charcoal mb-2">
          Message sent!
        </h3>
        <p className="text-warm-gray">
          Thank you for reaching out. We&rsquo;ll get back to you within 24
          hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-charcoal mb-1.5"
        >
          Name <span className="text-terracotta">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full rounded-xl border border-sand bg-brand-white px-4 py-3 text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-charcoal mb-1.5"
        >
          Email <span className="text-terracotta">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full rounded-xl border border-sand bg-brand-white px-4 py-3 text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
          placeholder="you@email.com"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-charcoal mb-1.5"
        >
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full rounded-xl border border-sand bg-brand-white px-4 py-3 text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
          placeholder="(310) 555-0123"
        />
      </div>

      <div>
        <label
          htmlFor="due_date"
          className="block text-sm font-medium text-charcoal mb-1.5"
        >
          Due date or baby&rsquo;s birthday
        </label>
        <input
          type="date"
          id="due_date"
          name="due_date"
          className="w-full rounded-xl border border-sand bg-brand-white px-4 py-3 text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-charcoal mb-1.5"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-xl border border-sand bg-brand-white px-4 py-3 text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors resize-none"
          placeholder="Tell us a little about what you're looking for..."
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-terracotta px-6 py-3.5 text-base font-medium text-white transition-colors hover:bg-terracotta/90 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
