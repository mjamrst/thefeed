import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PortalSignOut } from "@/components/portal/PortalSignOut";

export default async function PortalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const displayName =
    user.user_metadata?.full_name || user.email?.split("@")[0] || "there";

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-1">
              Welcome, {displayName}
            </h1>
            <p className="text-warm-gray">Your client portal</p>
          </div>
          <PortalSignOut />
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-brand-white border border-sand rounded-2xl p-8 mb-8">
          <h2 className="font-serif text-xl text-charcoal mb-4">
            Upcoming Appointments
          </h2>
          <div className="text-center py-8">
            <svg
              className="h-12 w-12 text-sand mx-auto mb-4"
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
            <p className="text-warm-gray mb-4">
              No upcoming appointments scheduled.
            </p>
            <Link
              href="/portal/schedule"
              className="rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-terracotta/90 inline-block"
            >
              Schedule a Visit
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/portal/schedule"
            className="bg-brand-white border border-sand rounded-2xl p-6 hover:border-terracotta/30 transition-colors group"
          >
            <svg
              className="h-8 w-8 text-terracotta mb-3"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <h3 className="font-medium text-charcoal mb-1 group-hover:text-terracotta transition-colors">
              Schedule a Visit
            </h3>
            <p className="text-sm text-warm-gray">
              Book your next appointment with Nellie
            </p>
          </Link>
          <a
            href="mailto:hello@thefeedwellness.com"
            className="bg-brand-white border border-sand rounded-2xl p-6 hover:border-terracotta/30 transition-colors group"
          >
            <svg
              className="h-8 w-8 text-terracotta mb-3"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <h3 className="font-medium text-charcoal mb-1 group-hover:text-terracotta transition-colors">
              Send a Message
            </h3>
            <p className="text-sm text-warm-gray">
              Reach out to Nellie directly
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
