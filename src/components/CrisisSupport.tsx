import { LifeBuoy, Phone, MessageSquare } from "lucide-react";

/**
 * CrisisSupport — always-visible crisis resources.
 * Required by the 90 R&R safety audit (P0): 988 Lifeline, Crisis Text Line,
 * SAMHSA, and 911. Peer-support tools for a vulnerable population must surface
 * these plainly. Not a crisis service itself.
 */
export default function CrisisSupport({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-2xl border border-red-500/30 bg-red-500/[0.06] p-5 md:p-6">
      <div className="flex items-center gap-2 mb-2">
        <LifeBuoy className="text-red-400 shrink-0" size={18} />
        <h3 className="text-sm font-black uppercase tracking-widest text-red-300">Immediate support</h3>
      </div>
      {!compact && (
        <p className="text-sm text-neutral-300 leading-relaxed mb-4 max-w-2xl">
          If you&apos;re in crisis, thinking about using to escape pain, or thinking about harming
          yourself — this is a call, not a journaling problem. Reach out now. Detox from alcohol,
          benzodiazepines, or opioids can be dangerous; don&apos;t do it alone.
        </p>
      )}
      <div className="flex flex-wrap gap-2.5">
        <a href="tel:988" className="inline-flex items-center gap-2 rounded-xl bg-red-500/15 border border-red-500/40 px-4 py-2.5 text-sm font-bold text-red-200 hover:bg-red-500/25 transition-colors">
          <Phone size={15} /> Call or text 988
        </a>
        <a href="sms:741741&body=HOME" className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm font-bold text-neutral-200 hover:border-red-500/40 transition-colors">
          <MessageSquare size={15} /> Text HOME to 741741
        </a>
        <a href="tel:18006624357" className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm font-bold text-neutral-200 hover:border-red-500/40 transition-colors">
          <Phone size={15} /> SAMHSA 1-800-662-4357
        </a>
        <a href="tel:911" className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm font-bold text-neutral-200 hover:border-red-500/40 transition-colors">
          Emergency 911
        </a>
      </div>
      <p className="text-[10px] text-neutral-500 font-mono leading-relaxed mt-3">
        Free · confidential · 24/7. AAfiends is not a crisis service and cannot provide emergency support.
      </p>
    </div>
  );
}
