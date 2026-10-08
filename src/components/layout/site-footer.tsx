import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { footerNav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-plum text-ivory">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="space-y-4">
            <Logo tone="light" />
            <p className="max-w-xs text-on-plum-muted">{site.tagline}</p>
            <p className="text-sm text-on-plum-muted">
              <a className="underline underline-offset-4 hover:text-ivory" href={`mailto:${site.emails.hello}`}>
                {site.emails.hello}
              </a>
            </p>
          </div>
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-lavender">
                {group.title}
              </h2>
              <ul className="mt-3 space-y-1">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-10 items-center text-on-plum-muted hover:text-ivory hover:underline hover:underline-offset-4"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-line-dark pt-6 text-sm text-on-plum-muted sm:flex-row sm:justify-between">
          <p>
            © {2026} UniMatch · {site.location}
          </p>
          <p className="max-w-xl sm:text-right">
            UniMatch is an independent student startup and is not affiliated with or endorsed by any university.
          </p>
        </div>
      </div>
    </footer>
  );
}
