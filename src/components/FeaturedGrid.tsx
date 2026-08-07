"use client";

// The Fiends Grid — a rich "featured" showcase of the three ecosystem sites,
// so a visitor understands the whole grid, not just AAfiends. Richer than the
// compact EcosystemFooter band; used prominently on the homepage.

import { Activity, Flame, Biohazard, ArrowRight } from "lucide-react";

const SITES = [
  {
    name: "AAfiends",
    domain: "aafiends.com",
    tagline: "The Daily Dashboard",
    desc: "Your recovery command center — daily check-ins, the AI Mirror, the BIO 12 protocol, biometrics, and the AI4AA course. Data Over Denial.",
    href: "/",
    cta: "You're here",
    current: true,
    icon: Activity,
    text: "text-[#4cc07a]", border: "border-[#4cc07a]/40", bg: "bg-[#4cc07a]/5", grad: "from-[#4cc07a] to-teal-500", dot: "bg-[#4cc07a]",
  },
  {
    name: "RaceFiends",
    domain: "racefiends.com",
    tagline: "The Pavement",
    desc: "Running accountability with a partner and honest stakes. Movement is Pillar 1 of BIO 12 — carry the standard, rebuild the baseline.",
    href: "https://racefiends.com",
    cta: "Visit RaceFiends",
    icon: Flame,
    text: "text-red-400", border: "border-red-500/40", bg: "bg-red-500/5", grad: "from-red-500 to-orange-500", dot: "bg-red-500",
  },
  {
    name: "AIVirus",
    domain: "aivirus.org",
    tagline: "The Diagnosis",
    desc: "Meet the Addiction Intelligence Virus across 10 vectors — and the BIO 12 firewall that starves it. Understand the threat, then run the diagnostic.",
    href: "https://aivirus.org",
    cta: "Visit AIVirus",
    icon: Biohazard,
    text: "text-red-400", border: "border-red-500/40", bg: "bg-red-500/5", grad: "from-red-600 to-rose-500", dot: "bg-red-500",
  },
];

export default function FeaturedGrid() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16 relative z-20 border-t border-[#1d231d]">
      <div className="text-center flex flex-col gap-3 mb-10">
        <span className="text-[10px] font-semibold text-[#7d7a70] tracking-[0.3em]">The Fiends Grid</span>
        <h2 className="text-3xl md:text-5xl font-semibold text-[#f2efe6] tracking-tight leading-none">One ecosystem. Three fronts.</h2>
        <p className="text-[#b8b4a6] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          The same fight, attacked from three angles — the daily dashboard, the pavement, and the diagnosis. Each stands alone; together they&apos;re a grid.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SITES.map((s) => {
          const Icon = s.icon;
          const inner = (
            <>
              <div className={`h-1.5 w-full bg-gradient-to-r ${s.grad}`} />
              <div className="p-6 md:p-7 flex flex-col gap-4 flex-1">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.grad} flex items-center justify-center text-[#f2efe6] shadow-lg`}>
                    <Icon size={22} />
                  </div>
                  {s.current ? (
                    <span className={`text-[9px] font-semibold ${s.text}`}>You&apos;re here</span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#7d7a70]">
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} /> {s.domain}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#f2efe6] tracking-tight">{s.name}</h3>
                  <p className={`text-xs font-bold ${s.text}`}>{s.tagline}</p>
                </div>
                <p className="text-sm text-[#b8b4a6] leading-relaxed flex-1">{s.desc}</p>
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${s.text} group-hover:gap-2.5 transition-all`}>
                  {s.cta} <ArrowRight size={14} />
                </span>
              </div>
            </>
          );
          const cls = `group bg-[#141814] border ${s.border} rounded-[14px] overflow-hidden flex flex-col shadow-xl transition-all hover:-translate-y-1`;
          return s.current ? (
            <a key={s.name} href={s.href} className={cls}>{inner}</a>
          ) : (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
          );
        })}
      </div>

      <p className="text-center text-[9px] text-[#7d7a70] font-mono mt-8">
        Built by members, for members · Non-affiliated with AA World Services
      </p>
    </section>
  );
}
