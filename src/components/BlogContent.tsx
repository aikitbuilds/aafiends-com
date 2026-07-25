"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, Info, AlertTriangle, ExternalLink } from "lucide-react";
import { BlogPost } from "@/lib/blogData";
import { DOSE_FIGURES, SmartImage } from "@/components/DoseFigures";

const CALLOUT_STYLES = {
  info: { color: "#00f0ff", Icon: Info },
  warn: { color: "#ef4444", Icon: AlertTriangle },
  success: { color: "#10b981", Icon: CheckCircle2 },
} as const;

const LIST_ACCENT: Record<string, string> = {
  green: "#10b981",
  amber: "#f59e0b",
  cyan: "#00f0ff",
  purple: "#a855f7",
  red: "#ef4444",
};

/**
 * AAFiends blog section renderer. Adapted 2026-07-04 from RaceFiends'
 * BlogContent.tsx pattern (same idea: post content is data, split into
 * typed sections, each rendered by its own small component) but re-themed
 * emerald/black and built around real data infographics (statgrid,
 * timeline, barchart) instead of RaceFiends' ledger-specific calculator.
 *
 * No react-markdown dependency — blogData.ts's markdown blocks only ever
 * use plain paragraphs, **bold** inline emphasis, and an occasional `---`
 * divider, so a tiny hand-rolled parser (see renderMarkdownLite below)
 * covers it without adding a new package.
 */

interface BlogContentProps {
  post: BlogPost;
}

// Inline parser: handles **bold**, *italic*, and [text](url) links.
function renderInline(text: string, keyBase: string) {
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return tokens.map((tok, j) => {
    if (tok.startsWith("**") && tok.endsWith("**")) {
      return <strong key={`${keyBase}-${j}`} className="font-bold text-white">{tok.slice(2, -2)}</strong>;
    }
    if (tok.startsWith("*") && tok.endsWith("*") && tok.length > 2) {
      return <em key={`${keyBase}-${j}`} className="italic text-neutral-200">{tok.slice(1, -1)}</em>;
    }
    const link = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const external = /^https?:\/\//.test(link[2]);
      return (
        <a
          key={`${keyBase}-${j}`}
          href={link[2]}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="font-bold text-[#10b981] underline decoration-[#10b981]/30 underline-offset-4 hover:text-emerald-300"
        >
          {link[1]}
        </a>
      );
    }
    return <React.Fragment key={`${keyBase}-${j}`}>{tok}</React.Fragment>;
  });
}

function renderMarkdownLite(content: string) {
  const blocks = content.trim().split(/\n\s*\n/);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (trimmed === "---") {
      return <hr key={i} className="my-2 border-white/10" />;
    }
    // Headings
    if (trimmed.startsWith("### ")) {
      return (
        <h3 key={i} className="mt-2 flex items-center gap-2 text-lg font-black uppercase tracking-tight text-white">
          <span className="h-6 w-1.5 rounded-full bg-[#10b981]" />
          {renderInline(trimmed.slice(4), `h3-${i}`)}
        </h3>
      );
    }
    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={i} className="mt-6 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
          {renderInline(trimmed.slice(3), `h2-${i}`)}
        </h2>
      );
    }
    // Unordered list — every line starts with "- "
    const lines = trimmed.split("\n").map((l) => l.trim());
    if (lines.length > 0 && lines.every((l) => l.startsWith("- "))) {
      return (
        <ul key={i} className="flex flex-col gap-2 pl-1">
          {lines.map((l, k) => (
            <li key={k} className="flex items-start gap-2.5 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#10b981]/70" />
              <span>{renderInline(l.slice(2), `li-${i}-${k}`)}</span>
            </li>
          ))}
        </ul>
      );
    }
    // Paragraph
    return (
      <p key={i} className="text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
        {renderInline(trimmed, `p-${i}`)}
      </p>
    );
  });
}

