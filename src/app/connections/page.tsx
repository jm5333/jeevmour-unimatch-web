import type { Metadata } from "next";
import { ChatDemo } from "@/components/demo/chat-demo";
import { EarlyAccessBand } from "@/components/sections/early-access-band";
import { Container, Eyebrow, PageHeader, StatusTag } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "Icebreakers & Say Hi",
  description: "How UniMatch makes the first message easier, and our privacy-first concept for opt-in nearby hellos.",
  alternates: { canonical: "/connections" },
};

const sayHiRules = [
  "Off by default. You turn it on, and you can turn it off anytime.",
  "Only works between people who both have it on.",
  "Never shows anyone's precise location, distance, or where they've been.",
  "No location history or movement trails are stored.",
  "One wave per person, then a 36-hour cooldown.",
  "A wave is just a hello. Chat only opens if you both match.",
];

export default function ConnectionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Connections"
        title="The hardest part is saying hi. We're working on that."
        intro={
          <p>
            Icebreakers help you start a conversation once you match. Say Hi is a future idea for turning
            &ldquo;I keep seeing them around&rdquo; into an actual hello, with strict privacy rules.
          </p>
        }
      />

      <section aria-labelledby="ice-title" className="bg-white">
        <Container className="py-16 sm:py-24">
          <div className="mb-10 max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <Eyebrow>Icebreakers</Eyebrow>
              <StatusTag status="demo" />
            </div>
            <h2 id="ice-title" className="text-4xl font-semibold leading-tight text-plum">
              Try a first message.
            </h2>
            <p className="text-lg text-muted">
              Openers are written around campus life and the mode you&apos;re in, so they feel natural whether
              you&apos;re asking someone out or asking for advice.
            </p>
          </div>
          <ChatDemo />
        </Container>
      </section>

      <section aria-labelledby="sayhi-title" className="on-dark bg-plum text-ivory">
        <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Eyebrow tone="dark">Say Hi</Eyebrow>
              <StatusTag status="planned" />
            </div>
            <h2 id="sayhi-title" className="text-4xl font-semibold leading-tight">
              A wave, not a tracker.
            </h2>
            <p className="text-lg text-on-plum-muted">
              Say Hi is a concept we&apos;re exploring: an opt-in way to send a friendly wave to UniMatch students
              nearby who have also turned it on. It isn&apos;t built yet, and we won&apos;t launch it until the
              privacy design holds up to real scrutiny.
            </p>
          </div>
          <div className="rounded-[var(--radius-panel)] bg-plum-800 p-6 sm:p-8">
            <h3 className="font-sans text-lg font-semibold">The rules we&apos;re designing around</h3>
            <ul className="mt-5 space-y-4">
              {sayHiRules.map((r) => (
                <li key={r} className="flex gap-3 text-on-plum-muted">
                  <svg viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0 text-coral" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
      <EarlyAccessBand />
    </>
  );
}
