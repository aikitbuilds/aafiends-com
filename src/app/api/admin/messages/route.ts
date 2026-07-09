import { NextResponse } from "next/server";
import { adminDb, adminAuth } from "@/lib/firebaseAdmin";

// Who may read the inbox. Override with the ADMIN_EMAILS env var (comma-separated).
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "aafiends@gmail.com,michaelcongtran@gmail.com")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

/**
 * GET /api/admin/messages  (Authorization: Bearer <Firebase ID token>)
 * Returns contact submissions, in-app feedback, and reward redemption requests.
 * Gated to ADMIN_EMAILS — all reads are server-side via the Admin SDK, so the
 * underlying collections stay locked from the public app.
 */
export async function GET(req: Request) {
  try {
    const h = req.headers.get("authorization") || "";
    const m = h.match(/^Bearer (.+)$/i);
    if (!m) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let email = "";
    try {
      const decoded = await adminAuth.verifyIdToken(m[1]);
      email = (decoded.email || "").toLowerCase();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!ADMIN_EMAILS.includes(email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const grab = async (coll: string) => {
      try {
        const snap = await adminDb.collection(coll).orderBy("createdAt", "desc").limit(100).get();
        return snap.docs.map((d) => {
          const data: any = d.data();
          return { id: d.id, ...data, createdAt: data.createdAt?.toDate?.()?.toISOString?.() || null };
        });
      } catch (e) {
        console.error(`admin: read ${coll} failed`, e);
        return [];
      }
    };

    const [messages, feedback, redemptions] = await Promise.all([
      grab("contactMessages"),
      grab("feedback"),
      grab("redemptionRequests"),
    ]);

    return NextResponse.json({ ok: true, messages, feedback, redemptions });
  } catch (e) {
    console.error("admin messages route error", e);
    return NextResponse.json({ error: "Inbox failed to load." }, { status: 500 });
  }
}
