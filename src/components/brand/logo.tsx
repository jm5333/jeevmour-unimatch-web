import Link from "next/link";

/** UniMatch mark: two overlapping rings, two people meeting. */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="15" cy="20" r="10.5" fill="none" stroke="var(--color-coral)" strokeWidth="4" />
      <circle cx="25" cy="20" r="10.5" fill="none" stroke="var(--color-lavender)" strokeWidth="4" />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      className={`inline-flex min-h-11 items-center gap-2 ${tone === "light" ? "text-ivory" : "text-plum"}`}
    >
      <LogoMark />
      <span className="font-display text-[1.6rem] font-semibold tracking-[-0.03em]">UniMatch</span>
      <span className="sr-only">home</span>
    </Link>
  );
}
