# UniMatch website

The public website for **UniMatch**: *Your campus. Your people. Your kind of connection.*

Marketing pages, two clearly labelled interactive demos (Discover and the icebreaker chat), and a real early access waitlist backed by Supabase.

- **Stack:** Next.js 16 (App Router) · TypeScript (strict) · Tailwind CSS 4 · Motion · Zod · Supabase (Postgres) · Vercel
- **Fonts:** Fraunces and Instrument Sans (both SIL Open Font License, self-hosted via Fontsource)

---

## What's live, what's demo, what's planned

| Area | Status |
| --- | --- |
| All marketing pages, policies, 404, sitemap, robots, Open Graph image | Built |
| Early access waitlist (`/early-access`) | Built. Saves to Supabase once you add the environment variables below. Until then it shows an honest "not open yet" message and **never** claims success. |
| Discover demo (`/discover`, homepage) | Demo. Fictional profiles, nothing saved or sent. |
| Icebreaker chat (`/connections`) | Demo. Pre-written replies, nothing sent. |
| Real accounts, verification, matching, messaging, Say Hi | Not built (intentionally out of scope for this release) |

---

## Run it locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build` (production build), `npm run lint`.

---

## 1. Set up Supabase (waitlist database)

1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor**, paste the contents of `supabase/migrations/20261008000000_waitlist.sql`, and run it.
   This creates two tables with Row Level Security **on and no public policies**, so nobody can read or write them from a browser.
3. Go to **Project Settings → API Keys** and copy:
   - the **Project URL** → `SUPABASE_URL`
   - a **Secret key** (starts with `sb_secret_`) → `SUPABASE_SECRET_KEY`
4. Generate a random salt for hashing IP addresses: `openssl rand -hex 32` → `WAITLIST_IP_SALT`.
5. Optional: in **Integrations → Cron**, schedule `select public.purge_old_waitlist_attempts();` daily to delete rate-limit records older than 30 days (the privacy policy says 30 days).

> Never paste these keys into chat, commit them, or prefix them with `NEXT_PUBLIC_`. The Supabase client lives in `src/lib/supabase/admin.ts`, which imports `server-only`, so the build fails if it's ever pulled into browser code.

To see signups: Supabase → **Table Editor → waitlist_signups**.

---

## 2. Deploy to Vercel

