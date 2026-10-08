import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the secret (service role) key.
 * `server-only` makes the build fail if this file is ever imported
 * into client code, so the key can't leak to the browser.
 *
 * Returns null when the environment isn't configured, so callers can
 * show an honest "not open yet" message instead of crashing.
 */
let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
