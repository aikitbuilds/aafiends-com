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
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Zap, HeartHandshake, Sun, Flame, Wine, Snowflake, Shield, ShoppingCart } from "lucide-react";

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

export const DOSE_FIGURES: Record<string, React.FC> = {
  seesaw: DoseSeesaw,
  curve: DopamineCurve,
  cutaway: PlungeCutaway,
  matrix: FoodMatrix,
};
