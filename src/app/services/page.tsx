import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Services & Packages",
  description:
    "Explore The Feed's tiered perinatal care packages — from targeted lactation support to comprehensive prenatal-through-postpartum care. Serving the LA South Bay.",
  openGraph: {
    title: "Services & Packages | The Feed",
    description:
      "Three tiers of perinatal support. Essentials ($525), Full Support ($1,350), Complete Journey ($2,500). Plus ongoing membership.",
  },
};

const tiers = [
  {
    name: "Essentials",
    tier: "Tier 1",
    price: "$525",
    bestFor: "Experienced moms with a specific issue to troubleshoot",
    includes: [
      "2 in-home visits (initial + follow-up)",
      "2 weeks of async messaging support",
      "Personalized care plan",
    ],
    highlighted: false,
  },
  {
    name: "Full Support",
    tier: "Tier 2",
    price: "$1,350",
    bestFor: "First-time moms wanting comprehensive support through the critical early weeks",
    includes: [
      "Prenatal preparation session",
      "2 postpartum in-home visits",
      "Newborn care coaching",
      "6 weeks of async messaging support",
      "Personalized care plan & resources",
    ],
    highlighted: true,
  },
  {
    name: "Complete Journey",
    tier: "Tier 3",
    price: "$2,500",
    bestFor:
      "Families wanting the full white-glove experience from pregnancy through the fourth trimester",
    includes: [
      "Everything in Full Support",
      "Extended prenatal through 3 months postpartum",
      "4 total in-home visits",
      "Ongoing membership included",
      "Priority scheduling & extended messaging",
    ],
    highlighted: false,
  },
];

const faqs = [
  {
    q: "What\u2019s the difference between lactation support and doula care?",
    a: "A lactation specialist focuses specifically on breastfeeding and infant feeding challenges, while a doula provides broader emotional and physical support during pregnancy, birth, and the postpartum period. Nellie brings expertise across all of these areas \u2014 she\u2019s a registered nurse, certified postpartum doula, and childbirth educator, so you get comprehensive support rather than having to piece together multiple providers.",
  },
  {
    q: "Do you accept insurance?",
    a: "The Feed does not currently bill insurance directly. However, many families are able to get reimbursed through their insurance provider. We provide detailed superbills (receipts with procedure codes) that you can submit to your insurance company for potential reimbursement. Check with your provider about out-of-network lactation and postpartum doula benefits.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve families throughout the LA South Bay, including Manhattan Beach, Hermosa Beach, Redondo Beach, Palos Verdes, Torrance, El Segundo, and Long Beach. All visits take place in your home.",
  },
  {
    q: "What should I expect during a home visit?",
    a: "Home visits typically last 60\u201390 minutes and take place in the comfort of your own space. Nellie will observe a feeding, assess how things are going for both you and baby, answer your questions, and create a personalized plan. The goal is always to leave you feeling more confident and supported, not more overwhelmed.",
  },
  {
    q: "When should I book \u2014 before or after baby arrives?",
    a: "Both! If you\u2019re still pregnant, our Tier 2 and Tier 3 packages include prenatal sessions to help you prepare. If baby is already here and you need support now, Tier 1 Essentials gets you an initial visit quickly. There\u2019s no wrong time to reach out.",
  },
  {
    q: "What is the membership?",
    a: "After your package concludes, you can continue receiving ongoing async messaging access to Nellie for $125/month. It\u2019s like having a knowledgeable friend on speed dial \u2014 for those moments when you just need a quick answer or reassurance.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
            Packages & Pricing
          </h1>
          <p className="text-warm-gray text-lg md:text-xl leading-relaxed">
            No per-visit billing. No surprise fees. Just clear, relationship-based
            care packages designed to support you through every stage.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="pb-20 md:pb-28 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 flex flex-col relative ${
                  tier.highlighted
                    ? "bg-charcoal text-brand-white ring-2 ring-terracotta"
                    : "bg-brand-white border border-sand"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-terracotta text-white text-xs font-medium px-4 py-1 rounded-full">
                    Recommended
                  </span>
                )}
                <span
                  className={`text-sm uppercase tracking-wider mb-2 ${
                    tier.highlighted ? "text-sand" : "text-warm-gray"
                  }`}
                >
                  {tier.tier}
                </span>
                <h2 className="font-serif text-2xl mb-1">{tier.name}</h2>
                <p className="text-4xl font-serif text-terracotta mb-2">
                  {tier.price}
                </p>
                <p
                  className={`text-sm mb-6 ${
                    tier.highlighted ? "text-sand" : "text-warm-gray"
                  }`}
                >
                  Best for: {tier.bestFor}
                </p>

                <div className="border-t border-current/10 pt-6 mb-8 flex-1">
                  <p
                    className={`text-xs uppercase tracking-wider mb-4 ${
                      tier.highlighted ? "text-sand" : "text-warm-gray"
                    }`}
                  >
                    What&rsquo;s included
                  </p>
                  <ul className="space-y-3">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <svg
                          className="h-5 w-5 text-terracotta shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className={`rounded-full px-6 py-3 text-center text-sm font-medium transition-colors ${
                    tier.highlighted
                      ? "bg-terracotta text-white hover:bg-terracotta/90"
                      : "bg-terracotta/10 text-terracotta hover:bg-terracotta/20"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section className="py-16 md:py-24 px-6 bg-brand-white">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm uppercase tracking-wider text-terracotta mb-2 block">
              Add-On
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              Ongoing Membership
            </h2>
            <p className="text-4xl font-serif text-terracotta mb-4">
              $125<span className="text-lg text-warm-gray">/month</span>
            </p>
            <p className="text-warm-gray text-lg leading-relaxed max-w-xl mx-auto mb-8">
              Available to any package client after their visits conclude. Keep
              async messaging access to Nellie for as long as you need it —
              like having a knowledgeable friend on call for those 2 AM
              questions.
            </p>
            <Link
              href="/contact"
              className="rounded-full bg-terracotta px-8 py-4 text-base font-medium text-white transition-all hover:bg-terracotta/90 hover:shadow-lg inline-block"
            >
              Book Your Free Intro Call
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-12 text-center">
              Common Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group bg-brand-white rounded-xl border border-sand"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-charcoal font-medium list-none">
                    {faq.q}
                    <svg
                      className="h-5 w-5 text-warm-gray shrink-0 ml-4 transition-transform group-open:rotate-45"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-warm-gray leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
