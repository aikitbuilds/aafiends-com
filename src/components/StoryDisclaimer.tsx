import { Info } from "lucide-react";

export default function StoryDisclaimer({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-[#0a0a0a] p-4 md:p-5 flex items-start gap-3.5 text-xs text-neutral-400 leading-relaxed ${className}`}>
      <Info className="text-[#10b981] shrink-0 mt-0.5" size={18} />
      <div className="flex flex-col gap-1">
        <span className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">
          A Note on the Stories
        </span>
        <p>
          These stories are mostly true — drawn from MT&apos;s own lived experiences in recovery, stories heard along the way, and concepts crafted together with his AI companion, Aivy. Characters and situations are dramatized for storytelling, but the neuroscience and recovery principles underneath are 100% real.
        </p>
      </div>
    </div>
  );
}
