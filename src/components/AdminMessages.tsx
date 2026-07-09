"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, MessageSquare, Gift, LogIn, Loader2 } from "lucide-react";

interface Msg { id: string; name?: string; email?: string; topic?: string; message?: string; note?: string; name2?: string; cost?: number; status?: string; createdAt?: string | null; }
interface Data { messages: Msg[]; feedback: Msg[]; redemptions: Msg[]; }

export default function AdminMessages() {
  const { user, loading: authLoading, login } = useAuth();
  const [data, setData] = useState<Data | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "forbidden" | "error">("idle");
  const [tab, setTab] = useState<"messages" | "feedback" | "redemptions">("messages");

  useEffect(() => {
    if (authLoading || !user) return;
    (async () => {
      setState("loading");
      try {
        const token = await user.getIdToken();
        const r = await fetch("/api/admin/messages", { headers: { Authorization: `Bearer ${token}` } });
        if (r.status === 403) { setState("forbidden"); return; }
        if (!r.ok) { setState("error"); return; }
        setData(await r.json()); setState("idle");
      } catch { setState("error"); }
    })();
  }, [user, authLoading]);

  if (authLoading) return <Center>Loading…</Center>;
  if (!user) return (
    <Center>
      <button onClick={login} className="inline-flex items-center gap-2 rounded-xl bg-white text-black text-sm font-black uppercase tracking-widest px-6 py-3.5">
        <LogIn size={16} /> Sign in
      </button>
    </Center>
  );
  if (state === "forbidden") return <Center>This inbox is for AAfiends admins only.</Center>;
  if (state === "loading" || (!data && state !== "error")) return <Center><Loader2 className="animate-spin" /> Loading inbox…</Center>;
  if (state === "error" || !data) return <Center>Couldn&apos;t load the inbox.</Center>;

  const tabs = [
    { id: "messages" as const, label: "Contact", icon: Mail, count: data.messages.length },
    { id: "feedback" as const, label: "Feedback", icon: MessageSquare, count: data.feedback.length },
    { id: "redemptions" as const, label: "Redemptions", icon: Gift, count: data.redemptions.length },
  ];
  const rows = data[tab];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-widest border ${tab === t.id ? "border-emerald-500 text-emerald-400 bg-emerald-500/5" : "border-white/10 text-neutral-400"}`}>
            <t.icon size={14} /> {t.label} <span className="text-neutral-600">{t.count}</span>
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <Center>Nothing here yet.</Center>
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((r) => (
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
              {r.email && tab !== "redemptions" && (
                <a href={`mailto:${r.email}`} className="inline-block mt-2 text-xs font-bold text-emerald-400 hover:underline uppercase tracking-widest">Reply →</a>
              )}
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
