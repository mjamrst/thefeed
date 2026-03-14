import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LogoFull } from "@/components/ui/Logo";

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "The Feed",
            description:
              "Expert lactation support, postpartum doula care, childbirth education, and newborn care for South Bay LA families.",
            url: "https://thefeedwellness.com",
            email: "hello@thefeedwellness.com",
            areaServed: [
              "Manhattan Beach, CA",
              "Hermosa Beach, CA",
              "Redondo Beach, CA",
              "Palos Verdes, CA",
              "Torrance, CA",
              "El Segundo, CA",
              "Long Beach, CA",
            ],
            founder: {
              "@type": "Person",
              name: "Nellie Johnson",
              jobTitle: "BSN, RN, CPD, LCCE",
            },
            priceRange: "$$",
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-sand/30 via-cream to-cream" />
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <LogoFull showTagline className="mb-12" />
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-charcoal leading-[1.1] mb-6">
            Your village starts here.
          </h1>
          <p className="text-lg md:text-xl text-warm-gray max-w-xl mb-10 leading-relaxed">
            Expert perinatal care rooted in real connection. Lactation support,
            newborn care, and postpartum guidance — delivered to your home in the
            South Bay.
          </p>
          <Link
            href="/contact"
            className="rounded-full bg-terracotta px-8 py-4 text-base font-medium text-white transition-all hover:bg-terracotta-dark hover:shadow-lg"
          >
            Book Your Free Intro Call
          </Link>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 md:py-28 px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="shrink-0">
              <div className="relative h-48 w-48 md:h-56 md:w-56 rounded-full overflow-hidden ring-4 ring-sand">
                <Image
                  src="/images/headshots/nellie-secondary.jpg"
                  alt="Nellie Johnson, BSN, RN, CPD — Founder of The Feed"
                  fill
                  className="object-cover"
                  sizes="224px"
                />
              </div>
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
                Meet Nellie
              </h2>
              <p className="text-warm-gray text-lg leading-relaxed mb-6">
                Nellie Johnson brings 20+ years of nursing experience — from
                hospital bedsides to living rooms — to help South Bay families
                thrive. As a registered nurse, certified postpartum doula, and
                mom herself, she gets it. The midnight worries, the
                breastfeeding questions, the &ldquo;is this normal?&rdquo;
                moments. She&rsquo;s been there — professionally and personally.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-terracotta font-medium hover:text-terracotta-dark transition-colors group"
              >
                Learn more about Nellie
                <svg
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Services Overview */}
      <section className="py-20 md:py-28 px-6 bg-brand-white">
        <ScrollReveal>
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
                Care that grows with you
              </h2>
              <p className="text-warm-gray text-lg max-w-2xl mx-auto">
                Three tiers of support designed around how you actually need
                help — not how many appointments you can book.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {/* Tier 1 */}
              <div className="bg-cream rounded-2xl p-8 flex flex-col">
                <span className="text-sm uppercase tracking-wider text-warm-gray mb-2">
                  Tier 1
                </span>
                <h3 className="font-serif text-2xl text-charcoal mb-1">
                  Essentials
                </h3>
                <p className="text-3xl font-serif text-terracotta mb-4">$525</p>
                <p className="text-warm-gray text-sm leading-relaxed mb-6 flex-1">
                  2 in-home visits with async messaging support. Best for
                  experienced moms with a specific concern to address.
                </p>
                <Link
                  href="/services"
                  className="text-sm text-terracotta font-medium hover:text-terracotta-dark transition-colors"
                >
                  Learn more →
                </Link>
              </div>

              {/* Tier 2 — Highlighted */}
              <div className="bg-charcoal text-brand-white rounded-2xl p-8 flex flex-col ring-2 ring-terracotta relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-terracotta text-white text-xs font-medium px-4 py-1 rounded-full">
                  Most Popular
                </span>
                <span className="text-sm uppercase tracking-wider text-sand mb-2">
                  Tier 2
                </span>
                <h3 className="font-serif text-2xl mb-1">Full Support</h3>
                <p className="text-3xl font-serif text-terracotta mb-4">
                  $1,350
                </p>
                <p className="text-sand text-sm leading-relaxed mb-6 flex-1">
                  Prenatal prep, 2 postpartum visits, newborn coaching, and 6
                  weeks of messaging. The complete early-weeks package.
                </p>
                <Link
                  href="/services"
                  className="text-sm text-terracotta font-medium hover:text-terracotta-light transition-colors"
                >
                  Learn more →
                </Link>
              </div>

              {/* Tier 3 */}
              <div className="bg-cream rounded-2xl p-8 flex flex-col">
                <span className="text-sm uppercase tracking-wider text-warm-gray mb-2">
                  Tier 3
                </span>
                <h3 className="font-serif text-2xl text-charcoal mb-1">
                  Complete Journey
                </h3>
                <p className="text-3xl font-serif text-terracotta mb-4">
                  $2,500
                </p>
                <p className="text-warm-gray text-sm leading-relaxed mb-6 flex-1">
                  Prenatal through 3 months postpartum. 4 visits, ongoing
                  membership, and white-glove support through the fourth
                  trimester.
                </p>
                <Link
                  href="/services"
                  className="text-sm text-terracotta font-medium hover:text-terracotta-dark transition-colors"
                >
                  Learn more →
                </Link>
              </div>
            </div>

            <div className="text-center mt-10">
              <Link
                href="/services"
                className="inline-flex items-center text-terracotta font-medium hover:text-terracotta-dark transition-colors group"
              >
                View all packages & pricing
                <svg
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Mission / Values */}
      <section className="py-20 md:py-28 px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">
              Relationships, not transactions
            </h2>
            <p className="text-warm-gray text-lg leading-relaxed mb-8">
              Most lactation support works like urgent care — you have a
              problem, you book a visit, you move on. We do it differently.
              The Feed builds ongoing relationships so you have
              expert guidance before, during, and long after the first latch.
            </p>
            <div className="grid sm:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="h-12 w-12 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-terracotta" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg text-charcoal mb-2">
                  Evidence-Based
                </h3>
                <p className="text-warm-gray text-sm">
                  Every recommendation grounded in current research and 20+ years
                  of clinical experience.
                </p>
              </div>
              <div>
                <div className="h-12 w-12 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-terracotta" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg text-charcoal mb-2">
                  Community-Rooted
                </h3>
                <p className="text-warm-gray text-sm">
                  Born in the South Bay, for the South Bay. Your neighbor who
                  happens to be a 20-year nurse.
                </p>
              </div>
              <div>
                <div className="h-12 w-12 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-terracotta" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg text-charcoal mb-2">
                  Equity-Minded
                </h3>
                <p className="text-warm-gray text-sm">
                  Dedicated to reducing gaps in maternal care. Every family
                  deserves expert support.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Testimonials Placeholder */}
      <section className="py-20 md:py-28 px-6 bg-sand/30">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-12">
              What families are saying
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* TODO: Replace with real testimonials */}
              <blockquote className="bg-brand-white rounded-2xl p-8 text-left">
                <p className="text-warm-gray italic leading-relaxed mb-4">
                  &ldquo;When postpartum felt like life was spinning in a million
                  directions, Nurse Nellie was there &mdash; answering every
                  question, calming every fear. She helped me become the mom I
                  wanted to be.&rdquo;
                </p>
                <cite className="text-charcoal text-sm font-medium not-italic">
                  — Clara
                </cite>
              </blockquote>
              <blockquote className="bg-brand-white rounded-2xl p-8 text-left">
                <p className="text-warm-gray italic leading-relaxed mb-4">
                  &ldquo;When we had our first baby, we were completely lost.
                  Nellie showed up and walked us through everything &mdash;
                  diapers, baths, feeding, all of it. Every time something
                  scared us, she was right there. She made us feel like we
                  weren&rsquo;t just surviving parenthood, we were ready
                  for it.&rdquo;
                </p>
                <cite className="text-charcoal text-sm font-medium not-italic">
                  — Maddie
                </cite>
              </blockquote>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              Ready to get started?
            </h2>
            <p className="text-warm-gray text-lg mb-8">
              Feeding your baby shouldn&rsquo;t feel like a puzzle you&rsquo;re
              solving alone. Let&rsquo;s talk about how we can support you.
            </p>
            <Link
              href="/contact"
              className="rounded-full bg-terracotta px-8 py-4 text-base font-medium text-white transition-all hover:bg-terracotta-dark hover:shadow-lg inline-block"
            >
              Book Your Free Intro Call
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
