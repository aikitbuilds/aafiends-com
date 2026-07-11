"use client";

import SubstackSubscribe from "./SubstackSubscribe";

// Cross-links to the other live Fiends Grid properties. Added 2026-07-03 so the
// three sites stop operating as silos. RaceFiends.com and AIVirus.org get the
// matching version of this component — keep the three in sync if the roster
// changes.
const PROPERTIES = [
  {
    name: "AAfiends.com",
    tagline: "The daily dashboard. Data Over Denial.",
    href: "/",
    dot: "bg-[#10b981]",
    current: true,
  },
  {
    name: "RaceFiends.com",
    tagline: "The pavement. Carry the standard.",
    href: "https://racefiends.com",
    dot: "bg-red-500",
  },
  {
    name: "AIVirus.org",
    tagline: "The threat. Run the diagnostic.",
    href: "https://aivirus.org",
    dot: "bg-red-500 animate-pulse",
  },
];

export default function EcosystemFooter() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-4 mb-4">
      <div className="border border-white/10 rounded-3xl p-6 md:p-8 bg-[#080808]">
        <div className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-5 text-center">
          The Fiends Grid
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PROPERTIES.map((p) =>
            p.current ? (
              <div
                key={p.name}
                className="flex flex-col gap-1.5 p-4 rounded-2xl border border-[#10b981]/30 bg-[#10b981]/5"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${p.dot} shrink-0`}></span>
                  <span className="text-xs font-black text-white">{p.name}</span>
                  <span className="text-[9px] text-[#10b981] font-bold uppercase tracking-widest ml-auto">You are here</span>
                </div>
                <p className="text-[10px] text-neutral-400 font-light leading-relaxed">{p.tagline}</p>
              </div>
            ) : (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1.5 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${p.dot} shrink-0`}></span>
                  <span className="text-xs font-black text-white">{p.name}</span>
                </div>
                <p className="text-[10px] text-neutral-400 font-light leading-relaxed">{p.tagline}</p>
              </a>
            )
          )}
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/5">
          <div className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-4 text-center">
            Subscribe
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5 text-xs text-neutral-400">
            <a href="https://aafiends.substack.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Biology-first recovery, in your inbox — the AA Fiends Substack
            </a>
            <span className="hidden sm:inline text-white/20">|</span>
            <a href="https://www.youtube.com/@aafiends" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors font-bold text-white">
              Subscribe on YouTube &rarr;
            </a>
          </div>
          {/* TODO: YouTube "Watch" section — add once videos exist (channel RSS: youtube.com/feeds/videos.xml?channel_id=<ID>) */}
          <div className="max-w-md mx-auto">
            <SubstackSubscribe />
          </div>
        </div>
        
        <p className="text-center text-[9px] text-neutral-600 font-mono uppercase tracking-widest mt-8">
          Built by members, for members. Non-affiliated with AA World Services.
        </p>
      </div>
    </div>
  );
}
