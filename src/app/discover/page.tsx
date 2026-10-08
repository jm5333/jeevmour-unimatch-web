import type { Metadata } from "next";
import { DiscoverDemo } from "@/components/demo/discover-demo";
import { EarlyAccessBand } from "@/components/sections/early-access-band";
import { Container, PageHeader } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "Discover demo",
  description: "An interactive demo of UniMatch discovery with fictional student profiles.",
  alternates: { canonical: "/discover" },
};

export default function DiscoverPage() {
  return (
    <>
      <PageHeader
        eyebrow="Interactive demo"
        title="Discover, before it's real."
        intro={
          <p>
            This is a working preview of how discovery is designed to feel. The profiles are fictional, the university
            is made up, and nothing you do here is saved or sent to anyone.
          </p>
        }
      />
      <section aria-label="Demo" className="bg-lavender-100">
        <Container className="grid items-start gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_auto]">
          <div className="max-w-lg space-y-6 lg:pt-6">
            <h2 className="text-3xl font-semibold text-plum">What to try</h2>
            <ul className="space-y-4 text-muted">
              <li>
                <strong className="text-plum">Switch modes.</strong> Dating, Friendship and Mentorship each show
                different people. Use the tabs, or the arrow keys once a tab is focused.
              </li>
              <li>
                <strong className="text-plum">Open a profile.</strong> &ldquo;View profile&rdquo; shows more prompts and
                anything the person chose to share about themselves.
              </li>
              <li>
                <strong className="text-plum">Like or pass.</strong> Drag the card, tap the buttons, or focus the card and
                press the left or right arrow key.
              </li>
              <li>
                <strong className="text-plum">Get a demo match.</strong> Some fictional profiles like you back, so you can
                see what a mutual match looks like.
              </li>
            </ul>
            <p className="rounded-2xl border border-line bg-white p-4 text-sm text-muted">
              In the real app, you&apos;ll only see verified students from your own university, and you&apos;ll only
              be able to message people you&apos;ve matched with.
            </p>
          </div>
          <DiscoverDemo />
        </Container>
      </section>
      <EarlyAccessBand />
    </>
  );
}
