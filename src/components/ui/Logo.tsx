import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoFull({
  showTagline = false,
  className,
  light = false,
}: {
  showTagline?: boolean;
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("flex flex-col items-center gap-1.5", className)}
      aria-label="The Feed — Home"
    >
      <div className="flex items-baseline gap-[0.2em]">
        <span
          className={cn(
            "font-serif text-lg tracking-[0.25em] uppercase leading-none font-normal",
            light ? "text-brand-white/70" : "text-charcoal/70"
          )}
        >
          The
        </span>
        <span
          className={cn(
            "font-serif text-xl tracking-[0.25em] uppercase leading-none",
            light ? "text-brand-white" : "text-charcoal"
          )}
        >
          Feed
        </span>
      </div>
      {showTagline && (
        <span
          className={cn(
            "text-[0.65rem] tracking-[0.35em] uppercase font-sans",
            light ? "text-sand" : "text-warm-gray"
          )}
        >
          Lactation &amp; Maternal Wellness
        </span>
      )}
    </Link>
  );
}

export function LogoHeader({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-baseline gap-[0.15em]", className)}
      aria-label="The Feed — Home"
    >
      <span className="font-serif text-base md:text-lg tracking-[0.2em] uppercase text-charcoal/70 leading-none">
        The
      </span>
      <span className="font-serif text-lg md:text-xl tracking-[0.2em] uppercase text-charcoal leading-none">
        Feed
      </span>
    </Link>
  );
}
