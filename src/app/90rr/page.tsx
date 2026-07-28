import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CrashCourseSection from "@/components/CrashCourseSection";
import CrisisSupport from "@/components/CrisisSupport";
import { DoseStack, DoseMap, CravingWaveAndSpike, SmartImage } from "@/components/DoseFigures";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The 90 R&R Crash Course — Seven Days, One Sitting | AAfiends",
  description:
    "Eighty minutes, seven days, one printed journal. It covers what the disease actually is, the four chemicals you rebuild, and then walks day by day from Day Zero to Day Seven. Watch it once with the booklet in front of you and you can start the same day.",
  alternates: { canonical: "https://aafiends.com/90rr" },
};

const VERSION = "Beta 1";
// Beta 1 — featured downloads
const MONTHLY_PDF = "/90rr/90rr-month1-reset-journal-beta1.pdf";
const STARTER_PDF = "/90rr/90rr-7day-starter-beta1.pdf";
const REFILL_PDF = "/90rr/90rr-refill-pages-beta1.pdf";
const MONTHLY_BOOKLET = "/90rr/90rr-month1-reset-journal-beta1-booklet.pdf";
const STARTER_BOOKLET = "/90rr/90rr-7day-starter-beta1-booklet.pdf";
const REFILL_BOOKLET = "/90rr/90rr-refill-pages-beta1-booklet.pdf";

// Alpha 1 — archived downloads
const ALPHA_MONTHLY = "/90rr/90rr-month1-reset-journal-v5.pdf";
const ALPHA_STARTER = "/90rr/90rr-7day-starter-v5.pdf";
const ALPHA_REFILL = "/90rr/90rr-refill-pages-v5.pdf";
const ALPHA_MONTHLY_BOOKLET = "/90rr/90rr-month1-reset-journal-booklet-v5.pdf";
const ALPHA_STARTER_BOOKLET = "/90rr/90rr-7day-starter-booklet-v5.pdf";
const ALPHA_REFILL_BOOKLET = "/90rr/90rr-refill-pages-booklet-v5.pdf";

