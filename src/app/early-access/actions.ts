"use server";

import { createHmac } from "node:crypto";
import { headers } from "next/headers";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { waitlistSchema } from "@/lib/waitlist/schema";
import type { WaitlistField, WaitlistState } from "@/lib/waitlist/types";
import { site } from "@/lib/site";

const MAX_ATTEMPTS_PER_IP_PER_HOUR = 5;
const MAX_ATTEMPTS_SITEWIDE_PER_MINUTE = 60;
const MIN_FILL_TIME_MS = 2000;
const MAX_FIELD_LENGTH = 300;

const GENERIC_ERROR = `Something went wrong and you weren't added. Please try again, or email ${site.emails.support}.`;

/**
 * Extra CSRF guard on top of Next.js's own check: a browser submission must
 * come from this same site. (Next.js lets requests with no Origin header
 * through; we don't.)
 */
function isSameOrigin(h: Headers): boolean {
  const origin = h.get("origin");
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/**
 * The visitor's IP, as reported by the hosting platform. On Vercel,
 * x-vercel-forwarded-for / x-real-ip are set by Vercel itself, not the client.
 */
function clientIp(h: Headers): string {
  return (
    h.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip")?.trim() ||
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

export async function joinWaitlist(_prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  const nonce = Date.now();
  const text = (key: string) => {
    const v = formData.get(key);
    return typeof v === "string" ? v.slice(0, MAX_FIELD_LENGTH) : "";
  };
  const values = {
    email: text("email"),
    university: text("university"),
    interests: formData
      .getAll("interests")
      .filter((v): v is string => typeof v === "string")
      .slice(0, 3),
    marketingConsent: formData.get("marketingConsent") === "on",
  };

  const h = await headers();

  // 1. Only accept submissions made from this website.
  if (!isSameOrigin(h)) {
    return { status: "error", message: "We couldn't submit that. Please reload the page and try again.", values, nonce };
  }

  // 2. Spam traps: a hidden field people never fill, and a minimum fill time.
  const startedAt = Number(text("startedAt") || 0);
  if (text("company").length > 0 || !Number.isFinite(startedAt) || nonce - startedAt < MIN_FILL_TIME_MS) {
    return { status: "error", message: "We couldn't submit that. Please wait a moment and try again.", values, nonce };
  }

  // 3. Validate and clean every field on the server.
  const parsed = waitlistSchema.safeParse({
    ...values,
    confirmedAdultStudent: formData.get("confirmedAdultStudent") === "on",
  });
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error).fieldErrors as Partial<Record<WaitlistField, string[]>>;
    const fieldErrors: Partial<Record<WaitlistField, string>> = {};
    for (const key of Object.keys(flat) as WaitlistField[]) {
      const first = flat[key]?.[0];
      if (first) fieldErrors[key] = first;
    }
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors, values, nonce };
  }

  // 4. Fail honestly (and closed) if the server isn't fully configured.
  const db = getSupabaseAdmin();
  const salt = process.env.WAITLIST_IP_SALT;
  if (!db || !salt || salt.length < 16) {
    console.error("[waitlist] Missing SUPABASE_URL, SUPABASE_SECRET_KEY or WAITLIST_IP_SALT.");
    return {
      status: "error",
      message: `Early access signups aren't open yet. Please email ${site.emails.hello} and we'll add you.`,
      values,
      nonce,
    };
  }

  // 5. Rate limits: per visitor (keyed by a keyed hash of the IP, never the
  //    raw IP) and site-wide, so a burst from many addresses is also capped.
  const ipHash = createHmac("sha256", salt).update(clientIp(h)).digest("hex");
  const attempt = await db.from("waitlist_attempts").insert({ ip_hash: ipHash });
  if (attempt.error) {
    console.error("[waitlist] attempt insert failed:", attempt.error.code);
    return { status: "error", message: GENERIC_ERROR, values, nonce };
  }

  const [perIp, sitewide] = await Promise.all([
    db
      .from("waitlist_attempts")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", new Date(nonce - 60 * 60 * 1000).toISOString()),
    db
      .from("waitlist_attempts")
      .select("id", { count: "exact", head: true })
      .gte("created_at", new Date(nonce - 60 * 1000).toISOString()),
  ]);
  if (perIp.error || sitewide.error) {
    console.error("[waitlist] rate limit check failed:", perIp.error?.code ?? sitewide.error?.code);
    return { status: "error", message: GENERIC_ERROR, values, nonce };
  }
  if ((perIp.count ?? 0) > MAX_ATTEMPTS_PER_IP_PER_HOUR) {
    return { status: "error", message: "Too many attempts from this connection. Please try again in an hour.", values, nonce };
  }
  if ((sitewide.count ?? 0) > MAX_ATTEMPTS_SITEWIDE_PER_MINUTE) {
    return { status: "error", message: "We're getting a lot of signups right now. Please try again in a few minutes.", values, nonce };
  }

  // 6. Save. A duplicate email means they're already on the list, which is
  //    still a true "you're on the list" (and reveals nothing new).
  const { email, university, interests, marketingConsent } = parsed.data;
  const insert = await db.from("waitlist_signups").insert({
    email,
    university,
    interests,
    marketing_consent: marketingConsent,
    consent_at: marketingConsent ? new Date(nonce).toISOString() : null,
    confirmed_adult_student: true,
  });

  if (insert.error && insert.error.code !== "23505") {
    // Log the code only: Postgres messages can echo the submitted values.
    console.error("[waitlist] signup insert failed:", insert.error.code);
    return { status: "error", message: GENERIC_ERROR, values, nonce };
  }

  return {
    status: "success",
    message: "You're on the list. We'll email you when UniMatch opens at your university.",
    nonce,
  };
}
