#!/usr/bin/env node
/**
 * simulate-garmin.js — synthetic biometric telemetry seeder (EMULATOR ONLY)
 *
 * Seeds N days of realistic-but-fake Garmin-style biometrics into the LOCAL
 * Firestore emulator so contributors and reviewers can exercise the full
 * dashboard without real user data or production credentials.
 *
 * SAFETY GATES (all three must pass or the script refuses to run):
 *   1. NODE_ENV must not be "production"
 *   2. FIRESTORE_EMULATOR_HOST must be set (the official emulator env var)
 *   3. The host must be localhost/127.0.0.1 — no remote targets, ever
 *
 * Usage:
 *   firebase emulators:start                          # in another terminal
 *   FIRESTORE_EMULATOR_HOST=localhost:8080 \
 *     node scripts/simulate-garmin.js --days=30 --appId=demo-recovery-app
 */

/* eslint-disable no-console */

// ── Safety gates ────────────────────────────────────────────────────────────
if (process.env.NODE_ENV === "production") {
  console.error("✕ REFUSED: NODE_ENV=production. This script only seeds the local emulator.");
  process.exit(1);
}
const emuHost = process.env.FIRESTORE_EMULATOR_HOST || "";
if (!emuHost) {
  console.error(
    "✕ REFUSED: FIRESTORE_EMULATOR_HOST is not set.\n" +
    "  Start the emulator (firebase emulators:start) and run:\n" +
    "  FIRESTORE_EMULATOR_HOST=localhost:8080 node scripts/simulate-garmin.js --days=30"
  );
  process.exit(1);
}
if (!/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(emuHost)) {
  console.error(`✕ REFUSED: FIRESTORE_EMULATOR_HOST="${emuHost}" is not localhost. No remote writes.`);
  process.exit(1);
}

// ── Args ────────────────────────────────────────────────────────────────────
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  })
);
const DAYS = Math.min(parseInt(args.days || "30", 10) || 30, 365);
const APP_ID = String(args.appId || "demo-recovery-app");

// ── Synthetic data model ────────────────────────────────────────────────────
// Deliberately correlated the way real recovery telemetry is: poor sleep drags
// clarity down the next day; movement lifts it. Tiers map to the vocabulary
// dictionary (VANGUARD/OPERATOR/STANDARD/INITIATE/REST_PROTOCOL).
function stepTier(steps) {
  if (steps >= 10000) return "VANGUARD";
  if (steps >= 7500) return "OPERATOR";
  if (steps >= 5000) return "STANDARD";
  if (steps >= 2500) return "INITIATE";
  return "REST_PROTOCOL";
}

function makeDay(i, prevSleep) {
  const weekday = i % 7;
  const isForcedRest = weekday === 6 || prevSleep < 45; // day-7 multiples or crashed sleep
  const sleepScore = Math.max(25, Math.min(98, Math.round(
    70 + (Math.random() - 0.5) * 40 + (isForcedRest ? 8 : 0)
  )));
  const steps = isForcedRest
    ? Math.round(1200 + Math.random() * 1200)
    : Math.round(3000 + Math.random() * 9500);
  const clarity = Math.max(10, Math.min(100, Math.round(
    0.55 * prevSleep + 0.25 * (steps / 120) + (Math.random() - 0.5) * 18
  )));
  return {
    mental_clarity: clarity,
    sleep_score: sleepScore,
    steps,
    step_tier: stepTier(steps),
    is_forced_rest_day: isForcedRest,
    target_protein_g: 120 + Math.round(steps / 400), // base 120g + activity bonus
  };
}

// ── Seed ────────────────────────────────────────────────────────────────────
async function main() {
  // firebase-admin is already a project dependency (see package.json)
  const admin = require("firebase-admin");
  admin.initializeApp({ projectId: process.env.GCLOUD_PROJECT || "demo-emulator" });
  const db = admin.firestore();

  const target = db.collection(`artifacts/${APP_ID}/public`).doc("data").collection("biograt_daily_logs");

  console.log(`Seeding ${DAYS} days into emulator at ${emuHost}`);
  console.log(`Path: artifacts/${APP_ID}/public/data/biograt_daily_logs\n`);

  let prevSleep = 65;
  const batch = db.batch();
  for (let i = DAYS - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateKey = d.toISOString().slice(0, 10);
    const day = makeDay(DAYS - i, prevSleep);
    prevSleep = day.sleep_score;
    batch.set(target.doc(dateKey), { ...day, date: dateKey, seeded: true });
    console.log(`  ${dateKey}  sleep=${String(day.sleep_score).padStart(2)}  steps=${String(day.steps).padStart(5)}  ${day.step_tier}${day.is_forced_rest_day ? "  [REST]" : ""}`);
  }
  await batch.commit();
  console.log(`\n✓ ${DAYS} synthetic days committed to the emulator. Open http://localhost:4000 to inspect.`);
}

main().catch((e) => {
  console.error("Seed failed:", e.message);
  process.exit(1);
});
