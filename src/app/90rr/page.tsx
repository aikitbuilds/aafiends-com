import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "90 R&R Journal — Detailed Guide (Alpha 1) | AAfiends",
  description:
    "The detailed online companion to the 90 Days R&R (Recovery & Restructure) journal — the three pillars, the 12 Steps, the science, and the ecosystem. Download the latest printable workbook.",
  alternates: { canonical: "https://aafiends.com/90rr" },
};

const VERSION = "Alpha 1";
const MONTHLY_PDF = "/90rr/90rr-month1-reset-journal-v3.pdf";
const STARTER_PDF = "/90rr/90rr-7day-starter-v3.pdf";
const MONTHLY_BOOKLET = "/90rr/90rr-month1-reset-journal-booklet-v3.pdf";
const STARTER_BOOKLET = "/90rr/90rr-7day-starter-booklet-v3.pdf";

// ---- content ----
const PILLARS = [
  {
    n: "1",
    name: "The Engine",
    sub: "Body · Hardware",
    color: "#10b981",
    qr: "engine",
    img: "/pillar_physical_real.png",
    qrLabel: "The BIO 12 protocol",
    qrUrl: "https://aivirus.org/bio12",
    body:
      "Your body is the hardware the addiction ran down. Before the mind can hold a spiritual idea, the nervous system has to stop screaming. We stabilize it with the basics, measured daily: sleep (where the brain clears waste and rebuilds GABA, your natural brake), morning light (which sets the body clock), movement, real food and hydration, and an honest read on pain. This is the leg most programs ignore — and the reason so many relapse while 'doing everything right' spiritually on four hours of sleep.",
    tracks: ["Sleep: bedtime, hours, wake-ups, quality", "Morning ignition: water, light, movement, stillness", "Fuel & hydration", "Physical pain / body signals"],
  },
  {
    n: "2",
    name: "The Network",
    sub: "Community · Social",
    color: "#a855f7",
    qr: "network",
    img: "/pillar_network_real.png",
    qrLabel: "The 12 & 12",
    qrUrl: "https://aafiends.com/12-and-12",
    body:
      "Addiction is a disease of isolation. Left alone, the mind uses your own voice to talk you back out — and you will believe it. The Network is the antidote and it is biological: sitting in a room, calling a sponsor, and helping another person releases oxytocin, a direct buffer against the next craving. It is also accountability you can feel — someone is expecting you. You cannot lie to a room the way you lie to yourself.",
    tracks: ["Meetings & the rooms", "Sponsor / Vanguard check-ins", "Peer outreach — calling another alcoholic", "Service"],
  },
  {
    n: "3",
    name: "The Mirror",
    sub: "Spirit · Mind",
    color: "#00f0ff",
    qr: "mirror",
    img: "/pillar_mental_real.png",
    qrLabel: "G.A.D. — the spiritual framing",
    qrUrl: "https://aafiends.com/gad",
    body:
      "An honest daily read that strips the ego out of self-evaluation. Self-will — running the show on willpower and ego — is exactly what got us here. The Mirror is where you set that down: a moment of stillness, an honest look at where you tried to force outcomes, gratitude, and a rating of your own clarity. It rests on one idea only: you are not the highest power in your life. What that power is, is entirely up to you.",
    tracks: ["Stillness / prayer / meditation", "Surrendering what you cannot control", "Ego & resentment check", "Gratitude & clarity"],
  },
];

