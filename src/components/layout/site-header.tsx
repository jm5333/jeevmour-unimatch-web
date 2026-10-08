"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { mainNav } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // Close the mobile menu on Escape (links close it on click).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ivory/95 backdrop-blur supports-[backdrop-filter]:bg-ivory/85">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center rounded-full px-4 text-[0.95rem] font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-lavender-100 text-plum"
                      : "text-charcoal hover:bg-ivory-200 hover:text-plum"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href="/early-access">Get early access</ButtonLink>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-plum hover:bg-ivory-200 lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <div id={menuId} hidden={!open} className="border-t border-line bg-ivory lg:hidden">
        <nav aria-label="Mobile" className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
          <ul className="flex flex-col">
            {[...mainNav, { href: "/connections", label: "Icebreakers & Say Hi" }, { href: "/contact", label: "Contact" }].map(
              (item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center border-b border-line text-lg font-medium text-plum"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <ButtonLink href="/early-access" size="lg" className="mt-5 w-full" onClick={() => setOpen(false)}>
            Get early access
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
