import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility statement",
  description: "UniMatch's accessibility commitment and how to report a barrier.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility statement"
      intro="UniMatch should work for every student. Here's what we aim for and how to tell us when we fall short."
      updated="October 8, 2026"
    >
      <h2>Our goal</h2>
      <p>
        We aim for this website, and the UniMatch app when it launches, to meet the Web Content Accessibility
        Guidelines (WCAG) 2.2 at level AA.
      </p>

      <h2>What we&apos;ve built in</h2>
      <ul>
        <li>Full keyboard access, with visible focus indicators</li>
        <li>Labels and live announcements for screen readers, including in the demos</li>
        <li>Buttons and keyboard shortcuts as alternatives to swiping</li>
        <li>Text and color contrast that meets AA</li>
        <li>Reduced motion when your device asks for it</li>
        <li>Layouts that work when zoomed and on small screens</li>
      </ul>

      <h2>Known limitations</h2>
      <ul>
        <li>Some images are placeholders until we have licensed photography. Each one has a text description.</li>
      </ul>

      <h2>Tell us about a barrier</h2>
      <p>
        If something doesn&apos;t work for you, email{" "}
        <a href={`mailto:${site.emails.support}`}>{site.emails.support}</a> with the page and what happened. We aim
        to reply within 5 business days.
      </p>
    </LegalPage>
  );
}
