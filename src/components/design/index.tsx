/**
 * AAfiends design primitives — "Dawn Ledger". See DESIGN.md.
 *
 * These exist so pages stop hand-rolling kickers, card grids and glow panels.
 * If you are about to write `uppercase tracking-widest` or a nested rounded
 * card, reach for one of these instead.
 *
 * Server components by default — no "use client" here. Keep it that way so
 * pages can stay static.
 */

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Photo } from "@/lib/photos";

/* ────────────────────────────────────────────────────────────── */

export function Wrap({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full ${wide ? "max-w-[1320px]" : "max-w-[1160px]"} px-5 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * A page section. `band` gives the raised alternating surface; use it to
 * separate arguments, not to decorate.
 */
export function Section({
  children,
  id,
  band = false,
  tight = false,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  band?: boolean;
  tight?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={[
        tight ? "py-14 sm:py-20" : "py-20 sm:py-28 lg:py-32",
        band ? "bg-[#141814] border-y border-[#1d231d]" : "",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}

/**
 * Heading + optional lede. Deliberately has NO kicker slot — the heading
 * carries its own weight. Wrap a phrase in <em> for the amber italic.
 */
export function SectionHead({
  children,
  lede,
  align = "left",
  className = "",
}: {
  children: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={[
        "max-w-[62ch]",
        align === "center" ? "mx-auto text-center" : "",
        className,
      ].join(" ")}
    >
      <h2 className="font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.08] text-[#f2efe6] [&_em]:font-display-italic [&_em]:text-[#e0a45c]">
        {children}
      </h2>
      {lede ? (
        <div className="mt-5 max-w-[58ch] text-[#b8b4a6] [&_strong]:font-semibold [&_strong]:text-[#f2efe6]">
          {lede}
        </div>
      ) : null}
    </div>
  );
}

/** A smaller heading for sub-sections inside a page. */
export function SubHead({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={`font-display text-[clamp(1.35rem,2.4vw,1.85rem)] leading-tight text-[#f2efe6] [&_em]:font-display-italic [&_em]:text-[#e0a45c] ${className}`}
    >
      {children}
    </h3>
  );
}

/* ── Buttons ─────────────────────────────────────────────────── */

type BtnProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
};

const btnBase =
  "inline-block rounded-[10px] px-6 py-[15px] text-base font-semibold no-underline transition-[background-color,border-color,transform] duration-200 active:scale-[0.98]";

export function ButtonPrimary({ href, children, external, className = "" }: BtnProps) {
  const cls = `${btnBase} bg-[#4cc07a] text-[#08130c] hover:bg-[#5fd08c] ${className}`;
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function ButtonGhost({ href, children, external, className = "" }: BtnProps) {
  const cls = `${btnBase} border border-[#f2efe6]/35 text-[#f2efe6] hover:border-[#f2efe6] ${className}`;
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** The third, quiet option. Never a third filled button. */
export function ButtonQuiet({ href, children, external, className = "" }: BtnProps) {
  const cls = `text-[15px] text-[#b8b4a6] underline decoration-[#1d231d] underline-offset-4 hover:text-[#f2efe6] hover:decoration-[#4cc07a] transition-colors ${className}`;
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function CtaRow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mt-8 flex flex-wrap items-center gap-3.5 ${className}`}>
      {children}
    </div>
  );
}

/* ── Photography ─────────────────────────────────────────────── */

const RATIO_CLASS = {
  "16:9": "aspect-[16/9]",
  "5:4": "aspect-[5/4]",
  "4:5": "aspect-[4/5]",
} as const;

/**
 * A captioned photograph. Never animates on hover — the photo is not a button.
 */
export function Figure({
  photo,
  priority = false,
  className = "",
  showCaption = true,
  ratio,
}: {
  photo: Photo;
  priority?: boolean;
  className?: string;
  showCaption?: boolean;
  ratio?: keyof typeof RATIO_CLASS;
}) {
  return (
    <figure
      className={`relative overflow-hidden rounded-[14px] bg-[#141814] ${RATIO_CLASS[ratio ?? photo.ratio]} ${className}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 900px) 100vw, 50vw"
        className="object-cover"
        priority={priority}
      />
      {showCaption && photo.caption ? (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0d0f0d]/90 to-transparent px-5 pb-3 pt-8 text-[13px] text-[#b8b4a6]">
          {photo.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * Full-bleed page opener. One heading, one lede, at most two buttons plus a
 * quiet link. The scrim keeps type off the subject's face.
 */
export function PageHero({
  photo,
  title,
  lede,
  meta,
  children,
  height = "tall",
}: {
  photo: Photo;
  title: ReactNode;
  lede?: ReactNode;
  /** Mono measurement line, e.g. "Day 37 · baseline ↑". Real values only. */
  meta?: ReactNode;
  children?: ReactNode;
  height?: "tall" | "short";
}) {
  return (
    <div
      className={`relative flex items-end overflow-hidden ${
        height === "tall" ? "min-h-[78vh] sm:min-h-[86vh]" : "min-h-[52vh] sm:min-h-[60vh]"
      }`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_38%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,#0d0f0d_4%,rgba(13,15,13,0.74)_34%,rgba(13,15,13,0.2)_62%,rgba(13,15,13,0.4)_100%)]" />
      <Wrap className="relative pb-12 sm:pb-20">
        <h1 className="font-display max-w-[13ch] text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.02] tracking-[-0.025em] text-[#f2efe6] [&_em]:font-display-italic [&_em]:text-[#e0a45c]">
          {title}
        </h1>
        {lede ? (
          <p className="mt-5 max-w-[52ch] text-[clamp(1.05rem,1.4vw,1.22rem)] text-[#f2efe6]/92">
            {lede}
          </p>
        ) : null}
        {meta ? (
          <p className="font-measure mt-3.5 text-[13px] text-[#4cc07a]">{meta}</p>
        ) : null}
        {children}
      </Wrap>
    </div>
  );
}

/* ── Layout patterns ─────────────────────────────────────────── */

/**
 * Photo beside copy, alternating sides. Replaces the identical-card grid as
 * the default way to present a set of related ideas.
 */
export function PhotoRow({
  photo,
  flip = false,
  children,
  className = "",
}: {
  photo: Photo;
  flip?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mt-12 grid items-center gap-8 sm:mt-16 lg:mt-20 lg:grid-cols-2 lg:gap-16 ${className}`}
    >
      <Figure photo={photo} className={flip ? "lg:order-2" : ""} />
      <div>{children}</div>
    </div>
  );
}

/**
 * A numbered sequence where the order genuinely carries information
 * (the BIO 12 order of operations, the daily loop). Rules, not cards.
 */
export function StackList({
  items,
  className = "",
}: {
  items: {
    n: string;
    title: ReactNode;
    body: ReactNode;
    /** Right-hand mono annotation, e.g. "step 12 · oxytocin" */
    maps?: ReactNode;
  }[];
  className?: string;
}) {
  return (
    <div className={`mt-10 border-t border-[#1d231d] sm:mt-14 ${className}`}>
      {items.map((it) => (
        <div
          key={it.n}
          className="grid grid-cols-[2.75rem_1fr] items-baseline gap-x-5 border-b border-[#1d231d] px-1 py-6 sm:grid-cols-[4rem_1fr_auto] sm:gap-x-6"
        >
          <span className="font-measure text-sm text-[#4cc07a]">{it.n}</span>
          <div>
            <h3 className="font-display text-[1.35rem] leading-tight text-[#f2efe6]">
              {it.title}
            </h3>
            <p className="mt-1 max-w-[54ch] text-[15.5px] text-[#b8b4a6]">{it.body}</p>
          </div>
          {it.maps ? (
            <span className="font-measure col-start-2 mt-2 whitespace-nowrap text-[12.5px] text-[#7d7a70] sm:col-start-3 sm:mt-0 sm:text-right">
              {it.maps}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/**
 * A list of links out. Rows with a rule between, not a grid of boxes.
 */
export function EditorialRow({
  href,
  title,
  body,
  go,
  external,
}: {
  href: string;
  title: ReactNode;
  body: ReactNode;
  go: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <h3 className="font-display text-[1.3rem] leading-tight text-[#f2efe6]">{title}</h3>
      <p className="max-w-[58ch] text-[15px] text-[#b8b4a6]">{body}</p>
      <span className="font-measure whitespace-nowrap text-[13px] text-[#4cc07a]">
        {go} →
      </span>
    </>
  );
  const cls =
    "grid items-center gap-2 border-b border-[#1d231d] px-1 py-6 no-underline transition-colors hover:bg-[#141814] sm:grid-cols-[1fr_2fr_auto] sm:gap-6";

  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function EditorialList({ children }: { children: ReactNode }) {
  return <div className="mt-10 border-t border-[#1d231d] sm:mt-14">{children}</div>;
}

/**
 * A measured fact. The number is mono because it is a measurement; the label
 * is not shouted. Never use this as a decorative hero-metric row.
 */
export function Stat({
  value,
  children,
  className = "",
}: {
  value: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`font-measure mt-5 inline-flex items-baseline gap-2.5 border-t border-[#1d231d] pt-3.5 text-[13.5px] text-[#4cc07a] ${className}`}
    >
      <strong className="text-[1.4rem] font-medium tracking-[-0.01em]">{value}</strong>
      <span className="text-[#b8b4a6]">{children}</span>
    </div>
  );
}

/**
 * A band that needs to be noticed — crisis info, a caveat, a disclaimer.
 * One border, no side stripe, no glow.
 */
export function CalloutBand({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: "neutral" | "urgent";
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-xl border px-6 py-5",
        tone === "urgent"
          ? "border-[#c2603f]/40 bg-[#c2603f]/[0.07]"
          : "border-[#1d231d] bg-[#141814]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

/** Long-form reading surface. Pairs with .prose-dawn in globals.css. */
export function Prose({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`prose-dawn ${className}`}>{children}</div>;
}

/** A centred pull quote — the emotional beat between two arguments. */
export function PullQuote({
  children,
  cite,
}: {
  children: ReactNode;
  cite?: ReactNode;
}) {
  return (
    <blockquote className="mx-auto max-w-[34ch] text-center">
      <p className="font-display-italic text-[clamp(1.5rem,3.2vw,2.25rem)] leading-[1.3] text-[#f2efe6]">
        {children}
      </p>
      {cite ? (
        <cite className="font-measure mt-5 block text-[13px] not-italic text-[#7d7a70]">
          {cite}
        </cite>
      ) : null}
    </blockquote>
  );
}
