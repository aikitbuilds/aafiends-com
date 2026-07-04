import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const idToken = authHeader.split("Bearer ")[1];
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken);
    } catch (err) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }

    const userId = decodedToken.uid;
    const batch = adminDb.batch();

    const today = new Date();
    
    // Generate 21 days of fake data
    for (let i = 0; i < 21; i++) {
      const targetDate = new Date();
      targetDate.setDate(today.getDate() - (20 - i)); // 20 days ago up to today
      const dateString = targetDate.toISOString().split('T')[0];

      // Simulated inverse correlation: Bad sleep/HRV = higher pain/cravings
      // Random base values
      const sleepHours = Math.random() * (9 - 4) + 4; // 4 to 9 hours
      const hrv = Math.floor(Math.random() * (80 - 20) + 20); // 20 to 80 ms
      const rhr = Math.floor(Math.random() * (85 - 50) + 50); // 50 to 85 bpm

      // Inverse correlation logic
      const isDeficitDay = sleepHours < 6 || hrv < 40;
      
      const sciaticaPainLevel = isDeficitDay 
        ? Math.floor(Math.random() * (10 - 6) + 6) // Pain 6-10
        : Math.floor(Math.random() * (5 - 1) + 1); // Pain 1-5

      const cravingIntensity = isDeficitDay
        ? Math.floor(Math.random() * (10 - 7) + 7) // Craving 7-10
        : Math.floor(Math.random() * (4 - 1) + 1); // Craving 1-4

      const docRef = adminDb.collection("users").doc(userId).collection("private_vault").doc(`telemetry_${dateString}`);
      
      batch.set(docRef, {
        date: dateString,
        timestamp: FieldValue.serverTimestamp(),
        hardware: {
          sleepHours: parseFloat(sleepHours.toFixed(1)),
          hrv,
          rhr,
        },
        software: {
          sciaticaPainLevel,
          cravingIntensity,
        },
        source: "simulated_garmin"
      }, { merge: true });
    }

    await batch.commit();

    return NextResponse.json({
      success: true,
      message: "Successfully injected 21 days of simulated Garmin telemetry.",
    }, { status: 200 });

  } catch (error: any) {
    console.error("Garmin Sync Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