const STEPS = [
  { n: 1, phase: "Reset", full: "We admitted we were powerless over our addiction — that our lives had become unmanageable.", why: "Stop fighting reality. Naming that willpower alone has failed is not defeat — it is the first honest data point." },
  { n: 2, phase: "Reset", full: "Came to believe that a Power greater than ourselves could restore us to sanity.", why: "You do not have to define it. You only have to accept you are not the highest power — and that help exists." },
  { n: 3, phase: "Reset", full: "Made a decision to turn our will and our lives over to the care of God as we understood Him.", why: "Hand over the wheel. This lowers the cortisol that feeds the craving loop and lets you stop white-knuckling." },
  { n: 4, phase: "Restructure", full: "Made a searching and fearless moral inventory of ourselves.", why: "A code-audit of the behavioral loops — resentments, fears, patterns — that keep relapsing you." },
  { n: 5, phase: "Restructure", full: "Admitted to God, to ourselves, and to another human being the exact nature of our wrongs.", why: "Secrets keep you sick. Said out loud to one trusted person, they lose their grip." },
  { n: 6, phase: "Restructure", full: "Were entirely ready to have these defects of character removed.", why: "Willingness, not perfection. You just have to stop defending the old patterns." },
  { n: 7, phase: "Restructure", full: "Humbly asked to have our shortcomings removed.", why: "You cannot think your way out of character; you ask, and then you act differently." },
  { n: 8, phase: "Recalibrate", full: "Made a list of all persons we had harmed, and became willing to make amends to them all.", why: "Name the wreckage. Willingness first — the action comes next." },
  { n: 9, phase: "Recalibrate", full: "Made direct amends to such people wherever possible, except when to do so would injure them or others.", why: "Clear the emotional debt. This is where the shame that fuels using finally drains out." },
  { n: 10, phase: "Every day", full: "Continued to take personal inventory and when we were wrong promptly admitted it.", why: "This journal is your Step 10 — a daily check so small resentments never compound." },
  { n: 11, phase: "Every day", full: "Sought through prayer and meditation to improve our conscious contact with a Higher Power, praying only for knowledge of its will for us and the power to carry that out.", why: "The Mirror pillar in practice — stillness that keeps you connected instead of self-driven." },
  { n: 12, phase: "Every day", full: "Having had a spiritual awakening as the result of these steps, we tried to carry this message to others, and to practice these principles in all our affairs.", why: "Service protects the giver. Carrying it to the next person is how the streak becomes a life." },
];

const SCIENCE = [
  ["Sleep", "Deep sleep clears metabolic waste and rebuilds GABA — less craving, less anxiety, less fog."],
  ["Morning light", "10–15 minutes of outdoor light sets the body clock: a clean dopamine bump now, melatonin on time tonight."],
  ["Fermented / gut food", "Up to ~90% of serotonin is made in the gut. Rebuilding the microbiome restores calm, steady mood."],
  ["Cold or a brisk walk", "A clean dopamine and adrenaline lift you earned — teaching the brain to feel good without a substance."],
  ["Meetings & service", "Connection releases oxytocin, the biological opposite of isolation and its cravings."],
  ["Surrender / stillness", "Handing over what you cannot control shifts you out of fight-or-flight, lowering the cortisol that drives the loop."],
];

const ECOSYSTEM = [
  { name: "AAfiends", tag: "The Dashboard", url: "https://aafiends.com", qr: "how", color: "#10b981", desc: "Daily telemetry, the AI Mirror, the BIO 12 protocol, and the AI4AA course. Your recovery command center." },
  { name: "RaceFiends", tag: "The Pavement", url: "https://racefiends.com", qr: "race", color: "#ef4444", desc: "Running accountability with honest stakes. Movement is Pillar 1 — rebuild the baseline on the trail." },
  { name: "AIVirus", tag: "The Diagnosis", url: "https://aivirus.org", qr: "aiv", color: "#ef4444", desc: "Meet the Addiction Intelligence Virus across its vectors — and the BIO 12 firewall that starves it." },
];

