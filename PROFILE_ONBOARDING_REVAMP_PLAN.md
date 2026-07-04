# AAFiends: Onboarding + Profile Revamp — Plan

Status: DONE — all 4 steps shipped 2026-07-02 (Cowork). See `ecosystem-docs/backlog.md`'s AAFiends section for what each step actually changed. Step 4 turned into a scoped, deliberately small slice (client-side Vanguard mascot scoring on `/profile`, no schema changes) rather than the open-ended "broader Firestore schema work" originally sketched below — the full State A/B dashboard system from the blueprint remains a separate, unscoped future feature.

## What's actually broken (confirmed by reading the code, not guessing)

### 1. The onboarding "skip" button creates a redirect loop — real bug, not just missing UX
`onboarding/page.tsx` has an escape hatch: "Skip for now, take me to the dashboard" → `router.push("/dashboard")`. It does **not** call `handleSubmit()` first, so no Firestore `users/{uid}` doc is created.

`dashboard/page.tsx`'s own guard then does: `if (!profile) router.push("/onboarding")`.

Result: clicking Skip bounces you straight back to onboarding, forever. This is likely part of what you were seeing as "nothing shows up."

### 2. There is no profile/settings page at all
Confirmed via search — no `/profile` or `/settings` route exists anywhere in `src/app`. Once onboarding's 12 questions + sobriety date are submitted, there is no way to view or edit that data again. Compare to RaceFiends' "Runner Data Sheet" (Display Name, Email, Zip, Objective, Target Event, Fellowship Type, integration status), which AAFiends has no equivalent of.

### 3. `UserProfile` has fields nothing ever writes
From `AuthContext.tsx`'s `UserProfile` interface: `garminToken`, `amendsPaid`, `sweatMiles` are declared but no code path in the app currently sets them. `financialAmends` and `physicalAnchor` are written by onboarding but hardcoded to placeholder values (`0` and `"None"`) — never actually asked or meaningfully collected. These look like leftovers from an earlier design (possibly the amends/ledger concept from the BioGrat/Foundry drafts) that never got finished or got superseded by the Network/Engine/Mirror model in the later master blueprints.

### 4. `diagnosticData` (the 12 answers) — needs verification
Onboarding writes all 12 answers into `diagnosticData`. Not yet confirmed whether anything downstream (Mirror, Ledger, JourneyTab) actually reads or uses this. Worth checking before deciding whether to keep collecting it as-is.

## Proposed approach (sequenced, not one big rewrite)

**Step 1 — Fix the redirect loop (small, isolated, low-risk).** Make the Skip button either (a) write a minimal profile doc with `setupComplete: true` before redirecting, or (b) remove the skip option entirely if onboarding should be mandatory. This is a 5-minute fix that stops a real bug regardless of what happens with the rest of this plan.

**Step 2 — Build a real `/profile` (or `/settings`) page.** View + edit: sobriety date, sponsor name, re-view your 12 diagnostic answers (read-only or re-take), logout. Modeled loosely on RaceFiends' Runner Data Sheet pattern but keeping AAFiends' own vocabulary/design system (Operator Dashboard, not Fellowship cyberpunk).

**Step 3 — Decide the fate of the dead fields.** For each of `garminToken`, `amendsPaid`, `sweatMiles`, `financialAmends`, `physicalAnchor`: either wire it to something real (e.g. `garminToken` ties into the Garmin backfill work already done — see `personal-data/garmin/`) or remove it from the schema/interface to stop carrying dead weight.

**Step 4 — Only if still needed after 1-3: broader Firestore schema work.** Given the master blueprints already define a clean Network/Engine/Mirror model, a "whole backend revamp" may really just mean finishing the wiring to match that spec rather than a from-scratch redesign. Recommend reassessing scope after Steps 1-3 land, since they may resolve most of what "revamp" was pointing at.

## Not touched by this plan
Auth flow itself (Firebase Google sign-in) appears to work correctly per the code review — the actual bug trail so far points to profile/onboarding gaps, not auth. Firestore security rules (`firestore.rules`) look correctly scoped and aren't implicated in anything found so far.
