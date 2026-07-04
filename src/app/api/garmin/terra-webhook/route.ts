import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

/**
 * POST /api/garmin/terra-webhook
 *
 * Receives Terra API webhook events (tryterra.co) and normalizes them into
 * the SAME telemetry schema GarminSimulator/api/garmin/sync already uses -
 * so LedgerTab keeps working unmodified once this replaces the simulator.
 *
 * SETUP NEEDED BEFORE THIS WORKS (none of this is done yet):
 *   1. Sign up at tryterra.co, connect a Garmin provider, get a TERRA_API_KEY
 *      and TERRA_SIGNING_SECRET, add both to .env.
 *   2. Register this route's public URL as the webhook destination in the
 *      Terra dashboard.
 *   3. VERIFY the payload shape below against Terra's current docs
 *      (https://docs.tryterra.co/) once you have real webhook payloads to
 *      look at - the field names here are a best-effort based on Terra's
 *      publicly documented "sleep" and "daily" webhook types, but Terra's
 *      schema does evolve, and this has not been tested against a live
 *      payload. Treat this as a scaffold to adapt, not a finished integration.
 *
 * Firestore write target matches GarminSimulator exactly:
 *   users/{uid}/private_vault/telemetry_{YYYY-MM-DD}
 *     { date, timestamp, hardware: { sleepHours, hrv, rhr }, software: {...}, source }
 *
 * Note: Terra gives you hardware (sleep/HRV/RHR) but has no concept of your
 * "software" side (sciatica pain, craving intensity) - those still come
 * from the daily check-in form (TelemetryLog -> /api/mirror). This route
 * merges into the same dated doc so both halves land in one place for
 * LedgerTab to chart together.
 */

// Terra signs webhooks with TERRA_SIGNING_SECRET - verify this before trusting
// the payload. Skipping verification (or getting the header name wrong) is a
// real security gap for a webhook that writes to your database - don't ship
// this without confirming the exact header/verification method in Terra's docs.
function isVerifiedTerraRequest(_req: NextRequest, _rawBody: string): boolean {
  // TODO: implement HMAC verification using TERRA_SIGNING_SECRET once you
  // have real credentials and can see Terra's actual signature header.
  return true; // UNSAFE PLACEHOLDER - do not deploy publicly until this is real.
}

// Terra requires you to map their internal `user.user_id` (the Terra-side
// user reference, returned when a user connects Garmin) back to your own
// Firebase uid. Store that mapping at connect-time (e.g., in
// users/{uid}.terraUserId) and look it up here.
async function resolveFirebaseUid(terraUserId: string): Promise<string | null> {
  const snapshot = await adminDb
    .collection("users")
    .where("terraUserId", "==", terraUserId)
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  return snapshot.docs[0].id;
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  if (!isVerifiedTerraRequest(req, rawBody)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const terraUserId: string | undefined = payload?.user?.user_id;
    if (!terraUserId) {
      return NextResponse.json({ error: "Missing user_id in payload" }, { status: 400 });
    }

    const uid = await resolveFirebaseUid(terraUserId);
    if (!uid) {
      // Terra sent data for a user we don't recognize yet - log and drop rather than crash.
      console.warn("Terra webhook: no Firebase user mapped for terraUserId", terraUserId);
      return NextResponse.json({ success: true, ignored: true });
    }

    // Terra's payload shape varies by webhook type ("sleep", "daily", "activity", etc.)
    // This extraction is best-effort and defensive (falls back to undefined
    // rather than throwing) - VERIFY against real payloads.
    const data = Array.isArray(payload?.data) ? payload.data[0] : payload?.data;
    const dateString: string =
      data?.metadata?.end_time?.slice(0, 10) ||
      data?.metadata?.summary_date ||
      new Date().toISOString().slice(0, 10);

    const sleepHours = data?.sleep_durations_data?.asleep?.duration_asleep_state_seconds
      ? data.sleep_durations_data.asleep.duration_asleep_state_seconds / 3600
      : undefined;
    const hrv = data?.heart_rate_data?.summary?.avg_hrv_rmssd ?? undefined;
    const rhr = data?.heart_rate_data?.summary?.resting_hr_bpm ?? undefined;

    const hardwareUpdate: Record<string, number> = {};
    if (sleepHours !== undefined) hardwareUpdate.sleepHours = parseFloat(sleepHours.toFixed(1));
    if (hrv !== undefined) hardwareUpdate.hrv = hrv;
    if (rhr !== undefined) hardwareUpdate.rhr = rhr;

    if (Object.keys(hardwareUpdate).length === 0) {
      console.warn("Terra webhook: no recognized hardware fields in payload", JSON.stringify(payload).slice(0, 500));
      return NextResponse.json({ success: true, ignored: true, reason: "no recognized fields" });
    }

    const docRef = adminDb
      .collection("users")
      .doc(uid)
      .collection("private_vault")
      .doc(`telemetry_${dateString}`);

    await docRef.set(
      {
        date: dateString,
        timestamp: FieldValue.serverTimestamp(),
        hardware: hardwareUpdate,
        source: "terra_api",
      },
      { merge: true }
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Terra webhook processing error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
