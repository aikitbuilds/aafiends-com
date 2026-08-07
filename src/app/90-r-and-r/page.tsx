import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  Flame,
  Rocket,
  RefreshCw,
  ShieldCheck,
  PhoneCall,
  EyeOff,
  type LucideIcon,
} from "lucide-react";
import {
  RR_META, WHO_ITS_FOR, BOOTCAMP, PHASES, PILLARS, DELIVERABLES, SAFETY,
  RESERVATION, SCHEDULE, SCHEDULE_NOTE, VENUE, ALPHA,
} from "@/data/rrFellowship";
import ReserveFlow from "@/components/rr/ReserveFlow";
import AlphaClassDay from "@/components/rr/AlphaClassDay";
import { PHOTOS } from "@/lib/photos";
import {
  Wrap,
  Section,
  SectionHead,
  SubHead,
  PageHero,
  PhotoRow,
  Figure,
  StackList,
  ButtonPrimary,
  ButtonGhost,
  CtaRow,
  CalloutBand,
} from "@/components/design";

const ICONS: Record<string, LucideIcon> = {
  Flame, Rocket, RefreshCw, ShieldCheck, PhoneCall, EyeOff,
};

/** One documentary photograph per pillar, in the order the pillars are read. */
const PILLAR_PHOTOS = [PHOTOS.gymLift, PHOTOS.carTalk, PHOTOS.kitchenJournal];

/** The four hard facts about the program. Real values only. */
const SPECS = [
  { label: "Kickoff", value: RR_META.startLabel, note: "Exact date shared with your cohort" },
  { label: "Format", value: RR_META.durationLabel, note: null },
  { label: "Seats", value: `${RESERVATION.seatsTotal} only`, note: "Small, closed cohort" },
  {
    label: "Deposit",
    value: `$${RESERVATION.suggestedDeposit} or pay what you can`,
    note: "Tradition 7",
  },
];

