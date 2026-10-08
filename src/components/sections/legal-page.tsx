import type { ReactNode } from "react";
import { Container, PageHeader } from "@/components/ui/layout";

/**
 * Layout for policy pages. Every policy is a DRAFT until a qualified
 * person reviews it; the banner stays until then.
 */
export function LegalPage({
  title,
  intro,
  updated,
  children,
}: {
  title: string;
  intro: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow="Policies" title={title} intro={<p>{intro}</p>} />
      <section className="bg-white">
        <Container className="py-14 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <div role="note" className="mb-10 rounded-2xl border-2 border-coral bg-coral-100 p-4 text-sm text-plum">
              <strong>Draft for review.</strong> This page has not been reviewed by a lawyer yet and must be checked
              before UniMatch launches publicly.
            </div>
            <p className="mb-8 text-sm text-muted">Last updated: {updated}</p>
            <div className="prose-um text-charcoal">{children}</div>
          </div>
        </Container>
      </section>
    </>
  );
}
