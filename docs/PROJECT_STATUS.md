# PROJECT_STATUS — AAfiends (Living Ledger)

> Update this file at the end of every working session. It is the context
> hand-off between sessions (human or AI). Newest entries first.

## 2026-07-04 — Claude Corps portfolio refactor
- Vocabulary system completed: persistent (localStorage) Standard/Tactical context,
  13 canonical + 7 legacy terms, `VocabToggle` in site header (desktop + mobile),
  `VocabText` drop-in, existing dashboard toggles migrated to "tactical" mode name.
- `scripts/simulate-garmin.js` added — emulator-only synthetic biometrics seeder
  with triple safety gate (NODE_ENV, FIRESTORE_EMULATOR_HOST, localhost-only).
- `scripts/pre-deploy-check.sh` added — secrets/tsc/fabricated-stat/runbook gate.
- README rewritten to portfolio standard.

## 2026-07-03 — Structural fixes + first deploy verification
- All work committed to git (was 98 uncommitted files); `.firebase/` gitignored.
- Fabricated "~20% share this profile" stat removed from Vanguard card.
- Pushed to GitHub (aikitbuilds/aafiends-com); deployed; aafiends.com verified
  serving the new build.

## Verified vs. unverified (the honest line)
- ✅ tsc clean; deployed; homepage/SEO/blog live.
- ⚠️ UNVERIFIED: full human E2E (fresh signup → onboarding → check-in → chart).
- ⚠️ Garmin/Terra pipeline is simulated only. Vanguard share % awaits 50+ users.
- ❌ No automated tests yet.

## Next up
1. Human E2E click-through on production (Task #48 — oldest open item).
2. Wire `VocabText` through remaining hardcoded recovery vocabulary.
3. Beta waitlist + BETA badge (runbook Phase 5).
