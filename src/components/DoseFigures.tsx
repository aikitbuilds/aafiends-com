"use client";

/**
 * DOSE Field Guide figures — added 2026-07-24 for the two /90rr DOSE articles
 * ("food & drink that repairs the four chemicals" + "regulate dopamine
 * naturally / build a cold plunge"). Every "custom image" and "infographic"
 * here is code-rendered SVG so it is pixel-crisp, on-brand (emerald/black
 * operator-dashboard system), animation-ready, and needs no image hosting or
 * generation credits. Real photographs are handled separately by <SmartImage>
 * (Unsplash), which hides itself if a photo fails to load so a bad hotlink
 * never breaks the layout.
 */

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Zap, HeartHandshake, Sun, Flame, Wine, Snowflake, Shield, ShoppingCart, Brain } from "lucide-react";

const C = {
  bg: "#050505",
  line: "rgba(255,255,255,0.10)",
  green: "#10b981",
  amber: "#f59e0b",
  cyan: "#00f0ff",
  purple: "#a855f7",
  red: "#ef4444",
};

const HERO_ICON_MAP: Record<string, LucideIcon> = {
  wine: Wine,
  snowflake: Snowflake,
  zap: Zap,
  flame: Flame,
  sun: Sun,
  heart: HeartHandshake,
  shield: Shield,
  "shopping-cart": ShoppingCart,
  shoppingcart: ShoppingCart,
  cart: ShoppingCart,
  brain: Brain,
};

