import type { Metadata } from "next";
import { EarlyAccessBand } from "@/components/sections/early-access-band";
import { Container, Eyebrow, PageHeader } from "@/components/ui/layout";
import { PhotoSlot } from "@/components/ui/photo-slot";

export const metadata: Metadata = {
  title: "Inclusivity",
  description: "Connection is for everyone. So is love. How UniMatch includes students with disabilities in romance and dating.",
  alternates: { canonical: "/inclusivity" },
};

const commitments = [
  {
    title: "One discovery experience for everyone",
    body: "Students with disabilities appear in the same feed as everyone else. We will never create a separate or mandatory dating pool.",
  },
  {
    title: "Romance, not only support",
    body: "We don't assume anyone is only looking for friendship or help. If you're here for dating, you're here for dating.",
  },
  {
    title: "Disclosure is your choice",
    body: "You can share something about disability on your profile, keep it for a conversation, or never mention it. It's never required.",
  },
  {
    title: "No medical details, ever",
    body: "We don't ask for diagnoses or documentation, and we won't use sensitive information to sort or rank you.",
  },
  {
    title: "Preferences and boundaries are respected",
    body: "Attraction is personal. Everyone controls who they like and who they match with, and consent always comes first.",
  },
  {
    title: "Accessible from the first screen",
    body: "Screen reader support, keyboard access, captions, readable contrast and alternatives to swiping are part of the build, not an add-on.",
  },
];

export default function InclusivityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Inclusivity"
        title={
          <>
            Connection is for everyone. <em className="font-normal text-lavender">So is love.</em>
          </>
        }
        intro={
          <p>
            Students with visible and non-visible disabilities want what every student wants: to flirt, to date, to
            fall for someone and to be wanted back. UniMatch is built so they can do that in the same place as
            everyone else.
          </p>
        }
      />

      <section aria-labelledby="story-title" className="bg-white">
        <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div className="space-y-5">
            <Eyebrow>Our starting point</Eyebrow>
            <h2 id="story-title" className="text-4xl font-semibold leading-tight text-plum">
              Accessibility is more than a ramp to the front door.
            </h2>
            <p className="text-lg text-muted">
              Plenty of apps are technically usable with a screen reader. Far fewer treat disabled people as potential
              partners. The difference shows up in small moments: who gets shown in the feed, what profiles are allowed
              to say, and whether anyone is quietly filtered out.
            </p>
            <p className="text-lg text-muted">
              We&apos;re designing UniMatch so that a student who uses a wheelchair, a Deaf student, an autistic
              student or someone living with chronic illness can show up as exactly who they are and be seen as
              someone worth asking out.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <PhotoSlot
              tone="lavender"
              ratio="aspect-[3/4]"
              shot="Two students on a picnic date on the campus lawn. One uses a power wheelchair."
            />
            <PhotoSlot
              tone="coral"
              ratio="aspect-[3/4]"
              className="mt-10"
              shot="A couple laughing at a concert. One wears hearing aids."
            />
          </div>
        </Container>
      </section>

      <section aria-labelledby="commit-title" className="border-t border-line bg-ivory">
        <Container className="py-16 sm:py-24">
          <div className="max-w-2xl space-y-4">
            <Eyebrow>Our commitments</Eyebrow>
            <h2 id="commit-title" className="text-4xl font-semibold leading-tight text-plum">
              What this means in the product.
            </h2>
          </div>
          <ul className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
            {commitments.map((c) => (
              <li key={c.title} className="space-y-2 border-t-2 border-plum pt-5">
                <h3 className="font-sans text-xl font-semibold text-plum">{c.title}</h3>
                <p className="text-muted">{c.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-14 max-w-2xl text-muted">
            We&apos;ll keep learning from disabled students and advocates as we build. If you&apos;d like to help shape
            this, write to us at{" "}
            <a className="font-semibold text-lavender-700 underline underline-offset-4" href="mailto:hello@unimatch.app">
              hello@unimatch.app
            </a>
            .
          </p>
        </Container>
      </section>
      <EarlyAccessBand title="Your place is in the same room." />
    </>
  );
}
