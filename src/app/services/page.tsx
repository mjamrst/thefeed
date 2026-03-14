import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore The Feed's à la carte perinatal services — prenatal education, lactation support, newborn care, and postpartum doula visits. Serving the LA South Bay and greater Los Angeles.",
  openGraph: {
    title: "Services | The Feed",
    description:
      "À la carte prenatal, postpartum, lactation, and doula services for LA families.",
  },
};

const categories = [
  {
    name: "Prenatal Services",
    services: [
      { title: "Prenatal Breastfeeding Education", duration: "1 hour", format: "In-home or virtual" },
      { title: "Prenatal Pumping & Bottle Prep Class", duration: "1 hour", format: "Virtual" },
      { title: "Prenatal Postpartum Recovery Planning", duration: "1 hour", format: "Virtual" },
    ],
  },
  {
    name: "Early Postpartum (0–2 weeks)",
    services: [
      { title: "Initial Newborn Feeding Assessment", duration: "1.5 hours", format: "In-home" },
      { title: "Follow-Up Visit", duration: "1 hour", format: "In-home" },
      { title: "Postpartum Recovery & Newborn Care Visit", duration: "2 hours", format: "In-home" },
    ],
  },
  {
    name: "Ongoing Lactation Support",
    services: [
      { title: "Follow-Up Feeding Support Visit", duration: "1 hour", format: "In-home or virtual" },
      { title: "Milk Supply Consultation", duration: "1 hour", format: "Virtual" },
      { title: "Bottle Introduction & Paced Feeding Tutorial", duration: "1 hour", format: "In-home or virtual" },
      { title: "Combo Feeding Support (breast + formula)", duration: "1 hour", format: "Virtual" },
    ],
  },
  {
    name: "Specialty Sessions",
    services: [
      { title: "Tongue-Tie Education & Referral Guidance", duration: "45 min", format: "Virtual" },
      { title: "Postpartum Mood Check-In & Resource Navigation", duration: "1 hour", format: "Virtual" },
    ],
  },
  {
    name: "Postpartum Doula Support",
    services: [
      { title: "Daytime Postpartum Support Visit", duration: "3–4 hours", format: "In-home · Weekends" },
      { title: "Evening Postpartum Support", duration: "4 hours", format: "In-home · 6–10 PM" },
    ],
  },
];

const faqs = [
  {
    q: "What\u2019s the difference between lactation support and doula care?",
    a: "A lactation specialist focuses specifically on breastfeeding and infant feeding challenges, while a doula provides broader emotional and physical support during pregnancy, birth, and the postpartum period. Nellie brings expertise across all of these areas \u2014 she\u2019s a registered nurse, certified lactation counselor, and certified postpartum doula, so you get comprehensive support rather than having to piece together multiple providers.",
  },
  {
    q: "Do you accept insurance?",
    a: "The Feed does not currently bill insurance directly. However, many families are able to get reimbursed through their insurance provider. We provide detailed superbills (receipts with procedure codes) that you can submit to your insurance company for potential reimbursement. Check with your provider about out-of-network lactation and postpartum doula benefits.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve families throughout the LA South Bay and greater Los Angeles, including Manhattan Beach, Hermosa Beach, Redondo Beach, Palos Verdes, Torrance, El Segundo, Long Beach, and beyond. Travel fees may apply outside the South Bay. All visits take place in your home.",
  },
  {
    q: "What should I expect during a home visit?",
    a: "Home visits typically last 60\u201390 minutes and take place in the comfort of your own space. Nellie will observe a feeding, assess how things are going for both you and baby, answer your questions, and create a personalized plan. The goal is always to leave you feeling more confident and supported, not more overwhelmed.",
  },
  {
    q: "When should I book \u2014 before or after baby arrives?",
    a: "Both! We offer prenatal sessions to help you prepare before baby arrives, as well as postpartum visits for when you need hands-on support. There\u2019s no wrong time to reach out.",
  },
  {
    q: "Do you offer virtual visits?",
    a: "Yes! Many of our services are available virtually, and some are offered as either in-home or virtual. During your intro call we\u2019ll help you figure out what format works best for your situation.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
            Services
          </h1>
          <p className="text-warm-gray text-lg md:text-xl leading-relaxed">
            À la carte prenatal, postpartum, and lactation services — choose
            exactly what you need, when you need it.
          </p>
        </div>
      </section>

      {/* Service Categories */}
      <section className="pb-20 md:pb-28 px-6">
        <div className="mx-auto max-w-4xl space-y-12">
          {categories.map((category) => (
            <ScrollReveal key={category.name}>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-6">
                  {category.name}
                </h2>
                <div className="space-y-3">
                  {category.services.map((service) => (
                    <div
                      key={service.title}
                      className="bg-brand-white rounded-xl border border-sand px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                    >
                      <h3 className="text-charcoal font-medium">
                        {service.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-warm-gray shrink-0">
                        <span>{service.duration}</span>
                        <span className="text-sand">·</span>
                        <span>{service.format}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-6 bg-brand-white">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              Not sure where to start?
            </h2>
            <p className="text-warm-gray text-lg leading-relaxed max-w-xl mx-auto mb-8">
              Every family is different. Let&rsquo;s talk about what&rsquo;s
              going on and figure out the right support together — no
              pressure, no commitment.
            </p>
            <Link
              href="/contact"
              className="rounded-full bg-terracotta px-8 py-4 text-base font-medium text-white transition-all hover:bg-terracotta-dark hover:shadow-lg inline-block"
            >
              Let&rsquo;s Connect for an Intro Call
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
