# UEDRA Free Registry: Product Spec (MVP)

**Author:** Jed Feller
**Date:** April 13, 2026
**Status:** Draft

---

## What This Is

A free public registry where anyone can record that their estate documents exist, where they're stored, and who to contact to retrieve them. Institutions (banks, hospitals, lawyers) can look up these records at verify.uedra.org. The registry is the top-of-funnel for VerAuth: free registration, paid vault upsell.

## What This Is NOT

- Not a document storage service (that's VerAuth)
- Not a legal filing system
- Not a replacement for probate

---

## 1. Architecture Decision

**Add to the existing UEDRA Next.js site.** No separate app.

The current site is a Next.js 16 app with Supabase backend and SES for email. That's everything we need. New pages go at `/register` and `/verify`. No subdomain routing needed for MVP. If traffic warrants it later, we can split.

Supabase handles:
- New database tables (below)
- Row-level security for privacy
- Auth (only needed for institutional accounts, not basic registration)

SES handles:
- Registration confirmation emails
- Annual reminder emails (via a scheduled job, details in Section 8)

---

## 2. Registration Flow (/register)

### 2.1 What the User Sees

**Step 1: Identity**

A single page form with these fields:

| Field | Type | Required | Notes |
|---|---|---|---|
| Full legal name | text | yes | First, middle, last in separate fields |
| Date of birth | date picker | yes | |
| State of residence | dropdown (50 states + DC + territories) | yes | Pre-detect from IP, let them change |
| Last 4 of SSN | 4-digit input | yes | Masked. Used for lookup disambiguation only. |
| Email address | email | yes | For confirmation and annual reminders |
| Phone number | tel | no | Optional backup contact method |

**Why last 4 SSN only:** Full SSN is a liability we don't want. Last 4 plus name plus DOB is enough to disambiguate. If two John Smiths born 1/1/1960 in Nevada both have a will, the last 4 SSN separates them. That's the only purpose.

**Step 2: Documents**

Checkboxes for document types:
- Last Will and Testament
- Revocable Living Trust
- Financial Power of Attorney
- Healthcare Power of Attorney / Medical Directive
- Advance Directive / Living Will
- HIPAA Authorization

For each checked document, a card expands with:

| Field | Type | Required |
|---|---|---|
| Where is this document stored? | dropdown | yes |
| Contact person name | text | yes |
| Contact person phone | tel | yes |
| Contact person email | email | no |

**Storage location dropdown options:**
- Attorney's office
- Safe deposit box (bank)
- Home safe or lockbox
- Filed with county clerk / court
- VerAuth Vault (linked)
- Other (free text field appears)

**Step 3: Emergency Contact**

The primary successor or person who should be contacted first.

| Field | Type | Required |
|---|---|---|
| Full name | text | yes |
| Relationship | dropdown (spouse, child, sibling, attorney, other) | yes |
| Phone | tel | yes |
| Email | email | yes |

Checkbox: "This person is also the contact for all documents above" (auto-fills document contact fields if checked early in the flow. If checked here, backfills.)

**Step 4: Review and Submit**

- Summary of everything entered
- Opt-in checkbox for annual reminder email (pre-checked, default yes)
- Terms of service acceptance (required)
- Submit button: "Register My Documents (Free)"

**Step 5: Confirmation**

After submit:
- Show a confirmation page with:
  - A unique UEDRA Registry ID for EACH document (format: `UEDRA-[STATE]-[YEAR]-[6-digit-seq]`, e.g. `UEDRA-NV-2026-000142`)
  - Instructions: "Write this number on your physical document" and "Keep a copy in your wallet or phone"
  - A printable summary card (PDF download) with all registry IDs
  - QR code that links to the verify page pre-filled with their registry IDs
- Confirmation email sent with the same info
- If any document's storage location was NOT "VerAuth Vault": soft pitch banner at the bottom. "Want your family to access these documents instantly? VerAuth offers encrypted vault storage starting at $99/year." Link to verauth.net.

### 2.2 Registration Flow Notes

- No account creation required. Email is the identifier.
- To update their registration later, they click the link in their confirmation or reminder email. The link contains a signed token (JWT or Supabase magic link). No password.
- If someone registers the same name + DOB + SSN-last-4, we treat it as an update (after email verification), not a duplicate.
- Rate limiting: max 10 registrations per IP per hour. Max 3 per email per day.

---

## 3. Verification Flow (/verify)

### 3.1 What the Institutional User Sees

**Search bar** at the top with two modes (tabs):

**Tab 1: Registry Number Lookup (default)**
- Single input field: "Enter UEDRA Registry Number"
- Example placeholder: UEDRA-NV-2026-000142
- Instant result

**Tab 2: Person Search**
- Full name (first + last, required)
- Date of birth (required)
- State (required)
- Last 4 SSN (optional, helps disambiguate)
- Search button

### 3.2 Search Results

For each matching document record:

| Field | Shown? | Notes |
|---|---|---|
| Document type | Yes | e.g. "Last Will and Testament" |
| Status | Yes | Active, Revoked, or Updated |
| Date registered | Yes | |
| Date last updated | Yes | |
| State of registrant | Yes | |
| Where stored | Yes | e.g. "Attorney's office" |
| Contact person name | Yes | |
| Contact person phone | Yes | |
| Contact person email | Yes | If provided |
| Registrant name | Yes | |
| Registrant DOB | Yes | Shown only on person search (they already provided it) |
| Registrant SSN | NEVER | Not shown, not exposed via API |
| Registrant email | NEVER | Not shown to verifiers |
| Registrant phone | NEVER | Not shown to verifiers |
| Verification tier | Yes | "Self-Registered" for free tier, "Certified Vault" for VerAuth-stored docs |
| VerAuth certified | Yes/No badge | Whether stored in a UEDRA-certified registry |

**Verification tier explanation (shown as tooltip or info icon):**
- **Self-Registered:** The registrant stated this document exists and provided storage/contact info. UEDRA has not verified the document itself.
- **Certified Vault:** This document is stored in a UEDRA-certified registry (e.g. VerAuth). The document's existence, integrity, and chain of custody are verified.

This is the conversion mechanism. Banks and hospitals see "Self-Registered" and know they need to call someone and hope the document is where the person said it is. They see "Certified Vault" and know they can retrieve a verified copy through the certified provider. The registrant sees this distinction and thinks: maybe I should upgrade.

### 3.3 Institutional Accounts (Phase 2, not MVP)

For MVP, verification is open and free. No login required.

Phase 2 adds:
- Optional institutional account (hospital, bank, law firm)
- Bulk lookup API
- Alert subscriptions: "notify me if John Smith's POA status changes"
- Audit log of who looked up what (for compliance)

---

## 4. Data Model

### 4.1 New Tables

```sql
-- Core registrant identity
CREATE TABLE registrants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  middle_name TEXT,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  state TEXT NOT NULL,
  ssn_last4 TEXT NOT NULL,          -- stored as bcrypt hash, NOT plaintext
  ssn_last4_hint TEXT NOT NULL,     -- last 2 digits only, for support disambiguation
  email TEXT NOT NULL,
  phone TEXT,
  reminder_opt_in BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  -- Dedup constraint
  UNIQUE(first_name, last_name, date_of_birth, state)
);

-- One row per registered document
CREATE TABLE document_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  registrant_id UUID REFERENCES registrants(id) ON DELETE CASCADE,
  registry_number TEXT UNIQUE NOT NULL,  -- UEDRA-NV-2026-000142
  document_type TEXT NOT NULL CHECK (document_type IN (
    'will', 'trust', 'financial_poa', 'healthcare_poa',
    'advance_directive', 'hipaa_authorization'
  )),
  storage_location TEXT NOT NULL,
  storage_location_other TEXT,          -- free text if storage_location = 'other'
  contact_name TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_email TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'revoked', 'updated')),
  verification_tier TEXT DEFAULT 'self_registered' CHECK (
    verification_tier IN ('self_registered', 'certified_vault')
  ),
  certified_provider TEXT,              -- e.g. 'verauth' if stored there
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Emergency contact (one per registrant)
CREATE TABLE emergency_contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  registrant_id UUID REFERENCES registrants(id) ON DELETE CASCADE UNIQUE,
  full_name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Edit tokens for passwordless updates
CREATE TABLE edit_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  registrant_id UUID REFERENCES registrants(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Annual reminder tracking
CREATE TABLE reminder_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  registrant_id UUID REFERENCES registrants(id) ON DELETE CASCADE,
  sent_at TIMESTAMPTZ DEFAULT now(),
  email_message_id TEXT,               -- SES message ID for tracking
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ
);

-- Indexes for verification lookups
CREATE INDEX idx_doc_reg_registry_number ON document_registrations(registry_number);
CREATE INDEX idx_doc_reg_registrant ON document_registrations(registrant_id);
CREATE INDEX idx_registrants_lookup ON registrants(last_name, first_name, date_of_birth, state);
CREATE INDEX idx_registrants_email ON registrants(email);
```

### 4.2 SSN Handling

The last 4 of SSN is hashed with bcrypt on write. It is NEVER stored in plaintext. It is NEVER returned in any query, API response, or UI.

For person-search verification: the verifier provides name + DOB + state (required) and optionally last 4 SSN. If provided, we hash the input and compare against stored hash to narrow results. The SSN is used only as a filter, never displayed.

For the `ssn_last4_hint` field (last 2 digits only): this exists solely for customer support disambiguation if two people with the same name/DOB/state contact us. It is never exposed in the verify flow.

### 4.3 Registry Number Format

`UEDRA-[STATE]-[YEAR]-[SEQ]`

- STATE: 2-letter state code
- YEAR: 4-digit year of registration
- SEQ: 6-digit zero-padded sequence number, per state per year

Sequence is tracked via a Supabase sequence or a counter table:

```sql
CREATE TABLE registry_sequences (
  state TEXT NOT NULL,
  year INTEGER NOT NULL,
  last_seq INTEGER DEFAULT 0,
  PRIMARY KEY (state, year)
);
```

On insert: increment `last_seq` atomically (use `UPDATE ... RETURNING` in a transaction), format the number.

---

## 5. Site Navigation Changes

Current nav links:
```
About | The Standard | Get Certified | For Families | For Attorneys |
For Legislators | Tracker | Resources | News | Donate | [Contact button]
```

New nav:
```
Register (Free) | Verify | About | The Standard | Get Certified |
For Families | For Attorneys | For Institutions | For Legislators |
Tracker | Resources | News | Donate | [Contact button]
```

Changes:
1. **Register (Free)** added as first link, with a gold accent color (#b8860b) to make it stand out
2. **Verify** added as second link
3. **For Institutions** added (new page, replaces nothing)
4. Everything else stays

On mobile, "Register (Free)" and "Verify" should appear at the top of the hamburger menu, visually separated from the rest.

---

## 6. New Page: For Institutions (/for-institutions)

Target audience: bank trust officers, hospital social workers, elder law attorneys, probate courts.

Sections:

**Hero:** "Verify Estate Documents in Seconds"
Subhead: When a patient arrives incapacitated, when a client claims POA authority, when an estate enters probate, verify the documents are real and current.

**How It Works:**
1. Go to verify.uedra.org (or /verify)
2. Enter the registry number or search by name
3. See document status, storage location, and contact info
4. Reach the right person to retrieve the actual document

**What You'll See:**
Mockup/screenshot of a verification result. Highlight the "Self-Registered" vs "Certified Vault" distinction.

**For Power Users (Coming Soon):**
- Bulk lookup API for integration with your systems
- Alert subscriptions for POA status changes
- Compliance-ready audit trail

**CTA:** "Start verifying now" (link to /verify) and "Contact us about API access" (link to /contact)

**Subtle VerAuth callout (bottom of page):**
"For families who want instant, verified access: Certified Registrars like VerAuth offer encrypted vault storage and real-time document delivery to authorized institutions. Learn more at verauth.net."

---

## 7. Conversion Funnel

The free registry creates three conversion touchpoints:

**Touchpoint 1: Registration confirmation.**
After registering, if the user's documents are NOT stored in VerAuth, show a banner:
"Your documents are registered. Want your family to access them instantly, without calling anyone? VerAuth stores your actual documents in an encrypted vault with real-time delivery to authorized parties. Starting at $99/year."

**Touchpoint 2: Verification results.**
When an institution looks up a "Self-Registered" document, they see a clear badge distinguishing it from "Certified Vault" records. The implicit message: self-registered means you need to track down the document yourself. Certified means it's retrievable through the provider.

This creates pull from the institutional side. Banks and hospitals will start telling clients: "You should store your documents with a certified provider so we can access them when we need to."

**Touchpoint 3: Annual reminder email.**
Once a year, we email every registrant. The primary purpose is real: "Are your documents still current?" The secondary purpose is a soft sell:
"Want your family to skip the phone calls? VerAuth vault storage means authorized institutions can access your documents instantly. Upgrade at verauth.net."

**Touchpoint 4: The verification tier itself.**
Registrants who check their own records see "Self-Registered" and understand the difference. Some will upgrade on their own.

---

## 8. Annual Reminder Email System

### 8.1 How It Works

A cron job (Supabase Edge Function on a schedule, or an external cron hitting a Next.js API route) runs daily. It queries for registrants where:
- `reminder_opt_in = true`
- Last reminder was sent 11+ months ago (or never sent)
- Registration is at least 11 months old

For each match, send an email via SES.

### 8.2 Email Content

**Subject:** "UEDRA Registry: Annual Document Review"

**Body:**

Hi [First Name],

You registered [N] estate documents with the UEDRA Registry on [date]. Here's a quick summary:

- Will (UEDRA-NV-2026-000142): Active, stored at Attorney's office
- Financial POA (UEDRA-NV-2026-000143): Active, stored at Home safe

**Has anything changed?** If you've updated, moved, or revoked any documents, update your registration here: [link with signed token]

**New to report?** If you've created new estate documents since your last registration, add them here: [same link]

[Divider]

Want your family to access these documents without making phone calls? VerAuth offers encrypted vault storage with instant delivery to hospitals, banks, and attorneys. Starting at $99/year. [Learn more at verauth.net]

[Divider]

You're receiving this because you opted in to annual reminders when you registered. [Unsubscribe link]

### 8.3 Implementation Notes

- The signed token in the update link expires in 30 days
- Unsubscribe link sets `reminder_opt_in = false` via a simple API route
- Track opens via SES pixel (if desired) and clicks via redirect through our domain
- Batch sending: max 50 emails per run to stay within SES rate limits. The cron job runs daily, so a backlog clears within days.
- Log every send in `reminder_log` table

---

## 9. Privacy and Security

### 9.1 What's Public (via /verify)

- Registrant name
- Document type
- Document status (active/revoked/updated)
- Storage location description
- Contact person name, phone, email
- Registration and update dates
- Verification tier
- State

### 9.2 What's NEVER Public

- SSN (last 4 or otherwise). Hashed, never stored plain, never returned.
- Registrant email address
- Registrant phone number
- IP address at registration
- Edit tokens

### 9.3 Data Retention

- Active registrations: kept indefinitely (this is a registry, the whole point is persistence)
- Revoked registrations: kept for 7 years, then soft-deleted (status = archived, PII stripped)
- Edit tokens: deleted after expiration
- Reminder log: kept for 3 years

### 9.4 GDPR / Privacy Compliance

- Registrant can request full data export (JSON) via email link
- Registrant can request deletion, which revokes all documents and strips PII after a 30-day grace period
- Privacy policy page needs to be written (or updated from the existing one)

### 9.5 Abuse Prevention

- CAPTCHA on registration form (hCaptcha or Turnstile, not Google reCAPTCHA)
- Rate limiting (see Section 2.2)
- The verify page does NOT allow enumeration: person search requires name + DOB + state (minimum 3 fields). You can't just browse all registrations.
- Registry numbers are not sequential within a short time window (add a random offset or use a larger sequence space) to prevent scraping sequential numbers.

---

## 10. API Routes (Next.js)

All new API routes live under `/api/registry/`:

| Route | Method | Purpose |
|---|---|---|
| `/api/registry/register` | POST | Create new registration |
| `/api/registry/verify/[registryNumber]` | GET | Lookup by registry number |
| `/api/registry/search` | POST | Person search (name + DOB + state) |
| `/api/registry/update` | POST | Update registration (requires valid edit token) |
| `/api/registry/revoke` | POST | Revoke a document registration |
| `/api/registry/unsubscribe/[token]` | GET | Unsubscribe from reminders |
| `/api/registry/send-edit-link` | POST | Email a new edit link to the registrant |
| `/api/registry/reminders/send` | POST | Cron endpoint for annual reminders (protected by secret) |

---

## 11. What's MVP vs Phase 2

### MVP (Build Now)

- Registration flow (all 5 steps)
- Verification flow (registry number lookup + person search)
- Confirmation email with registry numbers
- Annual reminder email (cron job)
- Nav updates
- For Institutions page
- VerAuth conversion touchpoints (banners, tier badges)
- Printable summary card (PDF)

### Phase 2 (Build Later)

- Institutional accounts and login
- Bulk lookup API
- Alert subscriptions
- QR code on confirmation (nice to have, not critical)
- VerAuth API integration (auto-upgrade tier when someone stores a doc in VerAuth)
- SMS reminders option
- Multi-language support
- Registrant dashboard (currently, updates happen via magic link to the registration form pre-filled with existing data)

---

## 12. Open Questions

1. **Should we collect full SSN or just last 4?** Current spec says last 4 only. Full SSN adds a huge compliance burden (PCI-like requirements). Last 4 is enough for disambiguation.

2. **Should verification require any authentication?** Current spec says no for MVP. Open lookups increase utility but also increase privacy exposure. The minimum 3-field requirement for person search is the tradeoff.

3. **Should registrants be able to mark a document as "revoked" themselves?** Yes, but we should add email verification (send a confirmation email, click to confirm revocation) to prevent someone revoking someone else's documents if they get the edit link.

4. **What happens when a registrant dies?** The emergency contact should be able to update status. This needs a defined process, probably manual for MVP (contact us), automated in Phase 2.

5. **Should the annual reminder include ALL document types or just the ones they registered?** Just the ones they registered, with a prompt to add new ones.

6. **Pricing for VerAuth upsell copy:** "Starting at $99/year" is a placeholder. Confirm actual pricing before launch.
