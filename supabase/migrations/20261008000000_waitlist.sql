-- UniMatch early access waitlist
-- Run this once in the Supabase SQL editor (or with `supabase db push`).
--
-- Security model:
--   * Row Level Security is ON and there are NO policies, so the public
--     anon/authenticated roles can't read or write anything.
--   * Only the website's server code, using the secret (service role) key,
--     can insert rows. That key never reaches the browser.

-- Signups -------------------------------------------------------------------
create table if not exists public.waitlist_signups (
  id                uuid primary key default gen_random_uuid(),
  email             text not null check (char_length(email) between 3 and 254),
  email_normalized  text generated always as (lower(btrim(email))) stored,
  university        text not null check (char_length(university) between 2 and 120),
  interests         text[] not null default '{}'
                    check (interests <@ array['dating', 'friendship', 'mentorship']::text[]),
  marketing_consent boolean not null default false,
  consent_at        timestamptz,
  confirmed_adult_student boolean not null check (confirmed_adult_student),
  source            text not null default 'website',
  created_at        timestamptz not null default now()
);

create unique index if not exists waitlist_signups_email_unique
  on public.waitlist_signups (email_normalized);

-- Abuse prevention: one row per form attempt, keyed by a salted IP hash.
create table if not exists public.waitlist_attempts (
  id         bigint generated always as identity primary key,
  ip_hash    text not null,
  created_at timestamptz not null default now()
);

create index if not exists waitlist_attempts_ip_time
  on public.waitlist_attempts (ip_hash, created_at desc);

-- Lock everything down -------------------------------------------------------
alter table public.waitlist_signups  enable row level security;
alter table public.waitlist_attempts enable row level security;

revoke all on public.waitlist_signups  from anon, authenticated;
revoke all on public.waitlist_attempts from anon, authenticated;

-- Housekeeping: delete attempt records older than 30 days.
-- Schedule it with Supabase Cron (Integrations > Cron), e.g. daily:
--   select public.purge_old_waitlist_attempts();
create or replace function public.purge_old_waitlist_attempts()
returns void
language sql
security definer
set search_path = ''
as $$
  delete from public.waitlist_attempts where created_at < now() - interval '30 days';
$$;

revoke all on function public.purge_old_waitlist_attempts() from public, anon, authenticated;
