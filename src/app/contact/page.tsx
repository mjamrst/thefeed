import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact & Book",
  description:
    "Book a free intro call with Nellie Johnson at The Feed. Serving Manhattan Beach, Hermosa Beach, Redondo Beach, Palos Verdes, Torrance, El Segundo, and Long Beach.",
  openGraph: {
    title: "Contact & Book | The Feed",
    description:
      "Ready to get started? Book your free intro call or send us a message.",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
            Let&rsquo;s talk
          </h1>
          <p className="text-warm-gray text-lg md:text-xl leading-relaxed">
            Book a free intro call to discuss your needs, or send a message and
            we&rsquo;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Scheduling + Contact Form */}
      <section className="pb-20 md:pb-28 px-6">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Scheduling Embed */}
          <div>
            <h2 className="font-serif text-2xl text-charcoal mb-6">
              Book a Free Intro Call
            </h2>
            {/* TODO: Replace with Cal.com or Calendly embed */}
            <div className="bg-brand-white border border-sand rounded-2xl p-8 min-h-[400px] flex items-center justify-center">
              <div className="text-center text-warm-gray">
                <svg
                  className="h-12 w-12 mx-auto mb-4 text-sand"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                <p className="font-medium mb-2">Scheduling Coming Soon</p>
                <p className="text-sm">
                  Calendar booking will be available here. In the meantime,
                  please use the contact form to get in touch.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-serif text-2xl text-charcoal mb-6">
              Send a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 md:py-24 px-6 bg-sand/30">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-2xl text-charcoal mb-4">
              Service Area
            </h2>
            <p className="text-warm-gray text-lg leading-relaxed mb-6">
              The Feed provides in-home perinatal care throughout the
              LA South Bay. We serve families in:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Manhattan Beach",
                "Hermosa Beach",
                "Redondo Beach",
                "Palos Verdes",
                "Torrance",
                "El Segundo",
                "Long Beach",
              ].map((area) => (
                <span
                  key={area}
                  className="bg-brand-white px-4 py-2 rounded-full text-sm text-charcoal border border-sand"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
