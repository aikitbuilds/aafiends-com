# AAfiends — Recovery Intelligence Dashboard

**Data Over Denial.** A recovery dashboard and AI coach built by AA members, for AA members — and for anyone whose dopamine system has been hijacked. Live at [aafiends.com](https://aafiends.com).

Part of the **Fiends Grid** ecosystem: [aivirus.org](https://aivirus.org) (the threat model) · **aafiends.com** (the daily dashboard) · [racefiends.com](https://racefiends.com) (the physical arm).

## What it does

- **12-question diagnostic (G.A.D.)** → assigns one of five Vanguard vulnerability archetypes (Eagle / Elephant / Turtle / Chameleon / Tiger)
- **Daily check-in (Engine)** — 1–5 guided inputs or a voice memo transcribed by Gemini
- **AI Mirror** — your check-in reflected back in plain language, saved to Firestore, plotted on a trend chart
- **Network tab** — 12-step progress and meeting log
- **AI4AA** — a 6-week AI-fluency course for people in recovery with zero technical background ([/ai4aa](https://aafiends.com/ai4aa))
- **Vocabulary toggle** — every recovery concept renders in either newcomer-safe Standard language or the Tactical register (see `src/contexts/VocabularyContext.tsx`)
- **7-post science blog** with interactive infographics, each citing the underlying research

## Stack

Next.js (App Router) · TypeScript · Tailwind · Firebase (Auth, Firestore, Hosting + Cloud Functions SSR) · Gemini API · framer-motion · recharts

## 5-minute contributor onboarding

```bash
git clone <repo-url> && cd aafiends.com
npm install
cp .env.example .env.local        # fill in Firebase + Gemini values
firebase emulators:start          # Firestore UI at http://localhost:4000

# Seed 30 days of synthetic biometrics into the emulator (never production —
# the script refuses to run unless FIRESTORE_EMULATOR_HOST is localhost):
FIRESTORE_EMULATOR_HOST=localhost:8080 node scripts/simulate-garmin.js --days=30

npm run dev                       # http://localhost:3000
```

## Before every deploy

```bash
bash scripts/pre-deploy-check.sh
```

Checks: secrets not tracked, emulator safety gates intact, `tsc --noEmit` clean, no fabricated statistics in the UI, runbooks present, working tree committed. Non-zero exit = do not deploy.

## Project conventions

- `CLAUDE.md` — session instructions for AI-assisted development
- `docs/PROJECT_STATUS.md` — the living ledger: what's done, what's verified, what's next. Updated every working session.
- **No fabricated numbers in the UI, ever.** Placeholder stats are labeled or removed.
- **"Done" means clicked through in a browser**, not "compiles clean."

## Honest status

Beta. Core loops compile clean and are deployed, human end-to-end verification is in progress, and the Garmin/Terra biometric pipeline is simulated (see `scripts/simulate-garmin.js`), not yet live. `docs/PROJECT_STATUS.md` has the unvarnished picture.

## Governance

Tradition 7 model: self-supporting through member contributions. No venture capital, no ads, no sale of user data. Recovery data belongs to the person recovering.
