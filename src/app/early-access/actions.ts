"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { waitlistSchema } from "@/lib/waitlist/schema";
import type { WaitlistField, WaitlistState } from "@/lib/waitlist/types";
import { site } from "@/lib/site";

const MAX_ATTEMPTS_PER_HOUR = 5;
const MIN_FILL_TIME_MS = 2000;

const GENERIC_ERROR = `Something went wrong and you weren't added. Please try again, or email ${site.emails.support}.`;

async function hashClientIp(): Promise<string> {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip")?.trim() ||
    "unknown";
  const salt = process.env.WAITLIST_IP_SALT ?? "";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function joinWaitlist(_prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  const nonce = Date.now();
  const values = {
    email: String(formData.get("email") ?? "").slice(0, 300),
    university: String(formData.get("university") ?? "").slice(0, 200),
    interests: formData.getAll("interests").map(String).slice(0, 3),
    marketingConsent: formData.get("marketingConsent") === "on",
  };

  // 1. Spam traps: a hidden field humans never fill, and a minimum fill time.
  const honeypot = String(formData.get("company") ?? "");
  const startedAt = Number(formData.get("startedAt") ?? 0);
  if (honeypot.length > 0 || !Number.isFinite(startedAt) || nonce - startedAt < MIN_FILL_TIME_MS) {
    return { status: "error", message: "We couldn't submit that. Please wait a moment and try again.", values, nonce };
  }

  // 2. Validate on the server, always.
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

  // 3. Fail honestly if the database isn't configured.
  const db = getSupabaseAdmin();
  if (!db) {
    console.error("[waitlist] SUPABASE_URL or SUPABASE_SECRET_KEY is not set.");
    return {
      status: "error",
      message: `Early access signups aren't open yet. Please email ${site.emails.hello} and we'll add you.`,
      values,
      nonce,
    };
  }

  // 4. Rate limit by salted IP hash.
  const ipHash = await hashClientIp();
  const attempt = await db.from("waitlist_attempts").insert({ ip_hash: ipHash });
  if (attempt.error) {
    console.error("[waitlist] attempt insert failed", attempt.error.message);
    return { status: "error", message: GENERIC_ERROR, values, nonce };
  }
  const since = new Date(nonce - 60 * 60 * 1000).toISOString();
  const recent = await db
    .from("waitlist_attempts")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);
  if (recent.error) {
    console.error("[waitlist] rate limit check failed", recent.error.message);
    return { status: "error", message: GENERIC_ERROR, values, nonce };
  }
  if ((recent.count ?? 0) > MAX_ATTEMPTS_PER_HOUR) {
    return {
      status: "error",
      message: "Too many attempts from this connection. Please try again in an hour.",
      values,
      nonce,
    };
  }

  // 5. Save. A duplicate email means they're already on the list, which is
  //    still a true "you're on the list" (and doesn't reveal anything new).
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
    console.error("[waitlist] signup insert failed", insert.error.code, insert.error.message);
    return { status: "error", message: GENERIC_ERROR, values, nonce };
  }

  return {
    status: "success",
    message: "You're on the list. We'll email you when UniMatch opens at your university.",
    nonce,
  };
}
