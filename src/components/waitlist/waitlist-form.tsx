"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useRef } from "react";
import { joinWaitlist } from "@/app/early-access/actions";
import { initialWaitlistState, interestOptions, type WaitlistField } from "@/lib/waitlist/types";

const inputCls =
  "mt-2 block min-h-12 w-full rounded-xl border-2 bg-white px-4 text-base text-charcoal placeholder:text-muted/80 focus:border-lavender-700 focus:outline-none aria-[invalid=true]:border-coral-700";

export function WaitlistForm() {
  const id = useId();
  const [state, action, pending] = useActionState(joinWaitlist, initialWaitlistState);
  const startedAt = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  // Record when the form became usable (simple bot check), and move focus
  // to the result after each submission.
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
    if (state.status === "error") summaryRef.current?.focus();
    if (state.status === "success") successRef.current?.focus();
  }, [state.nonce, state.status]);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-[var(--radius-panel)] bg-plum p-8 text-ivory sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-lavender">Early access</p>
        <h2 ref={successRef} tabIndex={-1} className="mt-3 text-4xl font-semibold leading-tight">
          You&apos;re on the list.
        </h2>
        <p className="mt-4 text-lg text-on-plum-muted">
          We&apos;ll email you when UniMatch opens at your university. In the meantime, try the demo or tell a friend.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/discover" className="inline-flex min-h-11 items-center rounded-full bg-coral px-5 font-semibold text-plum">
            Try the demo
          </Link>
          <Link href="/" className="inline-flex min-h-11 items-center rounded-full border-2 border-ivory/70 px-5 font-semibold text-ivory">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const err = (f: WaitlistField) => state.fieldErrors?.[f];
  const describedBy = (f: WaitlistField, hint?: string) =>
    [hint, err(f) ? `${id}-${f}-error` : null].filter(Boolean).join(" ") || undefined;
  const v = state.values;

  return (
    <form key={state.nonce ?? 0} action={action} noValidate className="space-y-7" aria-describedby={`${id}-privacy`}>
      {state.status === "error" ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-2xl border-2 border-coral-700 bg-coral-100 p-4 text-plum"
        >
          <p className="font-semibold">{state.message}</p>
          {state.fieldErrors ? (
            <ul className="mt-2 list-disc pl-5 text-sm">
              {Object.entries(state.fieldErrors).map(([field, msg]) => (
                <li key={field}>
                  <a className="underline underline-offset-2" href={`#${id}-${field}`}>
                    {msg}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAt} type="hidden" name="startedAt" defaultValue="0" />

      <div>
        <label htmlFor={`${id}-email`} className="font-semibold text-plum">
          Email address
        </label>
        <p id={`${id}-email-hint`} className="text-sm text-muted">
          Your university email is best, but any email you check works.
        </p>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          defaultValue={v?.email}
          aria-invalid={err("email") ? true : undefined}
          aria-describedby={describedBy("email", `${id}-email-hint`)}
          className={`${inputCls} border-line`}
          placeholder="you@university.edu"
        />
        {err("email") ? (
          <p id={`${id}-email-error`} className="mt-2 text-sm font-semibold text-coral-700">
            {err("email")}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={`${id}-university`} className="font-semibold text-plum">
          University
        </label>
        <input
          id={`${id}-university`}
          name="university"
          type="text"
          autoComplete="organization"
          required
          defaultValue={v?.university}
          aria-invalid={err("university") ? true : undefined}
          aria-describedby={describedBy("university")}
          className={`${inputCls} border-line`}
          placeholder="e.g. Drexel University"
        />
        {err("university") ? (
          <p id={`${id}-university-error`} className="mt-2 text-sm font-semibold text-coral-700">
            {err("university")}
          </p>
        ) : null}
      </div>

      <fieldset id={`${id}-interests`}>
        <legend className="font-semibold text-plum">
          What are you interested in? <span className="font-normal text-muted">(optional)</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {interestOptions.map((o) => (
            <label
              key={o.value}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border-2 border-line bg-white px-4 font-medium text-plum has-[:checked]:border-plum has-[:checked]:bg-lavender-100"
            >
              <input
                type="checkbox"
                name="interests"
                value={o.value}
                defaultChecked={v?.interests.includes(o.value)}
                className="h-4 w-4 accent-[var(--color-plum)]"
              />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-4">
        <label className="flex cursor-pointer gap-3" htmlFor={`${id}-confirmedAdultStudent`}>
          <input
            id={`${id}-confirmedAdultStudent`}
            type="checkbox"
            name="confirmedAdultStudent"
            required
            aria-invalid={err("confirmedAdultStudent") ? true : undefined}
            aria-describedby={describedBy("confirmedAdultStudent")}
            className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-plum)]"
          />
          <span className="text-charcoal">I&apos;m 18 or older and a current university student.</span>
        </label>
        {err("confirmedAdultStudent") ? (
          <p id={`${id}-confirmedAdultStudent-error`} className="text-sm font-semibold text-coral-700">
            {err("confirmedAdultStudent")}
          </p>
        ) : null}

        <label className="flex cursor-pointer gap-3" htmlFor={`${id}-marketing`}>
          <input
            id={`${id}-marketing`}
            type="checkbox"
            name="marketingConsent"
            defaultChecked={v?.marketingConsent}
            className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-plum)]"
          />
          <span className="text-charcoal">
            Send me occasional product updates too. <span className="text-muted">(Optional. Unsubscribe anytime.)</span>
          </span>
        </label>
      </div>

      <p id={`${id}-privacy`} className="text-sm text-muted">
        We&apos;ll use your email to tell you when UniMatch opens at your university. We don&apos;t sell your data. See
        our{" "}
        <Link href="/privacy" className="font-semibold text-lavender-700 underline underline-offset-2">
          privacy policy
        </Link>
        .
      </p>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-coral px-7 text-base font-semibold text-plum transition-colors hover:bg-[#f2665f] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {pending ? "Adding you…" : "Get early access"}
      </button>
      <p aria-live="polite" className="sr-only">
        {pending ? "Submitting your signup." : ""}
      </p>
    </form>
  );
}
