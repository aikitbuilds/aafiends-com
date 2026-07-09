"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, MessageSquare, Gift, Terminal, LogIn, Loader2, Check, X } from "lucide-react";

interface Row {
  id: string; name?: string; email?: string; topic?: string; message?: string; note?: string;
  cost?: number; status?: string; createdAt?: string | null;
  authorAlias?: string; threatProfile?: string; systemFailure?: string; mitigationProtocol?: string; result?: string; isApproved?: boolean;
}
interface Data { messages: Row[]; feedback: Row[]; redemptions: Row[]; trench: Row[]; }
type Tab = "messages" | "feedback" | "redemptions" | "trench";

export default function AdminMessages() {
  const { user, loading: authLoading, login } = useAuth();
  const [data, setData] = useState<Data | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "forbidden" | "error">("idle");
  const [tab, setTab] = useState<Tab>("messages");
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setState("loading");
    try {
      const token = await user.getIdToken();
      const r = await fetch("/api/admin/messages", { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
      if (r.status === 403) { setState("forbidden"); return; }
      if (!r.ok) { setState("error"); return; }
      setData(await r.json()); setState("idle");
    } catch { setState("error"); }
  }, [user]);

  useEffect(() => { if (!authLoading && user) load(); }, [authLoading, user, load]);

  const act = async (id: string, action: "approveTrench" | "rejectTrench") => {
    if (!user || busy) return;
    setBusy(id);
    try {
      const token = await user.getIdToken();
      await fetch("/api/admin/messages", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ action, id }) });
      await load();
    } catch { /* ignore */ }
    setBusy(null);
  };

  if (authLoading) return <Center>Loading…</Center>;
  if (!user) return <Center><button onClick={login} className="inline-flex items-center gap-2 rounded-xl bg-white text-black text-sm font-black uppercase tracking-widest px-6 py-3.5"><LogIn size={16} /> Sign in</button></Center>;
  if (state === "forbidden") return <Center>This inbox is for AAfiends admins only.</Center>;
  if (state === "loading" || (!data && state !== "error")) return <Center><Loader2 className="animate-spin" /> Loading inbox…</Center>;
  if (state === "error" || !data) return <Center>Couldn&apos;t load the inbox.</Center>;

  const pendingTrench = data.trench.filter((t) => !t.isApproved).length;
  const tabs = [
    { id: "messages" as Tab, label: "Contact", icon: Mail, count: data.messages.length },
    { id: "feedback" as Tab, label: "Feedback", icon: MessageSquare, count: data.feedback.length },
    { id: "redemptions" as Tab, label: "Redemptions", icon: Gift, count: data.redemptions.length },
    { id: "trench" as Tab, label: "Trench", icon: Terminal, count: pendingTrench },
  ];
  const rows = data[tab];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 flex-wrap">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-widest border ${tab === t.id ? "border-emerald-500 text-emerald-400 bg-emerald-500/5" : "border-white/10 text-neutral-400"}`}>
            <t.icon size={14} /> {t.label} {t.count > 0 && <span className={t.id === "trench" ? "text-[#f59e0b]" : "text-neutral-600"}>{t.count}</span>}
          </button>
        ))}
      </div>

      {rows.length === 0 ? <Center>Nothing here yet.</Center> : (
        <div className="flex flex-col gap-3">
          {rows.map((r) => tab === "trench" ? (
            <div key={r.id} className={`rounded-2xl p-4 border ${r.isApproved ? "border-white/10 bg-white/[0.02]" : "border-[#f59e0b]/30 bg-[#f59e0b]/[0.04]"}`}>
              <div className="flex items-center justify-between gap-3 mb-1.5 flex-wrap">
                <div className="text-sm font-black text-white">{r.threatProfile} <span className="text-neutral-500 font-normal">· {r.authorAlias}</span>
                  {!r.isApproved ? <span className="ml-2 text-[10px] font-mono uppercase tracking-widest text-[#f59e0b]">Pending</span> : <span className="ml-2 text-[10px] font-mono uppercase tracking-widest text-emerald-400">Live</span>}
                </div>
                <span className="text-[11px] font-mono text-neutral-600">{r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}</span>
              </div>
              {r.systemFailure && <p className="text-xs text-neutral-400 mb-1">{r.systemFailure}</p>}
              <p className="text-sm text-neutral-200">{r.mitigationProtocol}</p>
              {r.result && <p className="text-[11px] font-mono text-emerald-400 uppercase tracking-wide mt-1">{r.result}</p>}
              {!r.isApproved && (
                <div className="flex gap-2 mt-3">
                  <button onClick={() => act(r.id, "approveTrench")} disabled={busy === r.id} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 text-black text-xs font-black uppercase tracking-wide px-3 py-1.5 disabled:opacity-50">{busy === r.id ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />} Approve</button>
                  <button onClick={() => act(r.id, "rejectTrench")} disabled={busy === r.id} className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 text-neutral-300 text-xs font-black uppercase tracking-wide px-3 py-1.5 disabled:opacity-50 hover:border-red-400/40"><X size={12} /> Reject</button>
                </div>
              )}
            </div>
          ) : (
            <div key={r.id} className="bg-[#09090b] border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between gap-3 mb-1.5 flex-wrap">
                <div className="text-sm font-black text-white">
                  {tab === "redemptions" ? (r.name || r.id) : (r.name || "—")}
                  {r.email && <span className="text-neutral-500 font-normal"> · {r.email}</span>}
                  {r.topic && <span className="ml-2 text-[10px] font-mono uppercase tracking-widest text-emerald-400">{r.topic}</span>}
                  {tab === "redemptions" && <span className="ml-2 text-[10px] font-mono uppercase tracking-widest text-[#f59e0b]">{r.cost} pts · {r.status}</span>}
                </div>
                <span className="text-[11px] font-mono text-neutral-600">{r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}</span>
              </div>
              {(r.message || r.note) && <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">{r.message || r.note}</p>}
              {r.email && tab !== "redemptions" && <a href={`mailto:${r.email}`} className="inline-block mt-2 text-xs font-bold text-emerald-400 hover:underline uppercase tracking-widest">Reply →</a>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return <div className="h-48 flex items-center justify-center gap-2 text-sm text-neutral-400">{children}</div>;
}
