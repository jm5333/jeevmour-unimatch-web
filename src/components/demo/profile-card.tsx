import type { DemoProfile } from "@/lib/demo/profiles";
import { demoUniversity } from "@/lib/demo/profiles";

const toneStyles: Record<DemoProfile["tone"], { bg: string; figure: string; accent: string }> = {
  coral: { bg: "#fde5e3", figure: "#f47c76", accent: "#24132f" },
  lavender: { bg: "#efe8fa", figure: "#a78bdb", accent: "#24132f" },
  ivory: { bg: "#f2ece2", figure: "#d9a77f", accent: "#24132f" },
  plum: { bg: "#45285a", figure: "#a78bdb", accent: "#faf7f2" },
};

/** Illustrated stand-in for a profile photo. Never a real person. */
export function DemoPhoto({ profile, className = "" }: { profile: DemoProfile; className?: string }) {
  const t = toneStyles[profile.tone];
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: t.bg }}
      role="img"
      aria-label={`Illustrated demo photo for ${profile.name}, a fictional student`}
    >
      <svg viewBox="0 0 200 240" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <circle cx="100" cy="92" r="40" fill={t.figure} />
        <path d="M30 240c0-46 31-78 70-78s70 32 70 78z" fill={t.figure} />
        <circle cx="160" cy="40" r="14" fill="none" stroke={t.accent} strokeOpacity="0.25" strokeWidth="3" />
      </svg>
      <span
        className="absolute left-3 top-3 rounded-full px-2 py-0.5 text-[0.7rem] font-semibold"
        style={{ background: "rgba(250,247,242,0.92)", color: "#24132f" }}
      >
        Demo photo
      </span>
    </div>
  );
}

export function UniversityBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-plum px-2.5 py-1 text-[0.72rem] font-semibold text-ivory">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
      </svg>
      {demoUniversity}
    </span>
  );
}

/** The card itself. `expanded` shows every prompt and anything they chose to share. */
export function ProfileCard({
  profile,
  expanded = false,
  compact = false,
}: {
  profile: DemoProfile;
  expanded?: boolean;
  /** Smaller photo, for previews where the card is short. */
  compact?: boolean;
}) {
  const prompts = expanded ? profile.prompts : profile.prompts.slice(0, 1);
  const photoHeight = expanded ? "h-32" : compact ? "h-36" : "h-48";
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white shadow-[0_10px_30px_rgba(36,19,47,0.12)]">
      <DemoPhoto profile={profile} className={`${photoHeight} shrink-0`} />
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-[1.7rem] font-semibold leading-none text-plum">
            {profile.name}, <span className="font-normal">{profile.age}</span>
          </h3>
          <UniversityBadge />
        </div>
        <p className="text-sm text-muted">{profile.program}</p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Interests">
          {profile.interests.map((i) => (
            <li key={i} className="rounded-full bg-ivory-200 px-2.5 py-1 text-[0.78rem] font-medium text-plum">
              {i}
            </li>
          ))}
        </ul>
        {prompts.map((p) => (
          <div key={p.q} className="rounded-2xl bg-lavender-100 p-3">
            <p className="text-[0.78rem] font-semibold text-lavender-700">{p.q}</p>
            <p className="font-display text-[1.05rem] leading-snug text-plum">{p.a}</p>
          </div>
        ))}
        {expanded && profile.sharedByThem ? (
          <div className="rounded-2xl border border-line p-3">
            <p className="text-[0.78rem] font-semibold text-muted">Shared by {profile.name}</p>
            <p className="text-[0.95rem] text-charcoal">{profile.sharedByThem}</p>
          </div>
        ) : null}
      </div>
    </article>
  );
}
