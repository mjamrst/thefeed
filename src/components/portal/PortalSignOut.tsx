"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function PortalSignOut() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-sm text-warm-gray hover:text-charcoal transition-colors"
    >
      Sign Out
    </button>
  );
}
