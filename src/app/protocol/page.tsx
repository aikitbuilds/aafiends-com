import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { PHOTOS } from "@/lib/photos";
import type { Photo } from "@/lib/photos";
import {
  Wrap,
  Section,
  SectionHead,
  SubHead,
  PageHero,
  PhotoRow,
  StackList,
  CalloutBand,
  Prose,
  ButtonPrimary,
  ButtonGhost,
  CtaRow,
} from "@/components/design";
import { ShieldCheck, ShieldAlert, Flame } from "lucide-react";

// The BIO 12 — the four-pillar daily protocol (Movement / Sleep / Nutrition /
// Breath), 3 imperatives each = 12 daily "firewall" checks. This public page is
// the canonical reference; the interactive tracker lives in the member
// dashboard (Bio12Tab).

type PillarDef = {
  name: string;
  sub: string;
  photo: Photo;
  why: string;
  items: { label: string; note: string }[];
};

const PILLARS: PillarDef[] = [
  {
    name: "Movement",
    sub: "Imperatives 1–3",
    photo: PHOTOS.gymLift,
    why: "A clean dopamine and adrenaline lift you earned — teaching the brain to feel good without a substance.",
    items: [
      { label: "Get outside / walk (20+ min)", note: "Outdoor light plus movement sets the body clock and gives the brain a clean dopamine bump it didn't have to steal." },
      { label: "Strength or mobility work", note: "Load the body on purpose. Rebuilding physical capacity is the most concrete daily proof that the engine is healing." },
      { label: "Cold plunge or contrast shower", note: "A brisk, earned adrenaline spike — voluntary discomfort that resets the stress response instead of feeding it." },
    ],
  },
  {
    name: "Sleep",
    sub: "Imperatives 4–6",
    photo: PHOTOS.kitchenJournal,
    why: "Deep sleep clears metabolic waste and rebuilds GABA — less craving, less anxiety, less fog.",
    items: [
      { label: "7+ hours last night", note: "Duration matters. A short night downregulates the same dopamine receptors the addiction did." },
      { label: "Screen curfew (9 PM)", note: "Blue light and doomscrolling push melatonin back and hand the evening to the AIV's favorite hunting hours." },
      { label: "Consistent wake time", note: "The regularity matters as much as the total hours — a stable wake time anchors the entire circadian repair job." },
    ],
  },
  {
    name: "Nutrition",
    sub: "Imperatives 7–9",
    photo: PHOTOS.kitchenFuel,
    why: "Up to ~90% of serotonin is made in the gut. Rebuilding the microbiome restores calm, steady mood.",
    items: [
      { label: "Hydrate (8+ cups)", note: "Dehydration reads as fatigue, headache, and irritability — all of which the virus is happy to blame on sobriety." },
      { label: "Protein + whole foods", note: "Steady fuel instead of sugar spikes. Amino acids are the raw material for the neurotransmitters you're rebuilding." },
      { label: "Omega-3 / fermented (gut)", note: "Feed the gut that feeds your mood. Fermented food and omega-3s are the cheapest mood stabilizers available." },
    ],
  },
  {
    name: "Breath",
    sub: "Imperatives 10–12",
    photo: PHOTOS.sauna,
    why: "Handing over what you cannot control shifts you out of fight-or-flight, lowering the cortisol that drives the loop.",
    items: [
      { label: "NSDR / breathwork session", note: "Non-sleep deep rest pays back part of the sleep debt and downshifts the nervous system on demand." },
      { label: "5-min meditation", note: "The Mirror pillar in practice — five minutes of stillness that keeps you connected instead of self-driven." },
      { label: "Box-breathe a craving down", note: "Four counts in, hold, out, hold. A craving is a wave; controlled breath is how you stay standing while it passes." },
    ],
  },
];

