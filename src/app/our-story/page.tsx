import type { Metadata } from "next";
import { EarlyAccessBand } from "@/components/sections/early-access-band";
import { Container, Eyebrow, PageHeader } from "@/components/ui/layout";
import { PhotoSlot } from "@/components/ui/photo-slot";

export const metadata: Metadata = {
  title: "Our story",
  description: "Why UniMatch exists and who is building it.",
  alternates: { canonical: "/our-story" },
};

/**
 * EDIT ME: Everything in [square brackets] is a placeholder for the
 * founder's real, verified story. Do not publish invented credentials,
 * investors, awards or testimonials.
 */
export default function OurStoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="Built by a student who wanted campus to feel smaller."
        intro={<p>UniMatch is an independent student startup in Philadelphia. Here&apos;s why it exists.</p>}
      />

      <section aria-labelledby="why-title" className="bg-white">
        <Container className="grid gap-14 py-16 sm:py-24 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <PhotoSlot tone="lavender" ratio="aspect-[4/5]" shot="Real photo of the founder on campus. Relaxed, natural light." />
            <p className="text-sm text-muted">[Founder name], Founder</p>
          </div>
          <div className="prose-um max-w-none text-lg text-charcoal">
            <Eyebrow>Why I started UniMatch</Eyebrow>
            <h2 id="why-title" className="!mt-3 !text-4xl font-semibold leading-tight">
              [A one-line summary of the moment the idea started]
            </h2>
            <p>
              [Write two or three short paragraphs in your own words. What did you notice about how students meet, or
              don&apos;t? What happened that made you decide to build something?]
            </p>
            <p>
              [Why inclusivity matters to you personally, and why students with disabilities deserve to be seen as
              romantic partners, not only as people who need accessible software.]
            </p>
            <h3>What we&apos;re building first</h3>
            <p>
              A campus-first dating experience with clear intentions, honest safety design and real inclusion, tested
              with a small group of students before it grows. Friendship and mentorship come next.
            </p>
            <h3>Where we are today</h3>
            <p>
              [Be specific and honest: for example, &ldquo;We&apos;re building our first version and opening an
              early access list.&rdquo; Only mention programs, mentors or support you can verify.]
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="team-title" className="border-t border-line bg-ivory">
        <Container className="py-16 sm:py-24">
          <div className="max-w-2xl space-y-4">
            <Eyebrow>Get involved</Eyebrow>
            <h2 id="team-title" className="text-4xl font-semibold leading-tight text-plum">
              We&apos;re looking for people who care about this.
            </h2>
            <p className="text-lg text-muted">
              Designers, engineers, students with lived experience of disability, and anyone who wants to help test
              early versions. Write to{" "}
              <a className="font-semibold text-lavender-700 underline underline-offset-4" href="mailto:hello@unimatch.app">
                hello@unimatch.app
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
      <EarlyAccessBand />
    </>
  );
}
