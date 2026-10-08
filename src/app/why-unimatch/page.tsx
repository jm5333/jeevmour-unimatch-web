import type { Metadata } from "next";
import { EarlyAccessBand } from "@/components/sections/early-access-band";
import { Container, Eyebrow, PageHeader } from "@/components/ui/layout";
import { PhotoSlot } from "@/components/ui/photo-slot";

export const metadata: Metadata = {
  title: "Why UniMatch",
  description: "Why UniMatch starts with your campus: shared context, clear intentions and trust.",
  alternates: { canonical: "/why-unimatch" },
};

const reasons = [
  {
    title: "Shared context makes it easier to talk",
    body: "You already have something in common: the same dining hall, the same brutal midterm, the same favorite study spot. That's a better starting point than a stranger's bio.",
  },
  {
    title: "Clear intentions save everyone time",
    body: "Some people want romance. Some want friends. Some want advice from someone a few years ahead. Saying so up front means fewer mixed signals and fewer awkward conversations.",
  },
  {
    title: "Interests over endless swiping",
    body: "Profiles lead with prompts and interests, so you can see who someone is before you decide, not only what they look like.",
  },
  {
    title: "Trust comes from community",
    body: "Everyone is a verified student at your school. That doesn't make anyone automatically safe, but it does mean people are accountable to a shared community.",
  },
];

export default function WhyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Why UniMatch"
        title="Meeting people at university shouldn't depend on luck."
        intro={
          <p>
            Thousands of students share a campus, and most never meet. Classes end, clubs fill up, and the people who
            could have become partners, friends or mentors stay strangers. We think that&apos;s worth fixing.
          </p>
        }
      />
      <section aria-labelledby="reasons-title" className="bg-white">
        <Container className="grid gap-14 py-16 sm:py-24 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>What we believe</Eyebrow>
            <h2 id="reasons-title" className="text-4xl font-semibold leading-tight text-plum">
              Start with what you already share.
            </h2>
            <PhotoSlot
              tone="ivory"
              ratio="aspect-[4/3]"
              shot="A small group of students talking after class outside a campus building. Natural light, diverse group."
            />
          </div>
          <ol className="space-y-12">
            {reasons.map((r, i) => (
              <li key={r.title} className="space-y-3 border-t border-line pt-6">
                <p className="font-display text-xl font-semibold text-coral-700">0{i + 1}</p>
                <h3 className="text-3xl font-semibold leading-tight text-plum">{r.title}</h3>
                <p className="text-lg text-muted">{r.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <EarlyAccessBand />
    </>
  );
}
