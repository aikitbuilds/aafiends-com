/**
 * One-shot codemod: migrate the old terminal-dashboard palette and type
 * utilities to the "Dawn Ledger" world described in DESIGN.md.
 *
 * This handles the mechanical layer only — colors, neutrals, borders, and the
 * `font-black uppercase tracking-widest` habit. Structural work (kickers,
 * nested cards, photography) is done per page by hand.
 *
 *   node scripts/migrate-dawn-ledger.mjs [--dry]
 *
 * Kept in the repo so the next sweep is reproducible and reviewable.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const DRY = process.argv.includes("--dry");

/* ── Colour map ──────────────────────────────────────────────
   The four DOSE hues survive as a data palette — a figure encoding four
   categories legitimately needs four hues — but they are re-graded into the
   world instead of being neon. */
const COLORS = [
  // Emerald → green
  [/#10b981/gi, "#4cc07a"],
  [/#059669/gi, "#2c7a4d"],
  [/#34d399/gi, "#5fd08c"],
  // Amber / gold → amber
  [/#f59e0b/gi, "#e0a45c"],
  [/#e8a33d/gi, "#e0a45c"],
  [/#d99228/gi, "#c98f45"],
  [/#fbbf24/gi, "#e0a45c"],
  // Cyan → sage (serotonin / the Mirror)
  [/#00f0ff/gi, "#7fb3a3"],
  [/#22d3ee/gi, "#7fb3a3"],
  // Purple → muted violet (oxytocin / Aivy)
  [/#a855f7/gi, "#a88fc4"],
  [/#c084fc/gi, "#bda4d4"],
  // Reds → rust. Crisis only; never decorative.
  [/#dc2626/gi, "#c2603f"],
  [/#ef4444/gi, "#c2603f"],
  [/#e8543d/gi, "#c2603f"],
  [/#991b1b/gi, "#8f4630"],
  // Grounds → ink
  [/#050505/gi, "#0d0f0d"],
  [/#020202/gi, "#0d0f0d"],
  [/#0a0a0a/gi, "#141814"],
  [/#09090b/gi, "#141814"],
  [/#0a0f1a/gi, "#141814"],
  [/#051024/gi, "#141814"],
  [/#0a1428/gi, "#141814"],
  [/#0a140f/gi, "#141814"],
  [/#0a0714/gi, "#141814"],
  [/#150d0a/gi, "#141814"],
  [/#0a1a14/gi, "#141814"],
  [/#27272a/gi, "#1d231d"],
];

/* ── Tailwind neutrals → paper scale ─────────────────────── */
const NEUTRALS = [
  [/\btext-white\b/g, "text-[#f2efe6]"],
  [/\btext-neutral-100\b/g, "text-[#f2efe6]"],
  [/\btext-neutral-200\b/g, "text-[#f2efe6]"],
  [/\btext-neutral-300\b/g, "text-[#b8b4a6]"],
  [/\btext-neutral-400\b/g, "text-[#b8b4a6]"],
  [/\btext-neutral-500\b/g, "text-[#7d7a70]"],
  [/\btext-neutral-600\b/g, "text-[#7d7a70]"],
  [/\btext-gray-300\b/g, "text-[#b8b4a6]"],
  [/\btext-gray-400\b/g, "text-[#b8b4a6]"],
  [/\btext-zinc-400\b/g, "text-[#b8b4a6]"],
  [/\bbg-neutral-900\b/g, "bg-[#141814]"],
  [/\bbg-neutral-950\b/g, "bg-[#0d0f0d]"],
  [/\bborder-white\/5\b/g, "border-[#1d231d]"],
  [/\bborder-white\/10\b/g, "border-[#1d231d]"],
  [/\bborder-white\/15\b/g, "border-[#2a322a]"],
  [/\bborder-white\/20\b/g, "border-[#2a322a]"],
  [/\bborder-white\/25\b/g, "border-[#2a322a]"],
  [/\bborder-white\/35\b/g, "border-[#2a322a]"],
  [/\bbg-white\/5\b/g, "bg-[#141814]"],
  [/\bbg-white\/10\b/g, "bg-[#1d231d]"],
];

/* ── Type habits ─────────────────────────────────────────────
   font-black + uppercase + tracking-widest is the single loudest AI tell in
   this codebase and the hardest thing to read for an exhausted newcomer. */
const TYPE = [
  [/\bfont-black\b/g, "font-semibold"],
  [/\bfont-extrabold\b/g, "font-semibold"],
  // Drop uppercase wherever it appears in a class list.
  [/\buppercase\s+/g, ""],
  [/\s+uppercase\b/g, ""],
  [/\btracking-widest\b/g, ""],
  [/\btracking-\[0\.25em\]\b/g, ""],
  [/\btracking-\[0\.2em\]\b/g, ""],
  // Glow shadows: a zero-offset coloured halo is decoration, not depth.
  [/\s*shadow-\[0_0_\d+px_rgba\([^\]]*\)\]/g, ""],
  [/\s*drop-shadow-lg\b/g, ""],
  [/\s*\bglow-text\b/g, ""],
  [/\s*\bglow-border\b/g, ""],
  // Pulsing status dots.
  [/\s*\banimate-pulse\b/g, ""],
  // Photos are not action targets — give the container the feedback.
  [/\s*group-hover:scale-105\b/g, ""],
  [/\s*hover:scale-105\b/g, ""],
  // Over-rounding: cards settle at 12–16px; pills are for small controls.
  [/\brounded-\[2rem\]\b/g, "rounded-[14px]"],
  [/\brounded-3xl\b/g, "rounded-[14px]"],
];

const files = execSync(
  `find src -type f \\( -name '*.tsx' -o -name '*.ts' -o -name '*.css' \\) -not -path '*/node_modules/*'`,
  { encoding: "utf8", cwd: process.cwd() }
)
  .trim()
  .split("\n")
  .filter(Boolean)
  // The design primitives and the migrated chrome are already correct.
  .filter(
    (f) =>
      !f.includes("components/design/") &&
      !f.endsWith("globals.css") &&
      !f.endsWith("lib/photos.ts")
  );

let changed = 0;
const report = [];

for (const file of files) {
  const before = readFileSync(file, "utf8");
  let after = before;

  for (const [re, to] of [...COLORS, ...NEUTRALS, ...TYPE]) after = after.replace(re, to);

  // Tidy the double spaces the class-list removals leave behind.
  after = after.replace(/className="([^"]*)"/g, (m, cls) =>
    `className="${cls.replace(/\s{2,}/g, " ").trim()}"`
  );
  after = after.replace(/className=\{`([^`]*)`\}/g, (m, cls) =>
    "className={`" + cls.replace(/[ \t]{2,}/g, " ") + "`}"
  );

  if (after !== before) {
    changed++;
    report.push(file);
    if (!DRY) writeFileSync(file, after);
  }
}

console.log(`${DRY ? "[dry] would change" : "changed"} ${changed}/${files.length} files`);
report.forEach((f) => console.log("  " + f));
