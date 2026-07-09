import { NextResponse } from "next/server";
import { adminDb, adminAuth, admin } from "@/lib/firebaseAdmin";
import { REDEMPTIONS, earnedPoints, earnedChips, daysSoberFrom, levelFor } from "@/lib/rewards";

const { FieldValue } = admin.firestore;

/**
 * POST /api/rewards  (requires Firebase Auth ID token: Authorization: Bearer <token>)
 *   { action: "state" }                -> current points/chips/level
 *   { action: "redeem", rewardId }     -> validate + deduct + queue fulfillment
 *
 * Points are DERIVED server-side from verified source data (sobrietyDate,
 * meetingsCount, service actions) minus what's been redeemed — there is no
 * client-writable balance to spoof. The `rewards` field on the user doc is
 * written only here (Admin SDK); `firestore.rules` blocks clients from
 * changing it.
 */

async function uidFromReq(req: Request): Promise<string | null> {
  const h = req.headers.get("authorization") || "";
  const m = h.match(/^Bearer (.+)$/i);
  if (!m) return null;
  try {
    const decoded = await adminAuth.verifyIdToken(m[1]);
    return decoded.uid;
  } catch {
    return null;
  }
}

function computeState(profile: any) {
  const sobrietyDate = profile?.sobrietyDate || null;
  const daysSober = daysSoberFrom(sobrietyDate);
  const meetingsCount = profile?.meetingsCount || 0;
  const rewards = profile?.rewards || {};
  const earned = earnedPoints({
    daysSober,
    meetingsCount,
    sponsorActions: rewards.sponsorActions || 0,
    feedbackCount: rewards.feedbackCount || 0,
  });
  const redeemed = rewards.redeemed || 0;
  const available = Math.max(0, earned - redeemed);
  return {
    sobrietyDate,
    daysSober,
    meetingsCount,
    earned,
    redeemed,
    available,
    chips: earnedChips(daysSober).map((c) => c.key),
    level: levelFor(earned).name,
    redemptions: rewards.redemptions || [],
  };
}

export async function POST(req: Request) {
  try {
    const uid = await uidFromReq(req);
    if (!uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const ref = adminDb.collection("users").doc(uid);
    const snap = await ref.get();
    const profile: any = snap.exists ? snap.data() : {};
    const state = computeState(profile);

    if (body.action === "redeem") {
      const reward = REDEMPTIONS.find((r) => r.id === body.rewardId);
      if (!reward) return NextResponse.json({ error: "Unknown reward." }, { status: 400 });
      if (reward.requiresDays && state.daysSober < reward.requiresDays) {
        return NextResponse.json({ error: `Unlocks at ${reward.requiresDays} days sober.` }, { status: 400 });
      }
      if (state.available < reward.cost) {
        return NextResponse.json({ error: "Not enough AAF points yet." }, { status: 400 });
      }
      const record = { id: reward.id, name: reward.name, cost: reward.cost, type: reward.type, at: new Date().toISOString() };
      await ref.set(
        {
          rewards: {
            redeemed: FieldValue.increment(reward.cost),
            redemptions: FieldValue.arrayUnion(record),
          },
        },
        { merge: true },
      );
      // server-only fulfillment queue (real-world items are mailed / handled by hand)
      await adminDb.collection("redemptionRequests").add({
        uid,
        rewardId: reward.id,
        name: reward.name,
        cost: reward.cost,
        type: reward.type,
        status: "pending",
        email: profile?.email || "",
        createdAt: FieldValue.serverTimestamp(),
      });
      const fresh = computeState({
        ...profile,
        rewards: { ...(profile?.rewards || {}), redeemed: (profile?.rewards?.redeemed || 0) + reward.cost },
      });
      return NextResponse.json({ ok: true, ...fresh });
    }

    if (body.action === "log") {
      const kind = body.kind;
      const today = new Date().toISOString().slice(0, 10);
      const rw = profile?.rewards || {};
      if (kind === "service") {
        if (rw.lastServiceDate === today) return NextResponse.json({ error: "You already logged service today — see you tomorrow." }, { status: 400 });
        await ref.set({ rewards: { sponsorActions: FieldValue.increment(1), lastServiceDate: today } }, { merge: true });
      } else if (kind === "feedback") {
        if (rw.lastFeedbackDate === today) return NextResponse.json({ error: "Thanks — today's feedback is already counted." }, { status: 400 });
        await ref.set({ rewards: { feedbackCount: FieldValue.increment(1), lastFeedbackDate: today } }, { merge: true });
        if (body.note) await adminDb.collection("feedback").add({ uid, note: String(body.note).slice(0, 2000), email: profile?.email || "", createdAt: FieldValue.serverTimestamp() });
      } else {
        return NextResponse.json({ error: "Unknown log kind." }, { status: 400 });
      }
      const after = await ref.get();
      return NextResponse.json({ ok: true, ...computeState(after.data()) });
    }

    return NextResponse.json({ ok: true, ...state });
  } catch (e) {
    console.error("rewards route error", e);
    return NextResponse.json({ error: "Rewards service failed." }, { status: 500 });
  }
}
