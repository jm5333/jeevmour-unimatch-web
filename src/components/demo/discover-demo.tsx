"use client";

import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { ProfileCard } from "@/components/demo/profile-card";
import { demoProfiles, icebreakers, modes, type DemoProfile, type Mode } from "@/lib/demo/profiles";

type Direction = "like" | "pass";

export function DiscoverDemo({ initialMode = "dating" }: { initialMode?: Mode }) {
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [positions, setPositions] = useState<Record<Mode, number>>({ dating: 0, friendship: 0, mentorship: 0 });
  const [expanded, setExpanded] = useState(false);
  const [direction, setDirection] = useState<Direction>("pass");
  const [match, setMatch] = useState<DemoProfile | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const matchHeadingRef = useRef<HTMLHeadingElement>(null);

  const deck = useMemo(() => demoProfiles.filter((p) => p.mode === mode), [mode]);
  const index = positions[mode];
  const current: DemoProfile | undefined = deck[index];

  useEffect(() => {
    if (match) matchHeadingRef.current?.focus();
  }, [match]);

  function advance(next: string) {
    setPositions((p) => ({ ...p, [mode]: p[mode] + 1 }));
    setExpanded(false);
    const following = deck[index + 1];
    setAnnouncement(following ? `${next} Now showing ${following.name}.` : `${next} That's every demo profile in this mode.`);
  }

  function act(kind: Direction) {
    if (!current || match) return;
    setDirection(kind);
    if (kind === "like" && current.likesBack) {
      setMatch(current);
      setAnnouncement(`Demo match with ${current.name}.`);
      return;
    }
    advance(kind === "like" ? `You liked ${current.name}.` : `You passed on ${current.name}.`);
  }

  function closeMatch() {
    if (!match) return;
    const name = match.name;
    setMatch(null);
    advance(`Closed the demo match with ${name}.`);
  }

  function selectMode(next: Mode, focus = false) {
    setMode(next);
    setExpanded(false);
    setMatch(null);
    const label = modes.find((m) => m.id === next)?.label;
    setAnnouncement(`${label} mode.`);
    if (focus) tabRefs.current[modes.findIndex((m) => m.id === next)]?.focus();
  }

  function onTabKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = modes.length - 1;
    let target = -1;
    if (e.key === "ArrowRight") target = i === last ? 0 : i + 1;
    if (e.key === "ArrowLeft") target = i === 0 ? last : i - 1;
    if (e.key === "Home") target = 0;
    if (e.key === "End") target = last;
    if (target >= 0) {
      e.preventDefault();
      selectMode(modes[target].id, true);
    }
  }

  function onCardKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      act("like");
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      act("pass");
    }
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x > 110) act("like");
    else if (info.offset.x < -110) act("pass");
  }

  function restart() {
    setPositions((p) => ({ ...p, [mode]: 0 }));
    setAnnouncement(`Starting over. Now showing ${deck[0]?.name}.`);
  }

  const exitX = reduceMotion ? 0 : direction === "like" ? 320 : -320;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-[380px] rounded-[2.6rem] border-[10px] border-plum bg-ivory p-3 shadow-[0_30px_80px_rgba(36,19,47,0.25)]">
        <div className="flex items-center justify-between px-1 pb-3 pt-1">
          <p className="font-display text-xl font-semibold text-plum">Discover</p>
          <span className="rounded-full bg-coral-100 px-2.5 py-1 text-xs font-semibold text-coral-700">Demo · fictional profiles</span>
        </div>

        <div role="tablist" aria-label="Connection mode" className="mb-3 grid grid-cols-3 gap-1 rounded-full bg-ivory-200 p-1">
          {modes.map((m, i) => {
            const selected = m.id === mode;
            return (
              <button
                key={m.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${m.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectMode(m.id)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
                className={`min-h-10 rounded-full text-[0.85rem] font-semibold transition-colors ${
                  selected ? "bg-plum text-ivory" : "text-plum hover:bg-ivory"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${mode}`}
          className="relative h-[470px]"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {current ? (
              <motion.div
                key={current.id}
                className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0, rotate: 0 }}
                exit={{ opacity: 0, x: exitX, rotate: reduceMotion ? 0 : exitX / 40 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.28, ease: "easeOut" }}
                drag={expanded || match ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={onDragEnd}
                tabIndex={0}
                role="group"
                aria-roledescription="profile card"
                aria-label={`${current.name}, ${current.age}. ${current.program}. Use the Like and Pass buttons, or the left and right arrow keys.`}
                onKeyDown={onCardKeyDown}
              >
                <ProfileCard profile={current} expanded={expanded} />
              </motion.div>
            ) : (
              <motion.div
                key="end"
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-[1.6rem] bg-lavender-100 p-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="font-display text-2xl font-semibold text-plum">That&apos;s everyone in this demo.</p>
                <p className="text-muted">In the real app, you&apos;d only see verified students from your own university.</p>
                <button type="button" onClick={restart} className="min-h-11 rounded-full bg-plum px-5 font-semibold text-ivory">
                  Start over
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {match ? (
            <div
              role="dialog"
              aria-modal="false"
              aria-labelledby={`${baseId}-match-title`}
              className="absolute inset-0 z-10 flex flex-col justify-center gap-4 rounded-[1.6rem] bg-plum p-6 text-ivory"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender">Demo match</p>
              <h3
                id={`${baseId}-match-title`}
                ref={matchHeadingRef}
                tabIndex={-1}
                className="font-display text-4xl font-semibold italic leading-none"
              >
                You and {match.name} both said yes.
              </h3>
              <p className="text-on-plum-muted">
                {match.name} is a fictional profile, so nobody was notified. In the app, a match opens a chat with an icebreaker like:
              </p>
              <p className="rounded-2xl bg-plum-700 p-3 font-display text-lg leading-snug">
                &ldquo;{icebreakers[match.mode][0]}&rdquo;
              </p>
              <button
                type="button"
                onClick={closeMatch}
                className="min-h-12 rounded-full bg-coral font-semibold text-plum hover:bg-[#f2665f]"
              >
                Keep browsing
              </button>
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => act("pass")}
            disabled={!current || !!match}
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-plum bg-white text-plum transition-colors hover:bg-ivory-200 disabled:opacity-40"
          >
            <span className="sr-only">Pass</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            disabled={!current || !!match}
            aria-pressed={expanded}
            className="min-h-11 rounded-full bg-ivory-200 px-4 text-sm font-semibold text-plum hover:bg-lavender-100 disabled:opacity-40"
          >
            {expanded ? "Show less" : "View profile"}
          </button>
          <button
            type="button"
            onClick={() => act("like")}
            disabled={!current || !!match}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-coral text-plum transition-colors hover:bg-[#f2665f] disabled:opacity-40"
          >
            <span className="sr-only">Like</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
          </button>
        </div>
      </div>

      <p className="max-w-[380px] text-center text-sm text-muted">
        Everyone here is fictional. Drag the card, use the buttons, or focus the card and press the arrow keys.
      </p>
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
