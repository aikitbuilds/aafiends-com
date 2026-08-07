import { Phone, MessageSquare } from "lucide-react";

/**
 * CrisisSupport — always-visible crisis resources.
 * Required by the 90 R&R safety audit (P0): 988 Lifeline, Crisis Text Line,
 * SAMHSA, and 911. Peer-support tools for a vulnerable population must surface
 * these plainly. Not a crisis service itself.
 *
 * Uses --rust rather than a saturated red: it has to read as serious without
 * reading as an error state, and it must sit calmly on a dark page.
 */
export default function CrisisSupport({ compact = false }: { compact?: boolean }) {
  const action =
    "inline-flex items-center gap-2 rounded-[10px] border border-[#c2603f]/40 px-4 py-2.5 text-[15px] font-semibold text-[#f2efe6] no-underline transition-colors hover:border-[#c2603f] hover:bg-[#c2603f]/10";

  return (
    <div className="rounded-[14px] border border-[#c2603f]/40 bg-[#c2603f]/[0.07] p-5 md:p-7">
      <h3 className="font-display text-[1.35rem] leading-tight text-[#f2efe6]">
        Immediate support
      </h3>
      {!compact && (
        <p className="mt-3 max-w-[62ch] text-[#b8b4a6]">
          If you&rsquo;re in crisis, thinking about using to escape pain, or thinking about harming
          yourself &mdash; this is a call, not a journaling problem. Reach out now. Detox from
          alcohol, benzodiazepines, or opioids can be dangerous; don&rsquo;t do it alone.
        </p>
      )}
      <div className="mt-5 flex flex-wrap gap-2.5">
        <a href="tel:988" className={action}>
          <Phone size={15} aria-hidden="true" /> Call or text 988
        </a>
        <a href="sms:741741&body=HOME" className={action}>
          <MessageSquare size={15} aria-hidden="true" /> Text HOME to 741741
        </a>
        <a href="tel:18006624357" className={action}>
          <Phone size={15} aria-hidden="true" /> SAMHSA 1-800-662-4357
        </a>
        <a href="tel:911" className={action}>
          Emergency 911
        </a>
      </div>
      <p className="font-measure mt-4 text-[12px] leading-relaxed text-[#7d7a70]">
        Free · confidential · 24/7. AAfiends is not a crisis service and cannot provide emergency
        support.
      </p>
    </div>
  );
}
