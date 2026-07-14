import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import type { Metadata } from "next";
import {
  Smartphone, Watch, Utensils, Footprints, ListChecks, Wind, BookOpen,
  Sparkles, Radio, Snowflake, Droplets, HeartPulse, Sun, Coffee,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Prep for the 90 — Course & Bootcamp Prep Kit | AAfiends",
  description:
    "Everything to set up before Day 0 of the 90 Days R&R course: the apps, an affordable Garmin, gut-healing food (bone broth + kefir), running gear, and a day-of checklist for the park bootcamp.",
  alternates: { canonical: "https://aafiends.com/prep90" },
};

// NOTE (MT): first-draft prep kit — swap any link, price, or item to taste.
// Prices are approximate US MSRP and drift; treat them as ballpark.

// ---- Apps -------------------------------------------------------------------
const APPS = [
  {
    name: "Everything AA",
    tag: "The Rooms, in your pocket",
    color: "#10b981",
    icon: "BookOpen",
    body: "Free, no ads: the Big Book + 12 & 12 (text and audio), a worldwide online meeting finder, Daily Reflection, Living Sober, the Joe & Charlie tapes, and a sobriety day counter.",
    links: [
      { label: "iOS", url: "https://apps.apple.com/us/app/everything-aa/id1565768051" },
      { label: "Android", url: "https://play.google.com/store/apps/details?id=com.bigbook3" },
    ],
  },
  {
    name: "Wim Hof Method",
    tag: "Breathwork + cold — earn your DOSE",
    color: "#00f0ff",
    icon: "Wind",
    body: "Guided breathing and a cold-exposure ramp — the clean dopamine/adrenaline lift the protocol runs on. Start with the free sessions, then the guided Breathing Bubble.",
    links: [
      { label: "Get the app", url: "https://www.wimhofmethod.com/wim-hof-method-mobile-app" },
    ],
  },
  {
    name: "Binaural Beats",
    tag: "Focus + wind-down audio",
    color: "#a855f7",
    icon: "Radio",
    body: "Functional music for stillness, focus blocks, and sleep. Brain.fm is the research-forward pick; BrainWave or Momental are solid low-cost/free options. Use headphones.",
    links: [
      { label: "Brain.fm", url: "https://www.brain.fm" },
    ],
  },
  {
    name: "Google Gemini",
    tag: "Your AI journaling companion",
    color: "#f59e0b",
    icon: "Sparkles",
    body: "Talk out a raw check-in and get a clean, structural read back — the same idea as the AI Mirror. Good for Step 10 reflection when a person isn't available.",
    links: [
      { label: "gemini.google.com", url: "https://gemini.google.com" },
    ],
  },
  {
    name: "AA Fiends Substack",
    tag: "Biology-first recovery, in your inbox",
    color: "#10b981",
    icon: "Radio",
    body: "The essays behind the protocol — the science, the steps, and the ecosystem. Subscribe so the weekly read finds you.",
    links: [
      { label: "Subscribe", url: "https://aafiends.substack.com" },
    ],
  },
];

// ---- Garmin / wearables -----------------------------------------------------
const METRICS = [
  { name: "HRV", desc: "Heart-rate variability — the single best window into nervous-system recovery. It climbs as you heal." },
  { name: "Body Battery", desc: "A 0–100 energy score from HRV, stress, and sleep. Shows when to push and when to rest." },
  { name: "Sleep Score", desc: "Deep, light, and REM stages — deep sleep is where the brain clears waste and rebuilds GABA." },
  { name: "Resting HR", desc: "A simple daily trend line. It usually falls week over week as the baseline recovers." },
];

const WATCHES = [
  { name: "Forerunner 55 / 165", price: "~$200–250", why: "Cheapest reliable entry. Full HRV, sleep, Body Battery, and GPS. The 165 adds an AMOLED screen.", best: "Best budget" },
  { name: "Venu Sq 2", price: "~$250", why: "Budget smartwatch look with the full health stack and ~11-day battery.", best: "Value smartwatch" },
  { name: "Vivoactive 5", price: "~$300", why: "The sweet spot: bright AMOLED, slim for 24/7 wear, all daily metrics + 20+ sport apps.", best: "Recommended all-rounder" },
  { name: "Venu 3", price: "~$400", why: "Step up for nap detection, longer battery, and a bigger screen — ~90% of the flagship for less.", best: "Premium pick" },
];