// Palette-true tones: green holds, amber warns, rust is the crisis end.
const THREAT_LEVELS = [
  { range: "12 of 12", label: "Minimal", color: "#4cc07a", safe: true, note: "Firewall at full strength. The AIV has nothing to feed on today." },
  { range: "10–11", label: "Low", color: "#4cc07a", safe: true, note: "Defenses solid — close out the last couple." },
  { range: "7–9", label: "Guarded", color: "#e0a45c", safe: false, note: "Holding, but there are gaps in the wall." },
  { range: "4–6", label: "Elevated", color: "#e0a45c", safe: false, note: "Exposure rising. Knock out a few more." },
  { range: "0–3", label: "Critical", color: "#c2603f", safe: false, note: "Firewall down — this is exactly where the virus thrives." },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function Bio12ProtocolPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <SiteHeader />

      <main className="flex-1">
        <PageHero
          photo={PHOTOS.windowStillness}
          height="short"
          title={
            <>
              The BIO 12 <em>protocol.</em>
            </>
          }
          lede="The 12 biological imperatives that protect your baseline — four pillars, three actions each, checked off every single day. Before the mind can hold a spiritual idea, the nervous system has to stop screaming. This is how you quiet it."
        />

        <Section tight>
          <Wrap>
            <Prose>
              <p>
                The BIO 12 is the biology leg of the <Link href="/framework">framework</Link> and the
                daily engine of the <Link href="/90rr">90 R&amp;R journal</Link>.
              </p>
            </Prose>
          </Wrap>
        </Section>

        {/* ── The 12, by pillar ────────────────────────────────── */}
        <Section band>
          <Wrap>
            <SectionHead
              lede={<p>The 12 imperatives, in the order you run them.</p>}
            >
              Four pillars. <em>Three actions each.</em>
            </SectionHead>

            {PILLARS.map((p, pi) => (
              <div key={p.name}>
                <PhotoRow photo={p.photo} flip={pi % 2 === 1}>
                  <SubHead>{p.name}</SubHead>
                  <p className="font-measure mt-2 text-[13px] text-[#7d7a70]">{p.sub}</p>
                  <p className="mt-4 max-w-[50ch] text-[#b8b4a6]">{p.why}</p>
                </PhotoRow>
                <StackList
                  items={p.items.map((item, i) => ({
                    n: pad(pi * 3 + i + 1),
                    title: item.label,
                    body: item.note,
                  }))}
                />
              </div>
            ))}
          </Wrap>
        </Section>

        {/* ── Threat levels ────────────────────────────────────── */}
        <Section>
          <Wrap>
            <SectionHead
              lede={
                <p>
                  Count how many of the 12 you completed today. The score isn&rsquo;t a grade —
                  it&rsquo;s a weather report on how exposed you are to the virus right now. Ten or
                  better keeps the streak alive.
                </p>
              }
            >
              Your <em>threat level.</em>
            </SectionHead>

            <div className="mt-10 border-t border-[#1d231d] sm:mt-14">
              {THREAT_LEVELS.map((t) => {
                const Icon = t.safe ? ShieldCheck : ShieldAlert;
                return (
                  <div
                    key={t.label}
                    className="grid grid-cols-[1.25rem_1fr] items-baseline gap-x-4 border-b border-[#1d231d] px-1 py-6 sm:grid-cols-[1.25rem_6rem_1fr] sm:gap-x-6"
                  >
                    <Icon size={17} style={{ color: t.color }} className="shrink-0 translate-y-[3px]" />
                    <span className="font-measure text-sm" style={{ color: t.color }}>
                      {t.range}
                    </span>
                    <div className="col-span-2 mt-2 sm:col-span-1 sm:mt-0">
                      <h3
                        className="font-display text-[1.3rem] leading-tight"
                        style={{ color: t.color }}
                      >
                        {t.label}
                      </h3>
                      <p className="mt-1 max-w-[56ch] text-[15.5px] text-[#b8b4a6]">{t.note}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Wrap>
        </Section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <Section band>
          <Wrap>
            <SectionHead
              lede={
                <p>
                  The printable journal carries the BIO 12 on paper; the member dashboard tracks it
                  with a live threat level and streak. Same 12 checks either way — pick your weapon.
                </p>
              }
            >
              Track the 12, <em>every day.</em>
            </SectionHead>

            <CalloutBand className="mt-9 max-w-[62ch]">
              <p className="font-measure flex items-center gap-2.5 text-[13.5px] text-[#e0a45c]">
                <Flame size={15} className="shrink-0" />
                Streak rule: 10 of 12 keeps the flame
              </p>
            </CalloutBand>

            <CtaRow>
              <ButtonPrimary href="/90rr">Get the free journal</ButtonPrimary>
              <ButtonGhost href="/dashboard">Open the dashboard tracker</ButtonGhost>
            </CtaRow>
          </Wrap>
        </Section>
      </main>

      <SiteFooter />
    </div>
  );
}
