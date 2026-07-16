import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { adminDb, admin } from "@/lib/firebaseAdmin";

const { FieldValue } = admin.firestore;

const CONTACT_EMAIL = "aafiends@gmail.com";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body.email || "").trim().slice(0, 160);
    const message = String(body.message || "").trim().slice(0, 5000);
    const website = String(body.website || ""); // honeypot

    // Silently drop bots
    if (website) return NextResponse.json({ ok: true });

    if (message.length < 2) {
      return NextResponse.json({ error: "A message is required." }, { status: 400 });
    }

    // 1. Store in Firestore (optional but good for backup)
    let ref: any = null;
    try {
      ref = await adminDb.collection("bookFeedback").add({
        email,
        message,
        userAgent: req.headers.get("user-agent") || "",
        createdAt: FieldValue.serverTimestamp(),
        emailed: false,
      });
    } catch (e) {
      console.error("book-feedback: Firestore store failed", e);
    }

    // 2. Send email via Nodemailer + Gmail SMTP
    let emailed = false;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;

    if (gmailPassword) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: CONTACT_EMAIL,
            pass: gmailPassword,
          },
        });

        const mailOptions = {
          from: CONTACT_EMAIL, // Send from ourselves to avoid SPF/DKIM issues
          to: CONTACT_EMAIL,
          replyTo: email || CONTACT_EMAIL,
          subject: `AAfiends Book One Feedback`,
          text: `From: ${email || "Anonymous"}\n\n${message}`,
        };

        await transporter.sendMail(mailOptions);
        emailed = true;

        if (ref) {
          await ref.update({ emailed: true }).catch(() => {});
        }
      } catch (e) {
        console.error("book-feedback: Nodemailer failed", e);
      }
    } else {
      console.warn("book-feedback: GMAIL_APP_PASSWORD is not set");
    }

    return NextResponse.json({ ok: true, emailed });
  } catch (e) {
    console.error("book-feedback route error", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
