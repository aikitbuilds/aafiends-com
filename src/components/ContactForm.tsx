"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

const TOPICS = ["General", "90 R&R Fellowship", "The journal", "Feedback / idea", "Press / partnership", "Something's broken"];

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", topic: "General", message: "", website: "" });
  const set = (k: keyof typeof form, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setState(r.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="bg-[#09090b] border border-[#10b981]/30 rounded-3xl p-10 text-center flex flex-col items-center gap-4">
        <CheckCircle2 className="text-[#10b981]" size={56} />
        <h3 className="text-2xl font-black text-white uppercase tracking-tight">Message sent.</h3>
        <p className="text-neutral-400 max-w-md leading-relaxed">
          Thanks for reaching out — we read every message. We&apos;ll reply to <span className="text-white font-bold">{form.email}</span>.
          If it&apos;s urgent, email <a href="mailto:aafiends@gmail.com" className="text-[#10b981] underline">aafiends@gmail.com</a> directly.
        </p>
      </div>
    );
  }

  const input = "w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[#10b981]/50 transition-colors";

  return (
    <form onSubmit={submit} className="bg-[#09090b] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-4">
      {/* honeypot (hidden from humans) */}
      <input type="text" tabIndex={-1} autoComplete="off" value={form.website}
        onChange={(e) => set("website", e.target.value)}
        className="hidden" aria-hidden="true" />

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] font-black uppercase tracking-widest text-neutral-500">Name or handle</span>
          <input className={input} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="What do we call you?" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] font-black uppercase tracking-widest text-neutral-500">Email <span className="text-[#10b981]">*</span></span>
          <input className={input} type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="so we can reply" />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-[11px] font-black uppercase tracking-widest text-neutral-500">Topic</span>
        <select className={input} value={form.topic} onChange={(e) => set("topic", e.target.value)}>
          {TOPICS.map((t) => <option key={t} value={t} className="bg-[#050505]">{t}</option>)}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[11px] font-black uppercase tracking-widest text-neutral-500">Message <span className="text-[#10b981]">*</span></span>
        <textarea className={`${input} resize-none`} rows={5} required value={form.message}
          onChange={(e) => set("message", e.target.value)} placeholder="Tell us what's on your mind — questions, feedback, or how we can help." />
      </label>

      {state === "error" && (
        <p className="text-sm text-red-400">
          Couldn&apos;t send that. Please try again, or email <a href="mailto:aafiends@gmail.com" className="underline">aafiends@gmail.com</a>.
        </p>
      )}

      <button type="submit" disabled={state === "sending"}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#10b981] hover:bg-[#059669] disabled:opacity-60 text-black text-sm font-black uppercase tracking-widest px-6 py-4 transition-colors">
        {state === "sending" ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <><Send size={16} /> Send message</>}
      </button>
      <p className="text-[11px] text-neutral-600 leading-relaxed">
        We honor anonymity — a first name or handle is fine. Not a crisis line: if you&apos;re in danger, call or text 988.
      </p>
    </form>
  );
}
