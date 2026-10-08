import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";

export default function NotFound() {
  return (
    <section className="bg-ivory">
      <Container className="flex min-h-[60vh] flex-col items-start justify-center gap-6 py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-lavender-700">404</p>
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] text-plum">
          This page didn&apos;t match.
        </h1>
        <p className="max-w-lg text-lg text-muted">
          The link may be old, or the page may have moved. Let&apos;s get you somewhere useful.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/discover" variant="secondary">
            Try the demo
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