const PILLARS = [
  {
    n: "1",
    name: "The Engine",
    sub: "Body · Hardware",
    color: "#10b981",
    doseTag: "Directly rebuilds Dopamine & Endorphins through sleep, morning light, movement, and physical recovery.",
    qr: "engine",
    img: "/pillar_physical_real.png",
    qrLabel: "The BIO 12 protocol",
    qrUrl: "https://aivirus.org/bio12",
    body:
      "Your body is the hardware the addiction ran down. Before the mind can hold a spiritual idea, the nervous system has to stop screaming. We stabilize it with the basics, measured daily: sleep, morning light, movement, real fuel, and hydration.",
    tracks: ["Sleep: bedtime, hours, quality", "Morning ignition: water, light, movement", "Fuel & hydration", "Physical pain / body signals"],
  },
  {
    n: "2",
    name: "The Network",
    sub: "Community · Social",
    color: "#a855f7",
    doseTag: "Triggers Oxytocin release — your biological buffer against isolation and craving loops.",
    qr: "network",
    img: "/pillar_network_real.png",
    qrLabel: "The 12 & 12",
    qrUrl: "https://aafiends.com/framework#traditions",
    body:
      "Addiction is a disease of isolation. The Network is the antidote and it is biological: sitting in a room, calling a sponsor, and helping another person releases oxytocin, a direct buffer against the next craving.",
    tracks: ["Meetings & the rooms", "Sponsor / Vanguard check-ins", "Peer outreach", "Service"],
  },
  {
    n: "3",
    name: "The Mirror",
    sub: "Spirit · Mind",
    color: "#00f0ff",
    doseTag: "Restores Serotonin and calms the nervous system through daily stillness and surrender.",
    qr: "mirror",
    img: "/pillar_mental_real.png",
    qrLabel: "G.A.D. — spiritual framing",
    qrUrl: "https://aafiends.com/framework#gad",
    body:
      "An honest daily read that strips the ego out of self-evaluation. The Mirror is where you set down self-will: a moment of stillness, an honest look at where you tried to force outcomes, gratitude, and a rating of your own clarity.",
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
      <Image src={`/90rr/qr_${img}.png`} alt={`QR to ${label}`} width={64} height={64} className="w-16 h-16 rounded-lg bg-white p-1" />
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
        {/* 1. HERO */}
        <section className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-xs text-[#f59e0b] font-mono uppercase tracking-widest font-bold">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" /> Version {VERSION}
          </span>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-white">
            The 90 R&amp;R <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-[#00f0ff] to-[#f59e0b]">Journal</span>
          </h1>
          <p className="text-lg md:text-xl text-[#10b981] max-w-3xl font-mono uppercase tracking-wide font-bold">
            &ldquo;Stabilize the hardware, then run the software. Biology first, framework second — one structured, inclusive system.&rdquo;
          </p>
          <p className="text-base md:text-lg text-neutral-300 max-w-3xl leading-relaxed font-normal">
            The detailed online companion to the printable <strong className="text-white">Recovery &amp; Restructure</strong> workbook. Every chemical, every pillar, every step, and the science behind them.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a href={MONTHLY_PDF} download className="py-4 px-8 rounded-2xl bg-[#10b981] hover:bg-[#059669] text-black text-sm font-black tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center gap-3">
              ↓ Download Month 1 (Beta 1)
            </a>
            <a href={STARTER_PDF} download className="py-4 px-8 rounded-2xl border border-white/15 text-white text-sm font-bold tracking-widest uppercase hover:border-[#10b981]/50 hover:text-[#10b981] transition-all flex items-center gap-3">
              ↓ 7-Day Starter
            </a>
          </div>
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
            PDF · US Letter · print double-sided · {VERSION} — always the latest version on this page.
          </p>
          <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
            Want structure and accountability with it?{" "}
            <Link href="/90-r-and-r" className="text-[#f59e0b] font-bold hover:text-amber-300 underline underline-offset-4 transition-colors">
              The 12-seat R&amp;R Fellowship cohort
            </Link>{" "}
            works this same journal together — starts mid-August.
          </p>
        </section>

        {/* 2. THE APPROACH — "Biology first, then the framework" */}
        <section className="flex flex-col gap-6 scroll-mt-28">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-[#10b981] uppercase tracking-[0.3em]">The Manifesto</span>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
              Biology First, Then the Framework
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#09090b] border border-white/10 rounded-3xl p-6 flex flex-col gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#10b981]/20 text-[#10b981] font-mono font-bold flex items-center justify-center">1</div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">1. Body is Hardware</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Addiction ran the nervous system down. Before any spiritual idea can hold, biology has to stabilize: sleep, daylight, and D.O.S.E. chemistry restored in small, clean doses.
              </p>
            </div>
            <div className="bg-[#09090b] border border-white/10 rounded-3xl p-6 flex flex-col gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#a855f7]/20 text-[#a855f7] font-mono font-bold flex items-center justify-center">2</div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">2. Layer Framework</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                On top of a stabilizing body, the AA 12-Step framework and the Network (rooms, sponsor, service) do the deeper structural work to clear wreckage and ego.
              </p>
            </div>
            <div className="bg-[#09090b] border border-white/10 rounded-3xl p-6 flex flex-col gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#00f0ff]/20 text-[#00f0ff] font-mono font-bold flex items-center justify-center">3</div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">3. Inclusive System</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                A measured daily system (VSE score out of 10) with Higher Power &ldquo;as you understand it.&rdquo; Zero belief required to begin — structure anyone can lean on.
              </p>
            </div>
          </div>

          {/* Infographic A: The Stack */}
          <DoseStack />

          <SmartImage
            src="/90rr/img/approach-hero.jpg"
            alt="Biology first — a steady body at the base of recovery"
            caption="The vessel comes first · Stabilize the hardware before running the software"
            accent="#10b981"
          />
        </section>

        {/* 3. THE BIOLOGY — D.O.S.E. */}
        <section className="flex flex-col gap-8 scroll-mt-28">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-[#f59e0b] uppercase tracking-[0.3em]">The Biological Core</span>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
              D.O.S.E. — Your Four Chemicals
            </h2>
            <p className="text-neutral-300 max-w-3xl leading-relaxed">
              Almost everything that feels good runs on four brain chemicals. The substance faked all four at once through one door — so your brain turned the volume down to compensate. Recovery is teaching the body to make its own again in small, clean doses you <strong className="text-white">earn</strong>.
            </p>
          </div>

          {/* Infographic B: D.O.S.E. Map */}
          <DoseMap />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { l: "D", name: "Dopamine", tag: "Reward · Drive", color: "#10b981", body: "Motivation and focus. Earned back with cold, daylight, movement, and finishing hard things.", earn: "Cold plunge · walk · sunlight" },
              { l: "O", name: "Oxytocin", tag: "Bonding · Safety", color: "#a855f7", body: "The bonding chemical — your biological buffer against the next craving. Isolation starves it.", earn: "Meetings · sponsor call · service" },
              { l: "S", name: "Serotonin", tag: "Mood · Calm", color: "#00f0ff", body: "Your steady baseline mood — about 90% of it is made in the gut, not the head.", earn: "Gut-friendly food · sun · sleep" },
              { l: "E", name: "Endorphins", tag: "Pain Relief", color: "#f59e0b", body: "Your built-in painkiller and natural high — paid for with physical effort, not a bottle.", earn: "Hard workout · heat · laughter" },
            ].map((ch) => (
              <div key={ch.l} className="bg-[#09090b] border border-white/10 rounded-3xl p-5 flex flex-col gap-3 justify-between">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-black font-black text-lg" style={{ background: ch.color }}>{ch.l}</div>
                    <div>
                      <h3 className="text-base font-black text-white uppercase tracking-tight leading-none">{ch.name}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: ch.color }}>{ch.tag}</p>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">{ch.body}</p>
                </div>
                <p className="text-[11px] text-neutral-300 pt-2 border-t border-white/10"><span className="font-black uppercase tracking-widest" style={{ color: ch.color }}>Earn it:</span> {ch.earn}</p>
              </div>
            ))}
          </div>

          {/* Visual strip — the earned dose in pictures */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { src: "/90rr/img/dose-fuel-food.png", title: "Feed the factory", desc: "Protein, fermented food and fiber hand the body raw materials for Serotonin.", href: "/90rr/fuel", accent: "#10b981" },
              { src: "/90rr/img/dose-reset-cold.png", title: "Anchor the dopamine", desc: "Cold immersion raises baseline dopamine up to +250% — held for hours, no crash.", href: "/90rr/reset", accent: "#00f0ff" },
              { src: "/90rr/img/dose-reset-walk.png", title: "Move it back online", desc: "A daily walk reinstalls the D2/D3 reward receptors burned out by the substance.", href: "/90rr/reset", accent: "#f59e0b" },
            ].map((im) => (
              <Link key={im.src} href={im.href} className="group relative rounded-3xl overflow-hidden border border-white/10 aspect-[4/3]">
                <Image src={im.src} alt={im.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1">
                  <h4 className="text-sm font-black text-white uppercase tracking-tight" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>{im.title}</h4>
                  <p className="text-[12px] text-neutral-300 leading-snug">{im.desc}</p>
                  <span className="text-[11px] font-bold uppercase tracking-widest mt-1" style={{ color: im.accent }}>Read the field guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. THE 3-PILLAR SYSTEM */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">Execution System</span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">The 3-Pillar System</h2>
            <p className="text-neutral-300 leading-relaxed max-w-3xl">
              Three daily systems hold a single day of sobriety: <span className="text-[#10b981] font-bold">Surrender</span> +{" "}
              <span className="text-[#f59e0b] font-bold">D.O.S.E.</span> + <span className="text-[#a855f7] font-bold">Community</span> = 1 day sober. Score all three as your daily VSE out of 10.
            </p>
          </div>
          <div className="w-fit"><QR img="how" label="The AAfiends dashboard" url="https://aafiends.com" /></div>

          <div className="flex flex-col gap-6">
            {PILLARS.map((p) => (
              <div key={p.name} className="bg-[#09090b] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-5">
                <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden border border-white/10">
                  <Image src={p.img} alt={p.name + " — " + p.sub} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-black font-black text-lg" style={{ background: p.color }}>{p.n}</div>
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">{p.name}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: p.color }}>{p.sub}</p>
                  </div>
                </div>
                <p className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-2 rounded-xl bg-white/5 border border-white/10" style={{ color: p.color }}>
                  ⚡ Chemical Tie: {p.doseTag}
                </p>
                <p className="text-neutral-300 leading-relaxed text-sm">{p.body}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tracks.map((t) => (
                    <span key={t} className="text-xs font-medium text-neutral-300 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">{t}</span>
                  ))}
                </div>
                <div className="w-fit"><QR img={p.qr} label={p.qrLabel} url={p.qrUrl} /></div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. NEW IN BETA 1 — THE PRACTICE SPREAD */}
        <section className="flex flex-col gap-6 scroll-mt-28">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#00f0ff] uppercase">New in Beta 1</span>
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">The Practice Spread — Stillness &amp; Movement</h2>
            <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
              Two facing pages built directly into the workbook: <strong className="text-white">Vipassana</strong> to sit with a craving instead of obeying it, and <strong className="text-white">Yoga &amp; Walking</strong> — moving meditation that earns slow-release dopamine.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <figure className="flex flex-col gap-3">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Image src="/90rr/90rr-beta1-practice-vipassana.png" alt="Vipassana practice page" width={1275} height={1650} className="w-full h-auto" />
              </div>
              <figcaption className="text-xs font-mono text-neutral-500 uppercase tracking-widest text-center">Vipassana &middot; sit with the craving</figcaption>
            </figure>
            <figure className="flex flex-col gap-3">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Image src="/90rr/90rr-beta1-practice-yoga.png" alt="Yoga practice page" width={1275} height={1650} className="w-full h-auto" />
              </div>
              <figcaption className="text-xs font-mono text-neutral-500 uppercase tracking-widest text-center">Yoga &amp; Walking &middot; meditation in motion</figcaption>
            </figure>
          </div>

          <SmartImage
            src="/90rr/img/practice-stillness.jpg"
            alt="Vipassana — sitting still with a craving"
            caption="Vipassana in practice · Sitting still until the 20-minute craving wave recedes"
            accent="#00f0ff"
          />
        </section>

        {/* 6. THE 12 STEPS, IN PLAIN LANGUAGE */}
        <section id="steps" className="flex flex-col gap-6 scroll-mt-28">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">The Framework Layered On Top</span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">The 12 Steps, In Plain Language</h2>
            <p className="text-neutral-300 max-w-3xl leading-relaxed text-sm md:text-base">
              <strong className="text-[#10b981]">With the body coming back online, the Steps do the deeper work</strong> of restructuring character, repairing wreckage, and building daily spiritual discipline. Take &ldquo;God as we understood Him&rdquo; to mean a Higher Power <span className="text-[#00f0ff] font-bold">as you understand it</span>; no belief is required to begin.
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
                  <p className="text-neutral-100 font-medium leading-relaxed text-sm">{s.full}</p>
                  <p className="text-xs text-neutral-400 leading-relaxed"><span className="text-[#f59e0b] font-bold">What it asks:</span> {s.why}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-fit"><QR img="steps" label="The 12 Steps & 12 Traditions" url="https://aafiends.com/framework" /></div>
          <p className="text-[11px] text-neutral-600 font-mono leading-relaxed">
            The Twelve Steps are adapted from Alcoholics Anonymous. AAfiends is not affiliated with or endorsed by A.A. World Services, Inc.
          </p>
        </section>

        {/* 7. THE SCIENCE, BRIEFLY */}
        <section className="flex flex-col gap-6 scroll-mt-28">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">Evidence &amp; Mechanism</span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">The Science, Briefly</h2>
            <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm">
              Nothing in the journal is a chore for its own sake. Each daily move repairs a specific part of the neurochemistry the substance broke down.
            </p>
          </div>

          {/* Infographic C: Craving Wave + Spike vs Slope */}
          <CravingWaveAndSpike />

          <div className="grid md:grid-cols-2 gap-4 mt-2">
            {SCIENCE.map(([t, d]) => (
              <div key={t} className="bg-[#09090b] border border-white/10 rounded-2xl p-5">
                <h4 className="text-[#10b981] font-black uppercase tracking-wide text-sm mb-1">{t}</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <QR img="science" label="The research, in plain English" url="https://aafiends.com/blog" />
            <QR img="engine" label="The BIO 12 protocol" url="https://aivirus.org/bio12" />
          </div>
        </section>

        {/* 8. THE A.I.V. — KNOW THE ENEMY */}
        <section className="bg-[#0a0a0a] border border-red-500/20 rounded-[2rem] p-8 md:p-10 flex flex-col gap-5">
          <span className="inline-flex w-fit items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full border border-red-500/30">Know the enemy</span>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none">The A.I.V. — one virus, many faces</h2>
          <div className="grid md:grid-cols-[1.4fr_1fr] gap-6 md:gap-8 items-center">
            <div className="flex flex-col gap-5">
              <p className="text-neutral-300 leading-relaxed text-sm md:text-base">
                We do not treat addiction as a moral failing. It behaves like a virus — the <span className="text-red-400 font-bold">Addiction Intelligence Virus</span> — an adaptive infection of the brain&apos;s reward system. Alcohol, opioids, nicotine, gambling, sugar: the surface differs, the mechanism is identical. It floods dopamine, forces the brain to down-regulate its own receptors, and leaves you in a baseline deficit. The three pillars are the firewall that starves it.
              </p>
              <div className="w-fit"><QR img="aiv" label="Meet the virus — the vectors" url="https://aivirus.org/the-virus" /></div>
            </div>
            <div className="relative rounded-3xl overflow-hidden border border-red-500/20 aspect-square">
              <Image src="/aiv_threat.png" alt="The Addiction Intelligence Virus" fill className="object-cover" sizes="(max-width: 768px) 100vw, 360px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>
          </div>
        </section>

        {/* 9. FEATURED — THE DAILY DOSE */}
        <section className="relative overflow-hidden rounded-[2.5rem] border border-[#10b981]/25 bg-[#09090b] p-8 md:p-12 flex flex-col gap-8 scroll-mt-28">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#10b981]/10 blur-3xl" />

          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#f59e0b] uppercase">Featured · Resupply</span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">The Daily Dose</h2>
            <p className="text-sm md:text-base text-neutral-300 max-w-2xl leading-relaxed">
              Supplements and superfoods that rebuild <strong className="text-white">D.O.S.E.</strong> — what I take,
              when I take it, what the evidence actually says, and what it costs a day. Called the <strong className="text-white">Daily Dose</strong> because
              dopamine doesn&apos;t bank overnight any more than sobriety does. Twenty-four hours is the unit for both.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { stat: "$0.55", label: "a day for the Core Five", accent: "#10b981" },
              { stat: "3", label: "checkpoints, not a schedule", accent: "#00f0ff" },
              { stat: "24h", label: "the only unit that counts", accent: "#f59e0b" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-[#050505] p-5">
                <p className="text-3xl font-black" style={{ color: s.accent }}>{s.stat}</p>
                <p className="mt-1 text-xs text-neutral-400 leading-relaxed">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto -mx-2 px-2">
            <Image src="/90rr/img/dd-dose-map.svg" alt="Which supplements and superfoods restock each of the four chemicals"
                   width={1200} height={820} className="min-w-[720px] w-full h-auto rounded-2xl border border-white/10" />
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/90rr/daily-dose"
                  className="rounded-full bg-[#10b981] px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-emerald-400">
              Read the full ledger →
            </Link>
            <Link href="/90rr/shopping-list"
                  className="rounded-full border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-white/40">
              Print the shopping list
            </Link>
          </div>

          <p className="text-[11px] text-neutral-500 leading-relaxed">
            Not medical advice. Supplements interact with medications — talk to your doctor first, especially about 5-HTP if you take an antidepressant.
          </p>
        </section>

        {/* 10. DOSE FIELD GUIDES */}
        <section className="flex flex-col gap-6 scroll-mt-28">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#10b981] uppercase">DOSE Field Guides</span>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Earn Your Four Chemicals</h2>
            <p className="text-sm text-neutral-400 max-w-2xl">Field guides on rebuilding <strong className="text-white">D.O.S.E.</strong> naturally, with real food and earned habits. Ends with print-and-go lists.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { href: "/90rr/daily-dose", tag: "The Engine · Resupply", title: "Daily Dose", desc: "Supplements & superfoods that rebuild D.O.S.E., graded by real evidence.", accent: "#10b981" },
              { href: "/90rr/fuel", tag: "The Engine · Food", title: "DOSE Kitchen", desc: "Grocery list that rebuilds all 4 chemicals from raw materials up.", accent: "#10b981" },
              { href: "/90rr/reset", tag: "The Reset · Cold", title: "Regulate Dopamine", desc: "Cold immersion & walking — plus a $600 cold plunge build.", accent: "#00f0ff" },
              { href: "/90rr/meditation", tag: "The Mirror · Stillness", title: "Vipassana Guide", desc: "Sit with cravings: 15 & 30 min guides built on Atomic Habits.", accent: "#00f0ff" },
              { href: "/90rr/shopping-list", tag: "Print & Go", title: "Shopping Lists", desc: "DOSE grocery list & cold plunge parts list in one place.", accent: "#f59e0b" },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="group bg-[#09090b] border border-white/10 rounded-3xl p-5 flex flex-col gap-3 transition-all hover:border-white/25">
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: g.accent }}>{g.tag}</p>
                <h3 className="text-lg font-black text-white uppercase tracking-tight leading-tight group-hover:text-[#10b981] transition-colors">{g.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed flex-1">{g.desc}</p>
                <span className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: g.accent }}>Read guide →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 10. THE CRASH COURSE VIDEO & BOOKLET PAIRING */}
        <CrashCourseSection starterPdf={STARTER_PDF} starterBookletPdf={STARTER_BOOKLET} />

        {/* 11. DOWNLOAD THE JOURNAL */}
        <section className="bg-[#09090b] border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden scroll-mt-28">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#10b981] via-[#f59e0b] to-[#00f0ff]" />
          <div className="flex flex-col gap-4 text-center items-center">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">Download the Journal</h2>
            <p className="text-neutral-300 max-w-3xl leading-relaxed text-sm md:text-base">
              <strong className="text-white">Beta 1</strong> is the current workbook — single-page Action Log facing a ruled Notes &amp; Insight page, plus the new <span className="text-[#00f0ff] font-bold">Vipassana + Yoga practice spread</span>. Pick any length below; each comes full-size or as a fold-and-staple booklet.
            </p>

            {/* Beta 1 — featured downloads */}
            <span className="inline-flex items-center gap-2 mt-4 bg-[#f59e0b]/15 border border-[#f59e0b]/50 text-[#f59e0b] font-black text-[10.5px] tracking-widest rounded-full px-3.5 py-1.5 uppercase w-fit">
              ★ Current · Beta 1 layout
            </span>
            <div className="w-full grid md:grid-cols-3 gap-4 text-left mt-1">
              {[
                { title: "7-Day Quick Start", sub: "Print & go · easy share", desc: "One week to test-drive the system.", full: STARTER_PDF, half: STARTER_BOOKLET, accent: "#10b981" },
                { title: "30-Day · Month 1", sub: "Includes Vipassana + Yoga spread", desc: "A month of daily Action Logs with weekly review + practice pages.", full: MONTHLY_PDF, half: MONTHLY_BOOKLET, accent: "#f59e0b" },
                { title: "Refill Pages", sub: "For a 3-ring binder", desc: "Daily pages + weekly review, no intro.", full: REFILL_PDF, half: REFILL_BOOKLET, accent: "#00f0ff" },
              ].map((o) => (
                <div key={o.title} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight leading-tight">{o.title}</h3>
                    <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: o.accent }}>{o.sub}</p>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed flex-1">{o.desc}</p>
                  <a href={o.full} download className="py-3 px-4 rounded-xl text-center text-black text-xs font-black tracking-widest uppercase transition-all hover:opacity-90" style={{ background: o.accent }}>
                    ↓ Full size · 8.5×11
                  </a>
                  <a href={o.half} download className="py-2.5 px-4 rounded-xl border text-center text-xs font-black tracking-widest uppercase transition-all hover:bg-white/5" style={{ borderColor: `${o.accent}66`, color: o.accent }}>
                    ↓ Half size · booklet
                  </a>
                </div>
              ))}
            </div>

            <div className="w-full pt-5 mt-1 border-t border-white/10 flex flex-col gap-2 text-left">
              <p className="text-xs font-mono uppercase tracking-widest text-[#f59e0b]">Two ways to print</p>
              <p className="text-[12px] text-neutral-400 leading-relaxed">
                <strong className="text-neutral-200">Full size (8.5×11):</strong> print double-sided, flip on the <strong>long</strong> edge so each Action Log lines up with its Notes page.
              </p>
              <p className="text-[12px] text-neutral-400 leading-relaxed">
                <strong className="text-neutral-200">Half size (booklet):</strong> print double-sided, flip on the <strong>short</strong> edge, fold stack in half and staple twice on spine — 5.5×8.5&quot; mini-book.
              </p>
            </div>

            {/* Alpha 1 — archived */}
            <details className="w-full text-left mt-2 group">
              <summary className="cursor-pointer list-none flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-300 transition-colors py-2">
                <span className="text-[#f59e0b] group-open:rotate-90 transition-transform inline-block">▸</span>
                Older version · Alpha 1 (classic two-page day)
              </summary>
              <p className="text-[12px] text-neutral-500 leading-relaxed mt-1 mb-4 max-w-2xl">
                The original layout — two-page day (morning left, evening right). Archived for anyone who prefers it. No longer updated.
              </p>
              <div className="w-full grid md:grid-cols-3 gap-4">
                {[
                  { title: "7-Day Quick Start", sub: "Alpha 1 · classic", full: ALPHA_STARTER, half: ALPHA_STARTER_BOOKLET },
                  { title: "30-Day · Month 1", sub: "Alpha 1 · classic", full: ALPHA_MONTHLY, half: ALPHA_MONTHLY_BOOKLET },
                  { title: "Refill Pages", sub: "Alpha 1 · classic", full: ALPHA_REFILL, half: ALPHA_REFILL_BOOKLET },
                ].map((o) => (
                  <div key={o.title} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 flex flex-col gap-2">
                    <h3 className="text-base font-black text-neutral-300 uppercase tracking-tight leading-tight">{o.title}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">{o.sub}</p>
                    <a href={o.full} download className="mt-1 py-2.5 px-4 rounded-xl border border-white/15 text-center text-neutral-300 text-[11px] font-black tracking-widest uppercase transition-all hover:bg-white/5">
                      ↓ Full size
                    </a>
                    <a href={o.half} download className="py-2 px-4 rounded-xl border border-white/10 text-center text-neutral-500 text-[11px] font-black tracking-widest uppercase transition-all hover:bg-white/5">
                      ↓ Booklet
                    </a>
                  </div>
                ))}
              </div>
            </details>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link href="/90rr/builder" className="text-sm font-bold text-[#10b981] hover:text-white transition-colors uppercase tracking-widest">
                ✎ Build your own custom journal →
              </Link>
              <Link href="/90-r-and-r#reserve" className="text-sm font-bold text-[#f59e0b] hover:text-white transition-colors uppercase tracking-widest">
                Reserve a seat in the Fellowship →
              </Link>
            </div>
          </div>
        </section>

        {/* 11. PEEK INSIDE */}
        <section className="flex flex-col gap-6 scroll-mt-28">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#10b981] uppercase">Peek Inside</span>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">What a day looks like</h2>
            <p className="text-sm text-neutral-400 max-w-2xl">Beta 1 puts the whole day on one <strong className="text-white">Action Log</strong> — sleep, movement, meeting, mood and score — facing a ruled <strong className="text-white">Notes &amp; Insight</strong> page.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <figure className="flex flex-col gap-3">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Image src="/90rr/90rr-beta1-day-actionlog.png" alt="Beta 1 Action Log page" width={1275} height={1650} className="w-full h-auto" />
              </div>
              <figcaption className="text-xs font-mono text-neutral-500 uppercase tracking-widest text-center">Action Log &middot; the whole day, one page</figcaption>
            </figure>
            <figure className="flex flex-col gap-3">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Image src="/90rr/90rr-beta1-day-notes.png" alt="Beta 1 Notes & Insight page" width={1275} height={1650} className="w-full h-auto" />
              </div>
              <figcaption className="text-xs font-mono text-neutral-500 uppercase tracking-widest text-center">Notes &amp; Insight &middot; facing page</figcaption>
            </figure>
          </div>
        </section>

        {/* 12. THE WHOLE GRID */}
        <section className="flex flex-col gap-6 scroll-mt-28">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">One Ecosystem</span>
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
                <p className="text-xs text-neutral-400 leading-relaxed flex-1">{e.desc}</p>
                <QR img={e.qr} label={`Visit ${e.name}`} url={e.url} />
              </div>
            ))}
          </div>
        </section>

        {/* 13. CRISIS SUPPORT & SAFETY DISCLAIMER */}
        <section className="flex flex-col gap-4">
          <CrisisSupport />
          <p className="text-xs text-neutral-500 font-mono text-center leading-relaxed">
            Not medical advice · Peer support and personal experience only · Not affiliated with Alcoholics Anonymous World Services, Inc.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
