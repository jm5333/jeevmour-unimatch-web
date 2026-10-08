import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";

export function EarlyAccessBand({
  title = "Be one of the first students in.",
  body = "We're opening UniMatch campus by campus. Join the early access list and we'll email you when your school is next.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="early-access-band" className="py-16 sm:py-24">
      <Container>
        <div className="on-dark grid gap-8 rounded-[var(--radius-panel)] bg-plum px-6 py-12 text-ivory sm:px-12 sm:py-16 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div className="space-y-4">
            <h2 id="early-access-band" className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.03]">
              {title}
            </h2>
            <p className="max-w-xl text-lg text-on-plum-muted">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <ButtonLink href="/early-access" size="lg">
              Get early access
            </ButtonLink>
            <ButtonLink href="/discover" size="lg" variant="ghost-light">
              Try the demo
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
