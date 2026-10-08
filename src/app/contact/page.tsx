import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui/layout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the UniMatch team.",
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    title: "General questions",
    body: "Partnerships, press, student groups, or just saying hello.",
    email: site.emails.hello,
  },
  {
    title: "Support",
    body: "Questions about early access or your waitlist signup.",
    email: site.emails.support,
  },
  {
    title: "Safety",
    body: "Report a concern or ask about our safety approach. In an emergency, contact local emergency services first.",
    email: site.emails.safety,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We read every message."
        intro={<p>UniMatch is a small team, so replies can take a few days. Pick the address that fits best.</p>}
      />
      <section aria-label="Ways to contact us" className="bg-white">
        <Container className="py-16 sm:py-24">
          <ul className="grid gap-6 md:grid-cols-3">
            {channels.map((c) => (
              <li key={c.email} className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-line bg-ivory p-6">
                <h2 className="text-2xl font-semibold text-plum">{c.title}</h2>
                <p className="flex-1 text-muted">{c.body}</p>
                <a
                  href={`mailto:${c.email}`}
                  className="inline-flex min-h-11 items-center font-semibold text-lavender-700 underline underline-offset-4"
                >
                  {c.email}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-muted">{site.name} · {site.location}</p>
        </Container>
      </section>
    </>
  );
}
