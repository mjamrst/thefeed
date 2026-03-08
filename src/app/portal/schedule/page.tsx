import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function SchedulePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <Link
            href="/portal"
            className="text-sm text-terracotta hover:text-terracotta/80 transition-colors"
          >
            ← Back to Portal
          </Link>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
          Schedule a Visit
        </h1>
        <p className="text-warm-gray text-lg mb-8">
          Select a time that works for you and Nellie will confirm within 24
          hours.
        </p>

        {/* TODO: Replace with Cal.com or Calendly embed */}
        <div className="bg-brand-white border border-sand rounded-2xl p-12 text-center">
          <svg
            className="h-16 w-16 text-sand mx-auto mb-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
          <h2 className="font-serif text-xl text-charcoal mb-3">
            Calendar Integration Coming Soon
          </h2>
          <p className="text-warm-gray mb-6 max-w-md mx-auto">
            Online scheduling will be available here shortly. In the meantime,
            please reach out to book your visit.
          </p>
          <a
            href="mailto:hello@thefeedwellness.com"
            className="rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-terracotta/90 inline-block"
          >
            Email to Schedule
          </a>
        </div>
      </div>
    </div>
  );
}
