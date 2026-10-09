-- Security hardening for the waitlist tables.
-- Safe to run more than once. Run it in the Supabase SQL Editor.

-- 1. Keep RLS on, and force it even for the table owner.
alter table public.waitlist_signups  enable row level security;
alter table public.waitlist_signups  force row level security;
alter table public.waitlist_attempts enable row level security;
alter table public.waitlist_attempts force row level security;

-- 2. The public (anon) and signed-in (authenticated) roles get nothing:
--    no access to the tables, their id sequence, or the cleanup function.
revoke all on table    public.waitlist_signups  from anon, authenticated;
revoke all on table    public.waitlist_attempts from anon, authenticated;
revoke all on sequence public.waitlist_attempts_id_seq from anon, authenticated;
revoke all on function public.purge_old_waitlist_attempts() from public, anon, authenticated;

-- 3. Tighter limits on stored values.
alter table public.waitlist_attempts
  drop constraint if exists waitlist_attempts_ip_hash_format;
alter table public.waitlist_attempts
  add constraint waitlist_attempts_ip_hash_format check (ip_hash ~ '^[0-9a-f]{64}$');

alter table public.waitlist_signups
  drop constraint if exists waitlist_signups_source_check;
alter table public.waitlist_signups
  add constraint waitlist_signups_source_check check (source in ('website'));

-- 4. Index used by the site-wide rate limit.
create index if not exists waitlist_attempts_created_at
  on public.waitlist_attempts (created_at desc);

-- 5. Check: both of these should return false.
select
  has_table_privilege('anon', 'public.waitlist_signups', 'select') as anon_can_read_signups,
  has_table_privilege('anon', 'public.waitlist_signups', 'insert') as anon_can_insert_signups;
