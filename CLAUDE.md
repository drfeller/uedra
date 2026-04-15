@AGENTS.md

# UEDRA — Project Instructions for Claude

> Global protocol lives in `~/.claude/CLAUDE.md` (synced from
> `~/wiki/tools/setup/CLAUDE.md.global` on session start). Read that
> first — it defines git hygiene, feature-pin protocol, session end,
> and UX philosophy. AGENTS.md above is the Next.js 16 breaking-change
> warning — ALSO honor it. This file only covers UEDRA-specific context.

## Quick Start
Universal Estate Document Registry Association — standards org + public
website for estate document registries. Supports VerAuth as the
reference implementation.

- **Current sprint**: `~/wiki/hot.md` (already in your startup context)
- **Project hub**: `~/wiki/wiki/projects/UEDRA.md` — read FIRST for current state
- **Feature registry**: `~/wiki/wiki/projects/UEDRA-features.md` — grows organically per Feature Pin Protocol; create on first feature the session touches if it doesn't exist

## Tech Stack
- **Framework**: Next.js 16.2.2 (App Router + Turbopack). **Breaking changes from Next 14/15** — mirror existing route patterns rather than assuming old App Router conventions. See `node_modules/next/dist/docs/` before editing routes.
- **UI**: React 19, TailwindCSS 4, lucide-react icons
- **DB**: Supabase (service role for server routes)
- **Email**: AWS SES us-west-2, source `contact@uedra.org`
- **PDF**: `pdf-lib` + `qrcode` for certificate generation

## Deployment
- **Web**: Vercel → `uedra.org`
- **DNS**: Vercel (third-party registrar)
- **Secrets**: `.env.secrets` local, Vercel env for prod. Anthropic API key, Supabase service role, AWS SES creds, Supabase anon key.

## Key Paths
- `src/app/contact/page.tsx` + `src/app/api/contact/route.ts` — contact form
- `src/lib/ses.ts` — shared SES client + `sendEmail()` wrapper
- `src/lib/contact-auto-reply.ts` — per-subject auto-reply templates
- `src/app/act/` — public advocacy / legislator lookup
- `src/app/api/free-registry/` — free registry register + verify endpoints
- `supabase/` — local Supabase CLI project; `/supabase/.temp` is gitignored cache

## Critical Gotchas
- **Next.js 16.2.2** has breaking changes from 14/15 — read existing route patterns, don't assume
- **Contact form flow**: page → `POST /api/contact` → (1) Supabase `contact_submissions` insert (audit log, source of truth), (2) SES forward to `CONTACT_FORWARD_TO` with `ReplyTo: <submitter>`, (3) SES auto-reply from subject-specific template. Email sends are best-effort; Supabase save is required.
- **SES identity**: `contact@uedra.org` must be verified in SES us-west-2 before sending works in prod
- **Naming**: "UEDRA" — all-caps, four letters. Voice-to-text sometimes produces "You Draw" / "Yudra" / "U D R A"; normalize to UEDRA.

## Session Protocol
1. Read `~/wiki/hot.md` + `~/wiki/wiki/projects/UEDRA.md` on start
2. Run Pre-Coding Git Hygiene before editing (see global CLAUDE.md)
3. Use Feature Pin Protocol: `🎯 Targeting:` block before any edit >20 lines
4. On session end: update the hub's Quick Context, append to `log.md`, update `hot.md`, `wiki-push`
