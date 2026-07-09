"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { CHIP_TIERS, REDEMPTIONS, nextChip, type Redemption } from "@/lib/rewards";
import { Coins, Award, Lock, Gift, Loader2, CheckCircle2, Trophy } from "lucide-react";

interface State {
  daysSober: number; earned: number; redeemed: number; available: number;
  chips: string[]; level: string; redemptions: { id: string; name: string; cost: number; at: string }[];
}

const TYPE_LABEL: Record<string, string> = { symbolic: "Unlock", real: "Mailed", payitforward: "Give" };

export default function RewardsTab() {
  const { user } = useAuth();
  const [s, setS] = useState<State | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ id: string; text: string; ok: boolean } | null>(null);

  const call = useCallback(async (payload: object) => {
    if (!user) return null;
    const token = await user.getIdToken();
    const r = await fetch("/api/rewards", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    return { ok: r.ok, data: await r.json().catch(() => ({})) };
  }, [user]);

  useEffect(() => {
    (async () => {
      const res = await call({ action: "state" });
      if (res?.ok) setS(res.data as State);
      setLoading(false);
    })();
  }, [call]);

  const redeem = async (rw: Redemption) => {
    if (busy) return;
    setBusy(rw.id); setMsg(null);
    const res = await call({ action: "redeem", rewardId: rw.id });
    if (res?.ok) { setS(res.data as State); setMsg({ id: rw.id, text: "Redeemed! We'll take it from here.", ok: true }); }
    else setMsg({ id: rw.id, text: res?.data?.error || "Couldn't redeem.", ok: false });
    setBusy(null);
  };

  if (loading) return <div className="h-56 flex items-center justify-center text-xs font-mono uppercase tracking-widest text-neutral-500 animate-pulse">Loading your rewards…</div>;
  if (!s) return <div className="h-56 flex items-center justify-center text-sm text-neutral-500">Sign in to see your AAF rewards.</div>;

  const next = nextChip(s.daysSober);
  const nextPct = next ? Math.min(100, Math.round((s.daysSober / next.days) * 100)) : 100;

  return (
    <div className="flex flex-col gap-6">
      {/* balance header */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-[#0a0a0a] border border-[#f59e0b]/30 rounded-2xl p-5 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#f59e0b]"><Coins size={14} /> AAF Points</div>
          <div className="text-4xl font-black text-white">{s.available.toLocaleString()}</div>
          <div className="text-[11px] text-neutral-500">{s.earned.toLocaleString()} earned · {s.redeemed.toLocaleString()} redeemed</div>
        </div>
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400"><Trophy size={14} /> Rank</div>
          <div className="text-2xl font-black text-white">{s.level}</div>
          <div className="text-[11px] text-neutral-500">{s.chips.length} of {CHIP_TIERS.length} chips earned</div>
        </div>
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cyan-400"><Award size={14} /> Next chip</div>
          {next ? (
            <>
              <div className="text-sm font-black text-white">{next.name} <span className="text-neutral-500 font-mono">· day {next.days}</span></div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden"><div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400" style={{ width: `${nextPct}%` }} /></div>
              <div className="text-[11px] text-neutral-500">{Math.max(0, next.days - s.daysSober)} days to go (+{next.bonus} pts)</div>
            </>
          ) : <div className="text-sm font-black text-emerald-400">All chips earned. Legend.</div>}
        </div>
      </div>

      {/* trophy case */}
      <div>
        <h3 className="text-sm font-black uppercase tracking-widest text-white mb-3">Your Chips</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {CHIP_TIERS.map((c) => {
            const earned = s.chips.includes(c.key);
            return (
              <div key={c.key} title={c.blurb}
                className={`rounded-2xl border p-3 flex flex-col items-center text-center gap-1.5 ${earned ? "border-[#f59e0b]/40 bg-[#f59e0b]/[0.07]" : "border-white/10 bg-white/[0.02] opacity-60"}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm border-2 ${earned ? "border-[#f59e0b] text-[#f59e0b]" : "border-white/15 text-neutral-600"}`}>
                  {earned ? `${c.days}` : <Lock size={16} />}
                </div>
                <div className={`text-[10px] font-black uppercase tracking-wide ${earned ? "text-white" : "text-neutral-600"}`}>{c.name.replace(" Chip", "")}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* earn hint */}
      <p className="text-xs text-neutral-500 leading-relaxed">
        Earn AAF points by staying sober (each chip is a bonus), logging meetings and sponsor/service check-ins, and sending
        feedback. Points are calculated from your real activity — no gaming the system.
      </p>

      {/* redemption catalog */}
      <div>
        <h3 className="text-sm font-black uppercase tracking-widest text-white mb-3 flex items-center gap-2"><Gift size={16} className="text-[#f59e0b]" /> Redeem</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REDEMPTIONS.map((rw) => {
            const locked = !!rw.requiresDays && s.daysSober < rw.requiresDays;
            const cant = locked || s.available < rw.cost;
            const done = msg?.id === rw.id && msg.ok;
            return (
              <div key={rw.id} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-black text-white leading-tight">{rw.name}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500 shrink-0 mt-0.5">{TYPE_LABEL[rw.type]}</span>
                </div>
                <p className="text-[11px] text-neutral-500 leading-relaxed flex-1">{rw.blurb}</p>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <span className="text-[#f59e0b] font-black text-sm">{rw.cost.toLocaleString()} pts</span>
                  {done ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-bold"><CheckCircle2 size={14} /> Done</span>
                  ) : (
                    <button onClick={() => redeem(rw)} disabled={cant || busy === rw.id}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#f59e0b] disabled:opacity-40 disabled:cursor-not-allowed text-xs font-black uppercase tracking-wide px-3 py-1.5 hover:bg-[#f59e0b]/25 transition-colors">
                      {busy === rw.id ? <Loader2 size={13} className="animate-spin" /> : locked ? <><Lock size={12} /> Day {rw.requiresDays}</> : "Redeem"}
                    </button>
                  )}
                </div>
                {msg?.id === rw.id && !msg.ok && <p className="text-[11px] text-red-400">{msg.text}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {s.redemptions.length > 0 && (
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-2">Redeemed</h3>
          <div className="flex flex-col gap-1.5">
            {s.redemptions.slice().reverse().map((r, i) => (
              <div key={i} className="flex items-center justify-between text-xs text-neutral-400 bg-white/[0.02] border border-white/5 rounded-lg px-3 py-2">
                <span>{r.name}</span><span className="font-mono text-neutral-600">−{r.cost} pts · {new Date(r.at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
