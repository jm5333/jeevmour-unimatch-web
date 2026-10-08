import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms for using the UniMatch website and early access list.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      intro="The rules for using this website and joining the early access list."
      updated="[DATE BEFORE LAUNCH]"
    >
      <h2>About this website</h2>
      <p>
        This website describes UniMatch, a product that is still in development. Features described as planned or
        shown in demos may change, and may not be available when the app launches.
      </p>

      <h2>No university affiliation</h2>
      <p>
        UniMatch is an independent student startup. It is not affiliated with, endorsed by or sponsored by any
        university, including any university mentioned on this site.
      </p>

      <h2>Early access</h2>
      <p>
        Joining the early access list doesn&apos;t guarantee access to UniMatch, a launch at your university or any
        particular timing. You must be 18 or older and a current university student to join.
      </p>

      <h2>Demos</h2>
      <p>
        All profiles, matches and messages in the demos are fictional. They don&apos;t represent real people, and
        nothing in a demo is sent to anyone.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Don&apos;t submit someone else&apos;s email address or false information.</li>
        <li>Don&apos;t try to disrupt, overload or gain unauthorized access to the site.</li>
        <li>Don&apos;t scrape or copy the site&apos;s content or design for commercial use.</li>
      </ul>

      <h2>Changes</h2>
      <p>We may update these terms. When we do, we&apos;ll change the date at the top of this page.</p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${site.emails.hello}`}>{site.emails.hello}</a>.
      </p>
      <p>[Add governing law, limitation of liability and other clauses after legal review.]</p>
    </LegalPage>
  );
}
