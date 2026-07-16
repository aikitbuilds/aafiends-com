// Save this file to: aafiends.com/src/app/prep90/page.tsx
// It is the destination for the Preps & Tools QR code in the printed journal.
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preps & Tools — 90 R&R | AAfiends",
  description:
    "Everything to gather before Day 1 of the 90 Days R&R journal: gear, protocols, the movement guide, and a starter grocery list.",
};

const JOURNAL_PDF = "/90rr/90RR-Journal-Month1-Alpha1.pdf";

const GEAR = [
  ["Apple cider vinegar + sea salt", "Morning hydration — stabilizes energy and mood before caffeine."],
  ["A watch (Garmin / Apple / Whoop / Oura)", "Turns “I slept okay” into real data — hours, wake-ups, HRV."],
  ["A simple scale", "A weekly body check — one data point, no obsessing."],
  ["Good pens you enjoy", "You write here every day. Make it something you like holding."],
  ["Water bottle", "Keep it on you. Hydration is Pillar 1."],
  ["Yoga mat", "Floor mobility, stretching, and the intensive day."],
  ["Walking shoes", "Zone 2 walk-runs are the backbone of movement."],
  ["A quiet spot", "A corner for 5 minutes of stillness or prayer."],
];

const PROTOCOLS = [
  ["Sleep-tracking", "#10b981", "Log hours, wake-ups, and HRV every morning on Side A. Deep sleep rebuilds GABA — your natural brake against cravings."],
  ["The Power-Nap Protocol", "#f59e0b", "Afternoon crash? Set a 36-minute alarm: ~5 minutes to fall asleep + ~30 of real rest. Longer and you wake up groggy."],
  ["The 6 AM meeting", "#a855f7", "Anchor the day early. It front-loads connection and starts the streak before the day gets away from you."],
  ["DOSE contrast", "#00f0ff", "Cold exposure or a brisk walk gives a clean dopamine and adrenaline lift — the brain learns to feel good without a substance."],
];

const MOVEMENT = [
  ["Weights", "2–3x a week. Rebuild the body that heavy use ran down. Start light, log it."],
  ["Zone 2 walk-run", "Easy aerobic pace you can still talk through. Track streak #, miles, and time each day."],
  ["Yoga / mobility", "Decompress the spine and calm the nervous system. Great on rest days."],
];

const GROCERIES = ["Kefir", "Yogurt", "Kimchi", "Eggs", "Fatty fish / omega-3", "Leafy greens", "Berries", "Bone broth", "Sea salt & electrolytes", "Plenty of water"];

export default function Prep90Page() {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_60%)] pointer-events-none z-0" />

      <nav className="border-b border-white/5 bg-[#051024] sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="AAfiends" className="w-10 h-10 rounded-xl drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            <div className="text-2xl font-black tracking-tight text-white uppercase">AA<span className="text-[#10b981]">fiends</span><span className="text-neutral-500 font-mono text-sm ml-2 tracking-widest hidden sm:inline">/ Prep 90</span></div>
          </Link>
          <Link href="/90rr" className="px-5 py-2.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-black text-xs font-black tracking-widest uppercase transition-colors">The Journal</Link>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-14 md:py-20 flex flex-col gap-20 relative z-20">
        <section className="flex flex-col items-start gap-5">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-xs text-[#10b981] font-mono uppercase tracking-widest font-bold">Before Day 1</span>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-white">Preps &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#f59e0b]">Tools</span></h1>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl leading-relaxed font-medium">Gather what you can before you start. None of it has to be fancy — the point is to make the daily reps easy so you actually do them.</p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Gear to Have</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {GEAR.map(([t, d]) => (
              <div key={t} className="bg-[#09090b] border border-white/10 rounded-2xl p-5 flex gap-4">
                <div className="w-5 h-5 mt-0.5 rounded border-2 border-[#10b981]/60 shrink-0" />
                <div><h3 className="text-white font-bold">{t}</h3><p className="text-sm text-neutral-400 leading-relaxed mt-1">{d}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Protocols &amp; Tips</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {PROTOCOLS.map(([t, c, d]) => (
              <div key={t} className="bg-[#09090b] border border-white/10 rounded-2xl p-6">
                <h3 className="font-black uppercase tracking-wide text-sm mb-2" style={{ color: c }}>{t}</h3>
                <p className="text-sm text-neutral-300 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">The Movement Guide</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {MOVEMENT.map(([t, d]) => (
              <div key={t} className="bg-[#09090b] border border-white/10 rounded-2xl p-6">
                <h3 className="text-[#f59e0b] font-black uppercase tracking-wide text-sm mb-2">{t}</h3>
                <p className="text-sm text-neutral-300 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#09090b] border border-white/10 rounded-3xl p-8 flex flex-col gap-4">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Starter Groceries <span className="text-neutral-500 text-sm font-mono">gut · dopamine · calm</span></h2>
          <div className="flex flex-wrap gap-2">
            {GROCERIES.map((x) => (
              <span key={x} className="text-sm font-medium text-neutral-200 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">{x}</span>
            ))}
          </div>
          <p className="text-sm text-neutral-500">Skip the energy drinks and heavy sugar — they spike, then crash you.</p>
        </section>

        <section className="bg-[#09090b] border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#10b981] via-[#f59e0b] to-[#10b981]" />
          <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-3">Get the Journal</h2>
          <p className="text-neutral-400 max-w-xl mx-auto mb-6">Print it, gather your preps, and start Day 1. The full guide lives on the journal page.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={JOURNAL_PDF} download className="py-4 px-10 rounded-2xl bg-[#10b981] hover:bg-[#059669] text-black text-sm font-black tracking-widest uppercase transition-all">↓ Download the Journal</a>
            <Link href="/90-r-and-r#reserve" className="py-4 px-10 rounded-2xl border border-white/15 text-white text-sm font-bold tracking-widest uppercase hover:border-[#10b981]/50 hover:text-[#10b981] transition-all">Reserve a Seat</Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-[#051024] py-8 relative z-20">
        <div className="max-w-5xl mx-auto px-6 text-center text-[11px] text-neutral-500 font-mono uppercase tracking-widest">
          90 Days R&amp;R · Biology First · Data Over Denial · Not affiliated with Alcoholics Anonymous World Services, Inc.
        </div>
      </footer>
    </div>
  );
}
