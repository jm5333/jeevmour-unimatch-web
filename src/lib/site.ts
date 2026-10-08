/**
 * Central site configuration. Change contact emails, URLs and
 * navigation here rather than in individual pages.
 */
export const site = {
  name: "UniMatch",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://unimatch.app",
  tagline: "Your campus. Your people. Your kind of connection.",
  principle: "Connection is for everyone. So is love.",
  description:
    "From first dates to meaningful friendships, UniMatch is building a more personal way for university students to meet, connect, and find their people.",
  location: "Philadelphia, PA",
  emails: {
    hello: "hello@unimatch.app",
    support: "support@unimatch.app",
    safety: "safety@unimatch.app",
  },
} as const;

export type NavItem = { href: string; label: string };

export const mainNav: NavItem[] = [
  { href: "/discover", label: "Discover" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/inclusivity", label: "Inclusivity" },
  { href: "/safety", label: "Safety" },
  { href: "/our-story", label: "Our story" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Product",
    items: [
      { href: "/discover", label: "Discover demo" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/connections", label: "Icebreakers & Say Hi" },
      { href: "/early-access", label: "Early access" },
    ],
  },
  {
    title: "Company",
    items: [
      { href: "/why-unimatch", label: "Why UniMatch" },
      { href: "/inclusivity", label: "Inclusivity" },
      { href: "/our-story", label: "Our story" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Trust",
    items: [
      { href: "/safety", label: "Safety" },
      { href: "/community-guidelines", label: "Community guidelines" },
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of use" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  },
];

/** Every public route, used by the sitemap. */
export const publicRoutes = [
  "/",
  "/how-it-works",
  "/discover",
  "/why-unimatch",
  "/inclusivity",
  "/connections",
  "/safety",
  "/our-story",
  "/early-access",
  "/contact",
  "/privacy",
  "/terms",
  "/community-guidelines",
  "/accessibility",
] as const;