/* ------------------------------------------------------------------ */
/* Reusable hero banner — the "custom image" at the top of each article */
/* ------------------------------------------------------------------ */
export function DoseHero({
  kicker,
  title,
  sub,
  accent = C.green,
  iconName,
  Icon,
}: {
  kicker: string;
  title: string;
  sub?: string;
  accent?: string;
  iconName?: string;
  Icon?: LucideIcon;
}) {
  const IconComp = Icon || (iconName ? HERO_ICON_MAP[iconName.toLowerCase()] : null);
  return (
    <div
      className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 px-6 py-14 sm:px-12 sm:py-20"
      style={{
        background: `radial-gradient(circle at 22% 18%, ${accent}22, transparent 55%), radial-gradient(circle at 82% 88%, ${accent}18, transparent 55%), ${C.bg}`,
      }}
    >
      {/* terminal dot-grid */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="absolute top-0 left-0 h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
      <div className="relative z-10 flex flex-col items-start gap-4">
        {IconComp && (
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl border"
            style={{ background: `${accent}18`, borderColor: `${accent}44`, color: accent }}
          >
            <IconComp size={28} strokeWidth={1.6} />
          </div>
        )}
        <span
          className="rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.25em]"
          style={{ background: `${accent}18`, color: accent }}
        >
          {kicker}
        </span>
        <h1 className="max-w-3xl text-3xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {sub && <p className="max-w-2xl text-sm font-light leading-relaxed text-neutral-300 sm:text-base">{sub}</p>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Real photograph (Unsplash) with graceful self-hide on load failure  */
/* ------------------------------------------------------------------ */
export function SmartImage({
  src,
  alt,
  caption,
  credit,
  accent = C.green,
}: {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  accent?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <figure className="flex flex-col gap-2">
      <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#050505]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
          style={{ aspectRatio: "16 / 9" }}
        />
        <div className="pointer-events-none absolute inset-0" style={{ boxShadow: `inset 0 0 90px 12px ${accent}22` }} />
      </div>
      {(caption || credit) && (
        <figcaption className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
          <span>{caption}</span>
          {credit && <span className="opacity-70">{credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* FIGURE 1 — The Pleasure–Pain Seesaw (how the AIV hijacks all four)  */
/* ------------------------------------------------------------------ */
export function DoseSeesaw() {
  const chips: { k: string; label: string; color: string }[] = [
    { k: "D", label: "Dopamine", color: C.green },
    { k: "O", label: "Oxytocin", color: C.purple },
    { k: "S", label: "Serotonin", color: C.cyan },
    { k: "E", label: "Endorphins", color: C.amber },
  ];
  return (
    <div className="flex flex-col gap-5">
      <FigureTitle>The Four Chemicals — And the Balance They Sit On</FigureTitle>
      <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6">
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {chips.map((c) => (
            <div
              key={c.k}
              className="flex flex-col items-center gap-1 rounded-xl border p-3 text-center"
              style={{ borderColor: `${c.color}33`, background: `${c.color}10` }}
            >
              <span className="font-mono text-2xl font-black" style={{ color: c.color }}>{c.k}</span>
              <span className="text-[11px] font-bold uppercase tracking-wide text-white">{c.label}</span>
            </div>
          ))}
        </div>
        <svg viewBox="0 0 400 150" className="w-full" role="img" aria-label="A seesaw tipped toward pain, showing that flooding pleasure forces an equal swing to pain.">
          {/* baseline */}
          <line x1="20" y1="120" x2="380" y2="120" stroke={C.line} strokeWidth="2" />
          {/* fulcrum */}
          <polygon points="200,120 185,150 215,150" fill={C.line} />
          {/* tilted beam */}
          <g transform="rotate(11 200 112)">
            <rect x="70" y="106" width="260" height="12" rx="6" fill="#111" stroke={C.line} />
            <circle cx="90" cy="112" r="22" fill={`${C.green}22`} stroke={C.green} strokeWidth="2" />
            <text x="90" y="116" textAnchor="middle" fontSize="10" fontWeight="700" fill={C.green}>PLEASURE</text>
            <circle cx="310" cy="112" r="22" fill={`${C.red}22`} stroke={C.red} strokeWidth="2" />
            <text x="310" y="116" textAnchor="middle" fontSize="12" fontWeight="700" fill={C.red}>PAIN</text>
          </g>
        </svg>
        <p className="mt-4 text-xs leading-relaxed text-neutral-400">
          The substance floods all four at once, far past anything a walk or a meal could produce. The brain,
          built to stay level, tips the board the other way — down-regulating receptors so the same hit does less.
          Take the substance away and the board is still tilted toward <span className="text-red-400 font-bold">pain</span>.
          That is the flat, gray “deficit” — and it is temporary.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FIGURE 2 — Spike-and-crash vs the earned, sustained curve            */
/* ------------------------------------------------------------------ */
export function DopamineCurve() {
  return (
    <div className="flex flex-col gap-5">
      <FigureTitle>Bought vs. Earned — The Shape of the Curve</FigureTitle>
      <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6">
        <svg viewBox="0 0 420 210" className="w-full" role="img" aria-label="A substance produces a tall spike then a crash below baseline; cold and movement produce a gentle rise that settles above baseline.">
          {/* axes */}
          <line x1="40" y1="20" x2="40" y2="175" stroke={C.line} strokeWidth="1.5" />
          <line x1="40" y1="175" x2="410" y2="175" stroke={C.line} strokeWidth="1.5" />
          {/* baseline */}
          <line x1="40" y1="120" x2="410" y2="120" stroke="rgba(255,255,255,0.25)" strokeDasharray="4 4" strokeWidth="1" />
          <text x="44" y="114" fontSize="9" fill="#9ca3af" fontFamily="monospace">BASELINE</text>
          {/* substance: spike then crash */}
          <motion.path
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
            d="M40,120 L95,120 L120,30 L150,150 L200,150 L410,150"
            fill="none" stroke={C.red} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          />
          {/* natural: gentle rise, sustained above baseline */}
          <motion.path
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 }}
            d="M40,120 C120,120 150,80 200,80 C280,80 330,92 410,96"
            fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round"
          />
          <circle cx="120" cy="30" r="3.5" fill={C.red} />
          <text x="128" y="30" fontSize="9" fill={C.red} fontFamily="monospace">substance: +1000% → crash</text>
          <text x="250" y="72" fontSize="9" fill={C.green} fontFamily="monospace">cold plunge: ~+250%, held for hours</text>
        </svg>
        <p className="mt-3 text-xs leading-relaxed text-neutral-400">
          A drink or a hit is a tall, fast spike that collapses <em>below</em> baseline — that dip is the craving.
          A cold plunge, a hard walk, a real meal raise dopamine gently and leave you <span className="text-[#10b981] font-bold">above</span> baseline
          for hours, with no crash. Same chemical. Opposite shape.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FIGURE 3 — Chest-freezer cold-plunge cutaway (the build diagram)     */
/* ------------------------------------------------------------------ */
export function PlungeCutaway() {
  const label = (x: number, y: number, n: string, t: string, color: string) => (
    <g>
      <circle cx={x} cy={y} r="9" fill={color} />
      <text x={x} y={y + 3.5} textAnchor="middle" fontSize="10" fontWeight="800" fill="#050505">{n}</text>
      <text x={x + 15} y={y + 4} fontSize="10.5" fill="#e5e7eb" fontFamily="monospace">{t}</text>
    </g>
  );
  return (
    <div className="flex flex-col gap-5">
      <FigureTitle>The $600 Cold Plunge — Cutaway</FigureTitle>
      <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6">
        <svg viewBox="0 0 460 300" className="w-full" role="img" aria-label="Cross-section of a chest freezer converted into a cold plunge, with numbered components.">
          {/* freezer body */}
          <rect x="60" y="70" width="240" height="180" rx="8" fill="#0d0d10" stroke={C.line} strokeWidth="2" />
          {/* insulation wall */}
          <rect x="72" y="82" width="216" height="156" rx="5" fill="#111318" stroke="rgba(255,255,255,0.06)" />
          {/* water */}
          <rect x="84" y="120" width="192" height="110" rx="4" fill={`${C.cyan}22`} stroke={`${C.cyan}55`} />
          <path d="M84,120 q48,-10 96,0 t96,0" fill="none" stroke={`${C.cyan}`} strokeWidth="1.5" opacity="0.6" />
          <text x="180" y="185" textAnchor="middle" fontSize="11" fill={C.cyan} fontFamily="monospace" opacity="0.8">~40°F</text>
          {/* lid */}
          <rect x="60" y="56" width="240" height="16" rx="4" fill="#15171c" stroke={C.line} />
          {/* controller box on wall */}
          <rect x="315" y="80" width="70" height="44" rx="4" fill="#111" stroke={C.amber} strokeWidth="1.5" />
          <text x="350" y="100" textAnchor="middle" fontSize="8" fill={C.amber} fontFamily="monospace">ITC-308</text>
          <text x="350" y="112" textAnchor="middle" fontSize="10" fill={C.green} fontFamily="monospace">40.0°</text>
          {/* pump + uv path */}
          <rect x="315" y="150" width="30" height="24" rx="3" fill="#111" stroke={C.purple} strokeWidth="1.5" />
          <text x="330" y="190" textAnchor="middle" fontSize="7.5" fill={C.purple} fontFamily="monospace">PUMP</text>
          <rect x="355" y="150" width="30" height="24" rx="3" fill="#111" stroke={C.green} strokeWidth="1.5" />
          <text x="370" y="190" textAnchor="middle" fontSize="7.5" fill={C.green} fontFamily="monospace">UV</text>
          {/* hoses */}
          <path d="M276,150 C300,150 300,162 315,162" fill="none" stroke={`${C.cyan}88`} strokeWidth="2.5" />
          <path d="M385,162 C405,162 405,140 405,140 L405,205 C405,215 300,215 276,210" fill="none" stroke={`${C.cyan}88`} strokeWidth="2.5" />
          {/* plug */}
          <line x1="350" y1="124" x2="350" y2="150" stroke={C.amber} strokeWidth="1.5" />
          <rect x="315" y="250" width="70" height="20" rx="3" fill="#111" stroke={C.red} strokeWidth="1.5" />
          <text x="350" y="263" textAnchor="middle" fontSize="8" fill={C.red} fontFamily="monospace">GFCI</text>
          <line x1="330" y1="174" x2="330" y2="250" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          {/* legend numbers on drawing */}
          <circle cx="180" cy="63" r="7" fill={C.line} /><text x="180" y="66.5" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff">1</text>
          <circle cx="78" cy="160" r="7" fill={C.line} /><text x="78" y="163.5" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff">2</text>
          <circle cx="350" cy="102" r="7" fill={C.amber} /><text x="350" y="105.5" textAnchor="middle" fontSize="9" fontWeight="800" fill="#050505">3</text>
          <circle cx="330" cy="162" r="7" fill={C.purple} /><text x="330" y="165.5" textAnchor="middle" fontSize="9" fontWeight="800" fill="#050505">4</text>
          <circle cx="370" cy="162" r="7" fill={C.green} /><text x="370" y="165.5" textAnchor="middle" fontSize="9" fontWeight="800" fill="#050505">5</text>
          <circle cx="350" cy="260" r="7" fill={C.red} /><text x="350" y="263.5" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff">6</text>
        </svg>
        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
          {[
            ["1", "Chest freezer", "New or used off Marketplace ($80–200)", "#fff"],
            ["2", "Foam / spray-foam insulation", "Wraps the shell — holds temp, cuts run-time", "#fff"],
            ["3", "Inkbird ITC-308 controller", "Plugs the freezer in; holds a set 40°F", C.amber],
            ["4", "Circulation pump", "Keeps water moving so it can't freeze solid", C.purple],
            ["5", "UV clarifier + filter", "Kills bacteria/algae between changes", C.green],
            ["6", "GFCI outlet", "Non-negotiable — water + power safety", C.red],
          ].map(([n, t, d, color]) => (
            <div key={n} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-black" style={{ background: color as string }}>{n}</span>
              <span className="text-xs leading-snug text-neutral-300"><b className="text-white">{t}</b> — {d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FIGURE 4 — Food → chemical matrix (the eat-this cheat card)          */
/* ------------------------------------------------------------------ */
export function FoodMatrix() {
  const rows: { Icon: LucideIcon; k: string; name: string; color: string; foods: string; why: string }[] = [
    { Icon: Zap, k: "D", name: "Dopamine", color: C.green, foods: "Eggs, lean beef, chicken, fish, tofu, beans, pumpkin seeds", why: "Built from the amino acid tyrosine — protein is the raw material" },
    { Icon: HeartHandshake, k: "O", name: "Oxytocin", color: C.purple, foods: "Dark chocolate (85%+), citrus, magnesium-rich greens, a shared meal", why: "Vitamin C + magnesium support release; eating with people is the real lever" },
    { Icon: Sun, k: "S", name: "Serotonin", color: C.cyan, foods: "Kefir, kimchi, sauerkraut, yogurt, oats, turkey, salmon, fiber", why: "~90% is made in the gut — rebuild the microbiome, rebuild the mood" },
    { Icon: Flame, k: "E", name: "Endorphins", color: C.amber, foods: "Chili / cayenne, dark chocolate, ginger, a hard workout", why: "Capsaicin's mild ‘burn’ triggers a natural endorphin release" },
  ];
  return (
    <div className="flex flex-col gap-5">
      <FigureTitle>Eat This → Rebuild That</FigureTitle>
      <div className="overflow-hidden rounded-2xl border border-white/10">
        {rows.map((r, i) => (
          <div key={r.k} className={`grid grid-cols-[auto_1fr] gap-4 p-4 sm:grid-cols-[140px_1fr_1fr] ${i > 0 ? "border-t border-white/10" : ""}`} style={{ background: `${r.color}08` }}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border" style={{ background: `${r.color}18`, borderColor: `${r.color}44`, color: r.color }}>
                <r.Icon size={18} />
              </div>
              <div className="leading-tight">
                <div className="font-mono text-lg font-black" style={{ color: r.color }}>{r.k}</div>
                <div className="text-[11px] font-bold uppercase text-white">{r.name}</div>
              </div>
            </div>
            <div className="text-xs leading-relaxed text-neutral-200"><b className="text-white">Eat:</b> {r.foods}</div>
            <div className="text-xs leading-relaxed text-neutral-400 sm:col-span-1 col-start-2 sm:col-start-3"><b className="text-neutral-300">Why:</b> {r.why}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FigureTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 text-lg font-black uppercase tracking-tight text-white">
      <span className="h-6 w-1.5 rounded-full" style={{ background: C.green }} />
      {children}
    </h3>
  );
}

export function DdDoseMapFigure() {
  return (
    <div className="overflow-x-auto -mx-4 px-4 my-6">
      <div className="min-w-[720px]">
        <Image
          src="/90rr/img/dd-dose-map.svg"
          alt="Which inputs rebuild each of the four chemicals"
          width={1200}
          height={820}
          className="w-full h-auto rounded-2xl border border-white/10"
        />
      </div>
    </div>
  );
}

export function Dd24HrLoopFigure() {
  return (
    <div className="overflow-x-auto -mx-4 px-4 my-6">
      <div className="min-w-[720px]">
        <Image
          src="/90rr/img/dd-24hr-loop.svg"
          alt="The 24-hour loop: three daily checkpoints"
          width={1200}
          height={820}
          className="w-full h-auto rounded-2xl border border-white/10"
        />
      </div>
    </div>
  );
}

export function DdEvidenceTiersFigure() {
  return (
    <div className="overflow-x-auto -mx-4 px-4 my-6">
      <div className="min-w-[720px]">
        <Image
          src="/90rr/img/dd-evidence-tiers.svg"
          alt="Honest evidence grading for supplements and superfoods"
          width={1200}
          height={820}
          className="w-full h-auto rounded-2xl border border-white/10"
        />
      </div>
    </div>
  );
}

export function DdCostLedgerFigure() {
  return (
    <div className="overflow-x-auto -mx-4 px-4 my-6">
      <div className="min-w-[720px]">
        <Image
          src="/90rr/img/dd-cost-ledger.svg"
          alt="Cost per day of rebuilding vs. cost per day of wrecking"
          width={1200}
          height={820}
          className="w-full h-auto rounded-2xl border border-white/10"
        />
      </div>
    </div>
  );
}

export const DOSE_FIGURES: Record<string, React.FC> = {
  seesaw: DoseSeesaw,
  curve: DopamineCurve,
  cutaway: PlungeCutaway,
  matrix: FoodMatrix,
  "dd-dose-map": DdDoseMapFigure,
  "dd-24hr-loop": Dd24HrLoopFigure,
  "dd-evidence-tiers": DdEvidenceTiersFigure,
  "dd-cost-ledger": DdCostLedgerFigure,
  "/90rr/img/dd-dose-map.svg": DdDoseMapFigure,
  "/90rr/img/dd-24hr-loop.svg": Dd24HrLoopFigure,
  "/90rr/img/dd-evidence-tiers.svg": DdEvidenceTiersFigure,
  "/90rr/img/dd-cost-ledger.svg": DdCostLedgerFigure,
};

/* ------------------------------------------------------------------ */
/* INFOGRAPHIC A — "The Stack" (biology-first structure)              */
/* ------------------------------------------------------------------ */
export function DoseStack() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="rounded-3xl border border-white/10 bg-[#08080a] p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden">
        {/* Subtle top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#10b981]/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#10b981]">Order of Operations</span>
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">The Stack — Biology First</h3>
          </div>
          <p className="font-mono text-xs text-neutral-400 max-w-xs sm:text-right">
            <span className="text-[#00f0ff] font-bold">Inclusive:</span> Higher Power as you understand it. <br />
            <span className="text-[#10b981] font-bold">Structured:</span> one number, every day.
          </p>
        </div>

        <svg viewBox="0 0 540 320" className="w-full h-auto" role="img" aria-label="The Stack: vertical layers showing biology at base, community in middle, stillness upper, capped by daily VSE score.">
          <defs>
            <linearGradient id="gradTop" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="gradMirror" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="gradNetwork" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="gradEngine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Connectors / Side Bracket */}
          <line x1="30" y1="35" x2="30" y2="285" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="30,25 25,37 35,37" fill="#f59e0b" />

          {/* Level 4 (Top): Daily Score */}
          <g transform="translate(50, 15)">
            <rect x="0" y="0" width="460" height="52" rx="14" fill="url(#gradTop)" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="20" y="24" fontSize="10" fontFamily="monospace" fontWeight="800" fill="#f59e0b" letterSpacing="2">CAPSTONE</text>
            <text x="20" y="40" fontSize="15" fontWeight="900" fill="#ffffff">THE DAILY SCORE · Vanguard Score (VSE) / 10</text>
            <text x="440" y="32" fontSize="10" fontFamily="monospace" fill="#9ca3af" textAnchor="end">MEASURED EVERY DAY</text>
          </g>

          {/* Level 3: The Mirror */}
          <g transform="translate(50, 80)">
            <rect x="0" y="0" width="460" height="56" rx="14" fill="url(#gradMirror)" stroke="#00f0ff" strokeWidth="1.5" />
            <text x="20" y="24" fontSize="10" fontFamily="monospace" fontWeight="800" fill="#00f0ff" letterSpacing="2">③ THE MIRROR · MIND & SPIRIT</text>
            <text x="20" y="42" fontSize="14" fontWeight="800" fill="#ffffff">Stillness + Honest Daily Read + Surrender</text>
            <text x="440" y="33" fontSize="10" fontFamily="monospace" fill="#00f0ff" textAnchor="end">Steps 4-11 · Serotonin</text>
          </g>

          {/* Level 2: The Network */}
          <g transform="translate(50, 150)">
            <rect x="0" y="0" width="460" height="56" rx="14" fill="url(#gradNetwork)" stroke="#a855f7" strokeWidth="1.5" />
            <text x="20" y="24" fontSize="10" fontFamily="monospace" fontWeight="800" fill="#a855f7" letterSpacing="2">② THE NETWORK · COMMUNITY</text>
            <text x="20" y="42" fontSize="14" fontWeight="800" fill="#ffffff">Rooms + Sponsor + Calling Another Alcoholic + Service</text>
            <text x="440" y="33" fontSize="10" fontFamily="monospace" fill="#a855f7" textAnchor="end">Step 12 · Oxytocin</text>
          </g>

          {/* Level 1 (Base): The Engine */}
          <g transform="translate(50, 220)">
            <rect x="0" y="0" width="460" height="70" rx="14" fill="url(#gradEngine)" stroke="#10b981" strokeWidth="2" />
            <text x="20" y="26" fontSize="10" fontFamily="monospace" fontWeight="800" fill="#10b981" letterSpacing="2">① THE VESSEL · HARDWARE & BIOLOGY</text>
            <text x="20" y="46" fontSize="15" fontWeight="900" fill="#ffffff">Body + D.O.S.E. Chemistry (Sleep, Light, Movement, Fuel)</text>
            <text x="440" y="36" fontSize="10" fontFamily="monospace" fill="#10b981" textAnchor="end">Dopamine & Endorphins</text>
            <rect x="20" y="52" width="220" height="14" rx="4" fill="#10b981" />
            <text x="130" y="62" fontSize="9" fontFamily="monospace" fontWeight="900" fill="#050505" textAnchor="middle">START HERE — STABILIZE THE HARDWARE</text>
          </g>
        </svg>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-300 bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="leading-relaxed">
            <strong className="text-white">Why this order?</strong> Before spiritual concepts can hold in a panicked mind, sleep, gut serotonin, and dopamine baseline must stabilize. The vessel comes first.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* INFOGRAPHIC B — "D.O.S.E., and how you earn it"                    */
/* ------------------------------------------------------------------ */
export function DoseMap() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="rounded-3xl border border-white/10 bg-[#08080a] p-6 md:p-8 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#f59e0b]">Biological Map</span>
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">D.O.S.E. — Earned vs. Flooded</h3>
          </div>
          <p className="font-mono text-xs text-neutral-400">
            Sourced neuroscience: receptor repair &amp; natural synthesis
          </p>
        </div>

        {/* Comparison banner: Substance vs Recovery */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-red-400 uppercase tracking-widest">Substance Hijack</span>
              <span className="text-[10px] font-mono text-red-400 bg-red-500/20 px-2 py-0.5 rounded">FLOOD &amp; CRASH</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Single unnatural hit floods all 4 chemicals at once → brain down-regulates D2/D3 receptors to survive → severe baseline deficit (gray fog &amp; intense craving).
            </p>
          </div>
          <div className="rounded-2xl border border-[#10b981]/30 bg-[#10b981]/10 p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#10b981] uppercase tracking-widest">Natural Recovery</span>
              <span className="text-[10px] font-mono text-[#10b981] bg-[#10b981]/20 px-2 py-0.5 rounded">4 SEPARATE INPUTS</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Four targeted daily habits rebuild receptors naturally without crash → steady baseline mood, resilience, and genuine pleasure restored over 90+ days.
            </p>
          </div>
        </div>

        {/* 4 Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          {/* D: Dopamine */}
          <div className="rounded-2xl border border-[#10b981]/40 bg-[#10b981]/5 p-5 flex flex-col gap-3 justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-black text-[#10b981]">D</span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#10b981] bg-[#10b981]/15 px-2 py-1 rounded-md">PILLAR 1 · ENGINE</span>
              </div>
              <h4 className="text-base font-black text-white uppercase tracking-tight">Dopamine</h4>
              <p className="text-xs text-neutral-400">Drive, motivation &amp; anticipation</p>
            </div>
            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
              <p className="text-xs text-neutral-200"><strong className="text-[#10b981]">Earn it:</strong> Cold plunge (+250%), morning sunlight, brisk walking, task completion.</p>
              <span className="text-[10px] font-mono text-neutral-400 bg-black/40 p-2 rounded-lg border border-white/5">
                ⚡ D2/D3 receptors repair &amp; upregulate over ~14 months of sobriety.
              </span>
            </div>
          </div>

          {/* O: Oxytocin */}
          <div className="rounded-2xl border border-[#a855f7]/40 bg-[#a855f7]/5 p-5 flex flex-col gap-3 justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-black text-[#a855f7]">O</span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#a855f7] bg-[#a855f7]/15 px-2 py-1 rounded-md">PILLAR 2 · NETWORK</span>
              </div>
              <h4 className="text-base font-black text-white uppercase tracking-tight">Oxytocin</h4>
              <p className="text-xs text-neutral-400">Bonding, trust &amp; safety</p>
            </div>
            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
              <p className="text-xs text-neutral-200"><strong className="text-[#a855f7]">Earn it:</strong> Sitting in AA rooms, calling your sponsor, peer outreach, 12th step service.</p>
              <span className="text-[10px] font-mono text-neutral-400 bg-black/40 p-2 rounded-lg border border-white/5">
                🤝 Direct biological buffer against cortisol &amp; craving isolation.
              </span>
            </div>
          </div>

          {/* S: Serotonin */}
          <div className="rounded-2xl border border-[#00f0ff]/40 bg-[#00f0ff]/5 p-5 flex flex-col gap-3 justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-black text-[#00f0ff]">S</span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#00f0ff] bg-[#00f0ff]/15 px-2 py-1 rounded-md">PILLAR 3 · MIRROR</span>
              </div>
              <h4 className="text-base font-black text-white uppercase tracking-tight">Serotonin</h4>
              <p className="text-xs text-neutral-400">Emotional calm &amp; baseline mood</p>
            </div>
            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
              <p className="text-xs text-neutral-200"><strong className="text-[#00f0ff]">Earn it:</strong> Fermented foods (kefir/kimchi), fiber, tryptophan, stillness/meditation.</p>
              <span className="text-[10px] font-mono text-neutral-400 bg-black/40 p-2 rounded-lg border border-white/5">
                🌿 ~90% of body serotonin is produced in the gut microbiome.
              </span>
            </div>
          </div>

          {/* E: Endorphins */}
          <div className="rounded-2xl border border-[#f59e0b]/40 bg-[#f59e0b]/5 p-5 flex flex-col gap-3 justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-black text-[#f59e0b]">E</span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#f59e0b] bg-[#f59e0b]/15 px-2 py-1 rounded-md">ENGINE / RESILIENCE</span>
              </div>
              <h4 className="text-base font-black text-white uppercase tracking-tight">Endorphins</h4>
              <p className="text-xs text-neutral-400">Pain masking &amp; natural high</p>
            </div>
            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
              <p className="text-xs text-neutral-200"><strong className="text-[#f59e0b]">Earn it:</strong> Intense cardio/lifting, heat/sauna, spicy capsaicin, deep laughter.</p>
              <span className="text-[10px] font-mono text-neutral-400 bg-black/40 p-2 rounded-lg border border-white/5">
                🔥 Internal opioid system activated safely through physical challenge.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* INFOGRAPHIC C — Craving Wave & Spike vs Slope                      */
/* ------------------------------------------------------------------ */
export function CravingWaveAndSpike() {
  return (
    <div className="grid md:grid-cols-2 gap-6 w-full">
      {/* Visual 1: The Craving Wave */}
      <div className="rounded-3xl border border-white/10 bg-[#08080a] p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#00f0ff]">Journal Visual 1</span>
          <h4 className="text-lg font-black uppercase text-white tracking-tight">The Craving Wave</h4>
          <p className="text-xs text-neutral-400">A craving is a neurochemical wave — ride it, don&apos;t fight it.</p>
        </div>

        <svg viewBox="0 0 400 190" className="w-full h-auto" role="img" aria-label="Craving wave bell curve showing Trigger -> Peak (20-30 min) -> Resolution">
          {/* Grid lines */}
          <line x1="30" y1="160" x2="380" y2="160" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <line x1="30" y1="20" x2="30" y2="160" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

          {/* Wave Path */}
          <path
            d="M 30,160 C 90,160 140,30 200,30 C 260,30 310,160 380,160"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Peak point */}
          <circle cx="200" cy="30" r="5" fill="#00f0ff" />
          <line x1="200" y1="35" x2="200" y2="160" stroke="#00f0ff" strokeDasharray="3 3" opacity="0.5" />

          {/* Labels */}
          <text x="35" y="145" fill="#9ca3af" fontSize="10" fontFamily="monospace">1. TRIGGER</text>
          <text x="200" y="20" fill="#00f0ff" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">2. PEAK (~15-20 MIN)</text>
          <text x="375" y="145" fill="#10b981" fontSize="10" fontFamily="monospace" textAnchor="end">3. GONE</text>

          {/* 90-sec adrenaline note */}
          <rect x="70" y="80" width="120" height="34" rx="6" fill="#050505" stroke="#f59e0b" strokeWidth="1" />
          <text x="130" y="94" fill="#f59e0b" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">90-SEC SURGE</text>
          <text x="130" y="107" fill="#d1d5db" fontSize="8" textAnchor="middle">Physical adrenaline spike</text>
        </svg>

        <p className="text-xs text-neutral-300 leading-relaxed bg-white/5 border border-white/10 rounded-2xl p-3">
          <strong className="text-[#00f0ff]">Key takeaway:</strong> A craving peaks and passes within <strong className="text-white">20–30 minutes</strong> if you do not feed it. The intense physiological adrenaline surge lasts only <strong className="text-white">~90 seconds</strong>.
        </p>
      </div>

      {/* Visual 2: Spike vs. Slope */}
      <div className="rounded-3xl border border-white/10 bg-[#08080a] p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#10b981]">Journal Visual 2</span>
          <h4 className="text-lg font-black uppercase text-white tracking-tight">Spike vs. Slope</h4>
          <p className="text-xs text-neutral-400">Chemical trajectory of artificial hit vs earned habit.</p>
        </div>

        <svg viewBox="0 0 400 190" className="w-full h-auto" role="img" aria-label="Spike vs Slope comparison: Red spike crashing below baseline vs Green sustained slope holding above baseline">
          {/* Baseline */}
          <line x1="30" y1="120" x2="380" y2="120" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="35" y="113" fill="#9ca3af" fontSize="9" fontFamily="monospace">BASELINE</text>

          {/* Red line: Drink / hit spike and crash */}
          <path
            d="M 30,120 L 70,120 L 95,20 L 125,165 L 200,165 L 380,165"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <text x="100" y="18" fill="#ef4444" fontSize="9" fontFamily="monospace" fontWeight="bold">SPIKE &amp; CRASH</text>

          {/* Green line: Cold / Walk / Yoga steady rise */}
          <path
            d="M 30,120 Q 110,120 160,75 T 380,85"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <text x="240" y="65" fill="#10b981" fontSize="9" fontFamily="monospace" fontWeight="bold">SUSTAINED EARNED SLOPE</text>

          {/* Legend dots */}
          <circle cx="30" cy="175" r="4" fill="#ef4444" />
          <text x="40" y="178" fill="#9ca3af" fontSize="9" fontFamily="monospace">Substance: +1000% → crash below baseline</text>

          <circle cx="230" cy="175" r="4" fill="#10b981" />
          <text x="240" y="178" fill="#9ca3af" fontSize="9" fontFamily="monospace">Walk / Cold: ~+250% for hours</text>
        </svg>

        <p className="text-xs text-neutral-300 leading-relaxed bg-white/5 border border-white/10 rounded-2xl p-3">
          <strong className="text-[#10b981]">Key takeaway:</strong> Artificial hits produce a massive spike followed by a drop <strong className="text-red-400">below baseline</strong>. Earned habits (cold, movement, yoga) build a smooth slope that holds for hours without a crash.
        </p>
      </div>
    </div>
  );
}

