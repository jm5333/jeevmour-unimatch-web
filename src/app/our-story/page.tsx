import type { Metadata } from "next";
import { EarlyAccessBand } from "@/components/sections/early-access-band";
import { Container, Eyebrow, PageHeader } from "@/components/ui/layout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our story",
  description: "Why UniMatch exists and who is building it.",
  alternates: { canonical: "/our-story" },
};

/**
 * Founder story. Keep every claim here true and verifiable: no invented
 * credentials, investors, awards or testimonials.
 *
 * To add a real photo later: put it in /public (e.g. /public/founder.jpg)
 * and replace the monogram card with <Image src="/founder.jpg" ... />.
 */
const founder = {
  name: "Jeevan Mourya",
  role: "Founder, UniMatch",
  initials: "JM",
};

export default function OurStoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="Built by a student who wanted campus to feel smaller."
        intro={<p>UniMatch is an independent student startup in Philadelphia. Here&apos;s why it exists.</p>}
      />

      <section aria-labelledby="why-title" className="bg-white">
        <Container className="grid gap-14 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="on-dark flex aspect-[4/5] flex-col justify-between rounded-[var(--radius-panel)] bg-plum p-8 text-ivory">
              <span
                aria-hidden="true"
                className="flex h-24 w-24 items-center justify-center rounded-full bg-lavender font-display text-4xl font-semibold text-plum"
              >
                {founder.initials}
              </span>
              <div className="space-y-2">
                <p className="font-display text-3xl font-semibold leading-tight">{founder.name}</p>
                <p className="text-on-plum-muted">{founder.role}</p>
                <a
                  href={`mailto:${site.emails.hello}`}
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-ivory underline underline-offset-4"
                >
                  {site.emails.hello}
                </a>
              </div>
            </div>
          </div>

          <div className="prose-um max-w-none text-lg text-charcoal">
            <Eyebrow>Why I started UniMatch</Eyebrow>
            <h2 id="why-title" className="!mt-3 !text-4xl font-semibold leading-tight">
              Surrounded by people, and still not meeting anyone.
            </h2>
            <p>
              Campus is full of people you&apos;d probably get along with. But between classes, work and everything
              else, most of us stick to the same small circle. Dating apps don&apos;t help much either. They drop you
              into a whole city of strangers, and most conversations go nowhere.
            </p>
            <p>
              I started UniMatch to make campus feel smaller, in a good way: a place where the people you meet actually
              share your day-to-day, and where it&apos;s clear whether someone is looking for a date, a friend or some
              advice.
            </p>
            <p>
              Inclusivity is the part I care about most. Students with disabilities want romance as much as anyone,
              yet most apps treat them as an afterthought or quietly leave them out. UniMatch is built so everyone is
              in the same room, and so anyone can be someone worth asking out.
            </p>

            <h3>What we&apos;re building first</h3>
            <p>
              A campus-first dating experience with clear intentions, honest safety design and real inclusion, tested
              with a small group of students before it grows. Friendship and mentorship come next.
            </p>

            <h3>Where we are today</h3>
            <p>
              We&apos;re building the first version of the app and opening an early access list. When enough students
              at a university sign up, we&apos;ll start a small pilot there, learn from it, and grow one campus at a
              time.
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
              <a className="font-semibold text-lavender-700 underline underline-offset-4" href={`mailto:${site.emails.hello}`}>
                {site.emails.hello}
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
