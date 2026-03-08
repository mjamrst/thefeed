import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "About Nellie Johnson",
  description:
    "Meet Nellie Johnson, BSN, RN, CPD — a registered nurse with 20+ years of experience in maternal-child health, now bringing expert perinatal care to South Bay families.",
  openGraph: {
    title: "About Nellie Johnson | The Feed",
    description:
      "20+ years of nursing experience. Certified postpartum doula. Your neighbor who happens to be an expert.",
  },
};

const credentials = [
  "BSN, RN — Registered Nurse",
  "Certified Postpartum Doula (CAPPA)",
  "Certified Lactation Counselor (CLC) — in progress",
  "Lamaze Certified Childbirth Educator (LCCE)",
  "Mental Health First Aid Certified",
  "Promoting First Relationships (PFR)",
  "CPR/BLS — American Heart Association",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="shrink-0 w-full md:w-auto flex justify-center">
            <div className="relative w-72 h-96 md:w-80 md:h-[28rem] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/headshots/nellie-primary.jpg"
                alt="Nellie Johnson, BSN, RN, CPD — Founder of The Feed"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 288px, 320px"
                priority
              />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
              Hi, I&rsquo;m Nellie.
            </h1>
            <p className="text-warm-gray text-lg md:text-xl leading-relaxed mb-6">
              Registered nurse. Postpartum doula. Childbirth educator. Mom. And
              now, your neighbor in the South Bay.
            </p>
            <p className="text-warm-gray leading-relaxed">
              After 20+ years of caring for families in hospitals, birth centers,
              and homes across California and Texas, I came back to the South Bay
              to build the practice I always wished existed — one where the
              relationship doesn&rsquo;t end when the visit does.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 px-6 bg-brand-white">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-8 text-center">
              The long version
            </h2>
            <div className="space-y-6 text-warm-gray leading-relaxed text-lg">
              <p>
                I started my nursing career in 2004 at Mills Peninsula Hospital in
                the Bay Area, and from the very beginning, I was drawn to the
                moments that matter most — the ones where a family is just
                finding its footing. Over the years, I&rsquo;ve worked in
                medical-surgical units, public health departments, birth centers,
                and home visiting programs. I&rsquo;ve taught childbirth education
                classes in Palo Alto living rooms and coached first-time parents
                through their earliest days in Dallas homes.
              </p>
              <p>
                At Parkland Health in Dallas, I helped develop a home visiting
                program aimed at reducing the equity gap in maternal health
                outcomes. I conducted weekly postnatal home visits, educated
                families on breastfeeding and newborn care, evaluated social
                determinants of health, and served on the Dallas Fetal Infant
                Mortality Review Board. That work — connecting the clinical with
                the personal, meeting families where they actually are —
                shaped everything about how I practice today.
              </p>
              <p>
                At Allen Midwifery & Family Wellness, I managed nursing staff,
                supported births, created and taught Baby Care classes, and served
                as both a clinic and home visiting nurse. At Blossom Birth in Palo
                Alto, I taught evidence-based classes on pregnancy, birth,
                postpartum, and newborn care to Bay Area families.
              </p>
              <p>
                In 2005, I was the charge nurse at a Hurricane Katrina disaster
                relief clinic at the Houston Astrodome — an experience that
                crystallized my belief that healthcare is about showing up for
                people when they need it most, with whatever resources you have.
              </p>
              <p>
                Now I live in Redondo Beach with my family, and The Feed
                is where all of these experiences come together. I bring the
                clinical expertise of two decades of nursing, the warmth of a
                neighbor who&rsquo;s been through it herself, and a deep
                conviction that every family deserves this level of support.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Credentials */}
      <section className="py-16 md:py-24 px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl text-charcoal mb-8 text-center">
              Credentials & Training
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {credentials.map((cred) => (
                <div
                  key={cred}
                  className="flex items-start gap-3 bg-brand-white rounded-xl px-5 py-4"
                >
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
                  <span className="text-charcoal text-sm">{cred}</span>
                </div>
              ))}
            </div>
            <p className="text-warm-gray text-sm text-center mt-6">
              BSN from Capella University. ADN from College of San Mateo.
              California RN License #643918.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Personal */}
      <section className="py-16 md:py-24 px-6 bg-sand/30">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl text-charcoal mb-6">
              Beyond the credentials
            </h2>
            <p className="text-warm-gray text-lg leading-relaxed mb-8">
              When I&rsquo;m not supporting South Bay families, you&rsquo;ll
              find me cooking with my kids, trying new recipes, exploring the
              beach cities on foot, or planning our next family trip. I&rsquo;m
              passionate about nutrition, fitness, child development, and building
              the kind of community where no parent feels like they&rsquo;re
              figuring it out alone.
            </p>
            <Link
              href="/contact"
              className="rounded-full bg-terracotta px-8 py-4 text-base font-medium text-white transition-all hover:bg-terracotta/90 hover:shadow-lg inline-block"
            >
              Let&rsquo;s Connect
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
