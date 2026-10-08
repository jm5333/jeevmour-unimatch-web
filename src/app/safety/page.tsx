import type { Metadata } from "next";
import Link from "next/link";
import { EarlyAccessBand } from "@/components/sections/early-access-band";
import { Container, Eyebrow, PageHeader, StatusTag } from "@/components/ui/layout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Safety",
  description: "How UniMatch approaches verification, privacy, consent, reporting and meeting in person.",
  alternates: { canonical: "/safety" },
};

const pillars = [
  {
    title: "University affiliation checks",
    body: "Accounts will require a one-time code sent to a university email address. That confirms someone has access to a university account. It doesn't confirm everything about who they are, so the rest of these protections still matter.",
  },
  {
    title: "Consent and mutual matching",
    body: "Nobody can message you unless you've both said yes. Unmatching ends the conversation immediately, for both of you.",
  },
  {
    title: "Blocking and reporting",
    body: "Block or report anyone in one tap from their profile or your chat. Reports are reviewed by a person, not only an algorithm.",
  },
  {
    title: "Anti-impersonation",
    body: "We plan to add photo verification and review signals for fake or duplicate accounts. Impersonating another student will get an account removed.",
  },
  {
    title: "Moderation and guidelines",
    body: "Everyone agrees to our community guidelines before joining. Harassment, hate, pressure and non-consensual content aren't tolerated.",
  },
  {
    title: "Privacy controls",
    body: "You choose what's visible on your profile, and sensitive details are never required. The app will discourage screenshots of profiles and chats where devices support it, but no app can fully prevent them, so share with care.",
  },
];

const meetingTips = [
  "Meet somewhere public on or near campus for the first few dates.",
  "Tell a friend where you're going and who you're meeting.",
  "Arrange your own way there and back.",
  "Keep conversations in the app until you're comfortable sharing your number.",
  "Trust your instincts. You can leave at any point, and you never owe anyone an explanation.",
  "If you feel unsafe, contact campus security or call 911 in the US.",
];

export default function SafetyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Safety"
        title="Real students. Real accountability."
        intro={
          <p>
            Safety shapes how UniMatch is designed from the first screen. We&apos;d rather be honest about limits than
            promise something no app can guarantee.
          </p>
        }
      >
        <p className="text-sm text-on-plum-muted">
          UniMatch is in development. The features below are <StatusTag status="planned" /> unless noted.
        </p>
      </PageHeader>

      <section aria-labelledby="pillars-title" className="bg-white">
        <Container className="py-16 sm:py-24">
          <h2 id="pillars-title" className="sr-only">
            Safety features
          </h2>
          <ul className="grid gap-x-12 gap-y-12 md:grid-cols-2">
            {pillars.map((p) => (
              <li key={p.title} className="space-y-3 border-t-2 border-plum pt-5">
                <h3 className="text-2xl font-semibold text-plum">{p.title}</h3>
                <p className="text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="meet-title" className="border-t border-line bg-ivory">
        <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <Eyebrow>Meeting in person</Eyebrow>
            <h2 id="meet-title" className="text-4xl font-semibold leading-tight text-plum">
              Going from chat to coffee.
            </h2>
            <p className="text-lg text-muted">
              A shared campus can make meeting up feel easy. These habits help keep it that way.
            </p>
          </div>
          <ol className="space-y-4">
            {meetingTips.map((t, i) => (
              <li key={t} className="flex gap-4 rounded-2xl bg-white p-5">
                <span className="font-display text-2xl font-semibold text-coral-700">{i + 1}</span>
                <span className="text-charcoal">{t}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="report-title" className="bg-white">
        <Container className="py-16 sm:py-20">
          <div className="max-w-2xl space-y-4">
            <h2 id="report-title" className="text-3xl font-semibold text-plum">
              Need to report something?
            </h2>
            <p className="text-lg text-muted">
              Email{" "}
              <a className="font-semibold text-lavender-700 underline underline-offset-4" href={`mailto:${site.emails.safety}`}>
                {site.emails.safety}
              </a>
              . If someone is in immediate danger, contact local emergency services first. Read our{" "}
              <Link className="font-semibold text-lavender-700 underline underline-offset-4" href="/community-guidelines">
                community guidelines
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>
      <EarlyAccessBand />
    </>
  );
}
