import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact & Book",
  description:
    "Reach out to Nellie Johnson at The Feed by email or Instagram DM. Serving Manhattan Beach, Hermosa Beach, Redondo Beach, Palos Verdes, Torrance, El Segundo, and Long Beach.",
  openGraph: {
    title: "Contact & Book | The Feed",
    description:
      "Ready to get started? Email Nellie directly or send us a DM on Instagram.",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
            Let&rsquo;s talk
          </h1>
          <p className="text-warm-gray text-lg md:text-xl leading-relaxed">
            The easiest way to reach us right now is directly. Send an email or
            a DM and Nellie will get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact options */}
      <section className="pb-20 md:pb-28 px-6">
        <div className="mx-auto max-w-3xl grid sm:grid-cols-2 gap-6">
          {/* Email */}
          <a
            href="mailto:nellie@thefeedwellness.com"
            className="group bg-brand-white border border-sand rounded-2xl p-8 flex flex-col items-center text-center transition-all hover:border-brand-terracotta hover:shadow-lg"
          >
            <div className="h-14 w-14 rounded-full bg-brand-terracotta/10 flex items-center justify-center mb-5 transition-colors group-hover:bg-brand-terracotta/20">
              <svg
                className="h-7 w-7 text-brand-terracotta"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <h2 className="font-serif text-xl text-charcoal mb-2">
              Email Nellie
            </h2>
            <p className="text-warm-gray text-sm mb-4">
              Share a bit about what you&rsquo;re looking for and your due date
              or baby&rsquo;s age.
            </p>
            <span className="text-brand-terracotta font-medium group-hover:underline break-all">
              nellie@thefeedwellness.com
            </span>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/thefeedwellness"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-brand-white border border-sand rounded-2xl p-8 flex flex-col items-center text-center transition-all hover:border-brand-terracotta hover:shadow-lg"
          >
            <div className="h-14 w-14 rounded-full bg-brand-terracotta/10 flex items-center justify-center mb-5 transition-colors group-hover:bg-brand-terracotta/20">
              <svg
                className="h-7 w-7 text-brand-terracotta"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="font-serif text-xl text-charcoal mb-2">
              DM us on Instagram
            </h2>
            <p className="text-warm-gray text-sm mb-4">
              Say hi and tell us what you need — we check messages throughout
              the day.
            </p>
            <span className="text-brand-terracotta font-medium group-hover:underline">
              @thefeedwellness
            </span>
          </a>
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