1. Sign in to [vercel.com](https://vercel.com) with GitHub and **Import** this repository.
2. Framework is detected as Next.js. No build settings to change.
3. Under **Environment Variables**, add `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `WAITLIST_IP_SALT`, and `NEXT_PUBLIC_SITE_URL=https://unimatch.app` for Production (and Preview if you want previews to save signups).
4. Deploy. Test the waitlist on the `*.vercel.app` URL before connecting the domain.

---

## 3. Point unimatch.app at Vercel without breaking Microsoft 365 email

Your DNS is hosted at **Porkbun** (nameservers `*.ns.porkbun.com`). Keep it there. **Do not change nameservers.**

### Records that must stay exactly as they are (Microsoft 365)

| Type | Host | Value | Purpose |
| --- | --- | --- | --- |
| MX | `unimatch.app` | `unimatch-app.mail.protection.outlook.com` (prio 0) | Incoming email |
| TXT | `unimatch.app` | `MS=ms64568300` | Microsoft domain verification |
| TXT | `unimatch.app` | `v=spf1 include:spf.protection.outlook.com -all` | SPF (who may send as you) |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:jeevmour@unimatch.app` | DMARC |
| CNAME | `autodiscover` | `autodiscover.outlook.com` | Outlook setup |
| CNAME | `selector1._domainkey` | `selector1-unimatch-app._domainkey.…dkim.mail.microsoft` | DKIM |
| CNAME | `selector2._domainkey` | `selector2-unimatch-app._domainkey.…dkim.mail.microsoft` | DKIM |

Before changing anything, open Porkbun → Domain Management → unimatch.app → DNS Records and confirm the list matches. If it doesn't, stop and check what changed.

### Steps

1. In Vercel → Project → **Settings → Domains**, add `unimatch.app` and `www.unimatch.app`. Choose to redirect `www` to `unimatch.app`.
2. Vercel will show the exact records it wants. Use **the values Vercel shows you**; they're usually:
   - `A` record for `unimatch.app` → an IP address such as `76.76.21.21`
   - `CNAME` record for `www` → something like `cname.vercel-dns.com`
3. In Porkbun, **delete only these two parking records**:
   - `ALIAS unimatch.app → pixie.porkbun.com`
   - `CNAME *.unimatch.app → pixie.porkbun.com` (the wildcard; it would otherwise catch `www`)
4. Add the `A` and `www CNAME` records from step 2. Leave every Microsoft record alone.
5. Wait for Vercel to show the domain as valid. It issues the HTTPS certificate automatically (required, because `.app` is HTTPS-only).
6. Send yourself a test email to make sure mail still arrives in Outlook.

Notes:
- The website doesn't send email, so SPF needs no change. If you later add a service that sends email from `@unimatch.app` (for example, waitlist confirmations), **edit the existing SPF record** to add its `include:`. Never create a second SPF record.
- Microsoft 365 is business email only. It does **not** verify students. Real university verification (one-time codes to `.edu` addresses) will need its own email-sending service when the app is built.

---

## Project structure

```
src/
  app/                      Routes (one folder per page), sitemap, robots, OG image
    early-access/actions.ts Waitlist Server Action (validation, rate limit, save)
  components/
    brand/                  Logo
    demo/                   Discover demo, chat demo, profile cards (client-side only)
    layout/                 Header (with mobile menu) and footer
    sections/               Reusable page sections (CTA band, policy layout)
    ui/                     Buttons, layout primitives, photo placeholders
    waitlist/               Waitlist form (client)
  lib/
    demo/profiles.ts        FICTIONAL demo data, never mixed with real data
    supabase/admin.ts       Server-only Supabase client
    waitlist/               Zod schema (server) and shared types
    site.ts                 Site name, emails, navigation, routes
supabase/migrations/        Database schema with RLS
```

Design tokens (colors, fonts, radii) are in `src/app/globals.css` under `@theme`. Every text/background pairing was chosen to meet WCAG 2.2 AA contrast.

---

## Waitlist security

- Server-side validation with Zod on every submission
- Duplicate emails are handled quietly (it tells the person they're on the list, which is true, without revealing anything new)
- Rate limit: 5 attempts per hour per salted IP hash; raw IPs are never stored
- Spam protection: hidden honeypot field plus a minimum fill time
- Explicit, optional, unchecked-by-default marketing consent, stored with a timestamp
- Required 18+/current-student confirmation
- Errors are shown with an accessible summary; success is shown **only** after the database confirms the save

---

## Before you launch: checklist

- [ ] **Legal review.** Privacy Policy, Terms, Community Guidelines and Accessibility Statement are drafts with a visible "Draft for review" banner. Replace `[bracketed]` text and remove the banner once reviewed.
- [ ] **Photography.** Every image is a labelled placeholder (`PhotoSlot`) describing the intended shot. Replace with licensed, authentic campus photos (including disabled students in romantic contexts) using `next/image`.
- [ ] **Our Story.** Fill in the `[bracketed]` founder story with real, verifiable details only.
- [ ] **Supabase + Vercel env vars** set, and a test signup appears in `waitlist_signups`.
- [ ] **Domain** connected and Microsoft 365 email still working.
- [ ] **Accessibility pass** with a real screen reader (VoiceOver/NVDA) and keyboard only.

## Known gaps

- No automated test suite yet. Interactions were checked manually in a headless browser at 375px and 1440px.
- Rate limiting needs Supabase configured. Without it, the form refuses all signups rather than accepting unprotected ones.
- No analytics are installed (intentionally). Add a privacy-friendly option later and update the privacy policy if you do.
