"use client";

import React from "react";
import { CheckCircle2, XCircle, Info, AlertTriangle, ExternalLink } from "lucide-react";
import { BlogPost } from "@/lib/blogData";
import { DOSE_FIGURES, SmartImage } from "@/components/DoseFigures";
import { PullQuote, StackList, SubHead, Prose } from "@/components/design";

/**
 * AAFiends blog section renderer.
 *
 * Rebuilt August 2026 onto the "Dawn Ledger" reading surface (DESIGN.md).
 * The section vocabulary is unchanged — every post's data still renders the
 * same blocks, with the same numbers — but the typography now comes from
 * `.prose-dawn` in globals.css instead of being hand-rolled per element:
 * serif for the argument, mono for the measurement, sans for the body.
 *
 * Every markdown block carries its own <Prose>, so the reading surface
 * travels with the component. Any page that renders <BlogContent> gets the
 * right measure and the right typography without having to remember to wrap
 * it, and the data blocks stay outside prose where their own layout rules
 * belong — no specificity fight between the two.
 *
 * Three things went out with the redesign:
 *  - the framer-motion entrance wrappers. Every block is visible at rest; a
 *    fast scroll used to leave blank space where a chart should be.
 *  - the little coloured bar stuck to the left of every heading, and the
 *    4px accent stripe on the pull quote (DESIGN.md → Refuse).
 *  - the 9–10px chrome type. Nothing functional sits below 13px now.
 *
 * No react-markdown dependency — blogData.ts's markdown blocks only ever use
 * plain paragraphs, **bold** inline emphasis, headings, simple lists and an
 * occasional `---`, so the small parser below covers it.
 */

const CALLOUT_TONES = {
  info: { color: "#7fb3a3", Icon: Info },
  warn: { color: "#e0a45c", Icon: AlertTriangle },
  danger: { color: "#c2603f", Icon: AlertTriangle },
  success: { color: "#4cc07a", Icon: CheckCircle2 },
} as const;

const LIST_ACCENT: Record<string, string> = {
  green: "#4cc07a",
  amber: "#e0a45c",
  cyan: "#7fb3a3",
  purple: "#a88fc4",
  red: "#c2603f",
};

/**
 * Data blocks are allowed to break the 68ch measure on wide screens — that
 * contrast between a narrow column of argument and a wider figure is what
 * makes a page read like a magazine rather than a form.
 */
const BREAKOUT = "lg:-mx-14";

interface BlogContentProps {
  post: BlogPost;
}

// Inline parser: handles **bold**, *italic*, and [text](url) links. The
// elements are deliberately unclassed — .prose-dawn styles strong, em and a.
function renderInline(text: string, keyBase: string) {
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return tokens.map((tok, j) => {
    if (tok.startsWith("**") && tok.endsWith("**")) {
      return <strong key={`${keyBase}-${j}`}>{tok.slice(2, -2)}</strong>;
    }
    if (tok.startsWith("*") && tok.endsWith("*") && tok.length > 2) {
      return <em key={`${keyBase}-${j}`}>{tok.slice(1, -1)}</em>;
    }
    const link = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const external = /^https?:\/\//.test(link[2]);
      return (
        <a
          key={`${keyBase}-${j}`}
          href={link[2]}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
      return <hr key={i} />;
    }
    if (trimmed.startsWith("### ")) {
      return <h3 key={i}>{renderInline(trimmed.slice(4), `h3-${i}`)}</h3>;
    }
    if (trimmed.startsWith("## ")) {
      return <h2 key={i}>{renderInline(trimmed.slice(3), `h2-${i}`)}</h2>;
    }
    // Unordered list — every line starts with "- ". The green markers come
    // from .prose-dawn li::marker, so there are no hand-placed bullet spans.
    const lines = trimmed.split("\n").map((l) => l.trim());
    if (lines.length > 0 && lines.every((l) => l.startsWith("- "))) {
      return (
        <ul key={i}>
          {lines.map((l, k) => (
            <li key={k}>{renderInline(l.slice(2), `li-${i}-${k}`)}</li>
          ))}
        </ul>
      );
    }
    return <p key={i}>{renderInline(trimmed, `p-${i}`)}</p>;
  });
}