// ---- Food / kitchen ---------------------------------------------------------
const BROTH = [
  "2–3 lb beef marrow + knuckle bones (or one leftover chicken carcass)",
  "2 chicken feet — optional, for extra gelatin",
  "2 tbsp apple cider vinegar (pulls the minerals out of the bones)",
  "1 large onion, halved",
  "2 carrots + 2 celery stalks, rough-chopped",
  "1 whole head of garlic, halved crosswise",
  "1-inch fresh ginger + turmeric — optional, anti-inflammatory",
  "2 bay leaves + 1 tbsp whole peppercorns",
  "1 small bunch parsley (add at the end)",
  "Sea salt, to taste · filtered water to cover",
  "Gear: slow cooker or stockpot, fine strainer, glass jars",
];

const GUTFOOD = [
  { name: "Kefir — buy it", desc: "Lifeway is the easy grocery-aisle option — a daily cup rebuilds the microbiome.", url: "https://lifewaykefir.com" },
  { name: "Kefir — make it", desc: "Milk kefir grains from Cultures for Health; ferment your own for pennies a cup.", url: "https://culturesforhealth.com/collections/kefir" },
  { name: "More gut/DOSE food", desc: "Pasture-raised eggs, sauerkraut & kimchi, fatty fish, leafy greens, and berries.", url: "" },
];

// ---- Running / movement gear ------------------------------------------------
const GEAR = [
  { icon: "Footprints", name: "Running / walking shoes", desc: "One good pair (rotate two if you can). Zone 2 rucking and walk-and-talks are Pillar 1." },
  { icon: "HeartPulse", name: "Chest HR strap", desc: "A Garmin HRM or Polar H10 gives true Zone 2 accuracy — a wrist reading drifts under load." },
  { icon: "Droplets", name: "Reusable water bottle", desc: "Hydration is part of the morning ignition stack. Bring it to the park." },
  { icon: "Sun", name: "Hat + sunglasses", desc: "For morning-light walks — 10–15 min of outdoor light sets the body clock." },
  { icon: "Snowflake", name: "Cold exposure", desc: "A cold shower works; a cheap tub or trash-can plunge works better. Earn the dopamine." },
  { icon: "Footprints", name: "Foam roller + lacrosse ball", desc: "Cheap somatic maintenance for the sciatic flare and desk-bound back." },
];

// ---- Day-of checklist -------------------------------------------------------
const CHECKLIST = [
  "Camp chair or a blanket (we're outdoors in the park)",
  "Refillable water bottle",
  "Layers + a light rain shell for the weather",
  "Hat, sunglasses, sunscreen",
  "Your journal + a pen",
  "Phone charged, with the apps above already installed",
  "A healthy snack to share",
  "An open, honest headspace",
];

const ICONS: Record<string, LucideIcon> = {
  BookOpen, Wind, Radio, Sparkles, Footprints, HeartPulse, Droplets, Sun, Snowflake,
};

