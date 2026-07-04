import { BUILD_TIME } from "@/lib/buildInfo";
import { Clock } from "lucide-react";

// Small badge showing when this code was last changed/deployed. Placed next
// to the login/account controls on every page per Michael's request
// (2026-07-03) - so it's visually obvious whether a browser tab is showing
// the latest deploy without needing to ask.
export default function BuildStamp() {
  return (
    <span
      title="Last code change deployed"
      className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 bg-[#0a0a0a] text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest shrink-0"
    >
      <Clock size={10} className="text-[#10b981]" />
      {BUILD_TIME}
    </span>
  );
}
