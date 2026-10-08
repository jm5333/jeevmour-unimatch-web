import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How UniMatch collects and uses information on this website and early access list.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="What we collect on this website and the early access list, why, and the choices you have."
      updated="[DATE BEFORE LAUNCH]"
    >
      <h2>Who we are</h2>
      <p>
        UniMatch is an independent student startup based in {site.location}. Contact us about privacy at{" "}
        <a href={`mailto:${site.emails.hello}`}>{site.emails.hello}</a>.
      </p>

      <h2>What we collect</h2>
      <p>When you join the early access list, we collect:</p>
      <ul>
        <li>Your email address</li>
        <li>The university you attend</li>
        <li>Which connection modes interest you, if you choose to tell us</li>
        <li>Whether you agreed to receive occasional product updates</li>
        <li>
          A one-way hashed version of your IP address, used only to limit abuse of the form. We don&apos;t store your
          raw IP address with your signup.
        </li>
      </ul>
      <p>
        The interactive demos on this site don&apos;t collect or store anything you do. Demo profiles and messages stay
        in your browser and disappear when you leave the page.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To tell you when UniMatch is available at your university</li>
        <li>To understand which campuses to launch at first</li>
        <li>To send product updates, only if you opted in</li>
        <li>To protect the form from spam and abuse</li>
      </ul>
      <p>We don&apos;t sell your information, and we don&apos;t use it for advertising.</p>

      <h2>Who processes it</h2>
      <p>
        Waitlist data is stored with Supabase, our database provider. The website is hosted by Vercel. These providers
        process data on our behalf. [Confirm data regions and processor terms before launch.]
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep early access signups until UniMatch launches at your university or until you ask us to delete them.
        Abuse-prevention records are deleted automatically after [30] days.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>Unsubscribe from updates using the link in any email</li>
        <li>
          Ask us to access, correct or delete your information by emailing{" "}
          <a href={`mailto:${site.emails.hello}`}>{site.emails.hello}</a>
        </li>
      </ul>

      <h2>Age</h2>
      <p>UniMatch is for university students who are 18 or older. We don&apos;t knowingly collect information from anyone younger.</p>

      <h2>When the app launches</h2>
      <p>
        The UniMatch app will collect more information, such as profile details and messages. We&apos;ll publish an
        updated privacy policy before any of that happens.
      </p>
    </LegalPage>
  );
}