function QR({ img, label, url }: { img: string; label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-[#0a0a0a] border border-white/10 rounded-2xl p-3 pr-5 hover:border-[#10b981]/50 transition-colors"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Image src={`/90rr/qr_${img}.png`} alt={` width={64} height={64} QR to ${label}`} className="w-16 h-16 rounded-lg bg-white p-1" />
      <div className="flex flex-col">
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Scan or tap · learn more</span>
        <span className="text-sm font-bold text-white leading-tight">{label}</span>
        <span className="text-xs text-[#10b981] font-mono">{url.replace("https://", "")}</span>
      </div>
    </a>
  );
}

const phaseColor: Record<string, string> = { Reset: "#10b981", Restructure: "#f59e0b", Recalibrate: "#00f0ff", "Every day": "#a855f7" };

export default function NinetyRRPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_60%)] pointer-events-none z-0" />

      <SiteHeader />

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-14 md:py-20 flex flex-col gap-24 relative z-20">
        {/* Hero */}
        <section className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-xs text-[#f59e0b] font-mono uppercase tracking-widest font-bold">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" /> Version {VERSION}
          </span>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-white">
            The 90 R&amp;R <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#f59e0b]">Journal</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl leading-relaxed font-medium">
            The detailed online companion to the printable <span className="text-[#10b981] font-bold">Recovery &amp; Restructure</span> workbook.
            Every pillar, every step, and the science behind them — with links deeper into the ecosystem whenever you want more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a href={MONTHLY_PDF} download className="py-4 px-8 rounded-2xl bg-[#10b981] hover:bg-[#059669] text-black text-sm font-black tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center gap-3">
              ↓ Download Month 1 (30 days)
            </a>
            <a href={STARTER_PDF} download className="py-4 px-8 rounded-2xl border border-white/15 text-white text-sm font-bold tracking-widest uppercase hover:border-[#10b981]/50 hover:text-[#10b981] transition-all flex items-center gap-3">
              ↓ 7-Day Starter
            </a>
          </div>
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
            PDF · US Letter · print double-sided · {VERSION} — always the latest version on this page.
          </p>
        </section>

        {/* FEATURED — Build your own journal */}
        <section className="relative overflow-hidden rounded-3xl border border-[#10b981]/30 bg-gradient-to-br from-[#10b981]/15 via-[#0a1428] to-[#0a0a0a] p-8 md:p-10">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#10b981]/10 blur-3xl rounded-full pointer-events-none" />
          <div className="relative grid md:grid-cols-[1.1fr_1fr] gap-8 items-center">
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full bg-[#10b981] text-black text-xs font-black uppercase tracking-widest">\u2605 Featured</span>
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">Make it yours in 2 minutes</h2>
              <p className="text-neutral-300 leading-relaxed">
                No two days in recovery look the same. Keep the check-ins that help, drop the ones that don&apos;t, and add your own.
                Then print it full-page or as a fold-and-staple mini-book. Free, no sign-up.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Pick your fields", "Full or half-page", "Print or save as PDF", "Free \u00b7 no signup"].map((t) => (
                  <span key={t} className="text-xs font-medium text-neutral-200 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">{t}</span>
                ))}
              </div>
              <Link href="/90rr/builder" className="mt-2 w-fit py-4 px-8 rounded-2xl bg-[#10b981] hover:bg-[#059669] text-black text-sm font-black tracking-widest uppercase shadow-[0_0_25px_rgba(16,185,129,0.45)] transition-all">
                \u270e Open the Journal Builder \u2192
              </Link>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-white">
              <Image src="/90rr/preview-daily.png" alt="Customize your own daily page in the journal builder" fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 480px" />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">How it works</span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">The 3-Pillar System</h2>
          </div>
          <p className="text-neutral-300 leading-relaxed max-w-3xl">
            We do not treat the obsession of the mind alone — we rebuild the biological vessel underneath it. Three systems,
            worked together every day, hold a single day of sobriety: <span className="text-[#10b981] font-bold">Surrender</span> +{" "}
            <span className="text-[#f59e0b] font-bold">D.O.S.E.</span> + <span className="text-[#a855f7] font-bold">Community</span> = 1 day sober.
            Each day you score all three as your VSE (Vanguard Score) out of 10 — the number, not your mood, tells you where you stand.
          </p>
          <div className="w-fit"><QR img="how" label="The AAfiends dashboard" url="https://aafiends.com" /></div>
        </section>

        {/* Pillars detailed */}
        <section className="flex flex-col gap-6">
          {PILLARS.map((p) => (
            <div key={p.name} className="bg-[#09090b] border border-white/10 rounded-3xl p-8 flex flex-col gap-5">
              <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden border border-white/10">
                <Image src={p.img} alt={p.name + " \u2014 " + p.sub} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent" />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-black font-black text-lg" style={{ background: p.color }}>{p.n}</div>
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">{p.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: p.color }}>{p.sub}</p>
                </div>
              </div>
              <p className="text-neutral-300 leading-relaxed">{p.body}</p>
              <div className="flex flex-wrap gap-2">
                {p.tracks.map((t) => (
                  <span key={t} className="text-xs font-medium text-neutral-300 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">{t}</span>
                ))}
              </div>
              <div className="w-fit"><QR img={p.qr} label={p.qrLabel} url={p.qrUrl} /></div>
            </div>
          ))}
        </section>

        {/* 12 Steps */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">The framework</span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">The 12 Steps, In Plain Language</h2>
            <p className="text-neutral-400 max-w-3xl leading-relaxed">
              The Steps are the spine of the program. Below is each one in its traditional wording, with a plain-language note on what
              it actually asks of you — and where it tends to land across the 90 days. Take &ldquo;God as we understood Him&rdquo; to mean a
              Higher Power <span className="text-[#00f0ff] font-bold">as you understand it</span>; no belief is required to begin.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {STEPS.map((s) => (
              <div key={s.n} className="bg-[#09090b] border border-white/10 rounded-2xl p-5 flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-lg text-white">{s.n}</div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ color: phaseColor[s.phase], border: `1px solid ${phaseColor[s.phase]}55` }}>{s.phase}</span>
                  </div>
                  <p className="text-neutral-100 font-medium leading-relaxed">{s.full}</p>
                  <p className="text-sm text-neutral-400 leading-relaxed"><span className="text-[#f59e0b] font-bold">What it asks:</span> {s.why}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-fit"><QR img="steps" label="The 12 Steps & 12 Traditions" url="https://aafiends.com/12-and-12" /></div>
          <p className="text-[11px] text-neutral-600 font-mono leading-relaxed">
            The Twelve Steps are adapted from Alcoholics Anonymous. AAfiends is not affiliated with or endorsed by A.A. World Services, Inc.
          </p>
        </section>

        {/* Science */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">Why it works</span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">The Science, Briefly</h2>
            <p className="text-neutral-400 max-w-3xl leading-relaxed">Nothing in the journal is a chore for its own sake. Each daily move repairs a specific part of the system the substance broke down.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {SCIENCE.map(([t, d]) => (
              <div key={t} className="bg-[#09090b] border border-white/10 rounded-2xl p-5">
                <h4 className="text-[#10b981] font-black uppercase tracking-wide text-sm mb-1">{t}</h4>
                <p className="text-sm text-neutral-300 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <QR img="science" label="The research, in plain English" url="https://aafiends.com/blog" />
            <QR img="engine" label="The BIO 12 protocol" url="https://aivirus.org/bio12" />
          </div>
        </section>

        {/* AIV */}
        <section className="bg-[#0a0a0a] border border-red-500/20 rounded-[2rem] p-8 md:p-10 flex flex-col gap-5">
          <span className="inline-flex w-fit items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full border border-red-500/30">Know the enemy</span>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none">The A.I.V. — one virus, many faces</h2>
          <p className="text-neutral-300 leading-relaxed max-w-3xl">
            We do not treat addiction as a moral failing. It behaves like a virus — the <span className="text-red-400 font-bold">Addiction Intelligence Virus</span> —
            an adaptive infection of the brain&apos;s reward system. Alcohol, opioids, nicotine, gambling, porn, sugar, endless scrolling:
            the surface differs, the mechanism is identical. It floods dopamine, forces the brain to down-regulate its own receptors, and
            soon you need it just to feel normal. It feeds on stress, resentment, ego, and isolation. The three pillars are the firewall
            that starves it. You are not weak — you are up against something that behaves intelligently, so you beat it with a system, not shame.
          </p>
          <div className="w-fit"><QR img="aiv" label="Meet the virus — the vectors" url="https://aivirus.org/the-virus" /></div>
        </section>

        {/* Ecosystem */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">One ecosystem</span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">The Whole Grid</h2>
            <p className="text-neutral-400 max-w-3xl leading-relaxed">R&amp;R is one front in a larger fight. Same disease, attacked from three angles.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {ECOSYSTEM.map((e) => (
              <div key={e.name} className="bg-[#09090b] border border-white/10 rounded-3xl p-6 flex flex-col gap-4">
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">{e.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: e.color }}>{e.tag}</p>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed flex-1">{e.desc}</p>
                <QR img={e.qr} label={`Visit ${e.name}`} url={e.url} />
              </div>
            ))}
          </div>
        </section>

        {/* Download */}
        <section className="bg-[#09090b] border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#10b981] via-[#f59e0b] to-[#10b981]" />
          <div className="flex flex-col gap-4 text-center items-center">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">Download the Journal</h2>
            <p className="text-neutral-400 max-w-xl leading-relaxed">
              Print it double-sided — Side A is your daily data, Side B is your reflection. Start with the 7-day test print, then run
              the full month. This is version <span className="text-[#f59e0b] font-bold">{VERSION}</span>; this page always links the latest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href={MONTHLY_PDF} download className="py-4 px-10 rounded-2xl bg-white hover:bg-neutral-200 text-black text-sm font-black tracking-widest uppercase transition-all flex items-center gap-3">
                ↓ Month 1 · 30 Days
              </a>
              <a href={STARTER_PDF} download className="py-4 px-10 rounded-2xl bg-[#10b981]/10 border border-[#10b981]/40 text-[#10b981] hover:bg-[#10b981]/20 text-sm font-black tracking-widest uppercase transition-all flex items-center gap-3">
                ↓ 7-Day Starter
              </a>
            </div>
            <div className="w-full pt-5 mt-1 border-t border-white/10 flex flex-col gap-3">
              <p className="text-xs font-mono uppercase tracking-widest text-[#f59e0b]">Or print a fold-&amp;-staple mini-book · half size (5.5×8.5&quot;)</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={MONTHLY_BOOKLET} download className="py-3.5 px-8 rounded-2xl border border-[#f59e0b]/40 text-[#f59e0b] hover:bg-[#f59e0b]/10 text-sm font-black tracking-widest uppercase transition-all flex items-center gap-3">
                  ↓ Month 1 · Booklet
                </a>
                <a href={STARTER_BOOKLET} download className="py-3.5 px-8 rounded-2xl border border-[#f59e0b]/40 text-[#f59e0b] hover:bg-[#f59e0b]/10 text-sm font-black tracking-widest uppercase transition-all flex items-center gap-3">
                  ↓ 7-Day · Booklet
                </a>
              </div>
              <p className="text-[11px] text-neutral-500 leading-relaxed font-mono">
                Print double-sided (flip on the SHORT edge), fold the whole stack in half, staple twice on the spine. Prints 2-up on letter paper — each finished page is 5.5×8.5&quot;. Printed in light ink to save toner; <strong className="text-neutral-400">32&nbsp;lb white paper recommended</strong> (20&nbsp;lb works too).
              </p>
            </div>
            <Link href="/90rr/builder" className="text-sm font-bold text-[#10b981] hover:text-white transition-colors uppercase tracking-widest mt-2">
              ✎ Build your own custom journal →
            </Link>
            <Link href="/90-r-and-r#reserve" className="text-sm font-bold text-[#f59e0b] hover:text-white transition-colors uppercase tracking-widest">
              Reserve a seat in the Fellowship →
            </Link>
          </div>
        </section>
              {/* Peek inside — sample pages */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#10b981] uppercase">Peek Inside</span>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">What a day looks like</h2>
            <p className="text-sm text-neutral-400 max-w-2xl">Every day is two facing pages: a morning <strong className="text-white">daily tracker</strong> across the three pillars, and an evening <strong className="text-white">reflection &amp; score</strong>. Ten seconds in the morning, two minutes at night.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <figure className="flex flex-col gap-3">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Image src="/90rr/preview-daily.png" alt="Sample daily tracking page from the 90 R&R journal — sleep, morning ignition, fuel, movement, meetings and the three pillars" width={1275} height={1651} className="w-full h-auto" />
              </div>
              <figcaption className="text-xs font-mono text-neutral-500 uppercase tracking-widest text-center">Daily page &middot; track as you go</figcaption>
            </figure>
            <figure className="flex flex-col gap-3">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Image src="/90rr/preview-reflection.png" alt="Sample evening reflection page from the 90 R&R journal — meeting, feelings, gratitude and the daily score" width={1275} height={1651} className="w-full h-auto" />
              </div>
              <figcaption className="text-xs font-mono text-neutral-500 uppercase tracking-widest text-center">Reflection page &middot; night check-in</figcaption>
            </figure>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
