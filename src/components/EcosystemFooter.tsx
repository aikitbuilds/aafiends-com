"use client";

import SubstackSubscribe from "./SubstackSubscribe";

// Cross-links to the other live Fiends Grid properties. Added 2026-07-03 so the
// three sites stop operating as silos. RaceFiends.com and AIVirus.org get the
// matching version of this component — keep the three in sync if the roster
// changes.
// Standardized 2026-07-25: same three cards, same one-line job, same order on
// all three sites — diagnosis → treatment → movement, which is the order a
// person actually moves through them.
const PROPERTIES = [
  {
    name: "AIVirus.org",
    tagline: "The diagnosis. Understand the threat.",
    href: "https://aivirus.org",
    dot: "bg-red-500",
  },
  {
    name: "AAfiends.com",
    tagline: "The treatment. Run the daily program.",
    href: "/",
    dot: "bg-[#4cc07a]",
    current: true,
  },
  {
    name: "RaceFiends.com",
    tagline: "The movement. Carry the standard.",
    href: "https://racefiends.com",
    dot: "bg-orange-500",
  },
];

export default function EcosystemFooter() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-4 mb-4">
      <div className="border border-[#1d231d] rounded-[14px] p-6 md:p-8 bg-[#080808]">
        <div className="text-[10px] font-semibold text-[#7d7a70] mb-5 text-center">
          The Fiends Grid
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PROPERTIES.map((p) =>
            p.current ? (
              <div
                key={p.name}
                className="flex flex-col gap-1.5 p-4 rounded-2xl border border-[#4cc07a]/30 bg-[#4cc07a]/5"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${p.dot} shrink-0`}></span>
                  <span className="text-xs font-semibold text-[#f2efe6]">{p.name}</span>
                  <span className="text-[9px] text-[#4cc07a] font-bold ml-auto">You are here</span>
                </div>
                <p className="text-[10px] text-[#b8b4a6] font-light leading-relaxed">{p.tagline}</p>
              </div>
            ) : (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1.5 p-4 rounded-2xl border border-[#1d231d] bg-white/[0.02] hover:border-[#2a322a] hover:bg-[#141814] transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${p.dot} shrink-0`}></span>
                  <span className="text-xs font-semibold text-[#f2efe6]">{p.name}</span>
                </div>
                <p className="text-[10px] text-[#b8b4a6] font-light leading-relaxed">{p.tagline}</p>
              </a>
            )
          )}
        </div>
        
        <div className="mt-8 pt-8 border-t border-[#1d231d]">
          <div className="text-[10px] font-semibold text-[#7d7a70] mb-4 text-center">
            Subscribe
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5 text-xs text-[#b8b4a6]">
            <a href="https://aafiends.substack.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f2efe6] transition-colors">
              Biology-first recovery, in your inbox — the AA Fiends Substack
            </a>
            <span className="hidden sm:inline text-[#f2efe6]/20">|</span>
            <a href="https://www.youtube.com/@aafiends" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors font-bold text-[#f2efe6]">
              Subscribe on YouTube &rarr;
            </a>
          </div>
          {/* TODO: YouTube "Watch" section — add once videos exist (channel RSS: youtube.com/feeds/videos.xml?channel_id=<ID>) */}
          <div className="max-w-md mx-auto">
            <SubstackSubscribe />
          </div>
        </div>
        
        <p className="text-center text-[9px] text-[#7d7a70] font-mono mt-8">
          Built by members, for members. Non-affiliated with AA World Services.
        </p>
      </div>
    </div>
  );
}
