import Link from "next/link";
import { DiscoverDemo } from "@/components/demo/discover-demo";
import { HeroPreview } from "@/components/home/hero-preview";
import { EarlyAccessBand } from "@/components/sections/early-access-band";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, StatusTag } from "@/components/ui/layout";
import { PhotoSlot } from "@/components/ui/photo-slot";
import { site } from "@/lib/site";

const pillars = [
  {
    n: "01",
    title: "Only your campus",
    body: "Discovery is limited to verified students at your own university. The person you match with might sit two rows behind you in lecture.",
  },
  {
    n: "02",
    title: "Clear intentions",
    body: "Say whether you're here for dating, friendship or mentorship, so nobody has to guess what a message means.",
  },
  {
    n: "03",
    title: "Easier first messages",
    body: "Icebreakers built around campus life take the pressure off the first hello, especially if you're more of a listener.",
  },
];

const intentions = [
  {
    label: "Dating",
    body: "Romance with people who share your campus, your calendar and your coffee line. Our first focus.",
    href: "/discover",
  },
  {
    label: "Friendship",
    body: "Find your people: a study group, a gym partner, someone to explore the city with.",
    href: "/discover",
  },
  {
    label: "Mentorship",
    body: "Learn from students a few years ahead of you in your major, co-op search or grad applications.",
    href: "/discover",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden">
        <Container className="grid items-center gap-14 pb-20 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:pb-28">
          <div className="space-y-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-plum">
              <span className="h-2 w-2 rounded-full bg-coral" aria-hidden="true" />
              Early access is open for university students
            </p>
            <h1 className="text-[clamp(2.75rem,7vw,5.6rem)] font-semibold leading-[0.98] text-plum">
              Your campus.
              <br />
              Your people.
              <br />
              <em className="font-normal text-lavender-700">Your kind of connection.</em>
            </h1>
            <p className="max-w-xl text-lg text-muted sm:text-xl">{site.description}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/early-access" size="lg">
                Get early access
              </ButtonLink>
              <ButtonLink href="#explore" size="lg" variant="secondary">
                Explore UniMatch
              </ButtonLink>
            </div>
          </div>
          <HeroPreview />
        </Container>
      </section>

      {/* Campus-first story */}
      <section id="explore" aria-labelledby="explore-title" className="scroll-mt-24 border-t border-line bg-white">
        <Container className="grid gap-14 py-20 sm:py-28 lg:grid-cols-[1fr_1.15fr]">
          <div className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Why campus-first</Eyebrow>
            <h2 id="explore-title" className="text-[clamp(2.2rem,4.6vw,3.75rem)] font-semibold leading-[1.02] text-plum">
              The people you&apos;re hoping to meet are already nearby.
            </h2>
            <p className="max-w-md text-lg text-muted">
              Big dating apps put you in a city of strangers. UniMatch starts with the community you already share,
              then helps you take the first step.
            </p>
            <Link href="/why-unimatch" className="inline-flex min-h-11 items-center font-semibold text-lavender-700 underline underline-offset-4">
              Why we built it this way
            </Link>
          </div>
          <ol className="divide-y divide-line border-y border-line">
            {pillars.map((p) => (
              <li key={p.n} className="grid gap-3 py-8 sm:grid-cols-[5rem_1fr]">
                <span className="font-display text-3xl font-semibold text-coral-700">{p.n}</span>
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-plum">{p.title}</h3>
                  <p className="text-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Three intentions */}
      <section aria-labelledby="intentions-title" className="on-dark bg-plum text-ivory">
        <Container className="py-20 sm:py-28">
          <div className="max-w-2xl space-y-4">
            <Eyebrow tone="dark">Three kinds of connection</Eyebrow>
            <h2 id="intentions-title" className="text-[clamp(2.2rem,4.6vw,3.75rem)] font-semibold leading-[1.02]">
              You choose what you&apos;re here for.
            </h2>
            <p className="text-lg text-on-plum-muted">
              Pick one, or all three. Nobody gets pushed into a kind of connection they didn&apos;t ask for.
            </p>
          </div>
          <ul className="mt-12 divide-y divide-line-dark border-y border-line-dark">
            {intentions.map((i) => (
              <li key={i.label}>
                <Link
                  href={i.href}
                  className="group grid gap-2 py-8 sm:grid-cols-[minmax(0,18rem)_1fr_auto] sm:items-center sm:gap-8"
                >
                  <span className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-none group-hover:text-coral">
                    {i.label}
                  </span>
                  <span className="max-w-xl text-lg text-on-plum-muted">{i.body}</span>
                  <span aria-hidden="true" className="hidden text-3xl text-lavender transition-transform group-hover:translate-x-1 sm:block">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Inclusivity */}
      <section aria-labelledby="inclusive-title" className="bg-ivory">
        <Container className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2">
          <PhotoSlot
            tone="coral"
            ratio="aspect-[5/4]"
            shot="A couple on a date at a campus café. One partner is Deaf and signing mid-laugh. Warm, everyday, romantic."
          />
          <div className="space-y-5">
            <Eyebrow>Inclusive by design</Eyebrow>
            <h2 id="inclusive-title" className="text-[clamp(2.2rem,4.6vw,3.75rem)] font-semibold leading-[1.02] text-plum">
              Connection is for everyone. <em className="font-normal text-lavender-700">So is love.</em>
            </h2>
            <p className="text-lg text-muted">
              Students with disabilities date, flirt, fall for people and build relationships. On UniMatch they&apos;re
              part of the same discovery experience as everyone else, never sorted into a separate pool and never
              assumed to be looking only for friendship.
            </p>
            <p className="text-lg text-muted">
              Sharing anything about disability is always your choice, and we&apos;ll never ask for medical details.
            </p>
            <ButtonLink href="/inclusivity" variant="secondary">
              Read our approach
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Demo */}
      <section aria-labelledby="demo-title" className="border-y border-line bg-lavender-100">
        <Container className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_auto]">
          <div className="max-w-xl space-y-5">
            <div className="flex items-center gap-3">
              <Eyebrow>Try it</Eyebrow>
              <StatusTag status="demo" />
            </div>
            <h2 id="demo-title" className="text-[clamp(2.2rem,4.6vw,3.75rem)] font-semibold leading-[1.02] text-plum">
              See how discovery feels.
            </h2>
            <p className="text-lg text-muted">
              Switch between modes, open a profile, like or pass. Every profile in this demo is fictional, and nothing
              you do here is saved or sent anywhere.
            </p>
            <ButtonLink href="/discover" variant="secondary">
              Open the full demo
            </ButtonLink>
          </div>
          <DiscoverDemo />
        </Container>
      </section>

      {/* Icebreakers + Say Hi */}
      <section aria-labelledby="connect-title" className="bg-white">
        <Container className="py-20 sm:py-28">
          <div className="max-w-2xl space-y-4">
            <Eyebrow>Starting the conversation</Eyebrow>
            <h2 id="connect-title" className="text-[clamp(2.2rem,4.6vw,3.75rem)] font-semibold leading-[1.02] text-plum">
              Skip the awkward &ldquo;hey.&rdquo;
            </h2>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div className="space-y-3 border-t-2 border-plum pt-6">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-semibold text-plum">Icebreakers</h3>
                <StatusTag status="planned" />
              </div>
              <p className="text-muted">
                When you match, UniMatch suggests openers based on your campus and shared interests. Use one, edit it,
                or write your own.
              </p>
              <p className="rounded-2xl bg-lavender-100 p-4 font-display text-xl text-plum">
                &ldquo;What&apos;s the most underrated spot on campus for a first date?&rdquo;
              </p>
            </div>
            <div className="space-y-3 border-t-2 border-plum pt-6">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-semibold text-plum">Say Hi</h3>
                <StatusTag status="planned" />
              </div>
              <p className="text-muted">
                A future, fully opt-in way to send a friendly wave to students nearby who&apos;ve also turned it on. No
                precise location is ever shown, and there&apos;s a 36-hour cooldown so it never gets pushy.
              </p>
              <Link href="/connections" className="inline-flex min-h-11 items-center font-semibold text-lavender-700 underline underline-offset-4">
                Try the icebreaker chat demo
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Safety */}
      <section aria-labelledby="safety-title" className="border-t border-line bg-ivory">
        <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-5">
            <Eyebrow>Safety</Eyebrow>
            <h2 id="safety-title" className="text-[clamp(2.2rem,4.6vw,3.75rem)] font-semibold leading-[1.02] text-plum">
              Real students. Real accountability.
            </h2>
            <p className="text-lg text-muted">
              We&apos;re designing safety in from the start, and we&apos;ll be honest about what technology can and
              can&apos;t guarantee.
            </p>
            <ButtonLink href="/safety" variant="secondary">
              How we approach safety
            </ButtonLink>
          </div>
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {[
              ["University verification", "Accounts tied to a university email, so discovery stays within your school."],
              ["Block and report", "One tap to block or report, reviewed by a real person."],
              ["Consent first", "Mutual matches only. No messages from people you haven't matched with."],
              ["Privacy controls", "You decide what's visible. Screenshot deterrence where devices allow it."],
            ].map(([t, b]) => (
              <li key={t} className="space-y-2">
                <h3 className="font-sans text-lg font-semibold text-plum">{t}</h3>
                <p className="text-muted">{b}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <EarlyAccessBand />
    </>
  );
}
