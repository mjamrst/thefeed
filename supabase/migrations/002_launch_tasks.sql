-- Launch tracker tasks table (public schema — internal tool, not part of main app)
CREATE TABLE IF NOT EXISTS public.launch_tasks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  week INT NOT NULL,
  due_date DATE,
  assignee TEXT NOT NULL DEFAULT 'Both',
  done BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Permissive RLS: internal tool accessed via anon key
ALTER TABLE public.launch_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to launch_tasks"
  ON public.launch_tasks
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Seed all 34 tasks
INSERT INTO public.launch_tasks (id, title, week, due_date, assignee, done) VALUES
  -- Week 1
  ('w1-1',  'Finalize business name',                                              1, '2026-03-04', 'Both',   true),
  ('w1-2',  'Purchase domain (.com and .co)',                                       1, '2026-03-05', 'Mike',   true),
  ('w1-3',  'Connect domain to Vercel deployment',                                  1, '2026-03-05', 'Mike',   false),
  ('w1-4',  'Set up Google Workspace — create nellie@ and hello@ emails',           1, '2026-03-05', 'Mike',   false),
  ('w1-5',  'Get malpractice / professional liability insurance',                   1, '2026-03-06', 'Nellie', false),
  ('w1-6',  'Apply for NPI Number (nppes.cms.hhs.gov)',                             1, '2026-03-06', 'Nellie', false),
  ('w1-7',  'File DBA with LA County ($26 + newspaper publication)',                1, '2026-03-07', 'Mike',   false),
  ('w1-8',  'File for Redondo Beach Business License + Home Occupation Permit',     1, '2026-03-07', 'Mike',   false),
  ('w1-9',  'Complete tier builder at internal tools',                              1, '2026-03-09', 'Nellie', false),
  ('w1-10', 'Order business cards (name, credentials, phone, email, website)',      1, '2026-03-09', 'Both',   false),

  -- Week 2
  ('w2-1',  'Update website with real content — bio, headshot, services, contact form', 2, '2026-03-12', 'Mike',   false),
  ('w2-2',  'Verify custom domain working (HTTPS, mobile + desktop)',                   2, '2026-03-12', 'Mike',   false),
  ('w2-3',  'Set up Google Business Profile (service-area business, hides home address)', 2, '2026-03-12', 'Both',   false),
  ('w2-4',  'Create Instagram account — headshot, bio, credentials, website link',      2, '2026-03-14', 'Nellie', false),
  ('w2-5',  'Post 3–5 initial posts on Instagram',                                     2, '2026-03-14', 'Nellie', false),
  ('w2-6',  'Create Facebook business page',                                            2, '2026-03-14', 'Nellie', false),
  ('w2-7',  'Write personal intro post for social media and mom groups',                2, '2026-03-16', 'Nellie', false),
  ('w2-8',  'Identify 5–10 local Facebook / mom groups to join',                        2, '2026-03-16', 'Nellie', false),

  -- Week 3
  ('w3-1',  'Tell professional network — personal messages to colleagues & friends',    3, '2026-03-18', 'Nellie', false),
  ('w3-2',  'Create referral flyer (PDF — photo, credentials, services, QR code)',      3, '2026-03-18', 'Mike',   false),
  ('w3-3',  'Drop off business cards + flyers at local spots',                          3, '2026-03-20', 'Nellie', false),
  ('w3-4',  'Post in local mom groups (follow group rules)',                             3, '2026-03-20', 'Nellie', false),
  ('w3-5',  'Reach out to local doula networks (DoulaMatch.net)',                       3, '2026-03-20', 'Nellie', false),
  ('w3-6',  'Set up introductory offer (free 15-min consult or discount)',              3, '2026-03-23', 'Both',   false),
  ('w3-7',  'Host free Instagram/Facebook Live Q&A session',                            3, '2026-03-23', 'Nellie', false),
  ('w3-8',  'Follow up with referral contacts who didn''t respond',                     3, '2026-03-23', 'Nellie', false),

  -- Week 4
  ('w4-1',  'Follow up on every warm lead — offer free phone calls',                    4, '2026-03-25', 'Nellie', false),
  ('w4-2',  'Post consistently on social media (3–4 posts/week min)',                   4, '2026-03-25', 'Nellie', false),
  ('w4-3',  'Expand outreach if needed — Nextdoor, personal contacts, Reddit',          4, '2026-03-27', 'Both',   false),
  ('w4-4',  'Book and confirm the first appointment',                                   4, '2026-03-31', 'Nellie', false),
  ('w4-5',  'Prepare client intake form (info, health history, feeding concerns)',       4, '2026-03-31', 'Mike',   false),
  ('w4-6',  'Prepare consent / disclosure form (scope of practice, privacy)',            4, '2026-03-31', 'Mike',   false),
  ('w4-7',  'Set up payment method (Venmo/Zelle for now)',                              4, '2026-03-31', 'Nellie', false),
  ('w4-8',  'Create superbill template for insurance reimbursement',                    4, '2026-03-31', 'Mike',   false)
ON CONFLICT (id) DO NOTHING;
