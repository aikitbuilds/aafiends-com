import { NextResponse } from "next/server";
import { adminDb, admin } from "@/lib/firebaseAdmin";

const { FieldValue } = admin.firestore;

// The Trench Repository lives on aivirus.org but is stored in the aafiends
// Firebase (the ecosystem backend). aivirus is a static site with no Firestore
// of its own, so it reads/submits here cross-origin.
const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

/** GET — public: the approved crowdsourced mitigation logs. */
export async function GET() {
  try {
    const snap = await adminDb.collection("trenchLogs").where("isApproved", "==", true).limit(80).get();
    const logs = snap.docs
      .map((d) => {
        const x: any = d.data();
        return {
          id: d.id,
          authorAlias: x.authorAlias || "Initiate",
          threatProfile: x.threatProfile || "",
          systemFailure: x.systemFailure || "",
          mitigationProtocol: x.mitigationProtocol || "",
          result: x.result || "",
          createdAt: x.createdAt?.toDate?.()?.toISOString?.() || null,
        };
      })
      .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    return NextResponse.json({ ok: true, logs }, { headers: CORS });
  } catch (e) {
    console.error("trench GET error", e);
    return NextResponse.json({ ok: false, logs: [] }, { status: 500, headers: CORS });
  }
}

/** POST — submit a protocol. Stored pending (isApproved:false) for admin review. */
export async function POST(req: Request) {
  try {
    const b = await req.json().catch(() => ({}));
    if (b.website) return NextResponse.json({ ok: true }, { headers: CORS }); // honeypot
    const f = (v: unknown, n: number) => String(v || "").trim().slice(0, n);
    const threatProfile = f(b.threatProfile, 80);
    const systemFailure = f(b.systemFailure, 400);
    const mitigationProtocol = f(b.mitigationProtocol, 600);
    const result = f(b.result, 120);
    const authorAlias = f(b.authorAlias, 40) || "Initiate";
    if (threatProfile.length < 2 || mitigationProtocol.length < 4) {
      return NextResponse.json({ error: "A threat profile and a mitigation protocol are required." }, { status: 400, headers: CORS });
    }
    await adminDb.collection("trenchLogs").add({
      authorAlias, threatProfile, systemFailure, mitigationProtocol, result,
      isApproved: false,
      createdAt: FieldValue.serverTimestamp(),
    });
    return NextResponse.json({ ok: true, pending: true }, { headers: CORS });
  } catch (e) {
    console.error("trench POST error", e);
    return NextResponse.json({ error: "Submission failed. Try again." }, { status: 500, headers: CORS });
  }
}
