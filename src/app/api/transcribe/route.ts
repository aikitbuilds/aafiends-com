import { NextRequest, NextResponse } from "next/server";
import { transcribeAudio } from "../../../lib/gemini";
import { adminAuth } from "../../../lib/firebaseAdmin";

/**
 * POST /api/transcribe
 *
 * Accepts a base64-encoded voice memo, sends it directly to Gemini for
 * transcription (see lib/gemini.ts's transcribeAudio), and returns plain
 * text. This is the first half of the audio journal flow requested
 * 2026-07-03: record -> transcribe here -> user reviews/edits the text in
 * TelemetryLog.tsx -> that edited text is submitted through the existing
 * /api/mirror route exactly like a typed check-in. Kept as its own
 * endpoint (rather than folded into /api/mirror) so the review/edit step
 * has a real transcript to show before anything is analyzed or written to
 * Firestore.
 *
 * Requires Firebase Auth ID token in Authorization header, same pattern as
 * /api/mirror.
 *
 * Body: { audioBase64: string, mimeType: string }
 * Returns: { success: true, transcript: string }
 */

// ~15MB decoded audio, generous for a 3-minute voice memo at typical
// browser-recorded bitrates (client also auto-stops recording at 3 minutes
// as a first line of defense - this is the server-side backstop).
const MAX_BASE64_LENGTH = 20_000_000;

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate Request
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid Authorization header" }, { status: 401 });
    }

    const idToken = authHeader.split("Bearer ")[1];
    try {
      await adminAuth.verifyIdToken(idToken);
    } catch (authError) {
      console.error("Token verification failed:", authError);
      return NextResponse.json({ error: "Invalid or expired authentication token" }, { status: 401 });
    }

    // 2. Parse + validate input
    const body = await request.json();
    const { audioBase64, mimeType } = body;

    if (!audioBase64 || typeof audioBase64 !== "string") {
      return NextResponse.json({ error: "Missing audio data" }, { status: 400 });
    }
    if (audioBase64.length > MAX_BASE64_LENGTH) {
      return NextResponse.json({ error: "Recording is too long. Keep check-ins under about 3 minutes." }, { status: 413 });
    }
    if (!mimeType || typeof mimeType !== "string") {
      return NextResponse.json({ error: "Missing audio format" }, { status: 400 });
    }

    // 3. Transcribe with Gemini
    const transcript = await transcribeAudio(audioBase64, mimeType);

    return NextResponse.json({ success: true, transcript });
  } catch (error: any) {
    console.error("Transcribe API error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
