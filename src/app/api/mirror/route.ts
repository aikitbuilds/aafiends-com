import { NextRequest, NextResponse } from "next/server";
import { generateMirrorInsight, MirrorResponse } from "../../../lib/gemini";
import { adminDb, adminAuth } from "../../../lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

/**
 * POST /api/mirror
 *
 * Accepts raw text (composed from the daily check-in form, or a voice
 * transcript) plus optional structured slider/anchor data, processes it
 * through Gemini (strict JSON schema), and writes the result to Firestore.
 *
 * Requires Firebase Auth ID token in Authorization header.
 *
 * Body: { input: string, structured?: Record<string, unknown> }
 * Returns: { success: true, data: MirrorResponse }
 *
 * Firestore writes (all three happen; none overwrites the others' history):
 *   users/{uid}/private_vault/mirror_latest             - single doc, always the most recent reflection (cheap "today's reflection" read)
 *   users/{uid}/private_vault/mirror_logs/entries/{id}   - one doc per submission, full history preserved
 *   users/{uid}/private_vault/telemetry_{date}           - merges today's software.* fields (mapped from
 *                                                           TelemetryLog's sliders) into the SAME telemetry doc
 *                                                           that /api/garmin/sync writes hardware.* into and
 *                                                           LedgerTab reads. Previously this route never touched
 *                                                           that schema, so real check-ins never reached the
 *                                                           Ledger chart - only the simulator's fake data did.
 *
 * Slider -> Ledger field mapping (see TelemetryLog.tsx for slider definitions):
 *   armorLevel ("Armor Level / Sciatic") -> software.sciaticaPainLevel  (matches GarminSimulator's field name)
 *   cravings                             -> software.cravingIntensity  (matches GarminSimulator's field name)
 *   leadSuit, brainFog                   -> software.leadSuitLevel, software.brainFogLevel (new fields, not yet
 *                                           charted by LedgerTab - additive, safe, available for future use)
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate Request
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid Authorization header" }, { status: 401 });
    }

    const idToken = authHeader.split("Bearer ")[1];
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken);
    } catch (authError) {
      console.error("Token verification failed:", authError);
      return NextResponse.json({ error: "Invalid or expired authentication token" }, { status: 401 });
    }

    const uid = decodedToken.uid;

    // 2. Parse Input
    const body = await request.json();
    const { input, structured } = body;

    if (!input || typeof input !== "string") {
      return NextResponse.json({ error: "Missing or invalid text input" }, { status: 400 });
    }

    // 3. Process with Gemini
    const aiResponse: MirrorResponse = await generateMirrorInsight(input);

    // 4. Write to Firestore: a "latest" pointer (cheap read) + append-only history
    const privateVault = adminDb.collection("users").doc(uid).collection("private_vault");
    const logDocRef = privateVault.doc("mirror_logs").collection("entries").doc();

    const firestorePayload = {
      rawInput: input,
      structured: structured ?? null,
      theWhy: aiResponse.theWhy,
      gentleAlerts: aiResponse.gentleAlerts,
      reliefPlan: aiResponse.reliefPlan,
      model: "gemini-2.5-flash",
      timestamp: FieldValue.serverTimestamp(),
    };

    const batch = adminDb.batch();
    batch.set(privateVault.doc("mirror_latest"), firestorePayload);
    batch.set(logDocRef, firestorePayload);

    // Merge today's software.* fields into the telemetry doc LedgerTab reads,
    // so real check-ins show up on the Hardware vs Software chart instead of
    // only the simulator's fake data. Only writes when structured sliders are
    // present; skips silently otherwise (e.g. voice-only submissions).
    const sliders = structured?.sliders as
      | { leadSuit?: number; brainFog?: number; cravings?: number; armorLevel?: number }
      | undefined;
    if (sliders) {
      const dateString = new Date().toISOString().split("T")[0];
      const telemetryDocRef = privateVault.doc(`telemetry_${dateString}`);
      const software: Record<string, number> = {};
      if (typeof sliders.armorLevel === "number") software.sciaticaPainLevel = sliders.armorLevel;
      if (typeof sliders.cravings === "number") software.cravingIntensity = sliders.cravings;
      if (typeof sliders.leadSuit === "number") software.leadSuitLevel = sliders.leadSuit;
      if (typeof sliders.brainFog === "number") software.brainFogLevel = sliders.brainFog;

      if (Object.keys(software).length > 0) {
        batch.set(
          telemetryDocRef,
          {
            date: dateString,
            timestamp: FieldValue.serverTimestamp(),
            software,
            // Deliberately NOT writing top-level `source` here: that field is
            // also written by /api/garmin/sync (e.g. "manual_garmin_export"),
            // and a plain merge would let whichever route runs last silently
            // overwrite the other's value on shared days. softwareSource is a
            // separate field so both write paths stay independently visible.
            softwareSource: "telemetry_log_checkin",
          },
          { merge: true }
        );
      }
    }

    await batch.commit();

    // 5. Return Response
    return NextResponse.json({
      success: true,
      data: aiResponse,
    });
  } catch (error: any) {
    console.error("AI Mirror API error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