export default function BlogContent({ post }: BlogContentProps) {
  return (
    <div className="flex flex-col gap-10">
      {post.sections.map((section, idx) => {
        switch (section.type) {
          case "markdown":
            return (
              <div key={idx} className="flex flex-col gap-4">
                {renderMarkdownLite(section.content)}
              </div>
            );
          case "pullquote":
            return <PullQuote key={idx} text={section.text} author={section.author} />;
          case "comparison":
            return <ComparisonInfographic key={idx} {...section} />;
          case "workflow":
            return <WorkflowChart key={idx} title={section.title} steps={section.steps} />;
          case "statgrid":
            return <StatGrid key={idx} title={section.title} stats={section.stats} />;
          case "timeline":
            return <Timeline key={idx} title={section.title} phases={section.phases} />;
          case "barchart":
            return <BarChart key={idx} title={section.title} unit={section.unit} bars={section.bars} />;
          case "figure": {
            const Fig = DOSE_FIGURES[section.id];
            return Fig ? <Fig key={idx} /> : null;
          }
          case "image":
            return (
              <SmartImage
                key={idx}
                src={section.src}
                alt={section.alt}
                caption={section.caption}
                credit={section.credit}
                accent={section.accent}
              />
            );
          case "callout":
            return <Callout key={idx} tone={section.tone} title={section.title} body={section.body} />;
          case "shoppinglist":
            return <ShoppingList key={idx} title={section.title} note={section.note} groups={section.groups} />;
          default:
            return null;
        }
      })}

      {post.sources.length > 0 && (
        <div className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest border-t border-white/5 pt-6">
          Sources: {post.sources.join(" • ")}
        </div>
      )}
    </div>
  );
}

function Callout({ tone, title, body }: { tone: "info" | "warn" | "success"; title: string; body: string }) {
  const { color, Icon } = CALLOUT_STYLES[tone];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex gap-4 rounded-2xl border p-5"
      style={{ borderColor: `${color}33`, background: `${color}0d` }}
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ background: `${color}1a`, color }}
      >
        <Icon size={18} />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-black uppercase tracking-wide text-white">{title}</h4>
        <p className="text-xs leading-relaxed text-neutral-300 sm:text-[13px]">{body}</p>
      </div>
    </motion.div>
  );
}