function Card({
  color, icon, name, tag, body, links,
}: { color: string; icon: string; name: string; tag: string; body: string; links: { label: string; url: string }[] }) {
  const Icon = ICONS[icon] ?? Smartphone;
  return (
    <div className="bg-[#09090b] border border-white/10 rounded-3xl p-7 flex flex-col gap-4 hover:border-white/25 transition-colors">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${color}1a`, color }}>
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-xl font-black text-white uppercase tracking-tight">{name}</h3>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color }}>{tag}</p>
      </div>
      <p className="text-sm text-neutral-400 leading-relaxed flex-1">{body}</p>
      <div className="flex flex-wrap gap-2">
        {links.map((l) => (
          <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
            className="text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl border transition-colors"
            style={{ color, borderColor: `${color}55` }}>
            {l.label} →
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Prep90Page() {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_60%)] pointer-events-none z-0" />

      <SiteHeader />

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-14 md:py-20 flex flex-col gap-24 relative z-20">
        {/* Hero */}
        <section className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-xs text-[#10b981] font-mono uppercase tracking-widest font-bold">
            <ListChecks size={14} /> Before Day 0
          </span>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-white">
            Prep for the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#f59e0b]">90 Days.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl leading-relaxed font-medium">
            Set the board before the first move. Install the apps, get one honest wearable, stock the kitchen, and
            pack for the park. None of it is required to start — but every piece makes Day 0 easier.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {["Apps", "Garmin", "Food", "Gear", "Day-of checklist"].map((t) => (
              <span key={t} className="text-xs font-bold text-neutral-200 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">{t}</span>
            ))}
          </div>
        </section>

        {/* Apps */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Smartphone className="text-[#10b981]" size={22} />
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">The Apps</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed max-w-3xl">Five tools that cover the three pillars — the rooms, the biology, and the mirror. All free to start.</p>
          <div className="grid md:grid-cols-2 gap-5">
            {APPS.map((a) => <Card key={a.name} {...a} />)}
          </div>
        </section>

        {/* Garmin */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Watch className="text-[#f59e0b]" size={22} />
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">The Garmin</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed max-w-3xl">
            You can&apos;t heal what you don&apos;t measure. Any of these give you HRV, sleep stages, and Body Battery — the
            numbers that prove the baseline is recovering. You do not need the expensive one.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {METRICS.map((m) => (
              <div key={m.name} className="bg-[#09090b] border border-white/10 rounded-2xl p-5">
                <h4 className="text-[#10b981] font-black uppercase tracking-wide text-sm mb-1">{m.name}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {WATCHES.map((w) => (
              <div key={w.name} className="bg-[#09090b] border border-white/10 rounded-2xl p-6 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">{w.name}</h3>
                  <span className="text-sm font-black text-[#f59e0b] whitespace-nowrap">{w.price}</span>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#10b981]">{w.best}</span>
                <p className="text-sm text-neutral-400 leading-relaxed">{w.why}</p>
              </div>
            ))}
          </div>
          <a href="https://www.garmin.com/en-US/c/wearables-smartwatches/" target="_blank" rel="noopener noreferrer"
            className="w-fit text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl border border-[#f59e0b]/50 text-[#f59e0b] hover:bg-[#f59e0b]/10 transition-colors">
            Compare on Garmin.com →
          </a>
          <p className="text-[11px] text-neutral-600 font-mono">Prices approximate and change often — check for refurbished/last-gen deals. A used prior model works fine.</p>
        </section>

        {/* Food */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Utensils className="text-[#a855f7]" size={22} />
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Food &amp; Kitchen</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed max-w-3xl">
            The gut makes up to ~90% of your serotonin. Two staples do the heavy lifting: <strong className="text-white">bone broth</strong> to
            soothe and reline the gut, and <strong className="text-white">kefir</strong> to rebuild the microbiome.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Broth list */}
            <div className="bg-[#09090b] border border-white/10 rounded-3xl p-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Coffee className="text-[#10b981]" size={20} />
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Bone Broth — grocery list</h3>
              </div>
              <ul className="flex flex-col gap-2">
                {BROTH.map((b) => (
                  <li key={b} className="flex gap-3 text-sm text-neutral-300 leading-relaxed">
                    <span className="text-[#10b981] shrink-0">•</span> {b}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-neutral-500 leading-relaxed border-t border-white/10 pt-3">
                Method: cover with water, add the vinegar, simmer low 12–24 hrs (beef) or 8–12 (chicken), strain, and store.
                Drink a warm cup a day.
              </p>
            </div>

            {/* Kefir + gut food */}
            <div className="flex flex-col gap-5">
              {GUTFOOD.map((g) => (
                <div key={g.name} className="bg-[#09090b] border border-white/10 rounded-3xl p-7 flex flex-col gap-3">
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">{g.name}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{g.desc}</p>
                  {g.url && (
                    <a href={g.url} target="_blank" rel="noopener noreferrer"
                      className="w-fit text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl border border-[#a855f7]/50 text-[#a855f7] hover:bg-[#a855f7]/10 transition-colors">
                      Shop →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gear */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Footprints className="text-[#00f0ff]" size={22} />
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Running &amp; Movement Gear</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed max-w-3xl">Movement is Pillar 1. None of this is fancy — it just removes friction between you and the trail.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GEAR.map((g) => {
              const Icon = ICONS[g.icon] ?? Footprints;
              return (
                <div key={g.name} className="bg-[#09090b] border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-white font-black uppercase tracking-tight text-sm">{g.name}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{g.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Day-of checklist */}
        <section className="bg-gradient-to-br from-[#09090b] to-[#0a1a12] border border-[#10b981]/30 rounded-[2rem] p-8 md:p-10 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <ListChecks className="text-[#10b981]" size={22} />
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Pack for the Park</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed max-w-3xl">The 1-day bootcamp is outdoors — shade trees, water, and restrooms on site. Bring:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {CHECKLIST.map((c) => (
              <div key={c} className="flex gap-3 items-start bg-[#050505]/50 border border-white/10 rounded-xl p-4">
                <span className="w-5 h-5 rounded-md border border-[#10b981]/50 shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-200 leading-relaxed">{c}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-2">
          <Link href="/90rr" className="py-4 px-8 rounded-2xl bg-[#10b981] hover:bg-[#059669] text-black text-sm font-black tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center gap-3">
            <BookOpen size={18} /> Get the Journal
          </Link>
          <Link href="/90-r-and-r#reserve" className="py-4 px-8 rounded-2xl border border-[#f59e0b]/40 text-[#f59e0b] hover:bg-[#f59e0b]/10 text-sm font-black tracking-widest uppercase transition-all">
            Reserve a Seat →
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
