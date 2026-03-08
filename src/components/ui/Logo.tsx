import Image from "next/image";
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
  if (light) {
    return (
      <Link
        href="/"
        className={cn("flex flex-col items-center gap-1.5", className)}
        aria-label="The Feed — Home"
      >
        <Image
          src="/images/brand/logo-full.png"
          alt="The Feed — Lactation & Maternal Wellness"
          width={200}
          height={200}
          className="h-auto w-44 brightness-0 invert"
          priority
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn("flex flex-col items-center", className)}
      aria-label="The Feed — Home"
    >
      <Image
        src="/images/brand/logo-full.png"
        alt="The Feed — Lactation & Maternal Wellness"
        width={400}
        height={400}
        className="h-auto w-64 md:w-72"
        priority
      />
    </Link>
  );
}

export function LogoHeader({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("block", className)}
      aria-label="The Feed — Home"
    >
      <Image
        src="/images/brand/wordmark.png"
        alt="The Feed — Lactation & Maternal Wellness"
        width={600}
        height={150}
        className="h-8 md:h-10 w-auto"
        priority
      />
    </Link>
  );
}