function ShoppingList({
  title,
  note,
  groups,
}: {
  title: string;
  note?: string;
  groups: {
    name: string;
    accent?: "green" | "amber" | "cyan" | "purple" | "red";
    items: { name: string; detail?: string; tag?: string; url?: string }[];
  }[];
}) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="flex items-center gap-2 text-lg font-black uppercase tracking-tight text-white">
        <span className="h-6 w-1.5 rounded-full bg-[#10b981]" />
        {title}
      </h3>
      {note && <p className="-mt-2 text-xs leading-relaxed text-neutral-400">{note}</p>}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {groups.map((g, gi) => {
          const accent = LIST_ACCENT[g.accent || "green"];
          return (
            <div key={gi} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0a0a0a] p-5">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
                <h4 className="text-xs font-black uppercase tracking-widest text-white">{g.name}</h4>
              </div>
              <ul className="flex flex-col gap-2.5">
                {g.items.map((it, ii) => (
                  <li key={ii} className="flex items-start gap-2.5 text-xs leading-snug">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: `${accent}99` }} />
                    <span className="flex-1">
                      {it.url ? (
                        <a
                          href={it.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-white underline decoration-white/25 underline-offset-4 hover:text-[#10b981]"
                        >
                          {it.name}
                          <ExternalLink size={11} className="opacity-60" />
                        </a>
                      ) : (
                        <span className="font-bold text-white">{it.name}</span>
                      )}
                      {it.detail && <span className="text-neutral-400"> — {it.detail}</span>}
                      {it.tag && (
                        <span
                          className="ml-1.5 rounded px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider"
                          style={{ background: `${accent}1a`, color: accent }}
                        >
                          {it.tag}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PullQuote({ text, author }: { text: string; author?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="border-l-4 border-[#10b981] rounded-2xl p-6 md:p-8 bg-[#10b981]/[0.04] relative overflow-hidden"
    >
      <div className="absolute top-2 left-4 text-7xl font-black text-[#10b981]/10 font-serif leading-none select-none pointer-events-none">
        &ldquo;
      </div>
      <blockquote className="text-lg md:text-xl font-light text-white leading-relaxed relative z-10 italic">
        {text}
      </blockquote>
      {author && (
        <div className="mt-4 text-xs font-bold uppercase tracking-widest text-[#10b981]/80 font-mono">
          &mdash; {author}
        </div>
      )}
    </motion.div>
  );
}

function ComparisonInfographic({
  title,
  leftTitle,
  leftPoints,
  rightTitle,
  rightPoints,
}: {
  title: string;
  leftTitle: string;
  leftPoints: string[];
  rightTitle: string;
  rightPoints: string[];
}) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
        <span className="w-1.5 h-6 bg-[#10b981] rounded-full"></span>
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border border-red-500/10 rounded-2xl p-5 bg-red-950/5 flex flex-col gap-4"
        >
          <div className="flex items-center gap-3 border-b border-white/5 pb-3">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
              <XCircle size={16} />
            </div>
            <h4 className="font-black text-base text-white uppercase tracking-tight">{leftTitle}</h4>
          </div>
          <ul className="flex flex-col gap-3">
            {leftPoints.map((point, idx) => (
              <li key={idx} className="flex gap-2.5 items-start text-xs font-light text-neutral-400 leading-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 mt-1.5 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border border-[#10b981]/10 rounded-2xl p-5 bg-[#10b981]/[0.03] flex flex-col gap-4"
        >
          <div className="flex items-center gap-3 border-b border-white/5 pb-3">
            <div className="w-8 h-8 rounded-lg bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
              <CheckCircle2 size={16} />
            </div>
            <h4 className="font-black text-base text-white uppercase tracking-tight">{rightTitle}</h4>
          </div>
          <ul className="flex flex-col gap-3">
            {rightPoints.map((point, idx) => (
              <li key={idx} className="flex gap-2.5 items-start text-xs font-light text-neutral-300 leading-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] mt-1.5 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

function WorkflowChart({ title, steps }: { title: string; steps: { title: string; desc: string }[] }) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
        <span className="w-1.5 h-6 bg-[#10b981] rounded-full"></span>
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="border border-white/5 rounded-2xl p-5 flex flex-col gap-3 relative bg-white/[0.02] hover:border-[#10b981]/20 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#10b981] uppercase font-mono bg-[#10b981]/10 px-2 py-0.5 rounded">
                Step {idx + 1}
              </span>
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 translate-x-1.5 z-20">
                  <ArrowRight size={14} className="text-neutral-600 group-hover:text-[#10b981]/50 transition-colors" />
                </div>
              )}
            </div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white mt-1">{step.title}</h4>
            <p className="text-xs font-light text-neutral-400 leading-relaxed flex-1">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Big-number stat callouts — the primary "infographic" workhorse for these
// posts. Deliberately simple (no external chart library) so every number
// is guaranteed to render exactly as written in blogData.ts.
function StatGrid({ title, stats }: { title?: string; stats: { value: string; label: string; sublabel?: string }[] }) {
  return (
    <div className="flex flex-col gap-5">
      {title && (
        <h3 className="text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
          <span className="w-1.5 h-6 bg-[#10b981] rounded-full"></span>
          {title}
        </h3>
      )}
      <div className={`grid grid-cols-1 ${stats.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"} gap-4`}>
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="border border-[#10b981]/15 rounded-2xl p-5 bg-[#10b981]/[0.03] flex flex-col gap-1.5 text-center items-center"
          >
            <span className="text-3xl sm:text-4xl font-black text-[#10b981] tracking-tight">{stat.value}</span>
            <span className="text-xs font-bold text-white uppercase tracking-wide">{stat.label}</span>
            {stat.sublabel && <span className="text-[10px] text-neutral-500 leading-relaxed">{stat.sublabel}</span>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Horizontal step timeline for phased recovery windows (e.g. the 90-day
// reset). Purely code/CSS — no image asset.
function Timeline({ title, phases }: { title: string; phases: { range: string; label: string; desc: string }[] }) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
        <span className="w-1.5 h-6 bg-[#10b981] rounded-full"></span>
        {title}
      </h3>
      <div className="flex flex-col gap-0">
        {phases.map((phase, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="flex gap-4 items-start"
          >
            <div className="flex flex-col items-center shrink-0 pt-1">
              <span className="w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              {idx < phases.length - 1 && <span className="w-px flex-1 min-h-[2.5rem] bg-[#10b981]/20 my-1" />}
            </div>
            <div className="flex flex-col gap-1 pb-6">
              <span className="text-[10px] font-mono font-bold text-[#10b981] uppercase tracking-widest">{phase.range}</span>
              <h4 className="font-black text-white text-sm uppercase tracking-wide">{phase.label}</h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">{phase.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Horizontal bar comparison for percentage-style stats. Bars are scaled
// relative to the largest value in the set so wildly different magnitudes
// (e.g. 530% vs 32%) still render legibly side by side.
function BarChart({ title, unit, bars }: { title: string; unit?: string; bars: { label: string; value: number; sublabel?: string }[] }) {
  const max = Math.max(...bars.map((b) => b.value), 1);
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
        <span className="w-1.5 h-6 bg-[#10b981] rounded-full"></span>
        {title}
      </h3>
      <div className="flex flex-col gap-4">
        {bars.map((bar, idx) => (
          <div key={idx} className="flex flex-col gap-1.5">
            <div className="flex justify-between items-baseline gap-3 text-xs">
              <span className="font-bold text-neutral-300">{bar.label}</span>
              <span className="font-mono font-black text-[#10b981] shrink-0">
                +{bar.value}
                {unit || "%"}
              </span>
            </div>
            <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(bar.value / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="h-full bg-gradient-to-r from-[#10b981]/60 to-[#10b981] rounded-full"
              />
            </div>
            {bar.sublabel && <span className="text-[10px] text-neutral-500">{bar.sublabel}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
