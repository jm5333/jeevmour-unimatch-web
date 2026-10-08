import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Community guidelines",
  description: "How we expect everyone on UniMatch to treat each other.",
  alternates: { canonical: "/community-guidelines" },
};

export default function GuidelinesPage() {
  return (
    <LegalPage
      title="Community guidelines"
      intro="UniMatch only works if people feel safe and respected. These are the standards everyone agrees to."
      updated="October 8, 2026"
    >
      <h2>Be yourself</h2>
      <p>
        Use your real name, recent photos of yourself, and your own university account. Don&apos;t pretend to be
        someone else.
      </p>

      <h2>Respect consent and boundaries</h2>
      <ul>
        <li>A no, an unmatch or no reply is an answer. Don&apos;t keep pushing.</li>
        <li>Don&apos;t send sexual content or requests unless the other person has clearly agreed.</li>
        <li>Don&apos;t try to contact someone on other platforms after they&apos;ve blocked you.</li>
      </ul>

      <h2>Treat everyone with dignity</h2>
      <p>
        Hate, harassment or demeaning comments based on race, ethnicity, religion, gender, sexual orientation,
        disability, body, or any other part of who someone is will get you removed.
      </p>
      <p>
        That includes disability. Don&apos;t ask intrusive medical questions, make assumptions about what someone with
        a disability can or wants to do, or treat anyone as a project or a novelty.
      </p>

      <h2>Keep it safe</h2>
      <ul>
        <li>No threats, stalking or sharing someone&apos;s private information.</li>
        <li>No sharing screenshots of other people&apos;s profiles or messages without permission.</li>
        <li>No scams, spam, selling, or recruiting for other services.</li>
      </ul>

      <h2>Report what&apos;s wrong</h2>
      <p>
        If someone breaks these guidelines, block and report them. You can also email{" "}
        <a href={`mailto:${site.emails.safety}`}>{site.emails.safety}</a>. We review every report.
      </p>
    </LegalPage>
  );
}
