import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui/layout";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";

export const metadata: Metadata = {
  title: "Get early access",
  description: "Join the UniMatch early access list and hear first when we open at your university.",
  alternates: { canonical: "/early-access" },
};

export default function EarlyAccessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Early access"
        title="Get in early."
        intro={
          <p>
            UniMatch is opening campus by campus, starting with a small pilot. Join the list and we&apos;ll email you
            when your university is next.
          </p>
        }
      />
      <section aria-label="Early access form" className="bg-white">
        <Container className="grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr]">
          <div className="max-w-xl">
            <WaitlistForm />
          </div>
          <aside className="space-y-6 lg:pt-2">
            <div className="rounded-[var(--radius-card)] bg-ivory p-6">
              <h2 className="text-2xl font-semibold text-plum">What happens next</h2>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-muted">
                <li>You get on the list. No account, no app download.</li>
                <li>We count interest by university to decide where to launch.</li>
                <li>When your campus opens, you&apos;ll get an email with how to verify and join.</li>
              </ol>
            </div>
            <p className="text-sm text-muted">
              Joining doesn&apos;t guarantee a launch at your school or any timing. UniMatch isn&apos;t affiliated with
              any university.
            </p>
          </aside>
        </Container>
      </section>
    </>
  );
}
