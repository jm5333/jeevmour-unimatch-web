import type { Metadata } from "next";
import { EarlyAccessBand } from "@/components/sections/early-access-band";
import { Container, PageHeader, StatusTag } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "How it works",
  description: "The UniMatch journey, from university verification to your first conversation.",
  alternates: { canonical: "/how-it-works" },
};

const steps: { title: string; body: string; status: "live" | "planned" | "demo" }[] = [
  {
    title: "Join early access",
    body: "Add your email and university to the early access list. We'll let you know when UniMatch opens at your school.",
    status: "live",
  },
  {
    title: "Verify you're a student",
    body: "Confirm your university affiliation with a one-time code sent to your university email. Only verified students can join.",
    status: "planned",
  },
  {
    title: "Build your profile",
    body: "Add photos, answer a few prompts and pick your interests. Share as much or as little as you like, including anything about disability, which is always optional.",
    status: "planned",
  },
  {
    title: "Choose your intention",
    body: "Tell people whether you're here for dating, friendship, mentorship, or a mix. You can change this anytime.",
    status: "planned",
  },
  {
    title: "Discover your campus",
    body: "Browse verified students from your own university who are looking for the same kind of connection. Like or pass at your own pace.",
    status: "demo",
  },
  {
    title: "Match when it's mutual",
    body: "A match only happens when you both say yes. Nobody can message you unless you've matched.",
    status: "demo",
  },
  {
    title: "Start the conversation",
    body: "Use a suggested icebreaker or write your own. Block or report anyone, at any point, in one tap.",
    status: "planned",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="From your university email to your first hello."
        intro={
          <p>
            Here&apos;s the journey we&apos;re building. We label each step honestly: what&apos;s live today, what you
            can try in the demo, and what&apos;s still planned.
          </p>
        }
      >
        <div className="flex flex-wrap gap-3 pt-2 text-sm">
          <span className="flex items-center gap-2"><StatusTag status="live" /> Available now</span>
          <span className="flex items-center gap-2"><StatusTag status="demo" /> Try it in the demo</span>
          <span className="flex items-center gap-2"><StatusTag status="planned" /> In development</span>
        </div>
      </PageHeader>

      <section aria-label="Steps" className="bg-white">
        <Container className="py-16 sm:py-24">
          <ol className="mx-auto max-w-3xl">
            {steps.map((s, i) => (
              <li key={s.title} className="relative grid grid-cols-[3.5rem_1fr] gap-4 pb-12 last:pb-0">
                {i < steps.length - 1 ? (
                  <span aria-hidden="true" className="absolute left-[1.7rem] top-14 bottom-2 w-px bg-line" />
                ) : null}
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-plum font-display text-xl font-semibold text-ivory">
                  {i + 1}
                </span>
                <div className="space-y-2 pt-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-semibold text-plum">{s.title}</h2>
                    <StatusTag status={s.status} />
                  </div>
                  <p className="text-lg text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <EarlyAccessBand />
    </>
  );
}
