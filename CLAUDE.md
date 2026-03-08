# CLAUDE.md — The Feed Platform

> Maternal wellness practice management platform. Phase 1: practitioner landing site. Future: multi-provider SaaS with client management, scheduling, billing, and telehealth.

---

## Project Context

### What This Is
A web platform for a maternal wellness practice based in the South Bay / greater Los Angeles area. The business provides lactation consulting, childbirth education, postpartum support, and newborn care services — initially delivered by founder Nellie Johnson, BSN, RN, CPD, with the architecture designed to scale to multiple providers.

### Business Name & Brand
- **Name:** The Feed
- **Tagline:** Lactation & Maternal Wellness
- **Monogram:** TF
- **Handle:** TBD (explore @thefeedwellness, @thefeedmaternal, @thefeedla, etc.)
- **Domain:** TBD (explore thefeedwellness.com, thefeedmaternal.com, etc.)
- **GitHub repo:** https://github.com/mjamrst/southbaymilkclub (to be renamed)

### Brand Identity

**Logo system (4 lockups):**
1. **Primary mark:** Abstract mother-and-child continuous line illustration (terracotta on cream) above serif wordmark "THE FEED" with sans-serif tagline "LACTATION & MATERNAL WELLNESS" below
2. **Dark variant:** Same lockup on charcoal (#2D2D2D) background
3. **Wordmark only:** "THE FEED" serif wordmark + tagline, no icon
4. **Monogram:** "TF" interlocked serif letters — for hat embroidery, social avatars, favicons

**Color palette:**
- Terracotta / clay: #C4724E (primary brand color)
- Warm cream: #FFF8F0 (background)
- Deep charcoal: #2D2D2D (text, dark backgrounds)
- Sage green: muted accent (merch, secondary elements)
- Dusty rose: optional tertiary accent

**Typography direction:**
- Headings: Modern serif (the logo uses a classic serif with good weight — match this energy; consider DM Serif Display, Playfair Display, or similar)
- Body: Clean sans-serif (DM Sans, Inter, or similar)
- Tagline/subtitles: Light-weight sans-serif with wide letter-spacing

**Brand personality:**
- Premium, clean, minimal, community-oriented wellness
- NOT clinical, NOT baby-pink, NOT cutesy
- References: Ritual vitamins, Seed probiotics, Jenni Kayne, Freda Salvador, Perfect White Tee
- A brand a stylish South Bay mom would proudly wear on a hat or carry on a tote

**Logo production notes:**
- Mother-child line mark needs consistent stroke weight when vectorized
- Need a simplified mark variant for small formats (favicon, 32x32 avatar)
- Terracotta embroidery on sage green hat = approved merch direction

### Business Vision
**Phase 1 (NOW):** "We're open for business." A high-converting practitioner website that establishes Nellie Johnson as the go-to expert in the South Bay for lactation and maternal wellness support. Core goal: get consultations booked.

**Phase 2:** Add client management — intake forms, visit tracking, care plans, secure messaging, payment processing via Stripe.

**Phase 3:** Multi-provider platform. Other lactation consultants, childbirth educators, and postpartum doulas can onboard, manage their clients, accept payments, and operate under The Feed umbrella.

### The Founder — Nellie Johnson, BSN, RN, CPD, LCCE (CLC in progress)
This is critical context. The website must communicate Nellie's depth of experience. She is not a newly-certified consultant — she has 20+ years of nursing experience with deep specialization in maternal-child health.

**Key credentials & experience:**
- BSN, RN — Registered Nurse with Bachelor of Science in Nursing
- CPD — Certified Postpartum Doula
- LCCE — Lamaze Certified Childbirth Educator
- CLC — Certified Lactation Counselor (in progress)
- 20+ years in maternal-child health nursing
- Experience at major hospital systems including Dignity Health
- Specialized in postpartum care, breastfeeding support, newborn care, and childbirth education
- Based in Redondo Beach, CA — serves all of South Bay LA

**Credential note:** Nellie should NOT be marketed as a "lactation consultant" until CLC certification is complete. Her RN scope of practice covers breastfeeding support in the interim. Use "breastfeeding support" or "lactation support" language, not "lactation consultant" or "IBCLC."

### Services
1. **Postpartum Doula Care** — In-home postpartum support, recovery guidance, emotional support
2. **Breastfeeding / Lactation Support** — Latch assessment, feeding plans, troubleshooting (RN scope now; full lactation consulting post-CLC)
3. **Newborn Care** — Bathing, swaddling, sleep guidance, newborn basics for new parents
4. **Childbirth Education** — Prenatal classes, birth preparation, labor coping techniques (LCCE certified)
5. **Consultation / Assessment** — Initial evaluation to determine family needs and create care plan

**Pricing model:** Tiered packages (not per-visit). Three tiers designed to extend client relationships and increase per-client value, plus a membership layer for ongoing support. An internal package builder tool is deployed at sbmc-internal-tools.vercel.app (to be rebranded).

### Service Area
Primary: Manhattan Beach, Hermosa Beach, Redondo Beach, Torrance, Palos Verdes, El Segundo
Secondary: Greater South Bay, Long Beach, all of Southern California

---

## Technical Architecture

### Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL + Auth + Storage)
- **Payments:** Stripe (Phase 2+)
- **Deployment:** Vercel
- **Domain:** TBD

### Project Structure
```
the-feed/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata
│   ├── page.tsx            # Homepage
│   ├── about/
│   │   └── page.tsx        # Nellie's story + credentials
│   ├── services/
│   │   └── page.tsx        # Service tiers and packages
│   ├── contact/
│   │   └── page.tsx        # Contact form + booking CTA
│   └── api/
│       └── contact/
│           └── route.ts    # Contact form submission
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Header, Footer, Navigation
│   └── sections/           # Page-specific sections
├── lib/
│   ├── supabase/           # Supabase client + types
│   └── utils.ts            # Shared utilities
├── public/
│   ├── images/             # Optimized images
│   └── fonts/              # Self-hosted fonts if needed
├── supabase/
│   └── migrations/         # Database migrations
├── tailwind.config.ts
├── CLAUDE.md               # This file
└── README.md
```

### Phase 1 Pages (NOW)
1. **Homepage** — Hero with Nellie's photo, value prop, services overview, trust signals, CTA
2. **About** — Nellie's story, credentials, philosophy, professional headshot
3. **Services** — Service tiers/packages with pricing, what's included, comparison
4. **Contact** — Contact form, consultation booking CTA, service area map

### Phase 1 Shared Components
- **Navigation:** Clean, sticky header with The Feed logo + nav links + "Book Now" CTA button
- **Footer:** Contact info, service area cities, links, copyright
- **SEO:** Metadata for every page targeting local search terms. JSON-LD schema (LocalBusiness, MedicalBusiness, Person)
- **Mobile responsive:** Everything must work beautifully on mobile. Most users will be on phones.

### Supabase Foundation
Create initial migration with these tables (even though not all used in Phase 1):
- `organizations` (id, name, created_at)
- `providers` (id, org_id, name, email, credentials, bio, photo_url, created_at)
- `services` (id, org_id, name, description, duration_minutes, price_cents, created_at)
- `contact_submissions` (id, name, email, phone, message, service_interest, created_at, status)
- Seed data for The Feed org + Nellie as first provider + services
- RLS policies on all tables
- Contact form writes to `contact_submissions` via server action

---

## Design System

### Color Tokens (Tailwind)
```
colors: {
  brand: {
    terracotta: '#C4724E',
    'terracotta-light': '#D4956F',
    'terracotta-dark': '#A85D3B',
  },
  cream: '#FFF8F0',
  charcoal: '#2D2D2D',
  sage: '#87A878',
  'dusty-rose': '#C4A0A0',
  warm: {
    50: '#FFFDF9',
    100: '#FFF8F0',
    200: '#FFF0E0',
    // ... extend as needed
  }
}
```

### Design Principles
- Warm, premium feel — Restoration Hardware meets modern wellness
- Generous white space / breathing room
- Nellie's photo is the #1 trust signal — use prominently
- Soft animations on scroll (subtle, not distracting)
- Serif headings + sans-serif body = warmth + authority
- Avoid stock photo aesthetic. Minimal imagery beyond Nellie's headshots for now.
- The terracotta color should be used as an accent, not overwhelming — mostly warm neutrals with terracotta pops

---

## Coding Conventions

### TypeScript
- Strict mode, no `any` types
- Interfaces over types for object shapes
- Descriptive variable names, no abbreviations except well-known ones
- Comments for "why," not "what"

### Component Patterns
- Extract reusable components to `components/ui/`
- Page-specific components stay in their route directory
- Props interfaces defined inline or in adjacent `.types.ts` file
- Use composition over configuration

### Supabase Patterns
- Use `@supabase/ssr` for server-side client
- Row Level Security on ALL tables from day one
- Migrations in `supabase/migrations/` — never modify DB directly
- Type generation: `supabase gen types typescript`

### Git Conventions
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`
- Feature branches off `main`
- PR descriptions should reference the phase and scope

### Performance
- Images: Use `next/image` with proper sizing. Nellie's headshots should be optimized.
- Fonts: Use `next/font` for self-hosted fonts
- Minimize client-side JavaScript on marketing pages
- Target Lighthouse scores: 95+ across all categories

---

## Key Files Reference
- `nellieheadshot.jpeg` + `nellieheadshot1-16.JPG` — Nellie's professional headshots (17 total; select best for homepage + about page)
- `Nellie_Johnson_Resume.pdf` — Full resume with experience details
- `Nellie_Johnson_Cover_Letter.pdf` — Additional context on her experience narrative
- `SOQNellie_Johnson.pdf` — Statement of qualifications with detailed competency descriptions
- `nellielinkedin.png` — LinkedIn experience section for reference
- `lactation-tam-analysis.jsx` — Market analysis (reference for copy/positioning, not for the site)
- `financial-model.jsx` — Revenue model (internal reference only)

---

## Immediate Business Priorities
- [ ] Redondo Beach business license + LA County DBA filing under "The Feed"
- [ ] Malpractice insurance (CM&F Group or NSO) — required before seeing any client
- [ ] NPI number registration
- [ ] Domain registration
- [ ] Social media handles secured
- [ ] Rename GitHub repo from southbaymilkclub to the-feed (or thefeedwellness)
- [ ] Rebrand internal tools (package builder at sbmc-internal-tools.vercel.app)
- [ ] First client expected via personal/professional network referrals
