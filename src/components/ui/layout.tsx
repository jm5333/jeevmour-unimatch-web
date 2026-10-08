import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`text-sm font-semibold uppercase tracking-[0.14em] ${
        tone === "dark" ? "text-lavender" : "text-lavender-700"
      }`}
    >
      {children}
    </p>
  );
}

/** Page header used at the top of every inner page. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark bg-plum text-ivory">
      <Container className="pb-16 pt-14 sm:pb-24 sm:pt-20">
        <div className="max-w-3xl space-y-5">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h1 className="text-[clamp(2.4rem,5.5vw,4.25rem)] font-semibold leading-[1.02]">{title}</h1>
          {intro ? <div className="max-w-2xl text-lg text-on-plum-muted sm:text-xl">{intro}</div> : null}
          {children}
        </div>
      </Container>
    </section>
  );
}

/** Honest labelling for features that are not built yet. */
export function StatusTag({ status }: { status: "planned" | "demo" | "live" }) {
  const map = {
    planned: { label: "Planned", cls: "bg-lavender-100 text-lavender-700" },
    demo: { label: "Demo", cls: "bg-coral-100 text-coral-700" },
    live: { label: "Live now", cls: "bg-[#dff3e8] text-[#1d6b45]" },
  } as const;
  const { label, cls } = map[status];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}>
      {label}
    </span>
  );
}
