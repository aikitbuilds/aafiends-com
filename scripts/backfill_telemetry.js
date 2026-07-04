// One-time backfill: replace simulated Garmin telemetry with real data.
// Usage: node backfill_telemetry.js <email> [dataDir]
// Reads ADMIN_SERVICE_ACCOUNT_KEY from aafiends.com/.env (same var firebaseAdmin.ts uses).

const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const admin = require('firebase-admin');

const email = process.argv[2];
if (!email) {
  console.error('Usage: node backfill_telemetry.js <email> [dataDir]');
  process.exit(1);
}

const serviceAccountStr = process.env.ADMIN_SERVICE_ACCOUNT_KEY;
if (!serviceAccountStr) {
  console.error('ADMIN_SERVICE_ACCOUNT_KEY not found in .env');
  process.exit(1);
}
const serviceAccount = JSON.parse(serviceAccountStr);
if (serviceAccount.private_key) {
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
}
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();
const auth = admin.auth();

const DATADIR = process.argv[3] || path.join(__dirname, 'personal-data');

// Garmin's own weekly sleep report buckets don't start on Monday - observed
// as Friday-start (e.g. "Jun 12-18" -> week_start 2026-06-12, a Friday).
// Recomputing an ISO Monday-start week here silently produced zero matches
// against sleep_weekly.json's actual week_start values (caught in a local
// HTML preview before this ever ran against real Firestore data). Instead,
// find which real week_start..+6days window each date falls into.
function findWeek(dateStr, sortedWeekStarts) {
  const d = new Date(dateStr + 'T00:00:00Z').getTime();
  let best = null;
  for (const wk of sortedWeekStarts) {
    const wkTime = new Date(wk + 'T00:00:00Z').getTime();
    const endTime = wkTime + 6 * 86400000;
    if (wkTime <= d && d <= endTime) best = wk;
  }
  return best;
}

async function main() {
  const user = await auth.getUserByEmail(email);
  const uid = user.uid;
  console.log('Resolved uid for', email, '-> found (uid redacted in log)');

  const hr = JSON.parse(fs.readFileSync(path.join(DATADIR, 'heart_rate_daily.json')));
  const sleep = JSON.parse(fs.readFileSync(path.join(DATADIR, 'sleep_weekly.json')));
  const sleepByWeek = Object.fromEntries(sleep.map((s) => [s.week_start, s.avg_duration_min]));
  const sortedWeekStarts = Object.keys(sleepByWeek).sort();

  const privateVault = db.collection('users').doc(uid).collection('private_vault');
  const batch = db.batch();
  let count = 0;

  for (const day of hr) {
    const hardware = { rhr: day.resting_hr };
    const wk = findWeek(day.date, sortedWeekStarts);
    if (wk && sleepByWeek[wk] != null) {
      hardware.sleepHours = Math.round((sleepByWeek[wk] / 60) * 100) / 100;
    }
    // hrv intentionally omitted - not available from what's been exported yet

    const docRef = privateVault.doc(`telemetry_${day.date}`);
    batch.set(
      docRef,
      {
        date: day.date,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        hardware,
        source: 'manual_garmin_export',
      },
      { merge: true }
    );
    count++;
  }

  await batch.commit();
  console.log(`Wrote real hardware telemetry for ${count} day(s): ${hr[0].date} to ${hr[hr.length - 1].date}`);
  console.log('Note: hrv not included (not yet exported from Garmin Health Stats). software.* untouched.');
}

main().catch((err) => {
  console.error('Backfill failed:', err.message);
  process.exit(1);
});
