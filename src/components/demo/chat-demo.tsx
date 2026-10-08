"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { icebreakers, modes, type Mode } from "@/lib/demo/profiles";

type Msg = { id: number; from: "you" | "them"; text: string };

const partner: Record<Mode, { name: string; replies: string[] }> = {
  dating: {
    name: "Leah",
    replies: [
      "Okay that's a good question. The rooftop garden, no contest. Have you been?",
      "Ha, I like that answer. Coffee this week?",
      "You're making a strong case for yourself.",
    ],
  },
  friendship: {
    name: "Priya",
    replies: [
      "Iced chai, always. What about you?",
      "Honestly the park sounds perfect after this week.",
      "I've been meaning to try the climbing club too!",
    ],
  },
  mentorship: {
    name: "Nadia",
    replies: [
      "Great question. Start applying earlier than you think you need to.",
      "Happy to look at your resume if you want to send it over.",
      "Office hours, honestly. They changed everything for me.",
    ],
  },
};

export function ChatDemo() {
  const baseId = useId();
  const [mode, setMode] = useState<Mode>("dating");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [replyIndex, setReplyIndex] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ block: "nearest" });
  }, [messages, typing]);

  function switchMode(next: Mode) {
    if (timer.current) clearTimeout(timer.current);
    setMode(next);
    setMessages([]);
    setDraft("");
    setTyping(false);
    setReplyIndex(0);
  }

  function pickIcebreaker(text: string) {
    setDraft(text);
    inputRef.current?.focus();
  }

  function send(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { id: Date.now(), from: "you", text }]);
    setDraft("");
    setTyping(true);
    const replies = partner[mode].replies;
    const reply = replies[replyIndex % replies.length];
    timer.current = setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, from: "them", text: reply }]);
      setTyping(false);
      setReplyIndex((i) => i + 1);
    }, 900);
  }

  const p = partner[mode];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:items-start">
      <div className="space-y-6">
        <fieldset>
          <legend className="text-sm font-semibold text-plum">Preview mode</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {modes.map((m) => (
              <label
                key={m.id}
                className={`inline-flex min-h-11 cursor-pointer items-center rounded-full border-2 px-4 font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-lavender-700 ${
                  mode === m.id ? "border-plum bg-plum text-ivory" : "border-line bg-white text-plum hover:border-plum"
                }`}
              >
                <input
                  type="radio"
                  name={`${baseId}-mode`}
                  value={m.id}
                  checked={mode === m.id}
                  onChange={() => switchMode(m.id)}
                  className="sr-only"
                />
                {m.label}
              </label>
            ))}
          </div>
        </fieldset>
        <div>
          <h3 className="font-sans text-sm font-semibold text-plum">Suggested icebreakers</h3>
          <ul className="mt-2 space-y-2">
            {icebreakers[mode].map((q) => (
              <li key={q}>
                <button
                  type="button"
                  onClick={() => pickIcebreaker(q)}
                  className="w-full rounded-2xl border border-line bg-white p-4 text-left font-display text-lg leading-snug text-plum transition-colors hover:border-plum hover:bg-lavender-100"
                >
                  {q}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted">Pick one to drop it into the message box. You can edit it before sending.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border-[8px] border-plum bg-ivory shadow-[0_24px_60px_rgba(36,19,47,0.2)]">
        <div className="flex items-center gap-3 border-b border-line bg-white px-4 py-3">
          <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender-200 font-display text-lg font-semibold text-plum">
            {p.name[0]}
          </span>
          <div className="leading-tight">
            <p className="font-semibold text-plum">{p.name}</p>
            <p className="text-xs text-muted">Fictional demo match</p>
          </div>
        </div>
        <p className="bg-coral-100 px-4 py-2 text-xs font-semibold text-coral-700">
          Demo only. Messages aren&apos;t sent anywhere and replies are pre-written.
        </p>
        <ol ref={listRef} aria-label={`Demo conversation with ${p.name}`} aria-live="polite" className="flex h-80 flex-col gap-2 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <li className="m-auto max-w-[16rem] text-center text-sm text-muted">
              You matched with {p.name}. Pick an icebreaker or write your own to start.
            </li>
          ) : null}
          {messages.map((m) => (
            <li
              key={m.id}
              className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 ${
                m.from === "you" ? "self-end rounded-br-md bg-plum text-ivory" : "self-start rounded-bl-md bg-white text-charcoal"
              }`}
            >
              <span className="sr-only">{m.from === "you" ? "You: " : `${p.name} (demo reply): `}</span>
              {m.text}
            </li>
          ))}
          {typing ? (
            <li className="self-start rounded-2xl bg-white px-3.5 py-2.5 text-sm text-muted">{p.name} is typing…</li>
          ) : null}
        </ol>
        <form onSubmit={send} className="flex gap-2 border-t border-line bg-white p-3">
          <label htmlFor={`${baseId}-msg`} className="sr-only">
            Message {p.name}
          </label>
          <input
            ref={inputRef}
            id={`${baseId}-msg`}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={280}
            autoComplete="off"
            placeholder={`Message ${p.name}`}
            className="min-h-11 min-w-0 flex-1 rounded-full border border-line bg-ivory px-4 text-[0.95rem] text-charcoal placeholder:text-muted"
          />
          <button
            type="submit"
            disabled={!draft.trim() || typing}
            className="min-h-11 rounded-full bg-coral px-4 font-semibold text-plum hover:bg-[#f2665f] disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