export default function BlogContent({ post }: BlogContentProps) {
  return (
    <div className="flex flex-col gap-9">
      {post.sections.map((section, idx) => {
        switch (section.type) {
          case "markdown":
            return <Prose key={idx}>{renderMarkdownLite(section.content)}</Prose>;
          case "pullquote":
            return (
              <div key={idx} className="py-4">
                <PullQuote cite={section.author ? `— ${section.author}` : undefined}>
                  {section.text}
                </PullQuote>
              </div>
            );
          case "comparison":
            return <Comparison key={idx} {...section} />;
          case "workflow":
            return <Workflow key={idx} title={section.title} steps={section.steps} />;
          case "statgrid":
            return <StatGrid key={idx} title={section.title} stats={section.stats} />;
          case "timeline":
            return <Timeline key={idx} title={section.title} phases={section.phases} />;
          case "barchart":
            return <BarChart key={idx} title={section.title} unit={section.unit} bars={section.bars} />;
          case "figure": {
            const Fig = DOSE_FIGURES[section.id];
            return Fig ? (
              <div key={idx} className={BREAKOUT}>
                <Fig />
              </div>
            ) : null;
          }
          case "image":
            return (
              <div key={idx} className={BREAKOUT}>
                <SmartImage
                  src={section.src}
                  alt={section.alt}
                  caption={section.caption}
                  credit={section.credit}
                  accent={section.accent}
                />
              </div>
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
        <div className="font-measure border-t border-[#1d231d] pt-6 text-[13px] leading-relaxed text-[#7d7a70]">
          Sources: {post.sources.join(" · ")}
        </div>
      )}
    </div>
  );
}

/** A block title. Serif, no coloured tab beside it. */
function BlockHead({ children }: { children: React.ReactNode }) {
  return <SubHead className="mb-5">{children}</SubHead>;
}

function Callout({
  tone,
  title,
  body,
}: {
  tone: "info" | "warn" | "success" | "danger";
  title: string;
  body: string;
}) {
  const { color, Icon } = CALLOUT_TONES[tone];
  return (
    <div
      className="flex gap-4 rounded-[14px] border px-5 py-5"
      style={{ borderColor: `${color}40`, background: `${color}0d` }}
    >
      <Icon size={20} className="mt-0.5 shrink-0" style={{ color }} aria-hidden />
      <div>
        <h4 className="font-display text-[1.1rem] leading-tight text-[#f2efe6]">{title}</h4>
        <p className="mt-1.5 text-[15px] leading-relaxed text-[#b8b4a6]">{body}</p>
      </div>
    </div>
  );
}

/**
 * Grouped items with a rule between them, not a grid of boxes inside a box —
 * the old version nested a rounded card per group inside the article card.
 */
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
    <div className={BREAKOUT}>
      <BlockHead>{title}</BlockHead>
      {note && <p className="-mt-2 mb-6 max-w-[62ch] text-[15px] text-[#b8b4a6]">{note}</p>}
      <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
        {groups.map((g, gi) => {
          const accent = LIST_ACCENT[g.accent || "green"];
          return (
            <div key={gi}>
              <h4
                className="font-measure border-b border-[#1d231d] pb-2 text-[13px]"
                style={{ color: accent }}
              >
                {g.name}
              </h4>
              <ul className="mt-1 list-none pl-0">
                {g.items.map((it, ii) => (
                  <li
                    key={ii}
                    className="border-b border-[#1d231d] py-3 text-[15px] leading-relaxed text-[#b8b4a6]"
                  >
                    {it.url ? (
                      <a
                        href={it.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-semibold text-[#f2efe6] underline decoration-[#2a322a] underline-offset-4 transition-colors hover:decoration-[#4cc07a]"
                      >
                        {it.name}
                        <ExternalLink size={13} className="opacity-60" aria-hidden />
                      </a>
                    ) : (
                      <span className="font-semibold text-[#f2efe6]">{it.name}</span>
                    )}
                    {it.detail && <span> — {it.detail}</span>}
                    {it.tag && (
                      <span className="font-measure ml-2 text-[12.5px]" style={{ color: accent }}>
                        {it.tag}
                      </span>
                    )}
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

/** Two sides of an argument. One border each, no stripe, no tinted panels. */
function Comparison({
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
  const columns = [
    { heading: leftTitle, points: leftPoints, Icon: XCircle, color: "#c2603f" },
    { heading: rightTitle, points: rightPoints, Icon: CheckCircle2, color: "#4cc07a" },
  ];
  return (
    <div className={BREAKOUT}>
      <BlockHead>{title}</BlockHead>
      <div className="grid gap-6 md:grid-cols-2">
        {columns.map((col) => (
          <div key={col.heading} className="rounded-[14px] border border-[#1d231d] px-6 py-6">
            <div className="flex items-center gap-2.5 border-b border-[#1d231d] pb-3">
              <col.Icon size={18} style={{ color: col.color }} aria-hidden />
              <h4 className="font-display text-[1.15rem] leading-tight text-[#f2efe6]">
                {col.heading}
              </h4>
            </div>
            <ul className="mt-4 list-none space-y-3 pl-0 text-[15px] leading-relaxed text-[#b8b4a6]">
              {col.points.map((point, idx) => (
                <li key={idx} className="flex gap-3">
                  <span
                    className="font-measure shrink-0 text-[13px] text-[#7d7a70]"
                    aria-hidden
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/** An ordered sequence where the order carries information. Rules, not cards. */
function Workflow({ title, steps }: { title: string; steps: { title: string; desc: string }[] }) {
  return (
    <div className={BREAKOUT}>
      <BlockHead>{title}</BlockHead>
      <StackList
        className="mt-0 sm:mt-0"
        items={steps.map((step, idx) => ({
          n: String(idx + 1).padStart(2, "0"),
          title: step.title,
          body: step.desc,
        }))}
      />
    </div>
  );
}

/**
 * The measured facts. Mono, because these are measurements — the number sits
 * over a rule rather than inside a tinted box.
 */
function StatGrid({
  title,
  stats,
}: {
  title?: string;
  stats: { value: string; label: string; sublabel?: string }[];
}) {
  return (
    <div className={BREAKOUT}>
      {title && <BlockHead>{title}</BlockHead>}
      <div className={`grid gap-8 ${stats.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {stats.map((stat, idx) => (
          <div key={idx} className="border-t border-[#1d231d] pt-4">
            <span className="font-measure block text-[1.65rem] leading-none tracking-[-0.01em] text-[#4cc07a]">
              {stat.value}
            </span>
            <span className="mt-2.5 block text-[15px] font-semibold text-[#f2efe6]">
              {stat.label}
            </span>
            {stat.sublabel && (
              <span className="mt-1.5 block text-[14px] leading-relaxed text-[#7d7a70]">
                {stat.sublabel}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Phased windows. The range is a real measurement, so it is mono. */
function Timeline({
  title,
  phases,
}: {
  title: string;
  phases: { range: string; label: string; desc: string }[];
}) {
  return (
    <div className={BREAKOUT}>
      <BlockHead>{title}</BlockHead>
      <div className="border-t border-[#1d231d]">
        {phases.map((phase, idx) => (
          <div
            key={idx}
            className="grid gap-x-6 gap-y-1 border-b border-[#1d231d] py-5 sm:grid-cols-[9.5rem_1fr]"
          >
            <span className="font-measure text-[13px] leading-6 text-[#4cc07a]">{phase.range}</span>
            <div>
              <h4 className="font-display text-[1.15rem] leading-tight text-[#f2efe6]">
                {phase.label}
              </h4>
              <p className="mt-1.5 max-w-[58ch] text-[15px] leading-relaxed text-[#b8b4a6]">
                {phase.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Horizontal bar comparison. Bars are scaled against the largest value in the
 * set so wildly different magnitudes (530% vs 32%) still read side by side.
 * They are drawn at full length at rest — no reveal-on-scroll.
 */
function BarChart({
  title,
  unit,
  bars,
}: {
  title: string;
  unit?: string;
  bars: { label: string; value: number; sublabel?: string }[];
}) {
  const max = Math.max(...bars.map((b) => b.value), 1);
  return (
    <div className={BREAKOUT}>
      <BlockHead>{title}</BlockHead>
      <div className="flex flex-col gap-5">
        {bars.map((bar, idx) => (
          <div key={idx}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[15px] font-semibold text-[#f2efe6]">{bar.label}</span>
              <span className="font-measure shrink-0 text-[14px] text-[#4cc07a]">
                +{bar.value}
                {unit || "%"}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#1d231d]">
              <div
                className="h-full rounded-full bg-[#4cc07a]"
                style={{ width: `${(bar.value / max) * 100}%` }}
              />
            </div>
            {bar.sublabel && (
              <span className="mt-1.5 block text-[14px] text-[#7d7a70]">{bar.sublabel}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