export default function RRFellowshipPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <SiteHeader />

      <PageHero
        photo={PHOTOS.trailGroup}
        title={
          <>
            90 days to <em>rebuild.</em>
          </>
        }
        lede="The Recovery & Restructure Fellowship — a biology-first cohort for the first, hardest 90 days. One 1-day intensive bootcamp to launch, then daily telemetry that proves your baseline is healing."
        meta={`${RESERVATION.seatsTotal} seats · ${RR_META.startLabel} · $${RESERVATION.suggestedDeposit} deposit or pay what you can`}
      >
        <CtaRow>
          <ButtonPrimary href="#reserve">Reserve your seat</ButtonPrimary>
          <ButtonGhost href="#blueprint">See the 90 days</ButtonGhost>
        </CtaRow>
        <p className="mt-6 max-w-[48ch] text-[15px] text-[#f2efe6]/90">
          Not ready for the cohort?{" "}
          <Link
            href="/90rr"
            className="underline decoration-[#4cc07a]/50 underline-offset-4 transition-colors hover:decoration-[#4cc07a]"
          >
            The printable 90 R&amp;R journal is free
          </Link>{" "}
          — same system, self-paced.
        </p>
      </PageHero>

      {/* ── The two R's ──────────────────────────────────────── */}
      <Section tight>
        <Wrap>
          <SectionHead lede={<p>{RR_META.promise}</p>}>
            Recovery, <em>then restructure.</em>
          </SectionHead>

          <div className="mt-12 grid gap-10 border-t border-[#1d231d] pt-9 sm:mt-16 md:grid-cols-2 md:gap-16">
            {RR_META.missions.map((m) => (
              <div key={m.tag}>
                <p className="font-measure text-[13px]" style={{ color: m.color }}>
                  {m.tag}
                </p>
                <p className="mt-3 max-w-[52ch] text-[#b8b4a6]">{m.text}</p>
              </div>
            ))}
          </div>

          <p className="font-measure mt-10 text-[13px] text-[#7d7a70]">
            {RR_META.tagline} · {RESERVATION.seatsTotal} seats · Starts together, finishes together.
          </p>
        </Wrap>
      </Section>

      {/* ── Who it's for ─────────────────────────────────────── */}
      <Section band>
        <Wrap>
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <SectionHead lede={<p>Built for the trench — traditional or tactical.</p>}>
              Who it is <em>for.</em>
            </SectionHead>
            <Figure photo={PHOTOS.porchSteps} />
          </div>

          <div className="mt-12 border-t border-[#1d231d] sm:mt-16">
            {WHO_ITS_FOR.map((w) => {
              const Icon = ICONS[w.icon];
              return (
                <div
                  key={w.title}
                  className="grid gap-2 border-b border-[#1d231d] py-6 sm:grid-cols-[1fr_1.9fr] sm:gap-10"
                >
                  <div>
                    <h3 className="font-display flex items-center gap-2.5 text-[1.3rem] leading-tight text-[#f2efe6]">
                      {Icon ? <Icon size={17} className="text-[#4cc07a]" aria-hidden="true" /> : null}
                      {w.title}
                    </h3>
                    <p className="font-measure mt-1.5 text-[12.5px] text-[#7d7a70]">{w.sub}</p>
                  </div>
                  <p className="max-w-[58ch] text-[15.5px] text-[#b8b4a6]">{w.body}</p>
                </div>
              );
            })}
          </div>
        </Wrap>
      </Section>

      {/* ── The 1-day bootcamp ───────────────────────────────── */}
      <Section>
        <Wrap>
          <SectionHead lede={<p>{BOOTCAMP.intro}</p>}>
            The 1-day intensive <em>bootcamp.</em>
          </SectionHead>
          <p className="font-measure mt-5 text-[13px] text-[#e0a45c]">{BOOTCAMP.label}</p>

          <PhotoRow photo={PHOTOS.meetingCircle} flip>
            <StackList
              className="mt-0"
              items={BOOTCAMP.agenda.map((a, i) => ({
                n: String(i + 1).padStart(2, "0"),
                title: a.title,
                body: a.body,
              }))}
            />
          </PhotoRow>
        </Wrap>
      </Section>

      {/* ── The day, hour by hour ────────────────────────────── */}
      <Section band>
        <Wrap>
          <SectionHead lede={<p>{SCHEDULE_NOTE}</p>}>
            The day, <em>hour by hour.</em>
          </SectionHead>

          <div className="mt-10 border-t border-[#1d231d] sm:mt-14">
            {SCHEDULE.map((s) => (
              <div
                key={s.time}
                className="grid grid-cols-[5rem_1fr] items-baseline gap-x-5 border-b border-[#1d231d] py-6 sm:grid-cols-[7rem_1fr] sm:gap-x-8"
              >
                <span className="font-measure text-[13.5px] text-[#4cc07a]">{s.time}</span>
                <div>
                  <h3 className="font-display text-[1.25rem] leading-tight text-[#f2efe6]">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 max-w-[58ch] text-[15.5px] text-[#b8b4a6]">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ── The setting ──────────────────────────────────────── */}
      <Section>
        <Wrap>
          <SectionHead lede={<p>{VENUE.intro}</p>}>
            One day, outdoors, <em>in the park.</em>
          </SectionHead>
          <p className="font-measure mt-5 text-[13px] text-[#7d7a70]">
            {VENUE.amenities.join(" · ")}
          </p>

          <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-3">
            {VENUE.images.map((img) => (
              <div
                key={img.src}
                className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-[#141814]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ── The 90-day blueprint ─────────────────────────────── */}
      <Section id="blueprint" band className="scroll-mt-24">
        <Wrap>
          <SectionHead lede={<p>Three phases, mapped to your biochemistry.</p>}>
            The 90-day <em>blueprint.</em>
          </SectionHead>

          <figure className="relative mt-12 aspect-[16/8] overflow-hidden rounded-[14px] bg-[#0d0f0d] sm:mt-16">
            <Image
              src="/dopamine_receptors_infographic.png"
              alt="A chart of how the brain rebuilds its dopamine receptors across the 90 days, from the deficit of week one to a restored baseline"
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              className="object-cover"
            />
          </figure>

          {PHASES.map((phase) => (
            <div key={phase.title} className="mt-14 sm:mt-20">
              <p className="font-measure text-[13px] text-[#4cc07a]">{phase.window}</p>
              <SubHead className="mt-2">{phase.title}</SubHead>
              <p className="mt-4 max-w-[62ch] text-[#b8b4a6]">{phase.goal}</p>

              <div className="mt-8 border-t border-[#1d231d]">
                {phase.items.map((item) => (
                  <div
                    key={item.title}
                    className="grid gap-1.5 border-b border-[#1d231d] py-5 sm:grid-cols-[16rem_1fr] sm:gap-8"
                  >
                    <h4 className="font-display text-[1.1rem] leading-tight text-[#f2efe6]">
                      {item.title}
                    </h4>
                    <p className="max-w-[58ch] text-[15.5px] text-[#b8b4a6]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Wrap>
      </Section>

      {/* ── The three pillars ────────────────────────────────── */}
      <Section>
        <Wrap>
          <SectionHead lede={<p>The Engine. The Network. The Mirror.</p>}>
            Three pillars, <em>run every day.</em>
          </SectionHead>

          {PILLARS.map((p, i) => (
            <PhotoRow key={p.name} photo={PILLAR_PHOTOS[i]} flip={i % 2 === 1}>
              <SubHead>{p.name}</SubHead>
              <p className="font-measure mt-1.5 text-[13px] text-[#7d7a70]">{p.sub}</p>
              <p className="mt-4 max-w-[52ch] text-[#b8b4a6]">{p.body}</p>
            </PhotoRow>
          ))}
        </Wrap>
      </Section>

      {/* ── What you get ─────────────────────────────────────── */}
      <Section band>
        <Wrap>
          <SectionHead lede={<p>The full kit — the day you sit down.</p>}>
            What you get, <em>across 90 days.</em>
          </SectionHead>

          <figure className="relative mt-12 aspect-[16/10] overflow-hidden rounded-[14px] bg-white sm:mt-16">
            <Image
              src="/90rr/preview-daily.png"
              alt="The printable 90 R&R journal page a member fills in each day — sleep, movement, meeting and score"
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover object-top"
            />
          </figure>

          <div className="mt-12 border-t border-[#1d231d] sm:mt-16 md:grid md:grid-cols-2 md:gap-x-14">
            {DELIVERABLES.map((d) => (
              <div key={d.title} className="border-b border-[#1d231d] py-5">
                <h3 className="font-display text-[1.2rem] leading-tight text-[#f2efe6]">
                  {d.title}
                </h3>
                <p className="mt-1.5 max-w-[54ch] text-[15.5px] text-[#b8b4a6]">{d.body}</p>
              </div>
            ))}
          </div>

          {/* Alpha 1 — the printable journal is the paper beta of this cohort. */}
          <div className="mt-14 max-w-[62ch] sm:mt-20">
            <SubHead>{ALPHA.title}</SubHead>
            <p className="font-measure mt-2 text-[13px] text-[#4cc07a]">{ALPHA.label}</p>
            <p className="mt-4 text-[#b8b4a6]">{ALPHA.body}</p>
            <CtaRow>
              <ButtonGhost href={ALPHA.href}>See the journal</ButtonGhost>
            </CtaRow>
          </div>
        </Wrap>
      </Section>

      {/* ── Program specs ────────────────────────────────────── */}
      <Section tight>
        <Wrap>
          <div className="grid gap-x-10 gap-y-9 border-t border-[#1d231d] pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {SPECS.map((s) => (
              <div key={s.label}>
                <p className="font-measure text-[13px] text-[#7d7a70]">{s.label}</p>
                <p className="font-display mt-2 text-[1.45rem] leading-tight text-[#f2efe6]">
                  {s.value}
                </p>
                {s.note ? (
                  <p className="font-measure mt-2 text-[12.5px] text-[#7d7a70]">{s.note}</p>
                ) : null}
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ── The safety promise ───────────────────────────────── */}
      <Section band>
        <Wrap>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <SectionHead lede={<p>Recovery first. Always.</p>}>
              The Vanguard <em>safety promise.</em>
            </SectionHead>
            <Figure photo={PHOTOS.nightCall} />
          </div>

          <div className="mt-12 border-t border-[#1d231d] sm:mt-16">
            {SAFETY.map((s) => {
              const Icon = ICONS[s.icon];
              return (
                <div
                  key={s.title}
                  className="grid gap-2 border-b border-[#1d231d] py-6 sm:grid-cols-[1fr_1.9fr] sm:gap-10"
                >
                  <h3 className="font-display flex items-center gap-2.5 text-[1.3rem] leading-tight text-[#f2efe6]">
                    {Icon ? <Icon size={17} className="text-[#4cc07a]" aria-hidden="true" /> : null}
                    {s.title}
                  </h3>
                  <p className="max-w-[58ch] text-[15.5px] text-[#b8b4a6]">{s.body}</p>
                </div>
              );
            })}
          </div>
        </Wrap>
      </Section>

      {/* The Alpha Class day: schedule, park, see-the-journal */}
      <Section>
        <Wrap>
          <AlphaClassDay />
        </Wrap>
      </Section>

      {/* Reservation — Google sign-in + quick intake + deposit */}
      <Section tight>
        <Wrap>
          <ReserveFlow />
          <CalloutBand className="mx-auto mt-10 max-w-3xl">
            <p className="text-[15px] leading-relaxed text-[#b8b4a6]">
              <span className="font-semibold text-[#e0a45c]">Note:</span> We honor Traditions 7, 11
              &amp; 12. The Fellowship is self-supporting through our own contributions — use a
              pseudonym if you prefer. Your deposit reserves a seat and is applied to your cohort; it
              is not professional treatment.
            </p>
          </CalloutBand>
        </Wrap>
      </Section>

      <SiteFooter />
    </div>
  );
}
