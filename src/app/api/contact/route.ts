import { NextResponse } from "next/server";
import { adminDb, admin } from "@/lib/firebaseAdmin";

const { FieldValue } = admin.firestore;

// Where contact-form notifications go, and who they're from.
// CONTACT_TO / CONTACT_FROM / RESEND_API_KEY can be set in the Cloud Run env.
const CONTACT_TO = process.env.CONTACT_TO || "aafiends@gmail.com";
// Resend's shared sender works out of the box for testing; switch to a
// verified aafiends.com sender once the domain is verified in Resend.
const CONTACT_FROM = process.env.CONTACT_FROM || "AAfiends Contact <onboarding@resend.dev>";

/**
 * POST /api/contact
 * Body: { name, email, topic?, message, website? (honeypot) }
 *
 * 1. Always stores the message to Firestore `contactMessages` via the Admin
 *    SDK (server-side, so no firestore.rules change is needed).
 * 2. Best-effort emails aafiends@gmail.com via the Resend REST API when
 *    RESEND_API_KEY is set. If it isn't, the message is still captured in
 *    Firestore and readable from the Firebase console.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = String(body.name || "").trim().slice(0, 120);
    const email = String(body.email || "").trim().slice(0, 160);
    const topic = String(body.topic || "").trim().slice(0, 60);
    const message = String(body.message || "").trim().slice(0, 5000);
    const website = String(body.website || ""); // honeypot: real users leave blank

    if (website) return NextResponse.json({ ok: true }); // silently drop bots

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk || message.length < 2) {
      return NextResponse.json({ error: "A valid email and a message are required." }, { status: 400 });
    }

    let ref: any = null;
    try {
      ref = await adminDb.collection("contactMessages").add({
        name, email, topic, message,
        userAgent: req.headers.get("user-agent") || "",
        createdAt: FieldValue.serverTimestamp(),
        emailed: false,
      });
    } catch (e) {
      console.error("contact: Firestore store failed", e);
    }

    let emailed = false;
    const key = process.env.RESEND_API_KEY;
    if (key) {
      try {
        const r = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: CONTACT_FROM,
            to: [CONTACT_TO],
            reply_to: email,
            subject: `AAfiends contact${topic ? " · " + topic : ""} — ${name || email}`,
            text: `From: ${name || "(no name)"} <${email}>\nTopic: ${topic || "General"}\n\n${message}`,
          }),
        });
        emailed = r.ok;
        if (!r.ok) console.error("contact: Resend failed", r.status, await r.text().catch(() => ""));
        if (ref && emailed) await ref.update({ emailed: true }).catch(() => {});
      } catch (e) {
        console.error("contact: Resend error", e);
      }
    }

    return NextResponse.json({ ok: true, emailed });
  } catch (e) {
    console.error("contact route error", e);
    return NextResponse.json(
      { error: "Something went wrong. Please email aafiends@gmail.com directly." },
      { status: 500 },
    );
  }
}
