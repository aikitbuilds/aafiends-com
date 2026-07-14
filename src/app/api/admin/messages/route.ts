import { NextResponse } from "next/server";
import { adminDb, adminAuth } from "@/lib/firebaseAdmin";

// Who may read the inbox / approve Trench logs. Override via ADMIN_EMAILS env.
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "aafiends@gmail.com")
  .split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);

async function adminOf(req: Request): Promise<string | null> {
  const h = req.headers.get("authorization") || "";
  const m = h.match(/^Bearer (.+)$/i);
  if (!m) return null;
  try {
    const d = await adminAuth.verifyIdToken(m[1]);
    const e = (d.email || "").toLowerCase();
    return ADMIN_EMAILS.includes(e) ? e : null;
  } catch { return null; }
}

/** GET — contact submissions, in-app feedback, reward redemptions, and Trench logs. */
export async function GET(req: Request) {
  try {
    const email = await adminOf(req);
    if (!email) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const grab = async (coll: string) => {
      try {
        const snap = await adminDb.collection(coll).orderBy("createdAt", "desc").limit(100).get();
        return snap.docs.map((d) => {
          const x: any = d.data();
          return { id: d.id, ...x, createdAt: x.createdAt?.toDate?.()?.toISOString?.() || null };
        });
      } catch (e) { console.error(`admin read ${coll}`, e); return []; }
    };
    const [messages, feedback, redemptions, trench] = await Promise.all([
      grab("contactMessages"), grab("feedback"), grab("redemptionRequests"), grab("trenchLogs"),
    ]);
    return NextResponse.json({ ok: true, messages, feedback, redemptions, trench });
  } catch (e) {
    console.error("admin GET error", e);
    return NextResponse.json({ error: "Inbox failed to load." }, { status: 500 });
  }
}

/** POST — approve or reject a Trench submission. { action: "approveTrench"|"rejectTrench", id } */
export async function POST(req: Request) {
  try {
    const email = await adminOf(req);
    if (!email) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const b = await req.json().catch(() => ({}));
    const id = String(b.id || "");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const ref = adminDb.collection("trenchLogs").doc(id);
    if (b.action === "approveTrench") { await ref.update({ isApproved: true, approvedBy: email }); return NextResponse.json({ ok: true }); }
    if (b.action === "rejectTrench") { await ref.delete(); return NextResponse.json({ ok: true }); }
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (e) {
    console.error("admin POST error", e);
    return NextResponse.json({ error: "Action failed." }, { status: 500 });
  }
}
