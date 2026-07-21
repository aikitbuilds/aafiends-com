import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Shield, Users, BookOpen, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "The Framework — 12 Steps, 12 Traditions & G.A.D.",
  description:
    "How AA Fiends works the program: the 12 Steps as the manual, the 12 Traditions as the grid, and G.A.D. — a practical, non-religious way to work Steps 3 and 11, built for skeptics in early recovery.",
  alternates: { canonical: "https://aafiends.com/framework" },
};

const ANCHORS = [
  { href: "#steps", label: "The Steps", color: "text-purple-400" },
  { href: "#traditions", label: "The Traditions", color: "text-purple-400" },
  { href: "#gad", label: "G.A.D. — The Higher Power", color: "text-blue-400" },
];

export default function FrameworkPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans relative overflow-hidden">
      <SiteHeader />

      <main className="flex-grow flex flex-col items-center py-20 px-6 relative z-10">
        <div className="max-w-5xl w-full flex flex-col gap-20">
          {/* Page header */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#10b981]/10 flex items-center justify-center border border-[#10b981]/30 text-[#10b981]">
                <BookOpen size={32} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#10b981] uppercase tracking-widest block mb-1">
                  The Framework
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
                  The Manual, The Grid &amp; The Architect
                </h1>
              </div>
            </div>
            <p className="text-lg text-neutral-300 leading-relaxed max-w-3xl">
              One page, three parts. The <span className="text-purple-400 font-bold">12 Steps</span> fix the
              infected individual. The <span className="text-purple-400 font-bold">12 Traditions</span> protect the
              community you plug into. And <span className="text-blue-400 font-bold">G.A.D.</span> is how a skeptic
              hands over the admin password without pretending to be religious. This is the operating system the{" "}
              <Link href="/90rr" className="text-[#10b981] font-bold hover:text-emerald-300 underline underline-offset-4">
                90 R&amp;R journal
              </Link>{" "}
              runs on every day.
            </p>
            <nav className="flex flex-wrap gap-3">
              {ANCHORS.map((a) => (
                <a
                  key={a.href}
                  href={a.href}
                  className={`px-4 py-2 rounded-full bg-[#0a0a0a] border border-white/10 text-xs font-black uppercase tracking-widest ${a.color} hover:border-white/30 transition-colors`}
                >
                  {a.label}
                </a>
              ))}
            </nav>
          </div>

          {/* ─── THE STEPS ─── */}
          <section id="steps" className="flex flex-col gap-8 scroll-mt-28">
            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/30 text-purple-400">
                <Users size={32} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest block mb-1">
                  Part 1: The 12 Steps (The Manual)
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none">
                  The Anti-Virus Scan
                </h2>
              </div>
            </div>

            <div className="w-full bg-gradient-to-r from-purple-900/20 to-transparent border-l-4 border-purple-500 p-6 md:p-10 rounded-r-3xl shadow-lg italic text-neutral-200 text-lg leading-relaxed relative overflow-hidden">
              <div className="absolute inset-0 bg-purple-500/5 mix-blend-overlay"></div>
              <p className="relative z-10">
                &quot;The Twelve Steps are the manual to clear away the shame,<br />
                To sweep out old resentments and stop playing the blame game.&quot;
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/10 shadow-xl hover:border-purple-500/30 transition-colors">
                <h3 className="text-xl font-black text-white uppercase mb-3 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span> How they work
                </h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  The 12 Steps act as the ultimate anti-virus scan — clearing out the corrupted files (resentments,
                  fears, and guilt) from your past. The AIV is a highly adaptive pathogen that isolates you before it
                  attacks, and the Steps are how you sweep the infection out of your own system, one honest pass at a
                  time.
                </p>
              </div>
              <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/10 shadow-xl hover:border-purple-500/30 transition-colors">
                <h3 className="text-xl font-black text-white uppercase mb-3 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span> Worked daily, not framed
                </h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  Steps 1–3 reset the operator, 4–9 restructure the wreckage, and 10–12 run every single day — that
                  daily loop is exactly what the journal tracks.{" "}
                  <Link href="/90rr#steps" className="text-purple-400 font-bold hover:text-purple-300 underline underline-offset-4">
                    All 12 Steps, annotated for the first 90 days, live in the journal guide →
                  </Link>
                </p>
              </div>
            </div>
          </section>

          {/* ─── THE TRADITIONS ─── */}
          <section id="traditions" className="flex flex-col gap-8 scroll-mt-28">
            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/30 text-purple-400">
                <Users size={32} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest block mb-1">
                  Part 2: The 12 Traditions (The Grid)
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none">
                  The Network Node
                </h2>
              </div>
            </div>

            <div className="w-full bg-gradient-to-r from-purple-900/20 to-transparent border-l-4 border-purple-500 p-6 md:p-10 rounded-r-3xl shadow-lg italic text-neutral-200 text-lg leading-relaxed relative overflow-hidden">
              <div className="absolute inset-0 bg-purple-500/5 mix-blend-overlay"></div>
              <p className="mb-4 relative z-10">
                &quot;You cannot beat a symbiote by sitting in your room,<br />
                Just staring at the ceiling in a spiral of your gloom.<br />
                The virus loves a lonely host, a disconnected node,<br />
                It thrives when you are isolated on a heavy road.
              </p>
              <p className="relative z-10">
                The Twelve Traditions build the Grid, the fellowship of friends,<br />
                Where nobody&rsquo;s the boss of you, and healing never ends.&quot;
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="flex flex-col gap-6">
                <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/10 shadow-xl hover:border-purple-500/30 transition-colors">
                  <h3 className="text-xl font-black text-white uppercase mb-3 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span> Why they&apos;re needed
                  </h3>
                  <p className="text-neutral-400 text-base leading-relaxed">
                    The Steps fix the infected individual — the Traditions protect the community so it&apos;s always
                    there when you need to plug in. They ensure AAFiends and the AA fellowship remain ego-free,
                    completely self-supporting, and focused strictly on keeping the next person sober.
                  </p>
                </div>
                <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/10 shadow-xl hover:border-purple-500/30 transition-colors">
                  <h3 className="text-xl font-black text-white uppercase mb-3 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span> Where it lives
                  </h3>
                  <p className="text-neutral-400 text-base leading-relaxed font-mono text-purple-400">
                    In the meeting rooms, on phone calls with your sponsor, and in the text threads with other
                    Initiates.
                  </p>
                </div>
                <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/10 shadow-xl hover:border-purple-500/30 transition-colors">
                  <h3 className="text-xl font-black text-white uppercase mb-3 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span> When to use it
                  </h3>
                  <p className="text-neutral-400 text-base leading-relaxed">
                    Continuously. Especially when the H.A.L.T. triggers hit (Hungry, Angry, Lonely, Tired). You plug
                    into the grid, and the shared power keeps your battery charged.
                  </p>
                </div>
              </div>

              <div className="relative rounded-[2rem] overflow-hidden border border-purple-500/30 shadow-[0_20px_50px_rgba(168,85,247,0.2)] bg-[#09090b] aspect-[4/5]">
                <Image
                  src="/aa_fellowship_gad.png"
                  alt="The Network Grid — the fellowship that keeps you plugged in"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-white font-black text-3xl uppercase tracking-widest leading-none">
                    The<br />Grid
                  </h3>
                  <div className="flex items-center gap-2 mt-3 text-sm font-bold text-purple-400 bg-purple-500/10 w-fit px-3 py-1.5 rounded-full border border-purple-500/30">
                    <Users size={16} /> Online
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── G.A.D. ─── */}
          <section id="gad" className="flex flex-col gap-8 scroll-mt-28">
            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/30 text-blue-400">
                <Shield size={32} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block mb-1">
                  Part 3: G.A.D. (The Grand Architect Divine)
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none">
                  The Admin Password
                </h2>
              </div>
            </div>

            <div className="w-full bg-gradient-to-r from-blue-900/20 to-transparent border-l-4 border-blue-500 p-6 md:p-10 rounded-r-3xl shadow-lg italic text-neutral-200 text-lg leading-relaxed relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay"></div>
              <p className="mb-4 relative z-10">
                &quot;I tried to be the boss of me, the master of the code,<br />
                But every time I ran the script, my system would implode.<br />
                I fought the word of &lsquo;God&rsquo; because my ego was too big,<br />
                I thought I was a genius, but my life was out of sync.
              </p>
              <p className="relative z-10">
                But G.A.D. is just the Architect who built the starry sky,<br />
                Who holds the master password when my brain goes all awry.<br />
                I hand the keyboard over now, I let the Builder steer,<br />
                And suddenly the glitching stops, the signal&apos;s running clear.&quot;
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="relative rounded-[2rem] overflow-hidden border border-blue-500/30 shadow-[0_20px_50px_rgba(59,130,246,0.2)] bg-[#09090b] aspect-[4/5] order-2 lg:order-1">
                <Image
                  src="/grand_architect_divine.png"
                  alt="Grand Architect Divine — handing over the admin password"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-white font-black text-3xl uppercase tracking-widest leading-none">
                    Admin<br />Override
                  </h3>
                  <div className="flex items-center gap-2 mt-3 text-sm font-bold text-blue-400 bg-blue-500/10 w-fit px-3 py-1.5 rounded-full border border-blue-500/30">
                    <Shield size={16} /> Access Granted
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 order-1 lg:order-2">
                <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/10 shadow-xl hover:border-blue-500/30 transition-colors">
                  <h3 className="text-xl font-black text-white uppercase mb-3 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span> Why we call it G.A.D.
                  </h3>
                  <p className="text-neutral-400 text-base leading-relaxed">
                    The traditional AA program asks us to turn our will over to &quot;God as we understood Him&quot;
                    (Step 3). But for many logical, tech-minded people or those with religious baggage, the word
                    &quot;God&quot; triggers the Ego to put its defenses up. By viewing God as the Grand Architect
                    Divine (G.A.D.), it makes the spiritual solution undeniable: You didn&apos;t write the original
                    code for your biology or the universe, which means you aren&apos;t the Master Programmer. You
                    cannot debug a virus using the same infected brain that caught it. You must hand the Admin
                    Password back to the Architect.
                  </p>
                </div>
                <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/10 shadow-xl hover:border-blue-500/30 transition-colors">
                  <h3 className="text-xl font-black text-white uppercase mb-3 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span> Where it lives
                  </h3>
                  <p className="text-neutral-400 text-base leading-relaxed font-mono text-blue-400">
                    In your daily surrender (Step 3) and quiet meditation (Step 11).
                  </p>
                </div>
                <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/10 shadow-xl hover:border-blue-500/30 transition-colors">
                  <h3 className="text-xl font-black text-white uppercase mb-3 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span> When to use it
                  </h3>
                  <p className="text-neutral-400 text-base leading-relaxed">
                    First thing in the morning before the AIV boots up, and the exact moment you feel your willpower
                    failing.
                  </p>
                </div>
                <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/10 shadow-xl hover:border-blue-500/30 transition-colors">
                  <h3 className="text-xl font-black text-white uppercase mb-3 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span> How it works
                  </h3>
                  <p className="text-neutral-400 text-base leading-relaxed">
                    You stop trying to outsmart the glitch. You pause, admit you are out of your depth, and ask the
                    Grand Architect for the next right instruction.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="bg-[#0a140f] border border-[#10b981]/30 rounded-[2rem] p-8 md:p-12 flex flex-col items-center text-center gap-5">
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
              Now put the framework to work
            </h2>
            <p className="text-neutral-300 max-w-2xl leading-relaxed">
              The Steps, the Grid, and the Architect only count when they&apos;re worked daily. The 90 R&amp;R journal
              turns all three into a two-minute morning and evening check-in.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/90rr"
                className="py-4 px-8 rounded-2xl bg-[#10b981] hover:bg-[#059669] text-black text-sm font-black tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center gap-2"
              >
                Get the free journal <ArrowRight size={16} />
              </Link>
              <Link
                href="/protocol"
                className="py-4 px-8 rounded-2xl border border-white/15 text-white text-sm font-bold tracking-widest uppercase hover:border-[#10b981]/50 hover:text-[#10b981] transition-all"
              >
                See the BIO 12 protocol
              </Link>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
